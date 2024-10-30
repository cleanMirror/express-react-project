import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/Follow.module.css"
import leftIcon from "../image/left.png"
import rightIcon from "../image/right.png"
import viewIcon from "../image/view.png"
import heartGrayIcon from "../image/heart_fill_gray.png"
import commentIcon from "../image/comment.png"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Follow() {

    const navigate = useNavigate();

    const [followList, setFollowList] = useState([]);
    const [feedList, setFeedList] = useState([]);

    const currSelect = useRef(null);

    var xIndex = useRef(0);
    var [followStyle, setFollowStyle] = useState({});

    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    useEffect(() => {
        fnGetFollowList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fnGetFollowList() {
        const res = await axios.get("http://localhost:3100/follow?userId=" + sessionInfo.id);
        setFollowList(res.data.list);
        fnGetFollowFeedList(res.data.list);
    }

    async function fnGetFollowFeedList(list) {
        const res = await axios.post("http://localhost:3100/follow/feed", {
            list : list
        });
        console.log(res.data.feeds);
        setFeedList(res.data.feeds);
    }

    function fnLeftClick() {
        xIndex.current += 928; // 8개, 1개당 116
        setFollowStyle({translate : `-${xIndex.current}px 0px`});
    }

    function fnRightClick() {
        xIndex.current -= 928; // 8개, 1개당 116
        setFollowStyle({translate : `${xIndex.current}px 0px`});
    }

    function fnFollowClick(index) {
        if (index === currSelect.current) {
            currSelect.current = null;
            fnGetFollowFeedList(followList);
            return;
        }
        currSelect.current = index;
        fnGetFollowFeedList([followList[index] ] );
    }

    function fnGoAuthorProfile(userId) {
        navigate("/author", { state : {userId : userId} } );
    }

    async function fnGoIllustView(illustId) {
        await axios.put("http://localhost:3100/illust/hit", {illustId : illustId});
        navigate("/illustView", { state : {id : illustId}});
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
                            {followList.map((item, index) => {
                                return (
                                    <div
                                        className={styles.followCell}
                                        onClick={() => {
                                            fnFollowClick(index);
                                    }}>
                                        <img
                                            className={styles.followThumb}
                                            src={"http://localhost:3100/"+item.profileImg}
                                            style={currSelect.current === index ? {border : "3px solid red"} : {border : "none"}}
                                            alt="followThumb"
                                            ></img>
                                        <div className={styles.followName}>{item.nickname}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.cardView}>
                        {feedList.map((item) => {
                            return (
                                <div className={styles.card}>
                                    <div className={styles.authorLine} onClick={() => {
                                        fnGoAuthorProfile(item.id);
                                    }}>
                                        <img
                                            className={styles.authorThumb}
                                            src={"http://localhost:3100/" + item.profileImg}
                                            alt="authorThumb"
                                            ></img>
                                        <div className={styles.authorName}>{item.nickname}</div>
                                    </div>
                                    <div className={styles.cardImgView} onClick={() => {
                                        fnGoIllustView(item.illustration_id);
                                    }}>
                                        <img
                                            className={styles.cardImg}
                                            src={"http://localhost:3100/" + item.image_src}
                                            alt="cardImg"
                                            ></img>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.infoLeft}>
                                            <img className={styles.infoIcon} src={viewIcon} alt="viewIcon"></img>
                                            <div className={styles.infoText}>{item.hit}</div>
                                            <img className={styles.infoIcon} src={heartGrayIcon} alt="heartIcon"></img>
                                            <div className={styles.infoText}>{item.heartCnt}</div>
                                            <img className={styles.infoIcon} src={commentIcon} alt="commentIcon"></img>
                                            <div className={styles.infoText}>{item.commentCnt}</div>
                                        </div>
                                        <div className={styles.infoRight}>
                                            <div className={styles.date}>{item.cdatetime}</div>
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