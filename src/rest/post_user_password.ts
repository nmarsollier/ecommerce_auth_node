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
  app.route("/v1/user/password").post(passport.authenticate("jwt", { session: false }), changePassword);
}

/**
 * @api {post} /v1/user/password Cambiar Password
 * @apiName Cambiar Password
 * @apiGroup Seguridad
 *
 * @apiDescription Cambia la contraseña del usuario actual.
 *
 * @apiExample {json} Body
 *    {
 *      "currentPassword" : "{Contraseña actual}",
 *      "newPassword" : "{Nueva Contraseña}",
 *    }
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
 function changePassword(req: ISessionRequest, res: express.Response) {
    user.changePassword(req.user.user_id, req.body)
      .then(_ => res.send())
      .catch(err => error.handle(res, err));
  }
