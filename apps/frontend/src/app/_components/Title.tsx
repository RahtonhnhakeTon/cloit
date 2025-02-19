import Link from "next/link";

const Title = (props: any) => {
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