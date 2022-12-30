import {Component} from "react";
import React from "react";

class Messages extends Component {

    renderMessage(message) {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        console.log(member);

        const memberColor = {
            backgroundColor: member.color,
        };
        const className = messageFromMe ?
            "message currentMember" : "message";

            return (
            <li className={className} key={message.id}>
                <div className="Message-content">
                    <div className="username">
                        {member.userName}
                    </div>
                    <div className="text" style={memberColor}>{text}</div>
                </div>
            </li>
        );
    }

    render() {
        const {messages} = this.props;

        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }
}

export default Messages;