'use client'
import React from 'react'
import { navlinks } from "./navlinks"
import Link from "next/link"
import { AiOutlineDashboard } from 'react-icons/ai';
import { usePathname } from "next/navigation";

const SideNavigation = () => {
  const pathname = usePathname();

  const getIcon = (icone: any) => {
    switch (icone) {
      case 'Dashboard': return <AiOutlineDashboard size={18} />;
    }
  }

  return (
    <div>
      <ul className="flex flex-col">
        {navlinks.map((link: any, ldx: number) => (
          <li
            key={ldx}
            className="list-item"
          >
            <Link
              className={`flex items-center py-2 px-4  transition-colors gap-3 rounded ${pathname === link.path ? 'bg-blue-500 text-white' : ''}`}
              href={link.path}
              title={link.title}
            >
              <span>{getIcon(link.label)}</span> <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideNavigation