import { useNavigate } from "react-router-dom";
import "../css/Login.css"
import logo from "../image/pixivLogo.png"

function Login() {

  const navigate = useNavigate();

  function fnGoMain() {
    navigate("/illustration");
  }

  return (
    <div id="container">
      <div id="loginBox">
        <img class="logo" src={ logo } alt="logo"></img>
        <p className="comment">창작 활동을 더욱 즐겁게</p>

        <div className="gap"></div>

        <input className="loginInput" placeholder="아이디"></input>
        <input className="loginInput" placeholder="비밀번호" type="password"></input>

        <div className="gap"></div>

        <div className="loginBtn blueBtn" onClick={ fnGoMain }>로그인</div>
        <div className="loginBtn redBtn">회원가입</div>
      </div>
    </div>
  );
};

export default Login;
