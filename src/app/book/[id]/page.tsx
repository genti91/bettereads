import Books from "@/components/sections/Books";

async function getBook(id:string) {
    console.log(id);
    const response = await fetch(
        `${process.env.APP_URL}/api/books/${id}`,
        { cache: "no-store" }
    );
    return response.json();
}

export default async function Book({ params }: { params: { id: string } }) {
    const book = await getBook(params.id);
    if (!book) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-3xl">Book not found</h1>
            </div>
        );
    }
  return (
    <div className="container flex gap-9 px-20 py-14">
      <img src={book.imageUrl} alt={book.title} className="h-80" />
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{book.title}</h2>
        <p className="text-2xl">{book.author}</p>
        <p className="text-lg">{book.description}</p>
      </div>
    </div>
  );
}
