import Link from 'next/link';

export default function LeaderBoards() {
  return (
    <Link href="/leaderboards">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border-none rounded-none ">
            Leaderboards
        </button>
    </Link>
  );
}