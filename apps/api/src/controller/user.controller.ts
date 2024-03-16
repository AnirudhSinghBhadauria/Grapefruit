import { asyncHandler } from "../utils/async-handeler.js";
import { apiResponse } from "../utils/api-response.js";
import { userRelation, db, eq } from "@chat/drizzle";
import { LoginRegisterInputs, UserInfoTypes } from "@chat/types/schema";
import { HttpStatus } from "../libs/http-codes.js";
import { apiError } from "../utils/api-error.js";
import { Request, Response } from "express";
import becrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import {
  invalidCredentialsMessage,
  invalidLoginCredentialsMessage,
  loggedinSuccesMessage,
  passwordIncorrectMessage,
  tokenGenerationErrorMessage,
  userAlreadyExistsMessage,
  userCreatedSuccesfully,
  userDoesNotExistmessage,
  usernameConflictMessage,
} from "../libs/error-messages/user.error.js";
import { cookieOptions } from "../constant.js";

// Generate pass hash
const generatePassHash = async (value: string) => await becrypt.hash(value, 10);

// Validating Pass
const isPassCorrect = async (pass: string, hashedPass: string) => {
  const decodedPass = await becrypt.compare(pass, hashedPass);
  return decodedPass;
};

// Generate Access / Refersh token
const generateRefreshAccessToken = async (userId: string) => {
  const user = await db
    .select({
      id: userRelation.id,
      username: userRelation.username,
    })
    .from(userRelation)
    .where(eq(userRelation.id, userId));

  const userInfo = user[0];

  const accessToken = await generateAccessToken(userInfo);
  const refreshToken = await generateRefreshToken(userInfo.id);

  if (!accessToken || !refreshToken)
    throw new apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Token generation failed",
      tokenGenerationErrorMessage
    );

  return { accessToken, refreshToken };
};

const generateAccessToken = async (userInfo: UserInfoTypes) => {
  return jwt.sign(userInfo, env.ACCESS_TOKEN_SECRET!, {
    expiresIn: env.ACCESS_TOKEN_EXPIRATION_TIME!,
  });
};

const generateRefreshToken = async (userId: string) => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET!, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION_TIME!,
  });
};

// Users controllers
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
  const registerInputs = LoginRegisterInputs.safeParse(req.body);

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

// Login controller
const login = asyncHandler(async (req: Request, res: Response) => {
  // Sanitization
  const loginInputs = LoginRegisterInputs.safeParse(req.body);

  if (!loginInputs.success) {
    throw new apiError(
      HttpStatus.BAD_REQUEST,
      loginInputs.error,
      invalidLoginCredentialsMessage
    );
  }

  // Trimming
  const username = loginInputs.data.username.split(" ").join("");
  const pass = loginInputs.data.password.split(" ").join("");

  // console.log(username);

  // Finding user
  const user = await db
    .select({
      id: userRelation.id,
      password: userRelation.password,
      username: userRelation.username,
    })
    .from(userRelation)
    .where(eq(userRelation.username, username))
    .limit(1);

  // const user = await db.query.userRelation.findFirst({
  //   where: (userRelation, { eq }) => eq(userRelation.username, username),
  // });

  // console.log(user);

  if (user.length === 0) {
    throw new apiError(
      HttpStatus.UNAUTHORIZED,
      "User does not exist",
      userDoesNotExistmessage
    );
  }

  const userId = user[0].id;
  const hashedPass = user[0].password;
  // console.log(userId);

  // Check ifPassword correct
  const userVerified = await isPassCorrect(pass, hashedPass);

  if (!userVerified)
    throw new apiError(
      HttpStatus.UNAUTHORIZED,
      "Password Incorrect",
      passwordIncorrectMessage
    );

  // console.log(userVerified);

  // Generate Refresh and Access token
  const { accessToken, refreshToken } =
    await generateRefreshAccessToken(userId);

  if (!accessToken || !refreshToken)
    throw new apiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Token generation failed",
      tokenGenerationErrorMessage
    );

  // Saving refresh token
  const updateUser = await db
    .update(userRelation)
    .set({ refreshToken, updatedAt: new Date().toISOString() })
    .where(eq(userRelation.username, username));

  res
    .status(HttpStatus.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new apiResponse(
        HttpStatus.OK,
        {
          loggedinUser: user[0],
          accessToken,
          refreshToken,
          message: "Logged in succesfully",
        },
        loggedinSuccesMessage
      )
    );
});

export { getAllUsers, register, login };
