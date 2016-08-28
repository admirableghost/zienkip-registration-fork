'use strict';

var query = {};

module.exports = query;

//query.login = 'select meta(p).id as uuid, p.* from profiles us join profiles p on keys (us.uuid) where meta(us).id = $1 and us.pwd = $2';

query.cred_check = 'select p.uuid from profiles p where meta(p).id = $1 and p.pwd = $2';

query.uuid_login = 'select meta(p).id as uuid, p.* from profiles p where meta(p).id = $1';

query.getMenus = 'select name, submenu, state, icon, label from global_static where app = "registration" and type = "menu" and active =true and array_contains(user_type, $1)and array_contains(user_role, $2) order by display_order'