const express = require('express')
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req, res)=>{
        const { userId } = req.query;
        const query = `SELECT   *
                       FROM     bixiv_follow F
                       INNER JOIN bixiv_user U ON F.target_id = U.id
                       WHERE    follower_id = ?`;
        connection.query(query, [userId], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.json({ list : results }); 
        });
    })
    .put((req, res) => {
        const { author_id, session_id } = req.query;
        
        const query = `INSERT INTO bixiv_follow
                       VALUES (?, ?)`;
        connection.query(query, [author_id, session_id], (err, results) => {
            if (err) {
                console.error('쿼리 실행 오류', err);
                return;
            }
            res.json({success : true, message: "팔로우 됨"});
        })
    })
    .delete((req, res) => {
        const { author_id, session_id } = req.query;

        const query = `DELETE FROM bixiv_follow
                       WHERE target_id = ? AND follower_id = ?`;
        connection.query(query, [author_id, session_id], (err, results) => {
            if (err) {
                console.error("쿼리 실행 오류", err);
                return;
            }
            res.json({success : true, message : "팔로우 해제됨"});
        })
    })

router.route("/feed")
    .post((req, res) => {
        const { list } = req.body;
        
        // 팔로우를 하나도 안했을 때,
        if (list.length == 0) {
            list.push({target_id : "_nobody_"});
        }

        let idList = "(";
        for (let i = 0; i < list.length; i++) {
            idList += "'" + list[ i ].target_id + "'";
            if (i == list.length - 1) break;
            idList += ", ";
        }
        idList += ")";

        const query = `SELECT   
                                U.id,
                                U.profileImg,
                                U.nickname,
                                I1.illustration_id,
                                I2.image_src,
                                I1.hit,
                                IFNULL(H.heartCnt, 0) AS heartCnt,
                                IFNULL(C.commentCnt, 0) AS commentCnt,
                                DATE_FORMAT(I1.cdatetime, '%Y년 %m월 %d일 %p %h:%i') AS cdatetime
                       FROM     bixiv_illustration I1
                       INNER JOIN bixiv_image I2 ON I1.illustration_id = I2.illustration_id
                       INNER JOIN bixiv_user U ON I1.author_id = U.id
                       LEFT JOIN (
                            SELECT  illustration_id, COUNT(*) AS heartCnt
                            FROM    bixiv_heart
                            GROUP BY illustration_id
                       ) H ON I1.illustration_id = H.illustration_id
                       LEFT JOIN (
                            SELECT  illustration_id, COUNT(*) AS commentCnt
                            FROM    bixiv_comment
                            GROUP BY illustration_id
                       ) C ON I1.illustration_id = C.illustration_id
                       WHERE    I1.author_id IN ${idList}
                       ORDER BY I1.illustration_id DESC`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error("쿼리 에러", err);
                return;
            }
            res.json({ feeds : results});
        });
    })
  
module.exports = router;