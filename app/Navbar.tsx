"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];
const Navbar = () => {
  const currentPath = usePathname();
  return (
    <nav className="flex p-6 border-b border-b-zinc-400 space-x-6 items-center">
      <Link href="/">
        <AiFillBug className="w-6 h-6" />
      </Link>
      <ul className="flex space-x-4 ">
        {links.map((link, index) => (
          <li
            className={classNames({
              "text-zinc-900 ": currentPath === link.href,
              "text-zinc-500 ": currentPath !== link.href,
              "hover:text-zinc-700 transition-colors": true,
            })}
            key={index}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
