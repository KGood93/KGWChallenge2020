import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header className="App-header">
            <h1>
                <Link to={'/'} className="headerLink">
                    Wantable.Music
                </Link>
            </h1>
        </header>
    )
}

export default Header