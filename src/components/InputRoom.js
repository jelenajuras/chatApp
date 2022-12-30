import { Component } from "react";
import React from "react";

class InputRoom extends Component {
    state = {
        text: "",
    };

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        this.props.onCreateRoom(this.state.text);
        e.target.firstChild.value = '';
    }

    render() {
        return (
        <section className="InputRoom">
            <form onSubmit={(e) => this.onSubmit(e)}>
                <input
                    onChange={(e) => this.onChange(e)}
                    type="text"
                    placeholder="New Room"
                />
            </form>
        </section>
        );
    }
}

export default InputRoom;
