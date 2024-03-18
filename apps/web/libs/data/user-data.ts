import { env } from "process";
import { ExposedUserTypes } from "@chat/types/schema";

export const getAllUsers = async () => {
  const response = await fetch(`${env.CONNECT_URL}/api/users`);
  const res = await response.json();
  const payload: ExposedUserTypes = res.data[0];

  return payload;
};
