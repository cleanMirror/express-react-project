import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css"
import logo from "../image/pixivLogo.png"

function Login() {

  const navigate = useNavigate();

  function fnGoMain() {
    navigate("/illustration");
  }

  return (
    <div id={styles.container}>
      <div id={styles.loginBox}>
        <img className={styles.logo} src={ logo } alt="logo"></img>
        <p className={styles.comment}>창작 활동을 더욱 즐겁게</p>

        <div className={styles.gap}></div>

        <input className={styles.loginInput} placeholder="아이디"></input>
        <input className={styles.loginInput} placeholder="비밀번호" type="password"></input>

        <div className={styles.gap}></div>

        <div className={`${styles.loginBtn} ${styles.blueBtn}`}  onClick={ fnGoMain }>로그인</div>
        <div className={`${styles.loginBtn} ${styles.redBtn}`}>회원가입</div>
      </div>
    </div>
  );
};

export default Login;
