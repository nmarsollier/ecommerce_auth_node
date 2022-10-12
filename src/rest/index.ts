"use strict";
import * as express from "express";
import * as getUsers from "./get_users";
import * as getUsersCurrent from "./get_users_current";
import * as getUserSignout from "./get_user_signout";
import * as postUser from "./post_user";
import * as postUsersUserIdDisable from "./post_users_userId_disable";
import * as postUsersUserIdEnable from "./post_users_userId_enable";
import * as postUsersUserIdGrant from "./post_users_userId_grant";
import * as postUsersUserIdRevoke from "./post_users_userId_revoke";
import * as postUserPassword from "./post_user_password";
import * as postUserSignin from "./post_user_signin";

export function init(app: express.Express) {
    getUserSignout.init(app);
    getUsersCurrent.init(app);
    getUsers.init(app);
    postUserPassword.init(app);
    postUserSignin.init(app);
    postUser.init(app);
    postUsersUserIdDisable.init(app);
    postUsersUserIdEnable.init(app);
    postUsersUserIdGrant.init(app);
    postUsersUserIdRevoke.init(app);
}