import "../css/Header.css"
import Logo from "../image/pixivLogo.png"
import notifyIcon from "../image/notify.png"
import profileIcon from "../image/profile.png"

function Header() {
    return (
        <div id="headerContainer">
            <div id="headerLeft">
                <img className="headerLogo" src={ Logo } alt="logo"></img>
            </div>
            <div id="headerCenter">
                <input className="searchBox" placeholder="작품 검색"></input>
            </div>
            <div id="headerRight">
                <div className="putIllustBtn">작품 투고</div>
                <img className="headerIcon" src= { notifyIcon } ></img>
                <img className="headerIcon" src={ profileIcon }></img>
            </div>
        </div>
    );
}

export default Header;