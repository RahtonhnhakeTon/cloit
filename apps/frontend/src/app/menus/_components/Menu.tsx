"use client"

import TreeNode from "@/app/menus/_components/TreeNode";
import useSWR from "swr";
import {SWRfetcher} from "@/app/_utils/helpers";
import MenuForm from "@/app/menus/_components/Form";
import {useState} from "react";

export default function Menu(props: any) {
    const {data, error, isLoading} = useSWR(process.env.API_URL  + "menus/tree/" + props.selected,
        SWRfetcher);

    const [selectedMenu, setSelectedMenu] = useState<any>(null);

    return (data &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <ul className="list-none">
                    <TreeNode key={data.id} node={data} selected={selectedMenu}
                              clickAction={(node) => {setSelectedMenu(node)}} />
                </ul>
            </div>

            {selectedMenu && <MenuForm data={selectedMenu} />}
        </div>
    );
}