import React, { useState } from 'react';
import axios from 'axios';
import styles from './Hero_Login_and_Register.module.css';
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function LoginComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
            window.location.reload();
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className={styles.wrapperwrapper}>
            <div className={styles.wrapper}>
                <form onSubmit={handleLogin}>
                    <h1 style={{ fontWeight: 750, fontFamily: "Fraunces" }}>Login</h1>
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
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    <div className={styles.forgot}>
                        <a href="">Forgot password</a>
                    </div>
                    <button type="submit" className={styles.loginbutton}>Login</button>
                    <div className={styles['register-link']}>
                        <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginComp;
