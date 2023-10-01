import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from "./UserMsg.jsx";

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
                navigate('/');
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header">
            <Link to="/">
                <h3>Toy<span className="logo-clr">Joy</span></h3>
            </Link>

            {user && <section className="user-info">
                <h4>Hello <span>{user.fullname}</span></h4>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About us</NavLink>
                <UserMsg />
            </nav>
        </header>
    )
}
