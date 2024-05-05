"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename 'UserRole' to 'user_role'
    await queryInterface.renameTable("UserRoles", "user_roles");

    // Rename 'RolePermission' to 'role_permission'
    await queryInterface.renameTable("RolePermissions", "role_permissions");
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback table renames
    await queryInterface.renameTable("user_roles", "UserRoles");
    await queryInterface.renameTable("role_permissions", "RolePermissions");
  },
};
