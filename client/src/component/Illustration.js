import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import "../css/Illustration.css"

function Illustration() {

    var testList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    return (
        <div>
            <Header></Header>
            <SideBar></SideBar>
            <div id="illustContainer">
                <div className="mainWrapper">

                    <div className="title">
                        <h3>일러스트</h3>
                    </div>

                    <hr className="line"></hr>

                    <div className="gridContainer">
                        {testList.map((item) => {
                            return (
                                <div className="gridCell">
                                    <div className="thumbnail">
                                        thumbnail
                                        <div className="heartBtn">좋</div>
                                    </div>
                                    <div className="imgTitleWrapper">
                                        <div className="imgTitle">그림 제목</div>
                                    </div>
                                    <div className="authorWrapper">
                                        <div className="authorThumb">썸</div>
                                        <div className="author">작가 이름</div>
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

export default Illustration;