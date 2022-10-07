"use strict";

import { ObjectID } from "bson";
import { Document, model, Schema } from "mongoose";

/*
Son tokens de sesión se guardan en la base de datos.
Para deshabilitar un token hay que poner valida=false
*/
export interface IToken extends Document {
  isValid: boolean;
  user: ObjectID;
}

const TokenSchema = new Schema({
  isValid: {
    type: Boolean,
    default: true,
    required: [true, "Valid es requerido"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Usuario es requerido"]
  }
}, { collection: "tokens" });

export let Token = model<IToken>("Token", TokenSchema);
