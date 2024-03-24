import React from "react";
import Image from "next/image";

import { getAllUsers } from "../../libs/data/user-data";

const Users = async () => {
  const { displayPicture, username, createdAt } = await getAllUsers();
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <Image
        src={displayPicture}
        alt="dp"
        width={100}
        height={100}
        className="max-w-11 max-h-11 p-[2px] rounded-full border-white border-2 absolute top-6 right-6"
      />
      <p>{username}</p>
      <p>{createdAt}</p>
    </div>
  );
};

export default Users;
