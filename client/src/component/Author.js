import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/Author.module.css"
import IllustListView from "./IllustListView";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Author() {

    const location = useLocation();
    const userId = location.state.userId;

    const [authorInfo, setAuthorInfo] = useState({});

    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    useEffect(() => {
        getAuthorInfo();
    }, []);

    async function getAuthorInfo() {
        const res = await axios.get("http://localhost:3100/author/" + userId + "?session_id=" + sessionInfo.id);
        setAuthorInfo(res.data.info);
    }

    async function fnThumbChange(e) {
        const formData = new FormData();
        formData.append('thumb', e.target.files[ 0 ]);
        formData.append('userId', userId);

        try {
            const response = await axios.post('http://localhost:3100/author', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch(error) {
            console.error("에러", error);
        }

        getAuthorInfo();
    }

    async function fnFollowBtnClick() {
        if (authorInfo.is_follow == "true") {
            const res = await axios.delete(
                "http://localhost:3100/follow"
                + "?author_id="+ authorInfo.id
                + "&session_id=" + sessionInfo.id);
        } else {
            const res = await axios.put(
                "http://localhost:3100/follow"
                + "?author_id="+ authorInfo.id
                + "&session_id=" + sessionInfo.id);
        }
        getAuthorInfo();
    }

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={false}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.authorInfo}>
                        <label>
                            <img className={styles.thumbnail}
                            src={"http://localhost:3100/" + authorInfo.profileImg} ></img>
                            <input type="file" onChange={fnThumbChange} hidden></input>
                        </label>
                        <div className={styles.infoText}>
                            <h3 className={styles.authorName}>{authorInfo.nickname}</h3>
                            <div className={styles.followCount}>13 팔로우 중</div>
                            <div className={styles.authorIntroduce}>{authorInfo.introduce}</div>
                        </div>
                        <div
                            className={authorInfo.is_follow == "true" ? styles.unFollowBtn : styles.followBtn}
                            onClick={fnFollowBtnClick}>
                                {authorInfo.is_follow == "true" ? "팔로우 중" : "팔로우 하기"}
                        </div>
                    </div>
                    <h3 className={styles.tabTitle}>일러스트</h3>
                    <hr className={styles.line}></hr>
                    <IllustListView></IllustListView>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Author;