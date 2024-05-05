const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Role = require("./roleModel");
const UserRole = require("./userRoleModel");
const Permission = require("./permissionModel");
const RolePermission = require("./rolePermissionModel");


// User and Role Associations
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// Role and Permission Associations
Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

module.exports = {
  User,
  Role,
  UserRole,
  Permission,
  RolePermission,
};
