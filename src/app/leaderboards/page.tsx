import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

type TopUser = {
  username: string;
  amountReview: number;
};

async function getTopUsersByAmountReviews(){
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/leaderboards/topUsersByAmountReviews`,
      { cache: "no-store" }
    );
    
    const top_reviewers = await response.json();
    
    return top_reviewers;
  } catch (error) {
    console.error(error)
    throw new Error("Error fetching user data")
  }
}

export default async function LeaderboardsPage() {
    let top_reviewers: TopUser[] = [];
    try {
      top_reviewers = await getTopUsersByAmountReviews();
    } catch (error) {
      console.error("Failed to fetch top reviewers:", error);
      top_reviewers = [];
    }
    
    return (
        <div className="flex justify-center flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 max-w-md">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell colSpan={3} className="text-xl font-semi-bold text-center">
                            Top Reviewers
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Ranking</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Amount of reviews</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    top_reviewers.map((reviewer, index) => (
                        <TableRow key={reviewer.username}>
                            <TableCell className="font-medium">{index + 1}.</TableCell>
                            <TableCell>{reviewer.username}</TableCell>
                            <TableCell>{reviewer.amountReview}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </div>
        </div>
        
    )
}