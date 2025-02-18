const Title = (props: any) => {
    return (
        <div className="mb-5 flex">
            <div className="w-14 h-14 text-white bg-blue-700 flex flex-col justify-center items-center rounded-full">
                <span className={"material-symbols-rounded material-filled"}>browse</span>
            </div>
            <span className={"ml-4 py-2 font-bold text-black text-4xl"}>{props.text}</span>
        </div>
    )
}

export default Title;