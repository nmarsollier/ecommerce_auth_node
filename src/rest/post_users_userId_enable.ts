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
  app.route("/v1/users/:userID/enable").post(passport.authenticate("jwt", { session: false }), enableUser);
}

/**
 * @api {post} /v1/users/:userId/enable Habilitar Usuario
 * @apiName Habilitar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Habilita un usuario en el sistema. El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function enableUser(req: ISessionRequest, res: express.Response) {
    try {
      await user.hasPermission(req.user.user_id, "admin");
      await user.enable(req.params.userID);
      res.send();
    } catch (err) {
      error.handle(res, err);
    }
  }
