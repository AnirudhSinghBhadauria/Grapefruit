"use client";

import { trpcClient } from "@chat/trpc/client";
import React from "react";
import Link from "next/link";

const User = () => {
  const { data, isLoading } = trpcClient.Users.userInfo.useQuery();
  return (
    <div>
      <div>{isLoading ? "loading..." : data!.email}</div>
      <br />
      <Link style={{textDecoration: "none"}} href="/">Home</Link>
    </div>
  );
};

export default User;
