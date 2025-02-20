"use client"

import TreeNode from "@/app/menus/_components/TreeNode";
import useSWR from "swr";
import {SWRfetcher} from "@/app/_utils/helpers";
import MenuForm from "@/app/menus/_components/Form";
import {useState} from "react";

export default function Menu(props: any) {
    const [selectedMenu, setSelectedMenu] = useState<any>(null);

    const {data, mutate} = useSWR(process.env.NEXT_PUBLIC_API_URL + "menus/tree/" + props.selected,
        SWRfetcher);

    const closeForm = () => {
        mutate();
        setSelectedMenu(null);
    }

    return (data &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <ul className="list-none">
                    <TreeNode key={data.id} node={data} selected={selectedMenu}
                              clickAction={(node: any) => {setSelectedMenu(node)}}
                              expandAll={props.expandAll}/>
                </ul>
            </div>

            {selectedMenu && <MenuForm data={selectedMenu} closeForm={closeForm} />}
        </div>
    );
}