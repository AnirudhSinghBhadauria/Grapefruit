import React from "react";
import { trpc } from "@chat/trpc/client";

const Home = async () => {
  const users = await trpc.Users.petUsers.query();


  return (
    users.map(({fullName, phone, lastName, petName}) => (
      <div>
        <span>{fullName}</span>
        <span>{petName}</span>
        <span>{lastName}</span>
        <span>{phone}</span>
      </div>
    )
  ))
};

export default Home;
