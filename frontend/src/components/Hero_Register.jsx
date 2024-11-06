import React from 'react';
import styles from './Hero_Login_and_Register.module.css';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

function Hero_Register() {
    return (
        <div className={styles.wrapperwrapper}>
            <div className={styles.wrapper}>
                <form action="">
                    <h1 style={{ fontWeight: 750, fontFamily: "Fraunces" }}>Register</h1>
                    <div className={styles['input-box']}>
                        <input type="text" placeholder="Username" required />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input type="email" placeholder="Email" required />
                        <MdAlternateEmail className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" placeholder="Password" required />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" placeholder="Confirm Password" required />
                        <FaLock className={styles.icon} />
                    </div>

                    <button type="submit" className={styles.loginbutton}>Register</button>

                    <div className={styles['register-link']}>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Hero_Register;
