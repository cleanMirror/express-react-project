import { useState } from "react";
import "../css/SideBar.css"
import sideMenuIcon from "../image/sideMenu.png"
import illustIcon from "../image/illustration.png"
import mangeIcon from "../image/manga.png"
import followIcon from "../image/follow.png"
import discoveryIcon from "../image/discovery.png"

function SideBar() {

    var [ isOpen, setIsOpen ] = useState(true);
    var [ menuStyle, setMenuStyle ] = useState({});

    function fnMenuClick() {
        if (isOpen) {
            setIsOpen(false);
            setMenuStyle({left : "-300px"});
        } else {
            setIsOpen(true);
            setMenuStyle({left: "0px"});
        }
    }

    return (
        <>
            <img className="sideMenuIcon" src={ sideMenuIcon } onClick={ fnMenuClick } alt="sideMenuIcon"></img>
            <div id="sideBarContainer" style={ menuStyle }>

                <div className="gap"></div>

                <div className="menuWrapper">
                    <div className="menu">
                        <img className="sideBarIcon" src={ illustIcon } alt="illustIcon"></img>
                        <div className="menuText">일러스트</div>
                    </div>
                    <div className="menu">
                        <img className="sideBarIcon" src={ mangeIcon } alt="mangaIcon"></img>
                        <div className="menuText">만화</div>
                    </div>
                </div>

                <div className="menuWrapper">
                    <div className="menu">
                        <img className="sideBarIcon" src={ followIcon } alt="followIcon" ></img>
                        <div className="menuText">팔로우</div>
                    </div>
                    <div className="menu">
                        <img className="sideBarIcon" src={ discoveryIcon } alt="discoveryIcon"></img>
                        <div className="menuText">디스커버리</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;