const userDal = require("../dal/userDal");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../tools/bcryptjs_hash");
const logger = require("../tools/logger");
const bcrypt = require("bcryptjs");

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

    // Password is valid, generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    logger.info(`JWT created for user: ${user.id}`);

    // Return the token and user info (without password)
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    logger.error(`Login error for email: ${email}: ${error.message}`);
    throw error; // Re-throw to be handled by the controller
  }
};

module.exports = {
  registerUser,
  loginUser,
};
