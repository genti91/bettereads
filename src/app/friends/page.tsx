import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import AddFriends from "@/components/AddFriends";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import FollowBackButton from "@/components/FollowBackButton";

interface Follow {
    followerId: string;
    followingId: string;
};

interface Follower extends Follow {
    follower: User;
}

interface Following extends Follow {
    following: User;
}


async function getFollowers(id: string) {
    try {
        const res = await fetch(`${process.env.APP_URL}/api/followers/${id}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getFollowing(id: string) {
    try {
        const res = await fetch(`${process.env.APP_URL}/api/following/${id}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Friends() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>You need to be logged in to see this page</p>
            </div>
        )
    }
    const followers: Follower[] = await getFollowers(session.user.id);
    const following: Following[] = await getFollowing(session.user.id);

  return (
    <div className="grid xl:px-80 px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex lg:gap-14 gap-10">
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Friends you follow</h1>
            <div className="flex flex-col gap-4">
                <Separator/>
                {following.length === 0 && <p>You don't follow anyone yet</p>}
                {following.map(({following}) => (
                    <>
                        <div className="flex items-center gap-4">
                            <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                <AvatarImage src={following.picture ?? ""}/>
                                <AvatarFallback>{following.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                            <h2>{following.name}</h2>
                            <p className="text-sm text-gray-6s00">@{following.username}</p>
                            </div>
                        </div>
                        <Separator/>
                    </>
                ))}
            </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Peopel that follow you</h1>
            <div className="flex flex-col gap-4">
                <Separator/>
                {followers.length === 0 && <p>You don't have any followers yet</p>}
                {followers.map(({follower, followerId}) => (
                    <>
                        <div className="flex items-center gap-4">
                            <Avatar className="bg-slate-200 items-center justify-center hover:bg-slate-100">
                                <AvatarImage src={follower.picture ?? ""}/>
                                <AvatarFallback>{follower.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2>{follower.name}</h2>
                                {following.some(({followingId}) => followingId === followerId) ? 
                                    <p className="text-sm text-gray-6s00">@{follower.username}</p>
                                    :
                                    <FollowBackButton userId={session.user.id} followerId={followerId}/>
                                }
                            </div>
                        </div>
                        <Separator/>
                    </>
                ))}
            </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">Search for new friends</h1>
            <AddFriends following={following} userId={session.user.id}/>
        </div>
      </div>
    </div>
  );
}
