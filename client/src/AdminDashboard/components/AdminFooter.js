import React from 'react'
import { Link } from 'react-router-dom'

export const AdminFooter = () => {

    return (
        <div
            className="text-center text-white bg-dark p-4 Afooter">
            © 2023 Copyright:
            <Link className="text-reset fw-bold" to="/">
            Edu-Sync.com
            </Link>
        </div>
    )
}
