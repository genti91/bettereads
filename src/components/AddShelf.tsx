"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function AddShelf() {
    const [addShelf, setAddShelf] = useState(false);
  return (
    <>
        {!addShelf ? 
            <Button className="h-7" onClick={() => setAddShelf(true)} >Add Shelf</Button>
        :
            <div className="flex gap-1">
                <Input placeholder="Shelf" className="h-7 w-20"/>
                <Button className="h-7" onClick={() => setAddShelf(false)} >Add</Button>
            </div>
        }
    </>
  );
}
