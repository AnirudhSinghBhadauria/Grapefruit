import React from "react";

interface UserInfo {
  fullName: string;
  lastName: string;
  phone: number;
  petName: string;
}

const Home = async () => {
  const results = await fetch("http://localhost:8080");
  const res = await results.json();

  return res.map(
    ({
      fullName,
      lastName,
      phone,
      petName,
    }: UserInfo) => {
      return (
        <div>
          <span>{fullName}</span> &nbsp;
          <span>{lastName}</span>&nbsp;
          <span>{phone}</span>&nbsp;
          <span>{petName}</span>
        </div>
      );
    }
  );
};

export default Home;
