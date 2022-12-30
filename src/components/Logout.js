import { Component } from "react";

class Logout extends Component {

    render () {
        return (
            <>
                <button onClick={this.props.onLogOut} >
                    Logout {this.props.member}
                </button>
            </>
        )
    }
}

export default Logout;