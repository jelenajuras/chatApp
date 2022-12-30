import { Link, useParams } from "react-router-dom";
import Input from "../components/Input";
import Messages from "../components/Messages";

const RoomMessage = ({member, onSendMessage, messages, openNavBar}) => {
    const params = useParams();
    console.log(messages);
    const messagesRoom = messages.filter( (item) => {
        return item.room_id === parseInt(params.itemId);
    });

    return (
        <section className="mainContent open">
            <div className="listContainer">
                <Link to={""} className="openNav" onClick={openNavBar}>&#9776;</Link>
                <Messages messages={messagesRoom}
                    currentMember={member} />
            </div>
            <Input onSendMessage={onSendMessage} room={params.itemId}/>
        </section>
          
    )
}

export default RoomMessage;