import Title from "@/app/_components/title";
import TreeNode from "@/app/menus/_components/TreeNode";

const breadcrumb = [
    {
        title: "Menus",
        link: 'menus'
    }
]

const menus = [
    {
        id: 'dqefseads',
        name: 'system management',
        children: [
            {
                id: 'd qwsaddq 1qwedsa',
                name: 'System Management',
                children: [
                    {
                        id: '323312 ewd 21ewd',
                        name: 'Systems',
                        children: [
                            {
                                id: '321 3dq 1eqwd',
                                name: 'Systems Code',
                                children: []
                            },
                            {
                                id: '3223e 13e 213',
                                name: 'Menu'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


const Menu = (props: any) => {
    return (
        <>
            <Title text={"Menu"} breadcrumbItems={breadcrumb} />

            <div className={"mb-4 w-7/12"}>
                <label htmlFor="rootMenus" className="block text-sm font-medium text-gray-600">
                    Menu
                </label>
                <select
                    id="rootMenus"
                    className="mt-1 w-full p-2 rounded-3xl bg-gray-200 focus:outline-none border-r-8 focus:ring-2 focus:ring-blue-400"
                >
                    {menus.map((item: any) => {
                        return <option key={item.id} value={item.id}>{item.name}</option>;
                    })}
                </select>
            </div>


            <div className="flex items-center gap-2 mb-6">
                <button className="px-5 py-1 rounded-3xl bg-black text-white border-2 border-black hover:bg-gray-300">
                    Expand All
                </button>
                <button className="px-5 py-1 rounded-3xl bg-white text-black border-2 border-gray-300 hover:bg-gray-300">
                    Collapse All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <ul className="list-none">
                        {menus.map((root) => (
                            <TreeNode key={root.id} node={root} />
                        ))}
                    </ul>
                </div>

                {/* Right side: Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Menu Details</h2>

                    {/* Read-only info */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            MenuID
                        </label>
                        <p className="text-gray-800">5a62b007-5a6f-11ed-baa2-0242ac1...</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Parent Data
                        </label>
                        <p className="text-gray-800">system management</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Depth
                        </label>
                        <p className="text-gray-800">3</p>
                    </div>

                    {/* Editable field */}
                    <div className="mb-4">
                        <label htmlFor="menuName" className="block text-sm font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            id="menuName"
                            type="text"
                            placeholder="Enter menu name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export default Menu;