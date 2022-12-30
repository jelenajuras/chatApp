import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { getMessages } from "./services/getMessages";
import { randomColor } from "./services/getMember";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import { getRoom, getRooms } from "./services/getRooms";
import RoomMessage from "./pages/RoomMessage";
import Logout from "./components/Logout";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: getMessages(),
            member: {
                userName: null,
                color: randomColor()
            },
            authUser: false,
            rooms: getRooms()
        };
        this.drone = new window.Scaledrone("lAXovUqaMfTmGNnB", {
            data: this.state.member
        });
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.state.member = member
        });
    }

    onSendMessage = (message,room) => {
        const messages = this.state.messages;

        if ( message ) {
            /*  messages.push({
                id: messages.length + 1, 
                text: message,
                room_id: parseInt(room),
                member: this.state.member
            })
        
            this.setState({messages: messages}) */
            console.log(messages);
            const roomClicked = (getRoom(room)[0].name).replaceAll(' ', '_');
            this.drone.publish({
                room: "observable-" + roomClicked,
                message
            });
        }   
    }
    
    onSubmitFormLogin = () => {
        const userName = document.querySelector('#userName').value;
        const authMember = this.state.member;

        authMember.userName = userName;
        this.setState({member: authMember});
        this.setState({authUser: true});
    }
    
    onLogOut = () => {
        this.setState({authUser: false});
        window.location.replace(window.location.origin);
    }

    onOpenRoom = (e) => {
        const linksRoom = document.querySelectorAll('a.link');
        for (const link of linksRoom) {
            link.classList.remove('active');
            link.addEventListener('click', (ev) => {
                document.title = ev.target.dataset.room;
            })
        }
       
        e.target.classList.add('active');
        const sidebar = document.getElementById("mySidebar");
        sidebar.classList.remove('open');
        const mainContent = document.querySelector(".mainContent");
        if (mainContent) {
            mainContent.classList.remove('close');
        }

        const roomClickedId = e.target.dataset.roomid;
        const roomClicked = (getRoom(roomClickedId)[0].name).replaceAll(' ', '_');
        const room = this.drone.subscribe("observable-" + roomClicked );

        room.on('data', (data, member) => {
            const messages = this.state.messages;

            messages.push({
                id: messages.length + 1, 
                room_id: parseInt(roomClickedId),
                text: data,
                member: this.state.member
            });
            this.setState({messages});
        });
    }

    onCreateRoom = (newRoom) => {
        const rooms = this.state.rooms;
        if ( newRoom ) {
            rooms.push({
                id: rooms.length + 1, 
                name: newRoom
            })
        
            this.setState({rooms: rooms})
        }
    }

    openNavBar = (e) => {
        e.preventDefault();
        const sidebar = document.getElementById("mySidebar");
        const mainContent = document.querySelector(".mainContent");
        sidebar.classList.add('open');
        mainContent.classList.add('close');
    }

    closeNavBar = (e) => {
        e.preventDefault();
        const sidebar = document.getElementById("mySidebar");
        const mainContent = document.querySelector(".mainContent");
       
        sidebar.classList.remove('open');
        mainContent.classList.remove('close');
    }

    componentDidUpdate = (prevProps, prevState) => {
        let scroll_to_bottom = document.querySelector('ul.Messages-list');
        if (scroll_to_bottom) {
		    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        }
    }

    render() {
        const {messages, member} = this.state;

        return (
            <section className="container">
                <header className="App-header">
                    <h1>My Chat App</h1>
                    { this.state.authUser && 
                        <div>                            
                            <Logout onLogOut={this.onLogOut} member={member.username} />
                        </div>
                    }

                </header>
                {! this.state.authUser && <Login onSubmitFormLogin={this.onSubmitFormLogin} />}

                { this.state.authUser && 
                    <Routes>
                        <Route path="/" element={<Rooms rooms={this.state.rooms} onOpenRoom={this.onOpenRoom} onCreateRoom={this.onCreateRoom} closeNavBar={this.closeNavBar} />}>
                            <Route path="room/:itemId" element={ <RoomMessage member={member} openNavBar={this.openNavBar} onSendMessage={this.onSendMessage} messages={messages}  />} />                   
                        </Route>
                    </Routes>  
                }
            </section>
        );
    }
}
