import styles from "../css/Header.module.css"
import Logo from "../image/bixivLogo.png"
import notifyIcon from "../image/notify.png"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

function Header() {

    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    function fnGoPutIllust() {
        navigate("/putIllust");
    }

    function fnGoProfile(userId) {
        navigate("/author", { state : {userId : userId}});
    }

    return (
        <div id={styles.headerContainer}>
            <div id={styles.headerLeft}>
                <img className={styles.headerLogo} src={ Logo } alt="logo"></img>
            </div>
            <div id={styles.headerCenter}>
                <input className={styles.searchBox} placeholder="작품 검색"></input>
            </div>
            <div id={styles.headerRight}>
                <div className={styles.putIllustBtn} onClick={fnGoPutIllust}>작품 투고</div>
                <img className={styles.headerIcon} src= { notifyIcon } alt="notify"></img>
                <img
                    className={styles.headerProfile}
                    src={ "http://localhost:3100/" + sessionInfo.profileImg }
                    alt="profile"
                    onClick={() => {
                        fnGoProfile(sessionInfo.id);
                    }}></img>
            </div>
        </div>
    );
}

export default Header;