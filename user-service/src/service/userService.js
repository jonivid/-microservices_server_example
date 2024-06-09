const userDal = require("../dal/userDal");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../tools/bcryptjs_hash");
const logger = require("../tools/logger");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const registerUser = async ({ email, password, username }) => {
  try {
    const hashedPassword = await hashPassword(password);
    return await userDal.createUser({
      email,
      password: hashedPassword,
      username,
    });
  } catch (error) {
    logger.error(`Error creating user in Service: ${error.message}`);
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    // Retrieve the user by email
    const user = await userDal.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    // Compare the hashed passwords
    const passwordIsValid = await bcrypt.compare(
      password.toString(),
      user.password,
    );
    if (!passwordIsValid) {
      throw new Error("Invalid credentials");
    }
    if (user.twoFactorEnabled) {
      const twoFAToken = jwt.sign(
        { userId: user.id },
        process.env.TWO_FA_TOKEN_SECRET,
        {
          expiresIn: process.env.TWO_FA_TOKEN_EXPIRY,
        },
      );

      return {
        userId: user.id,
        is2fa: true,
        twoFAToken,
      };
    } else if (!user.twoFactorEnabled) {
      //2fa not enabled Password is valid, generate a JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      logger.info(`JWT created for user: ${user.id}`);

      // Return the token and user info (without password)
      return {
        token,
        userId: user.id,
        is2fa: false,
      };
    }
  } catch (error) {
    logger.error(`Login error for email: ${email}: ${error.message}`);
    throw error; // Re-throw to be handled by the controller
  }
};
const setup_2fa = async ({ email }) => {
  try {
    const user = await userDal.findUserByEmail(email);

    if (user.twoFactorSecret) {
      throw new Error("2FA is already set up for this user.");
    }
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    await user.save();

    return new Promise((resolve, reject) => {
      QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        if (err) {
          reject(err); // Reject the Promise if there's an error
        } else {
          resolve(dataUrl); // Resolve the Promise with the data URL
        }
      });
    });
  } catch (error) {
    logger.error(`Error creating user in Service: ${error.message}`);
    throw error;
  }
};

const verify2FACode = async (userId, token) => {
  try {
    // Retrieve user by ID from the database
    const user = await userDal.findUserById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    // Check if 2FA is enabled and there is a secret to verify the token against
    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      throw new Error("2FA is not enabled or not properly set up.");
    }
    // Verify the provided 2FA token against the user's stored 2FA secret
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: token, // The TOTP from the user's authenticator app
      window: 1, // Allows for a 30-second clock skew in either direction
    });
    if (verified) {
      const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      return { userId, token: jwtToken };
    } else {
      throw new Error("Failed to verify 2FA code");
    }
  } catch (error) {
    // Log the error or handle it as needed
    console.error(
      `Error verifying 2FA code for user ${userId}: ${error.message}`,
    );
    throw error; // Rethrow the error to be handled by the calling function
  }
};
module.exports = {
  registerUser,
  loginUser,
  setup_2fa,
  verify2FACode,
};
