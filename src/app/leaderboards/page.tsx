import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


export default function LeaderboardsPage() {
    const top_reviewers = [
        {
          username: "1",
          paymentStatus: "Paid",
          amount_reviews: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          username: "INV002",
          paymentStatus: "Pending",
          amount_reviews: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          username: "INV003",
          paymentStatus: "Unpaid",
          amount_reviews: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        {
          username: "INV004",
          paymentStatus: "Paid",
          amount_reviews: "$450.00",
          paymentMethod: "Credit Card",
        },
        {
          username: "INV005",
          paymentStatus: "Paid",
          amount_reviews: "$550.00",
          paymentMethod: "PayPal",
        },
        {
          username: "INV006",
          paymentStatus: "Pending",
          amount_reviews: "$200.00",
          paymentMethod: "Bank Transfer",
        },
        {
          username: "INV007",
          paymentStatus: "Unpaid",
          amount_reviews: "$300.00",
          paymentMethod: "Credit Card",
        },
      ] 
    
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
                            <TableCell>{reviewer.amount_reviews}</TableCell>
                        </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </div>
        </div>
        
    )
}