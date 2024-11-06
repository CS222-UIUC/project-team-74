import React, { useState } from 'react';
import axios from 'axios';
import styles from './Hero_Login_and_Register.module.css';
import { FaLock, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

function Hero_Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                email,
                password,
            });
            // Registration successful, redirect to the login page
            navigate('/login'); 
        } catch (error) {
            setError('Registration failed');
        }
    };

    return (
        <div className={styles.wrapperwrapper}>
            <div className={styles.wrapper}>
                <form onSubmit={handleRegister}>
                    <h1 style={{ fontWeight: 750, fontFamily: "Fraunces" }}>Register</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className={styles['input-box']}>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <MdAlternateEmail className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles['input-box']}>
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required 
                        />
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
