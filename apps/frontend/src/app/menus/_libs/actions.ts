"use server";

export const updateMenuNode = async (formData: any) => {
    await fetch("http://localhost:3001/menus/menu/" + formData.id, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: [
            ['Content-Type', 'application/json'],
        ]
    });
};

export const createMenuNode = async (formData: any) => {
    await fetch("http://localhost:3001/menus/menu/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: [
            ['Content-Type', 'application/json'],
        ]
    });
};