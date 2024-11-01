import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export function StarRating({ setValue }: { setValue: any }) {
    const [rating, setRating] = useState(0);
    const [selected, setSelected] = useState(0);

    function resetRating() {
        setRating(selected);
    }

    return (
        <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                    className={(rating >= i ? "text-yellow-500 fill-yellow-500" : "") + " cursor-pointer"}
                    onMouseEnter={() => setRating(i)}
                    onMouseLeave={resetRating}
                    onClick={() => {
                        setSelected(i);
                        setValue("rating", i);
                    }}
                />
            ))}
        </div>
    )
}