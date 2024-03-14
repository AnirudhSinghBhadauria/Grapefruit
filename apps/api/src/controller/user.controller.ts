import { Request, Response } from "express";
import { userRelation, db, eq } from "@chat/drizzle";
import { apiError } from "../utils/api-error.js";
import { apiResponse } from "../utils/api-response.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { email, username, displayPicture, createdAt } = userRelation;

    const result = await db
      .select({
        email,
        username,
        displayPicture,
        createdAt,
      })
      .from(userRelation)
      .where(eq(username, "liecheatsteal"));

    res
      .status(200)
      .json(new apiResponse(200, result, "All users extracted successfully!"));
  } catch (error) {
    res.status(401).json(new apiError(200, error));
  }
};

// const register = async (req: Request, res: Response) {

// }

export { getAllUsers };
