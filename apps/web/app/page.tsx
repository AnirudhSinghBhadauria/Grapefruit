import React from "react";
import { trpc } from "@chat/trpc/client";

const Home = async () => {
  const users = await trpc.Users.petUsers.query();

  console.log(users);

  return <div>anirudh</div>;
};

export default Home;
