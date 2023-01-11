import { NavLink } from "react-router-dom";
import '../Navbar.css';

const Navbar = () => {
    return <div>
        <ul className="NavBarClass">
            <li><NavLink className="nav-bar-link" to="/">Home</NavLink></li>
            <li><NavLink className="nav-bar-link" to="/AddTodo">Add To Do</NavLink></li>
        </ul>
        
    </div>
}

export default Navbar;