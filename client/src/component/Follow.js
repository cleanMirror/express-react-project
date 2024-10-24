import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/Follow.module.css"
import leftIcon from "../image/left.png"
import rightIcon from "../image/right.png"
import viewIcon from "../image/view.png"
import heartGrayIcon from "../image/heart_fill_gray.png"
import commentIcon from "../image/comment.png"
import { useRef, useState } from "react";

function Follow() {

    var testFollowList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    var testFeedList = [{}, {}, {}, {}, {}];

    var xIndex = useRef(0);

    var [followStyle, setFollowStyle] = useState({});

    function fnLeftClick() {
        xIndex.current += 928; // 8개, 1개당 116
        setFollowStyle({translate : `-${xIndex.current}px 0px`});
    }

    function fnRightClick() {
        xIndex.current -= 928; // 8개, 1개당 116
        setFollowStyle({translate : `${xIndex.current}px 0px`});
    }

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={true}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <img
                        className={styles.leftBtn}
                        src={leftIcon}
                        alt="leftIcon"
                        onClick={fnLeftClick}
                    ></img>
                    <img
                        className={styles.rightBtn}
                        src={rightIcon}
                        alt="rightIcon"
                        onClick={fnRightClick}
                    ></img>
                    <div className={styles.followContainer}>
                        <div className={styles.cellWrapper} style={followStyle}>
                            {testFollowList.map((item) => {
                                return (
                                    <div className={styles.followCell}>
                                        <div className={styles.followThumb}></div>
                                        <div>작가 이름</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.cardView}>
                        {testFeedList.map((item) => {
                            return (
                                <div className={styles.card}>
                                    <div className={styles.authorLine}>
                                        <div className={styles.authorThumb}></div>
                                        <div className={styles.authorName}>작가 이름</div>
                                    </div>
                                    <div className={styles.cardImg}>image</div>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.infoLeft}>
                                            <img className={styles.infoIcon} src={viewIcon} alt="viewIcon"></img>
                                            <div>1,302</div>
                                            <img className={styles.infoIcon} src={heartGrayIcon} alt="heartIcon"></img>
                                            <div>302</div>
                                            <img className={styles.infoIcon} src={commentIcon} alt="commentIcon"></img>
                                            <div>13</div>
                                        </div>
                                        <div className={styles.infoRight}>
                                            <div className={styles.date}>2024년 10월 4일 오전 1:23</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Follow;