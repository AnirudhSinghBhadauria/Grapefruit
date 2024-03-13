import React from "react";
import { trpc } from "@chat/trpc/client";
import Link from "next/link";

const Home = async () => {
  const users = await trpc.Users.petUsers.query();
  // const userInfo = await trpc.Users.userInfo.query();

  // console.log(userInfo);

  return (
    <div>
      {users.map(({ fullName, lastName, petName, phone }) => (
        <div>
          <span key={1}>{fullName}</span>
          <span key={2}>{lastName}</span>
          <span key={3}>{petName}</span>
          <span key={4}>{phone}</span>
        </div>
      ))}
      <br />
      <Link style={{textDecoration: "none"}} href="/user">User</Link>
    </div>
  );
};

export default Home;
