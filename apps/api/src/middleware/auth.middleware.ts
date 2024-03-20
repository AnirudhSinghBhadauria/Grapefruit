import { db, eq, userRelation } from "@chat/drizzle";
import { userAuthenticationFailed } from "../libs/error-messages/user.error.js";
import { HttpStatus } from "../libs/http-codes.js";
import { apiError } from "../utils/api-error.js";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { CustomRequest } from "../constant.js";

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    // Headers for any application
    const token =
      req.cookies?.accessToken || req.header("Authorization")!.split(" ")[0];

    if (!token)
      throw new apiError(
        HttpStatus.UNAUTHORIZED,
        "Authentication failed",
        userAuthenticationFailed,
      );

    // console.log("Token exists");

    const decodedToken: any = jwt.verify(token, env.ACCESS_TOKEN_SECRET!);

    // decodedToken Type
    // type DecodedToken = {
    //   id: string;
    //   username: string;
    //   iat: number;
    //   exp: number;
    // };

    if (!decodedToken)
      throw new apiError(
        HttpStatus.UNAUTHORIZED,
        "Authentication failed",
        userAuthenticationFailed,
      );

    // console.log(decodedToken);

    const userId = decodedToken?.id;

    const user = await db
      .select({
        id: userRelation.id,
        username: userRelation.id,
        email: userRelation.id,
        displayPicture: userRelation.displayPicture,
        createdAt: userRelation.createdAt,
        updatedAt: userRelation.updatedAt,
      })
      .from(userRelation)
      .where(eq(userRelation.id, userId))
      .limit(1);

    if (!user)
      throw new apiError(
        HttpStatus.UNAUTHORIZED,
        "Authentication failed",
        userAuthenticationFailed,
      );

    // console.log(user);

    const loggedInUser = user[0];

    req.user = loggedInUser;

    next();
  } catch (error) {
    throw new apiError(
      HttpStatus.UNAUTHORIZED,
      "Authentication failed",
      userAuthenticationFailed,
    );
  }
};

export { auth };
