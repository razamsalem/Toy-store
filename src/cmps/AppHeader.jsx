import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <Link to="/">
                <h3>Toy<span className="logo-clr">Joy</span></h3>
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About us</NavLink>
            </nav>
        </header>
    )
}
