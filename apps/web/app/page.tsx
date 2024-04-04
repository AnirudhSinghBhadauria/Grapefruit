import Link from "next/link";

const Home = async () => {
  return (
    <button className="px-6 py-2 border-[2px] border-white rounded-md">
      <Link href="/users">Users</Link>
      anirudh singh bhadauria
    </button>
  );
};

export default Home;
