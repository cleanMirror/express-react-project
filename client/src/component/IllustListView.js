import heartIcon from "../image/heart.png"
import heartFillIcon from "../image/heart_fill.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "../css/IllustListView.module.css"
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function IllustListView(props) {

    const navigate = useNavigate();

    const [illustList, setIllustList] = useState([]);
    
    const [totalPage, setTotalPage] = useState();
    let currPage = useRef(1);
    const pageSize = 16;

    const token = localStorage.getItem("token");
    const sessionInfo = jwtDecode(token);

    useEffect(() => {
        getTotalCnt();
        getIllustList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getTotalCnt() {
        let res;
        if (props.author === "all") {
            res = await axios.get("http://localhost:3100/illust/getTotalCnt");
        } else {
            res = await axios.get(
                "http://localhost:3100/illust/author/getTotalCnt?"
                + "authorId=" + props.author
            );
        }
        setTotalPage(Math.ceil(res.data.count / pageSize) );
    }

    async function getIllustList() {
        const start = (currPage.current - 1) * pageSize;

        let res;
        if (props.author === "all") {
            res = await axios.get(
                "http://localhost:3100/illust/?"
                + "start=" + start
                + "&size=" + pageSize
                + "&userId=" + sessionInfo.id);
        } else {
            res = await axios.get(
                "http://localhost:3100/illust/author?"
                + "start=" + start
                + "&size=" + pageSize
                + "&authorId=" + props.author
                + "&userId=" + sessionInfo.id);
        }
        setIllustList(res.data.list);
    }

    async function fnGoIllustView(id) {
        await axios.put("http://localhost:3100/illust/hit", {illustId : id});
        navigate("/illustView", { state : {id : id}});
    }

    function fnGoAuthorProfile(userId) {
        navigate("/author", { state : {userId : userId} } );
    }

    function fnPageBtnClick(pageNum) {
        if (pageNum < 1        ) pageNum = 1;
        if (pageNum > totalPage) pageNum = totalPage;

        currPage.current = pageNum;
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

    async function fnHeartClick(id, isHeart) {
        if (isHeart === "true") {
            await axios.delete("http://localhost:3100/illust/heart?illustration_id=" + id + "&user_id=" + sessionInfo.id);
        } else {
            await axios.put("http://localhost:3100/illust/heart?illustration_id=" + id + "&user_id=" + sessionInfo.id);
        }
        getIllustList();
    }

    return (
        <>
            <div className={styles.gridContainer}>
                {illustList.map((item) => {
                    return (
                        <div className={styles.gridCell}>
                            <div className={styles.thumbnailBox}>
                                <img
                                    className={styles.heartBtn}
                                    src={(item.is_heart === "true" ? heartFillIcon : heartIcon)}
                                    alt="heart"
                                    onClick={() => {
                                        fnHeartClick(item.illustration_id, item.is_heart);
                                    }}></img>
                                <img
                                    className={styles.thumbnail}
                                    src={"http://localhost:3100/" + item.image_src}
                                    alt="thumbnail"
                                    onClick={() => {
                                        fnGoIllustView(item.illustration_id);
                                    }}></img>
                            </div>
                            <div className={styles.imgTitleWrapper}>
                                <div className={styles.imgTitle}>{item.title}</div>
                            </div>
                            <div className={styles.authorWrapper} onClick={() => {
                                console.log(item.author_id);
                                fnGoAuthorProfile(item.author_id);
                            }}>
                                <img
                                    className={styles.authorThumb}
                                    src={"http://localhost:3100/"+item.profileImg}
                                    alt="authorThumb"
                                    ></img>
                                <div className={styles.authorName}>{item.nickname}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.pagination}>
                <div className={styles.pageBtn} onClick={() => {
                    fnPageBtnClick(currPage.current-1);
                }}>이전</div>
                {pageBtnRender()}
                <div className={styles.pageBtn} onClick={() => {
                    fnPageBtnClick(currPage.current+1);
                }}>다음</div>
            </div>
        </>
    );
}

export default IllustListView;