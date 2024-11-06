import { StarRating } from "./StarRating";
import { Label } from "./ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function RatingFilter({oldValue}: {oldValue: number}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleChange (value: number) {
        const params = new URLSearchParams(searchParams);
        if (value > 0) {
            params.set("rating_filter", value.toString());
            params.delete("page");
        } else {
            params.delete("rating_filter");
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex flex-col gap-3">
            <Label className="text-slate-700">Filter by rating:</Label>
            <div className="">
                <StarRating defaultValue={oldValue} centered onClick={handleChange} sizeSmall />
            </div>
        </div>
    )
}