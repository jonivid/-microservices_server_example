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
        twoFAToken
      };
    } else {
      // Password is valid, generate a JWT token
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
module.exports = {
  registerUser,
  loginUser,
  setup_2fa,
};
