import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import styles from "../css/Illustration.module.css"
import heartIcon from "../image/heart.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Illustration() {

    useEffect(() => {
        getIllustList();
    }, []);

    const navigate = useNavigate();

    const [illustList, setIllustList] = useState([]); 

    async function getIllustList() {
        const res = await axios.get("http://localhost:3100/illust");
        setIllustList(res.data.list);
    }

    function fnGoIllustView(id) {
        navigate("/illustView", { state : {id : id}});
    }

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={true}></SideBar>
            <div id={styles.illustContainer}>
                <div className={styles.mainWrapper}>
                    <div className={styles.title}>
                        <h3>일러스트</h3>
                    </div>

                    <hr className={styles.line}></hr>

                    <div className={styles.gridContainer}>
                        {illustList.map((item) => {
                            return (
                                <div className={styles.gridCell}>
                                    <div className={styles.thumbnailBox} onClick={() => {
                                        fnGoIllustView(item.illustration_id);
                                    }}>
                                        <img className={styles.heartBtn} src={heartIcon} alt="heart"></img>
                                        <img className={styles.thumbnail} src={"http://localhost:3100/" + item.image_src} alt="thumbnail"></img>
                                    </div>
                                    <div className={styles.imgTitleWrapper}>
                                        <div className={styles.imgTitle}>{item.title}</div>
                                    </div>
                                    <div className={styles.authorWrapper}>
                                        <div className={styles.authorThumb}></div>
                                        <div className={styles.author}>{item.author_id}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.pagination}>
                        <div className={styles.pageBtn}>이전</div>
                        <div className={styles.pageBtn}>1</div>
                        <div className={styles.pageBtn}>2</div>
                        <div className={styles.pageBtn}>3</div>
                        <div className={styles.pageBtn}>다음</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Illustration;