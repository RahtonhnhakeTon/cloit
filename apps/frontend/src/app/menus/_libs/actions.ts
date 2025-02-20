"use server";

export const updateMenuNode = async (formData: any) => {
    await fetch(process.env.API_URL  + "menus/menu/" + formData.id, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: [
            ['Content-Type', 'application/json'],
        ]
    });
};

export const createMenuNode = async (formData: any) => {
    await fetch(process.env.API_URL  + "menus/menu/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: [
            ['Content-Type', 'application/json'],
        ]
    });
};