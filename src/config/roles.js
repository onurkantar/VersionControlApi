const allRoles = {
  user: ['getVersion', 'getAllVersions'],
  admin: ['getUsers', 'manageUsers', 'updateVersion', 'deleteVersion', 'addVersion'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
