"use strict";

import * as express from "express";
import * as passport from "passport";
import * as token from "../domain/token";
import { ISessionRequest } from "../domain/token/passport";
import * as rabbit from "../rabbit";
import * as error from "../server/error";

/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: express.Express) {
  app.route("/v1/user/signout").get(passport.authenticate("jwt", { session: false }), logout);
}

/**
 * @api {get} /v1/users/signout Logout
 * @apiName Logout
 * @apiGroup Seguridad
 *
 * @apiDescription Desloguea un usuario en el sistema, invalida el token.
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse OtherErrors
 */
async function logout(req: ISessionRequest, res: express.Response) {
    try {
      await token.invalidate(req.user);
      rabbit.sendLogout(req.header("Authorization"))
        .catch((err) => {
          console.error("signout " + err);
        });
      res.send();
    } catch (err) {
      error.handle(res, err);
    }
  }
