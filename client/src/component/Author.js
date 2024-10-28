import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/Author.module.css"
import IllustListView from "./IllustListView";
import { useEffect, useState } from "react";
import axios from "axios";

function Author() {

    const location = useLocation();
    const userId = location.state.userId;

    const [authorInfo, setAuthorInfo] = useState({});

    useEffect(() => {
        getAuthorInfo();
    }, []);

    async function getAuthorInfo() {
        const res = await axios.get("http://localhost:3100/author/" + userId);
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
                        <div className={styles.followBtn}>팔로우 하기</div>
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