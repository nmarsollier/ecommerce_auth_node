"use strict";

import * as express from "express";
import * as token from "../domain/token";
import * as user from "../domain/user";
import * as error from "../server/error";

/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: express.Express) {
  app.route("/v1/user/signin").post(login);
}

/**
 * @api {post} /v1/users/signin Login
 * @apiName Log in
 * @apiGroup Seguridad
 *
 * @apiDescription Loguea un usuario en el sistema.
 *
 * @apiExample {json} Body
 *    {
 *      "login": "{Login de usuario}",
 *      "password": "{Contraseña}"
 *    }
 *
 * @apiUse TokenResponse
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
 async function login(req: express.Request, res: express.Response) {
    try {
      const userId = await user.login(req.body);
      const tokenString = await token.create(userId);
      res.json({ token: tokenString });
    } catch (err) {
      error.handle(res, err);
    }
  }
