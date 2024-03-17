import { Request } from "express";

// Cookie options
export const cookieOptions = { httpOnly: true, secure: true };

// Custom Request
export interface CustomRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
    displayPicture: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
}