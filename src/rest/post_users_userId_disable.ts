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
    app.route("/v1/users/:userID/disable").post(passport.authenticate("jwt", { session: false }), disableUser);
}

/**
 * @api {post} /v1/users/:userId/disable Deshabilitar Usuario
 * @apiName Deshabilitar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Deshabilita un usuario en el sistema.   El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
async function disableUser(req: ISessionRequest, res: express.Response) {
    try {
      await user.hasPermission(req.user.user_id, "admin");
      await user.disable(req.params.userID);
      res.send();
    } catch (err) {
      error.handle(res, err);
    }
  }
