import Image from "next/image";
import { getAllUsers } from "../libs/data/user-data";

const Home = async () => {
  const { username, displayPicture, createdAt, email } = await getAllUsers();

  // console.log(user)

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
      <p>{email}</p>
    </div>
  );
};

export default Home;
