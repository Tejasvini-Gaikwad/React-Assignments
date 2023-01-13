import { NavLink } from "react-router-dom";
import '../Navbar.css';

const Navbar = () => {
    function refreshPage() {
        window.location.pathname.reload(false);
    }
    return <div>
        <ul className="NavBarClass">
            <li><NavLink className="nav-bar-link" to="/" onClick={refreshPage}>Home</NavLink></li>
            <li><NavLink className="nav-bar-link" to="/AddTodo">Add To Do</NavLink></li>
        </ul>
        
    </div>
}

export default Navbar;