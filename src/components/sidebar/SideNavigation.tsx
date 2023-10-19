'use client';
import React from 'react';
import {navlinks} from './navlinks';
import Link from 'next/link';
import {AiOutlineDashboard} from 'react-icons/ai';
import {usePathname} from 'next/navigation';

const SideNavigation = ({opened}: any) => {
    const pathname = usePathname();

    const getIcon = (icone: any) => {
        switch (icone) {
            case 'Dashboard':
                return <AiOutlineDashboard size={20} />;
        }
    };

    return (
        <div>
            <ul className="flex flex-col">
                {navlinks.map((link: any, ldx: number) => (
                    <li key={ldx} className="list-item">
                        <Link
                            className={`flex items-center h-10 px-2.5 gap-x-3 transition-colors rounded ${
                                pathname === link.path
                                    ? 'bg-blue-middle text-white'
                                    : 'text-white'
                            } `}
                            href={link.path}
                            title={link.title}
                        >
                            <span className="block float-left">
                                {getIcon(link.label)}
                            </span>
                            <span
                                className={`duration-300  ${
                                    !opened && 'hidden'
                                }`}
                            >
                                {link.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideNavigation;
