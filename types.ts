import { email, regex, string } from "valibot";

export const emailValidate = string([email()]);
export const numberValidate = string([regex(/^\d{0,6}$/)]);