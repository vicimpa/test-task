import { email, object, optional } from "valibot";

import { emailValidate, numberValidate } from "../../types";

export const UserRequest = object({
  email: emailValidate,
  number: optional(numberValidate)
});