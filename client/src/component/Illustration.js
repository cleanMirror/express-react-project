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
                        <h3>일러스트</h3>
                    </div>
                    <hr className={styles.line}></hr>
                    <IllustListView></IllustListView>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Illustration;