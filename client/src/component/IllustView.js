import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/IllustView.module.css"
import heartIcon from "../image/heart.png"
import viewIcon from "../image/view.png"
import heartGrayIcon from "../image/heart_fill_gray.png"
import commentIcon from "../image/comment.png"

function IllustView() {

    const testCommentList = [{}, {}, {}, {}, {}];

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={false}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.imageView}>
                        <div className={styles.illust}>
                            img
                            <img className={styles.heartIcon} src={heartIcon} alt="heartIcon"></img>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.title}>이미지 제목</div>
                            <div className={styles.content}>
                                이미지 설명 이미지 설명 이미지 설명 이미지 설명 이미지 설명이미지
                                설명이미지 설명이미지 설명이미지 설명이미지 설명이미지 설명
                                이미지 설명이미지 설명이미지 설명이미지 설명이미지 설명이미지 설명
                                이미지 설명이미지 설명이미지 설명이미지 설명이미지 설명이미지 설명
                            </div>
                            <div className={styles.tag}>
                                #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 
                            </div>
                            <div className={styles.infoLine}>
                                <img className={styles.infoIcon} src={ viewIcon } alt="viewIcon"></img>
                                조회수
                                <img className={styles.infoIcon} src={ heartGrayIcon } alt="heartGrayIcon"></img>
                                좋아요
                                <img className={styles.infoIcon} src={ commentIcon } alt="commentIcon"></img>
                                댓글
                            </div>
                            <div className={styles.date}>2024년 10월 4일 오전 1:23</div>
                        </div>
                    </div>
                    <div className={styles.authorView}>
                        <div className={styles.authorLine}>
                            <div className={styles.authorThumb}></div>
                            <div>작가이름</div>
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