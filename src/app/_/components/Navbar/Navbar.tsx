"use client"
import React, { useContext } from 'react'
import { Button, DarkThemeToggle, Navbar as Nav, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import image from "../../../../../public/freshcart-logo.svg";
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { cartContext } from '@/context/cartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const context = useContext(cartContext)
  if (!context) throw new Error
  const { numberOfCartItem } = context
  const { data: session } = useSession()

  function logout() {
    signOut({ callbackUrl: "/login" })
  }
  return (
    <>
      <Nav className='dark:bg-neutral-900 '>
        <div className="flex items-center justify-between w-full">

          <div className="flex gap-6">
            <Link href="/wishlist">
              <i className="fa-solid fa-heart text-2xl text-gray-500 hover:text-red-500 cursor-pointer"></i>
            </Link>

            <div className="flex flex-wrap items-center gap-6">
              <NavbarBrand>
                <div>
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    <Image src={image} alt='logo' className='mr-3 ' />
                  </span>

                </div>
              </NavbarBrand>
            </div>
            <div >

              <NavbarCollapse >

                <NavbarLink as={Link} href="/" className="custom-hover"> Home</NavbarLink>
                {session && <NavbarLink as={Link} href="/cart" className='relative custom-hover' >Cart
                  {numberOfCartItem > 0 && <span className='absolute top-[-9px] end-[-9px] size-4  
       rounded-full bg-neutral-700 dark:bg-neutral-300 text-white flex justify-center
        items-center dark:text-black'>
                    {numberOfCartItem}</span>}
                </NavbarLink>}
                <NavbarLink as={Link} href="/products" className="custom-hover">Products</NavbarLink>
                <NavbarLink as={Link} href="/categories" className="custom-hover">Categories</NavbarLink>
                <NavbarLink as={Link} href="/brands" className="custom-hover">Brands</NavbarLink>
              </NavbarCollapse>
            </div>
            <NavbarToggle />
          </div>

          <div className='flex items-center gap-2'>
            <ul className='flex items-center gap-4'>
              {!session ? <>
                <div className="hidden lg:flex items-center gap-2">
                  <li><i className="fa-brands fa-instagram"></i></li>
                  <li><i className="fa-brands fa-facebook"></i></li>
                  <li><i className="fa-brands fa-tiktok"></i></li>
                  <li><i className="fa-brands fa-twitter"></i></li>
                  <li><i className="fa-brands fa-linkedin"></i></li>
                  <li><i className="fa-brands fa-youtube"></i></li>
                </div>
                <div className="flex gap-3 text-sm">
                  <Link href="/register" className="custom-hover">Register</Link>
                  <Link href="/login" className="custom-hover">Login</Link>
                </div>

              </> : <>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 "
                    >
                      <i className="fa-solid fa-user rounded-full text-black dark:text-white 
                    bg-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 "></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>
                      Hi, {session?.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/changePassword">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/address">Address</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Signout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>
              }
            </ul>
            <DarkThemeToggle />
          </div>
        </div>
      </Nav>

    </>
  )
}