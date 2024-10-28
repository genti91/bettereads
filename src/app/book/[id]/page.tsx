import Reviews from "@/components/Reviews";
import Books from "@/components/sections/Books";

async function getBook(id: string) {
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
    <div className="container flex flex-col gap-9 px-20 py-14">
      <div className="flex gap-9">
        <img src={book.imageUrl} alt={book.title} className="h-80" />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-2xl">{book.author}</p>
          <p className="text-lg">{book.description}</p>
          <p className="text-lg">{"Page Amount: " + book.pageAmount}</p>
          <p className="text-lg">{"Editorial: "+book.editorial}</p>
          <div className="flex gap-2">
            <p className="text-lg">{"Genres: "}</p>
            {book.genres.map((genre: string ) => (
              <span key={genre} className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Reviews reviews={book.reviews} bookId={params.id}/>
    </div>
  );
}
