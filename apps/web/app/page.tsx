import React from "react";
import { trpc } from "@chat/trpc/client";

const Home = async () => {
  const users = await trpc.Users.petUsers.query();
  console.log(JSON.stringify(users));

  return <div></div>;
};

export default Home;
