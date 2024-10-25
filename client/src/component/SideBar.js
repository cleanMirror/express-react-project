import { useState } from "react";
import styles from "../css/SideBar.module.css"
import sideMenuIcon from "../image/sideMenu.png"
import illustIcon from "../image/illustration.png"
import mangeIcon from "../image/manga.png"
import followIcon from "../image/follow.png"
import discoveryIcon from "../image/discovery.png"
import logo from "../image/pixivLogo.png"
import { useNavigate } from "react-router-dom";

function SideBar(props) {

    const navigate = useNavigate();

    var [ isOpen, setIsOpen ] = useState(props.isOpen);
    var [ menuStyle, setMenuStyle ] = useState({});

    if (isOpen) {
        menuStyle = {left : "0px"};
    } else {
        menuStyle = {left : "-300px"};
    }

    function fnMenuClick() {
        if (isOpen) {
            setIsOpen(false);
            setMenuStyle({left : "-300px"});
        } else {
            setIsOpen(true);
            setMenuStyle({left: "0px"});
        }
    }

    function fnGoIllust() {
        navigate("/illustration");
    }

    function fnGoFollow() {
        navigate("/follow");
    }

    return (
        <>
            <img className={styles.sideMenuIcon} src={ sideMenuIcon } onClick={ fnMenuClick } alt="sideMenuIcon"></img>
            <div id={styles.sideBarContainer} style={ menuStyle }>
                <img className={styles.logo} src={logo} alt="sideBarLogo"></img>

                <div className={styles.menuWrapper}>
                    <div className={styles.menu}>
                        <img className={styles.sideBarIcon} src={ illustIcon } alt="illustIcon"></img>
                        <div className={styles.menuText} onClick={fnGoIllust}>일러스트</div>
                    </div>
                    <div className={styles.menu}>
                        <img className={styles.sideBarIcon} src={ mangeIcon } alt="mangaIcon"></img>
                        <div className={styles.menuText}>만화</div>
                    </div>
                </div>

                <div className={styles.menuWrapper}>
                    <div className={styles.menu}>
                        <img className={styles.sideBarIcon} src={ followIcon } alt="followIcon" ></img>
                        <div className={styles.menuText} onClick={fnGoFollow}>팔로우</div>
                    </div>
                    <div className={styles.menu}>
                        <img className={styles.sideBarIcon} src={ discoveryIcon } alt="discoveryIcon"></img>
                        <div className={styles.menuText}>디스커버리</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;