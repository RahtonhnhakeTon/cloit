"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import { toggle, close } from '@/app/_slices/sidebar.slice';
import { useAppDispatch, useAppSelector } from '@/app/_utils/hooks';

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
    const isOpen = useAppSelector((state) => state.sidebar.isOpen);
    const dispatch = useAppDispatch();

    if (typeof window !== "undefined") {
        const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
        useEffect(() => {
            if(windowWidth < 640){
                dispatch(close())
            }
            function handleResize() {
                setWindowWidth(window.innerWidth);
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
    }


    const handleItemToggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
    const handleToggle = () => {
        dispatch(toggle());
    }
    const pathname = usePathname();

    if(!isOpen) {
        return (
          <></>
        );
    }

    return (
        <aside className="xl:w-2/12 lg:w-4/12 min-w-72 m-4 bg-[#0e1528] text-white
            flex-col rounded-3xl sticky lg:z-0 z-40">
            <div className="p-5 flex">
                <div className="w-11/12">
                    <Image src="/cloit-logo.svg" alt="logo" width="77" height="20" />
                </div>
                <div className="w-1/12">
                    <button onClick={handleToggle} className={"hover:text-amber-300"}>
                        <span className="material-symbols-outlined">menu_open</span>
                    </button>
                </div>
            </div>
            <ul className="text-gray-500 text-md font-semibold">
                {
                    menuItems.map((item) => {
                        return <Item key={item.id} item={item}
                                     openIndex={openIndex}
                                     toggler={handleItemToggle}
                                     pathname={pathname}
                            />;
                    })
                }
            </ul>
        </aside>
    )
};


const Item = (props: any) => {
    const isOpen = props.openIndex === props.item.id;
    const hasSubItems = props.item.subitems && props.item.subitems.length > 0;
    const hasActiveChild = props.item.subitems?.some(
        (si: any) => props.pathname === si.link
    );

    const isActive = props.openIndex? isOpen : hasActiveChild;

    return (
        <li className={'mt-3 mx-3 flex flex-col rounded-3xl ' + (isActive? 'bg-[#1b2237]': 'hover:bg-[#1b2237')}>
            <button className={'flex p-4 ' + (isActive? 'text-white' : '')}
                    onClick={() => props.toggler(props.item.id)}>
                <span className={"material-symbols-rounded w-2/12 mr-2 " + (isActive? '' : 'material-filled')}>
                    {'folder' + (isActive? '_open' : '') }
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
      <li>
        <Link href={props.item.link || '#'} className={'flex rounded-3xl p-4 ' + (isActive? 'bg-lime-500 text-black' : '')}>
            <span className={"material-symbols-outlined text-center w-2/12 mr-2 " + (isActive ? 'material-filled' : '')}>
                    {'browse'}
            </span>
            <span className='w-10/12'>{props.item.name}</span>
        </Link>
      </li>
    )
}

export default Sidebar;