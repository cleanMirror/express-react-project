import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import styles from "../css/Illustration.module.css"
import heartIcon from "../image/heart.png"
import { useNavigate } from "react-router-dom";

function Illustration() {

    const navigate = useNavigate();

    var testList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    function fnGoIllustView() {
        navigate("/illustView");
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
                        {testList.map((item) => {
                            return (
                                <div className={styles.gridCell}>
                                    <div className={styles.thumbnail} onClick={fnGoIllustView}>
                                        <img className={styles.heartBtn} src={heartIcon} alt="heart"></img>
                                    </div>
                                    <div className={styles.imgTitleWrapper}>
                                        <div className={styles.imgTitle}>그림 제목</div>
                                    </div>
                                    <div className={styles.authorWrapper}>
                                        <div className={styles.authorThumb}></div>
                                        <div className={styles.author}>작가 이름</div>
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