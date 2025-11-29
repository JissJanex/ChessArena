import React from 'react';
import { Link } from "react-router-dom";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'My App' }) => {
    return (
        <header className="header">
            <div className="container">
                <h1>{title}</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;