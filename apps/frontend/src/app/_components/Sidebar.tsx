"use client"

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const menuItems = [
    {
        id: 1,
        name: "Systems",
        subitems: [
            {
                id: 11,
                name: "System Code",
            },
            {
                id: 12,
                name: "Properties",
            },
            {
                id: 13,
                name: "Menus",
                link: "/menus"
            },
            {
                id: 14,
                name: "API list"
            }
        ]
    },
    {
        id: 2,
        name: "Users & Groups",
    },
    {
        id: 3,
        name: "Competetion",
    }
]


const Sidebar = ()=> {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const pathname = usePathname();

    return (
        <aside className="w-2/12 m-4 bg-[#0e1528] text-white flex flex-col rounded-3xl">
            <div className="p-5 flex">
                <div className="w-11/12">
                    <Image src="/cloit-logo.svg" alt="logo" width="77" height="20" />
                </div>
                <div className="w-1/12">
                    <button>
                        <span className="material-symbols-outlined">menu_open</span>
                    </button>
                </div>
            </div>
            <ul className="text-gray-500 text-md font-semibold">
                {
                    menuItems.map((item) => {
                        return <Item key={item.id} item={item}
                                     isOpen={openIndex === item.id}
                                     toggler={handleToggle}
                                     pathname={pathname}
                            />;
                    })
                }
            </ul>
        </aside>
    )
};


const Item = (props: any) => {
    const hasSubItems = props.item.subitems && props.item.subitems.length > 0;
    const hasActiveChild = props.item.subitems?.some(
        (si: any) => props.pathname === si.link
    );

    const isActive = hasActiveChild || props.isOpen;

    return (
        <li className={'mt-3 mx-3 flex flex-col rounded-3xl ' + (isActive? 'bg-[#1b2237]': 'hover:bg-[#1b2237')}>
            <button className={'flex p-4 ' + (isActive? 'text-white' : '')}
                    onClick={() => props.toggler(props.item.id)}>
                <span className={"material-symbols-rounded w-2/12 mr-2 " + ((hasActiveChild || props.isOpen)? '' : 'material-filled')}>
                    {'folder' + (props.isOpen? '_open' : '') }
                </span>
                <span className='w-10/12 text-left'>{props.item.name}</span>
            </button>
            { isActive && hasSubItems && (
                <ul>
                    {props.item.subitems.map(
                        (item:any) => <Subitem key={item.id} item={item} pathname={props.pathname} />
                    )}
                </ul>
            )}
        </li>
    )
}

const Subitem = (props: any) => {
    const isActive = props.item.link === props.pathname
    return (
        <Link href={props.item.link || '#'} className={'flex rounded-3xl p-4 ' + (isActive? 'bg-lime-500 text-black' : '')}>
            <span className={"material-symbols-outlined w-2/12 mr-2 " + (isActive ? 'material-filled' : '')}>
                    {'browse'}
            </span>
            <span className='w-10/12'>{props.item.name}</span>
        </Link>
    )
}

export default Sidebar;