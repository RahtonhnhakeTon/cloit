// app/components/TreeNode.tsx
"use client";

import { useState } from "react";

interface NodeType {
    id: string;
    name: string;
    children?: NodeType[];
}

export default function TreeNode({ node }: { node: NodeType }) {
    const hasChildren = node.children && node.children.length > 0;
    // Track whether this node is expanded
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <li className="mb-1">
            <div className="flex space-between">
                {hasChildren && (
                    <button
                        onClick={toggle}
                        className="focus:outline-none bg-background text-gray-600 hover:text-black"
                    >
                        <span className={"material-symbols-outlined"}>
                            {"keyboard_arrow_" + (isOpen ? "down" : "right")}
                        </span>
                    </button>
                )}

                <span className="text-gray-700 ml-3">{node.name}</span>
            </div>

            {/* Recursively render children if open */}
            {hasChildren && isOpen && (
                <ul className="ml-3 border-l border-gray-300 pl-4">
                    {node.children!.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}
