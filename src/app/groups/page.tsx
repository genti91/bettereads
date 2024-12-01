import { CreateGroup } from "@/components/CreateGroup";
import Discussions from "@/components/sections/Discussions";
import GroupSettings from "@/components/sections/GroupSettings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Group } from "@prisma/client";
import Discussion from "@/components/sections/Discussion";

async function getGroups(userId: string) {
    const response = await fetch(`${process.env.APP_URL}/api/groups?userId=${userId}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error("An error occurred while fetching the groups");
}

async function getGroup(groupId: string) {
    const response = await fetch(`${process.env.APP_URL}/api/groups/${groupId}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error("An error occurred while fetching the group");
}

async function getDiscussions(discussionId: string) {
    const response = await fetch(`${process.env.APP_URL}/api/discussions/${discussionId}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error("An error occurred while fetching the discussions");
}

export default async function GroupsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div className="flex justify-center items-center h-[50vh]">You need to be signed in to view this page</div>
    }
    let groups;
    try {
        groups = await getGroups(session.user.id);
    } catch (error) {
        return <div className="flex justify-center items-center h-[50vh]">An error occurred while fetching the groups</div>
    }
    const selectedGroup = groups.find((group: Group) => group.id === searchParams["group"]) ?? groups[0];
    let group;
    if (selectedGroup) {
        try {
            group = await getGroup(selectedGroup.id);
        } catch (error) {
            return <div className="flex justify-center items-center h-[50vh]">An error occurred while fetching the group</div>
        }
    }
    let discussion;
    if (searchParams["discussion"] != "") {
        try {
            discussion = await getDiscussions(searchParams["discussion"] as string);
        } catch (error) {
            return <div className="flex justify-center items-center h-[50vh]">An error occurred while fetching the discussion</div>
        }
    }

    return (
        <div className="flex px-10 py-10 justify-items-center sm:px-20 sm:py-10 font-[family-name:var(--font-geist-sans)]">
            <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Groups</h1>
                    <div className="flex flex-col gap-1">
                    {groups.map((group: Group) => (
                        <Link href={{query: {group: group.id}}} className="text-nowrap">
                            {group.name}
                        </Link>
                    ))}
                    <Separator className="mb-2"/>
                    <CreateGroup userId={session.user.id}/>
                    </div>
                </div>
                <Separator orientation="vertical" />
                {!discussion ?
                    <>
                        {groups.length > 0 ? 
                            <>
                                <Discussions group={group} userId={session.user.id} />
                                <Separator orientation="vertical" />
                                <GroupSettings group={group} userId={session.user.id}/>
                            </>
                            :
                            <div className="flex flex-col gap-2 justify-center">
                                <h1 className="text-xl">No groups found</h1>
                            </div>
                        }
                    </>
                    :
                    <Discussion discussion={discussion} group={group} userId={session.user.id}/>
                }
            </div>
        </div> 
    )
}