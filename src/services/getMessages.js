const MessagesList = 
[
    {
        id: 1,
        room_id: 1,
        text: "This is a test message room1!",
        member: {
            color: "blue",
            username: "bluemoon",
            id: 2
        },
    },
    {
        id: 2, 
        room_id: 1,
        text: "This is a test message room1!",
        member: {
            color: "violet",
            username: "violetsun",
            id: 3
        },
    },
    {
        id: 3,
        room_id: 2,
        text: "This is a test message room1!",
        member: {
            color: "black",
            username: "bluemoon",
            id: 2
        },
    },
    {
        id: 4, 
        room_id: 2,
        text: "This is a test message room1!",
        member: {
            color: "red",
            username: "violetsun",
            id: 3
        },
    },
]


export const getMessages = () => {
    return MessagesList;
}

export const getMessageRoom = (id) => {
    const itemId =  parseInt(id);

    return MessagesList.filter( (item) => {
        return item.room_id === itemId;
    });
}