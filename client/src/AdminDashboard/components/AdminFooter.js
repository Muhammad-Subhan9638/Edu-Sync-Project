import React from 'react';
import { Link } from 'react-router-dom';
import './AdminFooter.css';

export const AdminFooter = () => {
    return (
        <div className="text-center text-white bg-dark p-4 Afooter fixed-bottom">
            © 2024 Copyright:
            <Link className="text-reset fw-bold" to="/">
                Edu-Sync.com
            </Link>
        </div>
    );
};
