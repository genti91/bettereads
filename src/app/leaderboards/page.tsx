import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Book } from "@prisma/client";
import Link from "next/link";

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

async function getTopBooks(){
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/leaderboards/topBooks`,
      { cache: "no-store" }
    );
    
    return await response.json();

  } catch (error) {
    console.error(error)
    throw new Error("Error fetching book data")
  }
}

export default async function LeaderboardsPage() {
    let top_reviewers: TopUser[] = [];
    let top_books: Book[] = [];
    try {
      top_reviewers = await getTopUsersByAmountReviews();
    } catch (error) {
      console.error("Failed to fetch top reviewers:", error);
      top_reviewers = [];
    }
    try {
      top_books = await getTopBooks();
    } catch (error) {
      console.error("Failed to fetch top books:", error);
      top_books = [];
    }
    
    return (
        <div className="flex justify-center flex-col lg:flex-row items-center gap-20 pt-14 container">
            <Table className="text-center">
                <TableHeader>
                    <TableRow>
                        <TableCell colSpan={3} className="text-xl font-semi-bold text-center">
                            Top Reviewers
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center">Ranking</TableHead>
                        <TableHead className="text-center">Username</TableHead>
                        <TableHead className="text-center">Amount of reviews</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    top_reviewers.map((reviewer, index) => (
                      <TableRow key={reviewer.username}>
                            
                              <TableCell className="font-medium">{index + 1}.</TableCell>
                              <TableCell><Link href={`/profile/${reviewer.username}`}>{reviewer.username}</Link></TableCell>
                              <TableCell >{reviewer.amountReview}</TableCell>
                          </TableRow>
                      ))
                    }
                </TableBody>
            </Table>
            <Table className="text-center">
                <TableHeader>
                    <TableRow>
                        <TableCell colSpan={3} className="text-xl font-semi-bold text-center">
                            Top Books
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center">Ranking</TableHead>
                        <TableHead className="text-center">Title</TableHead>
                        <TableHead className="text-center">Author</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                    top_books.map((book, index) => (
                        <TableRow key={book.id}>
                            <TableCell className="font-medium">{index + 1}.</TableCell>
                            <TableCell><Link href={`/book/${book.id}`}>{book.title}</Link></TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.rating % 1 === 0 ? book.rating.toFixed(0) : book.rating.toFixed(1)}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
        
    )
}