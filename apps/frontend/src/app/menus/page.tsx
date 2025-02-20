"use client"

import useSWR from "swr";
import {SWRfetcher} from "@/app/_utils/helpers";
import Menu from "@/app/menus/_components/Menu";
import {useState} from "react";
import Loading from "@/app/menus/loading";

const MenuPage = (props: any) => {
    const {data, error, isLoading} = useSWR(process.env.API_URL  + "menus/roots",
        SWRfetcher);

    const [selected, setSelected] = useState<string | null>(null);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className={"mb-4 w-7/12"}>
                <label htmlFor="rootMenus" className="block text-sm font-medium text-gray-600">
                    Menu
                </label>
                <select
                    id="rootMenus"
                    className="mt-1 w-full p-2 rounded-xl bg-gray-100 focus:outline-none border-r-8 focus:ring-2 focus:ring-blue-400"
                    onChange={event => setSelected(event.target.value)}
                    defaultValue={selected || data[0].id}
                >
                    {data.map((item: any, index: number) => {
                        return <option key={index} value={item.id}>{item.name}</option>;
                    })}
                </select>

                <div className="flex items-center gap-2 my-6">
                    <button className="px-5 py-1 rounded-3xl bg-black text-white border-2
                    border-black hover:bg-blue-700 hover:border-blue-700">
                        Expand All
                    </button>
                    <button className="px-5 py-1 rounded-3xl bg-white text-black border-2 border-gray-300 hover:bg-gray-300">
                        Collapse All
                    </button>
                </div>

            </div>
            <Menu selected={selected || data[0].id}/>
        </>
    );
}

export default MenuPage;