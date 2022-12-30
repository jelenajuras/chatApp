import { Link, Outlet } from "react-router-dom";
import InputRoom from "../components/InputRoom";

const Rooms = ({rooms, onOpenRoom,onCreateRoom, closeNavBar}) => {

    return (
        <main>
            <aside className="aside sidebar topnav open" id="mySidebar">
                <Link className="closeNav" to={""} onClick={closeNavBar}>&times;</Link>
           
                <div>
                    <h1>Rooms</h1>
                    <InputRoom onCreateRoom={onCreateRoom} />

                    {
                        rooms.map(room => (
                            <div key={room.id}>
                                <Link to={"/room/" + room.id} className="link openRoom" onClick={onOpenRoom} data-room={room.name} data-roomid={room.id} >
                                    {room.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </aside>
            <Outlet />
        </main>
    )
}

export default Rooms;