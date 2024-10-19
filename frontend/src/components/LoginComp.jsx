import styles from './LoginComp.module.css';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function LoginComp() {
    return (
        <div className={styles.wrapperwrapper}>
            <img id='bg-image-login' src='public\images\image6.jpg' />
        <div className={styles.wrapper}>
            <form action="">
                <h1>Login</h1>
                <div className={styles['input-box']}>
                    <input type="text" placeholder="Username" required />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles['input-box']}>
                    <input type="password" placeholder="Password" required />
                    <FaLock className={styles.icon} />
                </div>

                <div className={styles.forgot}>
                    <a href="">Forgot password</a>
                </div>

                <button type="submit" className = {styles.loginbutton}>Login</button>

                <div className={styles['register-link']}>
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    );
}

export default LoginComp;
