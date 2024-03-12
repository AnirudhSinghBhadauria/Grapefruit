import React from "react";
import { trpc } from "@chat/trpc/client";

const Home = async () => {
  const users = await trpc.Users.petUsers.query();

  return users.map(({ fullName, lastName, phone, petName }) => (
    <div>
      <span>{fullName}</span>
      <span>{lastName}</span>
      <span>{phone}</span>
      <span>{petName}</span>
    </div>
  ));
};

export default Home;
