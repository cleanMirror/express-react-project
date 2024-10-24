import styles from "../css/Header.module.css"
import Logo from "../image/pixivLogo.png"
import notifyIcon from "../image/notify.png"
import profileIcon from "../image/profile.png"
import { useNavigate } from "react-router-dom"

function Header() {

    const navigate = useNavigate();

    function fnGoPutIllust() {
        navigate("/putIllust");
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
                <img className={styles.headerIcon} src={ profileIcon } alt="profile"></img>
            </div>
        </div>
    );
}

export default Header;