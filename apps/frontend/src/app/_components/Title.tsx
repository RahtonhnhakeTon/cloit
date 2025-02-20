'use client'


import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/app/_utils/hooks';
import { toggle } from '@/app/_slices/sidebar.slice';

const Title = (props: any) => {
    const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
    const dispatch = useAppDispatch();

    const renderBreadcrumb = (items: any[]) => {
        const divider = <span className={"mx-2"}>/</span>;
        let link = '';

        if (!items || items.length === 0) {
            return divider;
        }
        else return items.map((item: any, index: number) => {
            link += '/' + item.link;
            const isActive = index === items.length - 1;
            return (
                <div key={index}>
                    {divider}
                    <Link href={link} className={(isActive? 'text-black': 'text-gray-600')}>
                        <span>{item.title}</span>
                    </Link>
                </div>
            );
        })
    }

    return (
        <div className="mb-5 flex flex-col">
            <div className="flex mb-5 text-gray-500">
                { !isSidebarOpen &&
                    <button className={"w-10 h-10 ring-1 ring-gray-600 mr-4 rounded-lg"}
                            onClick={() => {dispatch(toggle())} }>
                        <span className={"material-symbols-outlined"}>menu_open</span>
                    </button>
                }
                <Link href="/">
                    <span className={"material-symbols-rounded material-filled text-gray-400"}>folder</span>
                </Link>
                {renderBreadcrumb(props.breadcrumbItems)}
            </div>
            <div className="flex">
                <div className="w-14 h-14 text-white bg-blue-700 flex flex-col justify-center items-center rounded-full">
                    <span className={"material-symbols-rounded material-filled"}>browse</span>
                </div>
                <span className={"ml-4 py-2 font-bold text-black text-4xl"}>{props.text}</span>
            </div>
        </div>
    )
}

export default Title;