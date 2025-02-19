"use client"

import {useEffect, useState} from "react";
import Form from "next/form";
import {updateMenuNode} from "@/app/menus/_libs/actions";

export default function MenuForm(props: any) {
    const initialFormData = {
        id: props.data.id,
        parentName: props.data.parentName || '',
        parentId: props.data.parentId || '',
        rootId: props.data.rootId,
        depth: props.data.depth,
        name: props.data.name,
    }

    const [formData, setFormData] = useState(initialFormData);
    const [isTouched, setTouched] = useState(false);

    useEffect(() => {
        setFormData(initialFormData);
    }, [props.data]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setTouched(true);
    }

    const handleSubmit = () => {
        updateMenuNode(formData);
    }

    return (
        <Form action={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="menu-id" className="block text-sm font-medium text-gray-600">
                    MenuID
                </label>
                <input id="menu-id" name="id" type="text" disabled={!!initialFormData.id} value={formData.id}
                       placeholder="Leave blank to autogenerate ID"
                       className={"mt-1 w-9/12 p-2 rounded-xl bg-gray-100 " +
                           "disabled:text-gray-500 disabled:bg-gray-200 focus:outline-none border-l-8 " +
                           "focus:ring-2 focus:ring-blue-400 "}/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                    Parent Data
                </label>
                <input id="parent-name" name="parentName" type="text" disabled={true} value={formData.parentName}
                       className={"mt-1 w-7/12 p-2 rounded-xl text-gray-500 bg-gray-200 focus:outline-none border-x-8 " +
                           "focus:ring-2 focus:ring-blue-400"}/>
            </div>

            <div className="mb-4">
                <label htmlFor={"menu-depth"} className="block text-sm font-medium text-gray-600">
                    Depth
                </label>
                <input id="menu-depth" name="depth" type="number" disabled={true} value={formData.depth}
                       className={"mt-1 w-7/12 p-2 rounded-xl text-gray-500 bg-gray-200 focus:outline-none border-x-8 " +
                           "focus:ring-2 focus:ring-blue-400"}/>
            </div>

            <div className="mb-4">
                <label htmlFor="menu-name" className="block text-sm font-medium text-gray-600">
                    Name
                </label>
                <input id="menu-name" name="name" type="text" value={formData.name}
                       placeholder="Name of menu component"
                       onInput={handleInput}
                       className={"mt-1 w-7/12 p-2 rounded-xl bg-gray-100 focus:outline-none border-l-8 " +
                           "focus:ring-2 focus:ring-blue-400"}
                />
            </div>

            <button type={"submit"} disabled={!isTouched} className={"px-4 py-2 mt-2 rounded-3xl w-4/12 " +
                   (isTouched? "bg-blue-600 text-white rounded hover:bg-blue-700" :
                   "bg-gray-600 text-gray-200 cursor-not-allowed")}>
                Save
            </button>
        </Form>
    );
}