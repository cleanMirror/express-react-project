import heartIcon from "../image/heart.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/IllustListView.module.css"
import axios from "axios";

function IllustListView(props) {

    const navigate = useNavigate();

    const [illustList, setIllustList] = useState([]);
    
    const [totalPage, setTotalPage] = useState();
    let currPage = 1;
    const pageSize = 16;

    useEffect(() => {
        getTotalCnt();
        getIllustList();
    }, []);

    async function getTotalCnt() {
        const res = await axios.get("http://localhost:3100/illust/getTotalCnt");
        setTotalPage(Math.ceil(res.data.count / pageSize) );
    }

    async function getIllustList() {
        const start = (currPage - 1) * pageSize;
        const res = await axios.get("http://localhost:3100/illust/?start=" + start + "&size=" + pageSize);
        setIllustList(res.data.list);
    }

    function fnGoIllustView(id) {
        navigate("/illustView", { state : {id : id}});
    }

    function fnGoAuthorProfile(userId) {
        navigate("/author", { state : {userId : userId} } );
    }

    function fnPageBtnClick(pageNum) {
        if (pageNum < 1        ) pageNum = 1;
        if (pageNum > totalPage) pageNum = totalPage;

        currPage = pageNum;
        getIllustList();
    }

    function pageBtnRender() {
        const result = [];
        for (let i = 0; i < totalPage; i++) {
            result.push(<div className={styles.pageBtn} onClick={() => {
                fnPageBtnClick(i+1);
            }}>{i+1}</div>)
        }
        return result;
    }

    return (
        <>
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
                            <div className={styles.authorWrapper} onClick={() => {
                                fnGoAuthorProfile(item.author_id);
                            }}>
                                <img className={styles.authorThumb} src={"http://localhost:3100/"+item.profileImg}></img>
                                <div className={styles.author}>{item.nickname}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.pagination}>
                <div className={styles.pageBtn} onClick={() => {
                    fnPageBtnClick(currPage-1);
                }}>이전</div>
                {pageBtnRender()}
                <div className={styles.pageBtn} onClick={() => {
                    fnPageBtnClick(currPage+1);
                }}>다음</div>
            </div>
        </>
    );
}

export default IllustListView;