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
  app.route("/v1/users/current").get(passport.authenticate("jwt", { session: false }), current);
}

/**
 * @api {get} /v1/users/current Usuario Actual
 * @apiName Usuario Actual
 * @apiGroup Seguridad
 *
 * @apiDescription Obtiene información del usuario actual.
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "{Id usuario}",
 *        "name": "{Nombre del usuario}",
 *        "login": "{Login de usuario}",
 *        "permissions": [
 *            "{Permission}"
 *        ]
 *     }
 *
 * @apiUse AuthHeader
 * @apiUse OtherErrors
 */
function current(req: ISessionRequest, res: express.Response) {
  user.findById(req.user.user_id)
    .then(user => {
      return res.json({
        id: user.id,
        name: user.name,
        login: user.login,
        permissions: user.permissions
      });
    })
    .catch(err => error.handle(res, err));
}
