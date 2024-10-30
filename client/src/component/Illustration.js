import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import styles from "../css/Illustration.module.css"
import IllustListView from "./IllustListView";

function Illustration() {

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={true}></SideBar>
            <div id={styles.illustContainer}>
                <div className={styles.mainWrapper}>
                    <div className={styles.title}>
                        <div>일러스트</div>
                    </div>
                    <hr className={styles.line}></hr>
                    <IllustListView author={"all"}></IllustListView>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Illustration;