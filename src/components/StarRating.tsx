import { StarIcon } from "lucide-react";
import { useState } from "react";

export function StarRating({ onClick, defaultValue, sizeSmall, centered }: { onClick: (n:number) => void, defaultValue?: number, sizeSmall?: boolean, centered?: boolean }) {
    const [rating, setRating] = useState(defaultValue ?? 0);
    const [selected, setSelected] = useState(defaultValue ?? 0);

    function resetRating() {
        setRating(selected);
    }

    function smallClass(isHovered: boolean) {
        return (sizeSmall) ? ` ${!isHovered&&'text-slate-600'} h-6 w-6` : "";
    }

    return (
        <div className={"flex" + (centered ? " justify-center" : "")}>
            {[1, 2, 3, 4, 5].map((i) => (
                <div 
                    key={i} 
                    className={sizeSmall ? "pr-2" : "pr-3"}
                    onMouseEnter={() => setRating(i)}
                    onMouseLeave={resetRating}
                >
                    <StarIcon
                        className={(rating >= i ? "text-yellow-500 fill-yellow-500" : "") + " cursor-pointer" + smallClass(rating >= i)}
                        onClick={() => {
                            if (sizeSmall && selected === i) {
                                setSelected(0);
                                onClick(0);
                            } else {
                                setSelected(i);
                                onClick(i);
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    )
}