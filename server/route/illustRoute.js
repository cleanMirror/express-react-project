const express = require('express')
const router = express.Router();
const connection = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

const upload = multer({ storage : storage });

router.route("/")
    .get((req, res) => {
        const {start, size, userId} = req.query;
        const start_int = parseInt(start);
        const size_int = parseInt(size);

        const query = `SELECT
                                I1.illustration_id,
                                I2.image_src,
                                IF(ISNULL(H.user_id), 'false', 'true') as is_heart,
                                I1.title,
                                I1.author_id,
                                U.profileImg,
                                U.nickname 
                       FROM     bixiv_illustration I1
                       INNER JOIN bixiv_image I2 ON I1.illustration_id = I2.illustration_id
                       INNER JOIN bixiv_user U ON I1.author_id = U.id
                       LEFT JOIN bixiv_heart H ON I1.illustration_id = H.illustration_id AND H.user_id = ?
                       ORDER BY I1.illustration_id desc
                       LIMIT ? OFFSET ?`;
        connection.query(query, [userId, size_int, start_int], (err, results) => {
            if (err) {
                console.error("쿼리 실행 실패!", err);
                return;
            }
            res.json({ list : results });
        })
    })
    .post(upload.array('images'), (req, res) => {
        const {title, caption, tag} = req.body;

        const infoQuery = `INSERT INTO
                               bixiv_illustration (author_id, title, caption, tag, cdatetime)
                           VALUES
                               (?, ?, ?, ?, now())`;
        const userId = "user12";
        connection.query(infoQuery, [userId, title, caption, tag], (err, infoResults) => {
            if (err) {
                console.error("게시글 등록 실패", err);
                return res.json({ success : false, message : "게시글 등록 실패"});
            }

            const illustId = infoResults.insertId;
            const files = req.files;

            const imgQuery = `INSERT INTO
                                  bixiv_image (illustration_id, image_src)
                              VALUES
                                  (?, ?)`;
            connection.query(imgQuery, [illustId, files[ 0 ].path], (err, imgResults) => {
                if (err) {
                    console.error("이미지 저장 실패 : ", err);
                    return res.status(500).json({ success: false, message : "이미지 저장 실패"});
                }
            })

            res.json({ success : true, message: "성공적으로 저장되었습니다!" });
        })
    });

router.route("/getTotalCnt")
    .get((req, res) => {
        const query = `SELECT   COUNT(*) as CNT
                       FROM     bixiv_illustration`;
        connection.query(query, (err, results) => {
            if (err) {
                console.error("쿼리 오류", err);
                return;
            }
            res.json({ count : results[ 0 ].CNT});
        })
    })

router.route("/heart")
    .put((req, res) => {
        const {illustration_id, user_id} = req.query;

        const query = `INSERT INTO  bixiv_heart
                       VALUES (?, ?)`;

        connection.query(query, [illustration_id, user_id], (err, results) => {
            if (err) {
                console.error("쿼리 오류", err);
                return;
            }
            res.json({success : true, message: "좋아요가 추가되었습니다."});
        })
    })
    .delete((req, res) => {
        const {illustration_id, user_id} = req.query;
        
        const query = `DELETE FROM  bixiv_heart
                       WHERE        illustration_id = ? AND user_id = ?`;

        connection.query(query, [illustration_id, user_id], (err, results) => {
            if (err) {
                console.error("쿼리 오류", err);
                return;
            }
            res.json({success : true, message: "좋아요가 해제되었습니다."});
        });
    })

router.route("/comment")
    .get((req, res) => {
        const {illustId} = req.query;
        const query = `SELECT   *
                       FROM     bixiv_comment C
                       INNER JOIN bixiv_user U ON C.user_id = U.id
                       WHERE    C.illustration_id = ?
                       ORDER BY C.cdatetime desc`;
        connection.query(query, [illustId], (err, results) => {
            if (err) {
                console.error("쿼리 에러", err);
                return;
            }
            res.json({list : results});
        })
    })
    .put((req, res) => {
        const {illustId, userId, content} = req.body;

        const query = `INSERT INTO bixiv_comment
                       VALUES (?, ?, ?, NOW())`;
        connection.query(query, [illustId, userId, content], (err, results) => {
            if (err) {
                console.error("쿼리 오류", err);
                return;
            }
            res.json({success : true, message : "댓글 추가됨"});
        })
    })

router.route("/:id")
    .get((req, res) => {
        const illustId = req.params.id;
        const { userId } = req.query;

        const query = `SELECT   
                                I1.illustration_id,
                                I2.image_src,
                                IF(ISNULL(H.user_id), "false", "true") AS is_heart,
                                I1.title,
                                I1.caption,
                                I1.tag,
                                I1.hit,
                                I1.cdatetime,
                                U.id,
                                U.profileImg,
                                U.nickname,
                                H2.heartCnt,
                                C.commentCnt,
                                IF(ISNULL(F.follower_id), "false", "true") AS is_follow
                       FROM     bixiv_illustration I1
                       INNER JOIN bixiv_image I2 ON I1.illustration_id = I2.illustration_id
                       INNER JOIN bixiv_user U ON I1.author_id = U.id
                       LEFT JOIN bixiv_heart H ON I1.illustration_id = H.illustration_id AND H.user_id = ?
                       LEFT JOIN bixiv_follow F ON I1.author_id = F.target_id AND F.follower_id = ?
                       INNER JOIN (
                            SELECT  illustration_id, COUNT(*) AS heartCnt
                            FROM    bixiv_heart
                            WHERE   illustration_id = ?
                       ) H2 ON I1.illustration_id = H2.illustration_id
                       INNER JOIN (
                            SELECT  illustration_id, COUNT(*) AS commentCnt
                            FROM    bixiv_comment
                            WHERE   illustration_id = ?
                       ) C ON I1.illustration_id = C.illustration_id
                       WHERE    I1.illustration_id = ?`;
        connection.query(query, [userId, userId, illustId, illustId, illustId], (err, results) => {
            if (err) {
                console.error("쿼리 에러!", err);
                return;
            }
            res.json({info : results});
        });
    });

module.exports = router;