import React from 'react'
import { Spinner } from "flowbite-react";

export default function loading() {
  return (
    <>
     <div className="text-center mt-36">
        <Spinner aria-label="Center-aligned spinner example Extra large"  size="xl" />
      </div>
    </>
  )
}
