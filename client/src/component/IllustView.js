import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/IllustView.module.css"
import heartIcon from "../image/heart.png"
import viewIcon from "../image/view.png"
import heartGrayIcon from "../image/heart_fill_gray.png"
import commentIcon from "../image/comment.png"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function IllustView() {

    const location = useLocation();
    const id = location.state.id;

    const [illustInfo, setIllustInfo] = useState({});

    useEffect(() => {
        getIllustInfo();
    }, []);

    async function getIllustInfo() {
        const res = await axios.get("http://localhost:3100/illust/" + id);
        console.log(res.data.info[ 0 ]);
        setIllustInfo(res.data.info[ 0 ]);
    }

    const testCommentList = [{}, {}, {}, {}, {}];

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={false}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.imageView}>
                        <div className={styles.illust}>
                            <img className={styles.heartIcon} src={heartIcon} alt="heartIcon"></img>
                            <img className={styles.illustImg} src={"http://localhost:3100/" + illustInfo.image_src}></img>
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
                                {illustInfo.hit}
                                <img className={styles.infoIcon} src={ heartGrayIcon } alt="heartGrayIcon"></img>
                                좋아요
                                <img className={styles.infoIcon} src={ commentIcon } alt="commentIcon"></img>
                                댓글
                            </div>
                            <div className={styles.date}>{illustInfo.cdatetime}</div>
                        </div>
                    </div>
                    <div className={styles.authorView}>
                        <div className={styles.authorLine}>
                            <div className={styles.authorThumb}></div>
                            <div>작가 이름</div>
                        </div>
                        <div className={styles.followBtn}>팔로우</div>
                    </div>
                    <div className={styles.commentView}>
                        <div className={styles.commentWrapper}>
                            <h3 className={styles.commentTitle}>댓글</h3>

                            <hr className={styles.line}></hr>

                            <div className={styles.inputComment}>
                                <div className={styles.userThumbnail}></div>
                                <input className={styles.inputBox} placeholder="댓글 입력"></input>
                                <div className={styles.submitBtn}>전송</div>
                            </div>
                            <div className={styles.commentList}>
                                {testCommentList.map((item) => {
                                    return (
                                        <div className={styles.commentCell}>
                                            <div className={styles.userThumbnail}></div>
                                            <div className={styles.commentInfo}>
                                                <div className={styles.userName}>유저이름</div>
                                                <div className={styles.commentContent}>
                                                    댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
                                                    댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
                                                    댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
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