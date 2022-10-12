"use strict";

import * as express from "express";
import * as token from "../domain/token";
import * as user from "../domain/user";
import * as error from "../server/error";

/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
export function init(app: express.Express) {
  app.route("/v1/user").post(signUp);
}

/**
 * @apiDefine TokenResponse
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "{Token de autorización}"
 *     }
 */
/**
 * @api {post} /v1/users Registrar Usuario
 * @apiName Registrar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Registra un nuevo usuario en el sistema.
 *
 * @apiExample {json} Body
 *    {
 *      "name": "{Nombre de Usuario}",
 *      "login": "{Login de usuario}",
 *      "password": "{Contraseña}"
 *    }
 *
 * @apiUse TokenResponse
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
 async function signUp(req: express.Request, res: express.Response) {
    console.log("signUp");
    try {
      const userId = await user.register(req.body);
      const tokenString = await token.create(userId);
      res.json({ token: tokenString });
    } catch (err) {
      console.log(err);

      error.handle(res, err);
    }
  }
