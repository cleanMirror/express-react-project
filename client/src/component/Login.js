import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css"
import logo from "../image/pixivLogo.png"
import { useRef } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  let id = useRef();
  let pwd = useRef();

  async function fnLogin() {
    const res = await axios.post("http://localhost:3100/user", {
      id : id.current.value,
      pwd : pwd.current.value
    });
    
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      navigate("/illustration");
    } else {
      alert("아이디와 비밀번호를 확인해주세요");
    }
  }

  return (
    <div id={styles.container}>
      <div id={styles.loginBox}>
        <img className={styles.logo} src={ logo } alt="logo"></img>
        <p className={styles.comment}>창작 활동을 더욱 즐겁게</p>

        <div className={styles.gap}></div>

        <input
          className={styles.loginInput}
          placeholder="아이디"
          ref={id}></input>
        <input
          className={styles.loginInput}
          placeholder="비밀번호"
          type="password"
          ref={pwd}></input>

        <div className={styles.gap}></div>

        <div className={`${styles.loginBtn} ${styles.blueBtn}`}  onClick={ fnLogin }>로그인</div>
        <div className={`${styles.loginBtn} ${styles.redBtn}`}>회원가입</div>
      </div>
    </div>
  );
};

export default Login;
