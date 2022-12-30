const items = 
[
    {
        id: 1,
        name: "Loremipsu1",
    },
    {
        id: 2, 
        name: "Loremipsum2",
    },
    {
        id: 3, 
        name: "Loremipsum3",
    },
]


export const getRooms = () => {
    return items;
}

export const getRoom = (id) => {
    const itemId =  parseInt(id);

    return items.filter( (item) => {
        return item.id === itemId;
    });
}