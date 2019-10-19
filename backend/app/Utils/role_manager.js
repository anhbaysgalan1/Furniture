const HttpUtil = require('./http');
const Utils = require('./utils');
const config = require('../../config/config.json');

module.exports = {
  RoleIdMap: {
    root: '5b22126d3cf3733e8f78cdb5',
    admin: '5b2212773cf3733e8f78cde3',
    staff: '5b32ea2d14505014f03ce354',
    hr: '5b32ea4914505014f03ce355',
    leader: '5b32ea5c14505014f03ce356',
    manager: '5b32ea6b14505014f03ce357',
    ceo: '5b32ea7d14505014f03ce358',
    notification: '5b32ea9014505014f03ce359',
    asset: '5b32ea9f14505014f03ce35a',
    notimesheet: '5b32eae714505014f03ce35b',
    noricesheet: '5b32eb0414505014f03ce35c',
    ricestatistic: '5b32eb2414505014f03ce35d',
    hrstatistic: '5b32eb3714505014f03ce35e',
    roomadmin: '5ba21adfb858a17c8db01150',
    auto_procedure: '5bc959035c83e7c0ada7289c'
  },
  
  RoleCodeMap: {
    root: 'root',
    admin: 'admin',
    staff: 'staff',
    hr: 'hr',
    leader: 'leader',
    manager: 'manager',
    ceo: 'ceo',
    notification: 'notification',
    asset: 'asset',
    notimesheet: 'notimesheet',
    noricesheet: 'noricesheet',
    ricestatistic: 'ricestatistic',
    hrstatistic: 'hrstatistic',
    roomadmin: 'roomadmin',
    auto_procedure: 'auto_procedure'
  },

  getRoleIdByCode(code) {
    let key = this.RoleCodeMap[code];
    if (!key) return '';
    return this.RoleIdMap[key] || '';
  },

  getRoleRoot() {
    return {
      _id: this.RoleIdMap.root,
      code: this.RoleCodeMap.root,
      name: 'Root'
    }
  },
  
  hasRoleRoot: function (user) {
    if (user.username === this.RoleCodeMap.root || user.email === this.RoleCodeMap.root) {
      return true;
    }
    return userHasRole(user, this.RoleCodeMap.root);
  },
  
  isAdmin: function (authUser) {
    return userHasRole(authUser, this.RoleCodeMap.admin);
  },
  
  isRoot: function (authUser) {
    return authUser.email === this.RoleCodeMap.root || this.hasRoleRoot(authUser);
  },
  
  checkRole: function (req, res, next, requireRole) {
    let user = HttpUtil.headers(req).authUser;
    if (_hasRole(user, requireRole)) {
      next();
    } else {
      HttpUtil.apiError(req.headers.lang_code, res, {
        code: HttpUtil.FORBIDDEN,
        msgKey: 'Permission_Denied'
      });
    }
  },
  
  // check user có ít nhất 1 quyển trong mảng roles
  // roles: mảng chứa roleId
  hasRole: function (user, roles) {
    return _hasRole(user, roles);
  },
  
  getRoleHighest: function (roles) {
    let value = 'none';
    let RoleCode = this.RoleCodeMap;
    if (roles) {
      roles = roles.map(item => item.code);
      if (roles.indexOf(RoleCode.admin) > -1) {
        value = 'admin';
        return value;
      }
      if (roles.indexOf(RoleCode.ceo) > -1) {
        value = 'ceo';
        return value;
      }
      if (roles.indexOf(RoleCode.manager) > -1) {
        value = 'manager';
        return value;
      }
      if (roles.indexOf(RoleCode.leader) > -1) {
        value = 'leader';
        return value;
      }
      if (roles.indexOf(RoleCode.hr) > -1) {
        value = 'hr';
        return value;
      }
      if (roles.indexOf(RoleCode.staff) > -1) value = 'staff';
    }
    return value;
  },
  
  getAcceptRoleHighest: function (roles) {
    let value = 'none';
    let RoleCode = this.RoleCodeMap;
    if (roles) {
      roles = roles.map(item => item.code);
      if (roles.indexOf(RoleCode.ceo) > -1) {
        value = 'ceo';
        return value;
      }
      if (roles.indexOf(RoleCode.manager) > -1) {
        value = 'manager';
        return value;
      }
      if (roles.indexOf(RoleCode.leader) > -1) {
        value = 'leader';
        return value;
      }
      if (roles.indexOf(RoleCode.staff) > -1) value = 'staff';
    }
    return value;
  },
  
  // Gán quyền cho user, gọi hàm này khi gán quyền trưởng phòng/trưởng bộ phận
  // Sẽ có 1 số quyền khác đi kèm theo
  // roleId: dạng string
  assignRole(user, roleId) {
    let roleDepends = this.getListDependRoles(roleId);
    roleDepends.push(roleId);
    let currentRoles = this.getListRoleIdOfUser(user);
    let newRoles = [...currentRoles, ...roleDepends];
    return Utils.uniqElementsArray(newRoles);
  },

  // Trả về mảng roleId dạng string
  getListRoleIdOfUser(user) {
    if (!user || !user.roles) return [];
    return user.roles.map(it => {
      if (it._id) return it._id.toString();
      return it.toString();
    });
  },

  // Các quyền ceo, hr, leader, manager sẽ có 1 số quyền đi kèm
  // Gọi hàm này để lấy ra các quyền đi kèm ấy.
  getListDependRoles(roleId) {
    let roleDepends = [];
    if (roleId == this.RoleIdMap.ceo) {
      roleDepends = config.RoleDependencies.ceo;
    } else if (roleId == this.RoleIdMap.manager) {
      roleDepends = config.RoleDependencies.manager;
    } else if (roleId == this.RoleIdMap.leader) {
      roleDepends = config.RoleDependencies.leader;
    } else if (roleId == this.RoleIdMap.hr) {
      roleDepends = config.RoleDependencies.hr;
    }
    if (roleDepends.length > 0) {
      // RoleDependencies trong config đang lưu code nên phải map từ code sang id
      roleDepends = roleDepends.map(it => this.getRoleIdByCode(it));
    }
    return roleDepends;
  },

  // Để check trong hàm updateUser, khi mà thay đổi roles
  // Các role leader, manager, roomadmin đi theo bộ phận phòng ban nên ko đc edit trực tiếp vào user
  // readOnlyRole: 1 role cụ thể (sẽ là leader, manager, roomadmin)
  // currentRoleArray: mảng roleId hiện tại của user
  // newRoleArray: mảng roleId mới sẽ update cho user
  // Các roleId đều là string chứ ko phải ObjectId
  doesNotChangeSpecificRole(readOnlyRole, newRoleArray, currentRoleArray) {
    if (newRoleArray.includes(readOnlyRole) && !currentRoleArray.includes(readOnlyRole)) {
      newRoleArray = newRoleArray.filter(it => it != readOnlyRole);
    } else if (!newRoleArray.includes(readOnlyRole) && currentRoleArray.includes(readOnlyRole)) {
      newRoleArray.push(readOnlyRole);
    }
    return newRoleArray;
  }

};

function userHasRole(user, roleCode) {
  if (user.roles && user.roles.length > 0) {
    for (const role of user.roles) {
      if (role.code === roleCode) {
        return true;
      }
    }
  }
  return false;
}

function _hasRole(user, roles) {
  if (!user || !user.roles || !roles) {
    return false;
  }
  if (roles === 'DEFAULT') {
    return true;
  }
  if (!Utils.isArray(roles)) {
    roles = [roles];
  }
  for (let r of user.roles) {
    for (let requireRole of roles) {
      if (requireRole.toString() === r._id.toString()) return true;
    }
  }
  return false;
}
