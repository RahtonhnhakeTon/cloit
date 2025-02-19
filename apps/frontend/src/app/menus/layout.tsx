import type { Metadata } from "next";
import "material-symbols";
import Title from "@/app/_components/Title";

export const metadata: Metadata = {
    title: "Menus",
    description: "Generated by create next app",
};

const breadcrumb = [
    {
        title: "Menus",
        link: 'menus'
    }
]

export default function MenusLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Title text={"Menu"} breadcrumbItems={breadcrumb} />
            {children}
        </>
    );
}
