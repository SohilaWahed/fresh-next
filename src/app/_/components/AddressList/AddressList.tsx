"use client"
import React, { useEffect, useState } from "react"
import { getUserAddresses } from "@/AddressActions/AllAddresses "
import { toast } from "sonner"
import { AddressDisplayType } from "@/types/address.type";

type AddressListProps = {
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
};

export default function AddressList({ selectedAddress, setSelectedAddress }: AddressListProps) {
  const [addresses, setAddresses] = useState<AddressDisplayType[]>([])

  async function allAddresses() {
    try {
      const res = await getUserAddresses()
      setAddresses(
        res.data.filter(
          (address: AddressDisplayType) =>
            address.name && address.city && address.phone && address.details
        )
      )
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch addresses", { position: "top-center" })
    }
  }

  useEffect(() => {
    allAddresses()
  }, [])

  return (
    <div className="my-6">
      <h2 className="font-bold mb-2">Select Address:</h2>
      {addresses.length === 0 ? (
        <p className="text-red-600">No addresses found. Please add one first.</p>
      ) : (
        addresses.map((address) => (
          <label key={address._id} className="flex items-center gap-2 border p-2 rounded mb-2 cursor-pointer">
            <input
              type="radio"
              name="address"
              value={address._id}
              checked={selectedAddress === address._id}
              onChange={() => setSelectedAddress(address._id)}
            />
            <div>
              <p><b>{address.name}</b></p>
              <p>{address.city}, {address.details}</p>
              <p>{address.phone}</p>
            </div>
          </label>
        ))
      )}
    </div>
  )
}