import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

function PutIllust() {
    return (
        <div>
            <Header></Header>
            <SideBar isOpen={true}></SideBar>
            PutIllust
            <Footer></Footer>
        </div>
    );
}

export default PutIllust;