import React from "react";
import { User } from "@chat/drizzle";

const Home = async () => {
  const results = await fetch("http://localhost:8080");
  const res = await results.json();

  return res.map(({ firstName, lastName, phone }: User) => {
    return (
      <div>
        <p>
          {firstName} {lastName} - {phone}
        </p>
      </div>
    );
  });
};

export default Home;
