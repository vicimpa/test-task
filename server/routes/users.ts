import { Router } from "express";
import { parse } from "valibot";

import { UserRequest } from "../models/UserRequest";
import { UserService } from "../services/UserService";
import { canceled } from "../utils/canceled";
import { delay } from "../utils/delay";
import { makeResponse } from "../utils/makeResponse";

export const users = Router();

users.post('/check', makeResponse(
  ({ body }) => canceled(
    'testid', // Сюда можно вставить id пользователя или сессии
    async () => {
      const { email, number } = parse(UserRequest, body);
      const findData = UserService.findUsers(email, number);

      await delay(5000);

      return {
        code: 200,
        result: findData,
        count: findData.length
      };
    }
  )
));
