
import styles from './PostRequest.module.css';

function PostRequest()
{

    return(

      <>
        
       
<div className={styles.wrapperwrapper}>
  
        <div className={styles.wrapper}>
        <h1 style={{ fontWeight: 750, fontFamily: "Fraunces", textAlign:"center", fontSize:"50px"}}>Post</h1>
        <form >
        <div className={styles.title}>
          <label style ={{ fontWeight: 750, fontFamily: "Fraunces", textAlign:"center", fontSize:"18px"}}>Title:</label>
          <input type="text" className={styles.inputField}  placeholder='Job Title' required/>
        </div>
        <div className={styles.description}>
          <label style ={{ fontWeight: 750, fontFamily: "Fraunces", textAlign:"center", fontSize:"18px"}}>Description:</label>
          <textarea
            className={styles.inputFieldDes}
            placeholder='Job Description'
            required
          />
        </div>
        <button type="submit"className={styles.button} >Post</button>
      </form>
      </div>

      </div>
       
       
        </>
    );
}


export default PostRequest