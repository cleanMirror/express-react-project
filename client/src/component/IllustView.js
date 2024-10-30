import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/IllustView.module.css"
import heartIcon from "../image/heart.png"
import heartFillIcon from "../image/heart_fill.png"
import viewIcon from "../image/view.png"
import heartGrayIcon from "../image/heart_fill_gray.png"
import commentIcon from "../image/comment.png"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function IllustView() {

    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state.id;

    const [illustInfo, setIllustInfo] = useState({});
    const [commentList, setCommentList] = useState([]);

    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    let commentInput = useRef();

    useEffect(() => {
        getIllustInfo();
        getCommentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getIllustInfo() {
        const res = await axios.get("http://localhost:3100/illust/" + id + "?userId=" + sessionInfo.id);
        setIllustInfo(res.data.info[ 0 ]);
    }
    async function getCommentList() {
        const res = await axios.get("http://localhost:3100/illust/comment?illustId=" + id);
        setCommentList(res.data.list);
    }

    function fnGoAuthorProfile(userId) {
        navigate("/author", { state : {userId : userId} } );
    }

    async function fnHeartClick() {
        if (illustInfo.is_heart === "true") {
            await axios.delete("http://localhost:3100/illust/heart?illustration_id=" + id + "&user_id=" + sessionInfo.id);
        } else {
            await axios.put("http://localhost:3100/illust/heart?illustration_id=" + id + "&user_id=" + sessionInfo.id);
        }
        getIllustInfo();
    }

    async function fnFollowBtnClick() {
        if (illustInfo.is_follow === "true") {
            await axios.delete(
                "http://localhost:3100/follow"
                + "?author_id="+ illustInfo.id
                + "&session_id=" + sessionInfo.id);
        } else {
            await axios.put(
                "http://localhost:3100/follow"
                + "?author_id="+ illustInfo.id
                + "&session_id=" + sessionInfo.id);
        }
        getIllustInfo();
    }

    async function fnSubmitComment() {
        const illustId = illustInfo.illustration_id;
        const userId   = sessionInfo.id;
        const content  = commentInput.current.value;

        const res = await axios.put("http://localhost:3100/illust/comment", {illustId, userId, content});
        if (!res.data.success) {
            alert("등록에 실패했습니다");
        }
        getCommentList();
    }

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={false}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.imageView}>
                        <div className={styles.illust}>
                            <img
                                className={styles.heartIcon}
                                src={illustInfo.is_heart === "true" ? heartFillIcon : heartIcon}
                                alt="heartIcon"
                                onClick={fnHeartClick}></img>
                            <img
                                className={styles.illustImg}
                                src={"http://localhost:3100/" + illustInfo.image_src}
                                alt="illustImg"
                                ></img>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>{illustInfo.title}</div>
                            <div className={styles.content}>
                                {illustInfo.caption}
                            </div>
                            <div className={styles.tag}>
                                {illustInfo.tag} 
                            </div>
                            <div className={styles.infoLine}>
                                <img className={styles.infoIcon} src={ viewIcon } alt="viewIcon"></img>
                                <div className={styles.infoText}>
                                    {illustInfo.hit}
                                </div>
                                <img className={styles.infoIcon} src={ heartGrayIcon } alt="heartGrayIcon"></img>
                                <div className={styles.infoText}>
                                    {illustInfo.heartCnt}
                                </div>
                                <img className={styles.infoIcon} src={ commentIcon } alt="commentIcon"></img>
                                <div className={styles.infoText}>
                                    {illustInfo.commentCnt}
                                </div>
                            </div>
                            <div className={styles.date}>{illustInfo.cdatetime}</div>
                        </div>
                    </div>
                    <div className={styles.authorView}>
                        <div className={styles.authorLine} onClick={() => {
                            fnGoAuthorProfile(illustInfo.id);
                        }}>
                            <img
                                className={styles.authorThumb}
                                src={"http://localhost:3100/"+illustInfo.profileImg}
                                alt="authorThumb"
                                ></img>
                            <div className={styles.authorName}>{illustInfo.nickname}</div>
                        </div>
                        <div
                            className={illustInfo.is_follow === "true" ? styles.unFollowBtn : styles.followBtn}
                            onClick={fnFollowBtnClick}>
                            {illustInfo.is_follow === "true" ? "팔로우 중" : "팔로우 하기"}
                        </div>
                    </div>
                    <div className={styles.commentView}>
                        <div className={styles.commentWrapper}>
                            <h3 className={styles.commentTitle}>댓글</h3>

                            <hr className={styles.line}></hr>

                            <div className={styles.inputComment}>
                                <img
                                    className={styles.userThumbnail}
                                    src={"http://localhost:3100/" + sessionInfo.profileImg}
                                    alt="userThumbnail"
                                ></img>
                                <input
                                    className={styles.inputBox}
                                    placeholder="댓글 입력"
                                    ref={commentInput}
                                ></input>
                                <div className={styles.submitBtn} onClick={fnSubmitComment}>전송</div>
                            </div>
                            <div className={styles.commentList}>
                                {commentList.map((item) => {
                                    return (
                                        <div className={styles.commentCell}>
                                            <img
                                                className={styles.userThumbnail}
                                                src={"http://localhost:3100/"+item.profileImg}
                                                alt="userThumbnail"
                                            ></img>
                                            <div className={styles.commentInfo}>
                                                <div className={styles.userName}>{item.nickname}</div>
                                                <div className={styles.commentContent}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div> {/* 더미 */} </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default IllustView;