import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export function StarRating({ setValue, defaultValue, trigger }: { setValue: any, defaultValue?: number, trigger?: any }) {
    const [rating, setRating] = useState(defaultValue ?? 0);
    const [selected, setSelected] = useState(defaultValue ?? 0);

    function resetRating() {
        setRating(selected);
    }

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
                <div 
                    key={i} 
                    className="pr-3"
                    onMouseEnter={() => setRating(i)}
                    onMouseLeave={resetRating}
                >
                    <StarIcon
                        className={(rating >= i ? "text-yellow-500 fill-yellow-500" : "") + " cursor-pointer"}
                        onClick={() => {
                            setSelected(i);
                            setValue("rating", i);
                            trigger  && trigger("rating");
                        }}
                    />
                </div>
            ))}
        </div>
    )
}