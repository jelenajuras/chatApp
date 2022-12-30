import { Link, Outlet } from "react-router-dom";

const Nav = ({authUser,openNavBar}) => {
    return (
       <>
            <nav>
                <header className="App-header">
                    <h1>My Chat App</h1>
                </header>
                <ul className="navbar-nav">
                    {! authUser && 
                        <li className="nav-item">
                            <Link to="login" className="nav-link">Login</Link>
                        </li>
                    }
                    { authUser && 
                        <li className="nav-item">
                            <Link to="rooms" className="nav-link">Rooms</Link>
                        </li>
                    }
                    

                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Nav;
