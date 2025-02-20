// app/components/TreeNode.tsx
"use client";

import { useEffect, useState } from 'react';

interface NodeType {
    id: string;
    name: string;
    children?: NodeType[];
}

export default function TreeNode(props: any) {
    const hasChildren = props.node.children && props.node.children.length > 0;
    const isSelected = props.selected?.id === props.node.id;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(props.expandAll);
      }, [props.expandAll])

    const toggle = () => setIsOpen(!isOpen);
    const openCreateNodeForm = (node: any) => {
        props.clickAction({
            ...node,
            depth: node.depth + 1,
            parentId: node.id,
            parentName: node.name,
            name: '',
            id: '',
        })
    }

    return (
        <li className="mb-1">
            <div className="flex space-between items-center h-10">
                {hasChildren && (
                    <button
                        onClick={toggle}
                        className="bg-background text-gray-600 hover:text-black w-5"
                    >
                        <span className={"material-symbols-outlined align-middle"}>
                            {"keyboard_arrow_" + (isOpen ? "down" : "right")}
                        </span>
                    </button>
                )}

                <button onClick={() => props.clickAction(props.node)}>
                    <span className={"ml-3 " + (isSelected ? 'text-black ': 'text-gray-600 hover:text-cyan-400 ') +
                        (!hasChildren? 'pl-5 ' : ' ')}>{props.node.name}</span>
                </button>
                {isSelected &&
                    <button onClick={() => openCreateNodeForm(props.node)}
                        className={"ml-4 p-2 rounded-full w-6 h-6 bg-blue-600 text-white " +
                          "flex items-center align-middle justify-center"}>
                        <span className="material-symbols-outlined" style={
                            {fontSize: "16px"}
                        }>add</span>
                    </button>
                }
            </div>

            {/* Recursively render children if open */}
            {hasChildren && isOpen && (
                <ul className="ml-3 border-l border-gray-300 pl-4">
                    {props.node.children!.map((child: any) => (
                        <TreeNode key={child.id} node={child} clickAction={props.clickAction} selected={props.selected} expandAll={props.expandAll} />
                    ))}
                </ul>
            )}
        </li>
    );
}
