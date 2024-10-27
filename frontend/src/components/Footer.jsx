import React from 'react'
import './Footer.css'
function Footer()
{
    return(
        <div className = "Div">
            <footer>

            <p>&copy; {new Date().getFullYear()} HandyHelper</p>
            </footer>

        </div>
    );
}

export default Footer 