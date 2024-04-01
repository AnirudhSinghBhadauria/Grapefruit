import Link from "next/link";

const Home = async () => {
  return (
    <button className="px-6 py-2 border-[2px] border-white rounded-md">
      <Link href="/users">Users</Link>
    </button>
  );
};

export default Home;
