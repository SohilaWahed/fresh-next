"use client";
import React, { useState } from "react";
import AddToWishlist from "@/wshlistAction/addTowishlist.action";
import RemoveItemFromWishlist from "@/wshlistAction/removewishlist.action";
import { toast } from "sonner";

export default function Addwishlist({ id }: { id: string }) {
  const [isInWishlist, setIsInWishlist] = useState(false);


  async function checkAddProduct(id: string) {
    try {
      if (isInWishlist) {
        const res = await RemoveItemFromWishlist(id);
        if (res.status === "success") {
          setIsInWishlist(false);
          toast.success("Product removed from Wishlist", {
            position: "top-center",
          });
        }
      } else {
        const res = await AddToWishlist(id);
        if (res.status === "success") {
          setIsInWishlist(true);
          toast.success("Product added to Wishlist", {
            position: "top-center",
          });
        }
      }
    } catch (err:unknown) {
      if(err instanceof Error){
        return
    } 
      toast.error("Something went wrong");
    }
  }

  return (
    <span onClick={() => checkAddProduct(id)} className="cursor-pointer">
      <i
        className={`fa-solid fa-heart text-2xl ${
          isInWishlist ? "text-red-500" : "text-gray-500"
        }`}
      ></i>
    </span>
  );
}
