import { data } from "../data";

export class UserService {

  static findUsers(email: string, number?: string) {
    return data.filter(e => (
      true
      && e.email === email
      && (
        false
        || number === undefined
        || e.number.startsWith(number)
      )
    ));
  }
}