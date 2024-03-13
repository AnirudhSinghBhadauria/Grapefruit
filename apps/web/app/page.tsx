import React from "react";
import { UserPets } from "@chat/types";
import { env } from "node:process";

const Home = async () => {
  const results = await fetch(env.CONNECT_URL!);
  const res: UserPets = await results.json();

  if (UserPets.parse(res)) {
    console.log("Its the right type!");
  }

  return res.map(({ fullName, lastName, petName, phone }) => {
    return (
      <div>
        <span>{fullName}</span> &nbsp;
        <span>{lastName}</span>&nbsp;
        <span>{phone}</span>&nbsp;
        <span>{petName}</span>
      </div>
    );
  });
};

export default Home;
