"use strict";

import * as express from "express";
import * as passport from "passport";
import { ISessionRequest } from "../domain/token/passport";
import * as user from "../domain/user";
import * as error from "../server/error";

/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: express.Express) {
  app.route("/v1/users").get(passport.authenticate("jwt", { session: false }), getAll);
}

/**
 * @api {post} /v1/users Lista de Usuarios
 * @apiName Lista de Usuarios
 * @apiGroup Seguridad
 *
 * @apiDescription Devuelve una lista de usuarios. El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     [{
 *        "id": "{Id usuario}",
 *        "name": "{Nombre del usuario}",
 *        "login": "{Login de usuario}",
 *        "permissions": [
 *            "{Permission}"
 *        ],
 *        "enabled": true|false
 *       }, ...
 *     ]
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function getAll(req: ISessionRequest, res: express.Response) {
    try {
      await user.hasPermission(req.user.user_id, "admin");
      const users = await user.findAll();

      res.json(users.map(u => {
        return {
          id: u.id,
          name: u.name,
          login: u.login,
          permissions: u.permissions,
          enabled: u.enabled
        };
      }));
    } catch (err) {
      error.handle(res, err);
    }
  }
