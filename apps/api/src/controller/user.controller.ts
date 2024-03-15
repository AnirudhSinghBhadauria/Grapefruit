import { asyncHandler } from "../utils/async-handeler.js";
import { apiResponse } from "../utils/api-response.js";
import { userRelation, db, eq } from "@chat/drizzle";
import { RegisterInputs } from "@chat/types/schema";
import { HttpStatus } from "../libs/http-codes.js";
import { apiError } from "../utils/api-error.js";
import { Request, Response } from "express";
import becrypt from "bcrypt";
import {
  invalidCredentialsMessage,
  userAlreadyExistsMessage,
  userCreatedSuccesfully,
  usernameConflictMessage,
} from "../libs/error-messages/user.error.js";

const generatePassHash = async (value: string) => await becrypt.hash(value, 10);

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, displayPicture, createdAt } = userRelation;

  const result = await db
    .select({
      email,
      username,
      displayPicture,
      createdAt,
    })
    .from(userRelation);

  res
    .status(HttpStatus.OK)
    .json(
      new apiResponse(
        HttpStatus.OK,
        result,
        "All users extracted successfully!"
      )
    );
});

const register = asyncHandler(async (req: Request, res: Response) => {
  // Sanitization
  const registerInputs = RegisterInputs.safeParse(req.body);

  if (!registerInputs.success) {
    throw new apiError(
      HttpStatus.BAD_REQUEST,
      registerInputs.error,
      invalidCredentialsMessage
    );
  }

  // Trim username (Incase they're not trimmed on request!)
  const username = registerInputs.data.username.split(" ").join("");
  const pass = registerInputs.data.password.split(" ").join("");

  // console.log(username);

  const usernameTaken = await db
    .select()
    .from(userRelation)
    .where(eq(userRelation.username, username));

  // const ifUserExist = await db
  //   .select()
  //   .from(userRelation)
  //   .where(eq(userRelation.password, registerInputs.data.password));

  // User already exist
  const allUsers = await db
    .select({ password: userRelation.password })
    .from(userRelation);

  // console.log(allUsers);

  const ifPassMatch = async (users: { password: string }[], pass: string) => {
    for (const user of users) {
      const match = await becrypt.compare(pass, user.password);
      if (match) return true;
    }
    return false;
  };

  const ifUserExist = await ifPassMatch(allUsers, pass);

  // console.log(ifUserExist);

  if (ifUserExist && usernameTaken.length !== 0) {
    throw new apiError(
      HttpStatus.CONFLICT,
      "User already exists",
      userAlreadyExistsMessage
    );
  }

  // Username taken
  if (usernameTaken.length !== 0)
    throw new apiError(
      HttpStatus.CONFLICT,
      "Username conflict",
      usernameConflictMessage
    );

  // Hashing
  const hashedPass = await generatePassHash(pass);

  // const hashedPassComapare = becrypt.compare(
  //   registerInputs.data.password,
  //   pass
  // );

  // console.log(hashedPassComapare);

  // Creating user
  const createUser = await db
    .insert(userRelation)
    .values({ username, password: hashedPass })
    .returning({
      id: userRelation.id,
      username: userRelation.username,
      email: userRelation.email,
      displayPicture: userRelation.displayPicture,
      createdAt: userRelation.createdAt,
      updatedAt: userRelation.updatedAt,
    });

  // console.log(createUser);

  res
    .status(HttpStatus.OK)
    .json(new apiResponse(HttpStatus.OK, createUser, userCreatedSuccesfully));
});

export { getAllUsers, register };
