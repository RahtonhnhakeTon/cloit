// app/components/TreeNode.tsx
"use client";

import { useState } from "react";

interface NodeType {
    id: string;
    name: string;
    children?: NodeType[];
}

export default function TreeNode({ node, clickAction, selected } : { node: NodeType, selected: NodeType | null, clickAction: (node: NodeType) => void }) {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selected?.id === node.id;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const openCreateNodeForm = (node: any) => {
        clickAction({
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
            <div className="flex space-between">
                {hasChildren && (
                    <button
                        onClick={toggle}
                        className="bg-background text-gray-600 hover:text-black w-5"
                    >
                        <span className={"material-symbols-outlined"}>
                            {"keyboard_arrow_" + (isOpen ? "down" : "right")}
                        </span>
                    </button>
                )}

                <button onClick={() => clickAction(node)}>
                    <span className={"ml-3 " + (isSelected ? 'text-black ': 'text-gray-600 ') +
                        (!hasChildren? 'pl-5 ' : ' ')}>{node.name}</span>
                </button>
                {isSelected &&
                    <button onClick={() => openCreateNodeForm(node)}
                        className={"ml-3 mt-0.5 p-2 rounded-full w-6 h-6 bg-blue-600 text-white flex items-center justify-center"}>
                        <span className="material-symbols-outlined" style={
                            {fontSize: "16px"}
                        }>add</span>
                    </button>
                }
            </div>

            {/* Recursively render children if open */}
            {hasChildren && isOpen && (
                <ul className="ml-3 border-l border-gray-300 pl-4">
                    {node.children!.map((child) => (
                        <TreeNode key={child.id} node={child} clickAction={clickAction} selected={selected} />
                    ))}
                </ul>
            )}
        </li>
    );
}
