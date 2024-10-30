import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "../css/PutIllust.module.css"
import { useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function PutIllust() {

    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    const [images , setImages ] = useState([]);
    const [title  , setTitle  ] = useState("");
    const [caption, setCaption] = useState("");
    const [tag    , setTag    ] = useState("");

    const [uploadImg, setUploadImg] = useState();

    const uploadBtn     = useRef();
    const uploadImgView = useRef();

    function fnImageChange(e) {
        if (e.target.files[ 0 ] === undefined) {
            return;
        }

        const imgUrl = URL.createObjectURL(e.target.files[ 0 ]);

        setImages(e.target.files);
        setUploadImg(imgUrl);

        uploadBtn.current.hidden = true;
        uploadImgView.current.hidden = false;
    }

    async function fnSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('images'  , images[ 0 ]   );
        formData.append('authorId', sessionInfo.id);
        formData.append('title'   , title         );
        formData.append('caption' , caption       );
        formData.append('tag'     , tag           );

        try {
            const response = await axios.post('http://localhost:3100/illust', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            fnInit();
        } catch(error) {
            console.error("에러", error);
        }
    }

    function fnInit() {
        setImages([]);
        setTitle("");
        setCaption("");
        setTag("");

        uploadBtn.current.hidden = false;
        uploadImgView.current.hidden = true;
    }

    return (
        <div>
            <Header></Header>
            <SideBar isOpen={true}></SideBar>
            <div id={styles.container}>
                <div className={styles.innerContainer}>
                    <form className={styles.inputForm} onSubmit={ fnSubmit }>
                        <label className={styles.imageView}>
                            <img
                                className={styles.uploadImg}
                                src={uploadImg}
                                ref={uploadImgView}
                                alt="uploadImg"
                                hidden></img>
                            <div
                                className={styles.addImgBtn}
                                ref={uploadBtn}>이미지 추가</div>
                            <input type="file" onChange={fnImageChange} hidden></input>
                        </label>
                        <div className={styles.inputView}>
                            <input
                                className={styles.titleInput}
                                value={title}
                                placeholder="타이틀"
                                onChange={(e) => setTitle(e.target.value)}></input>
                            <textarea
                                className={styles.captionInput}
                                value={caption}
                                placeholder="캡션"
                                onChange={(e) => setCaption(e.target.value)}></textarea>
                            <input
                                className={styles.tagInput}
                                value={tag}
                                placeholder="#태그"
                                onChange={(e) => setTag(e.target.value)}></input>
                            <label>
                                <div className={styles.putBtn}>투고하기</div>
                                <button type="submit" hidden></button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default PutIllust;