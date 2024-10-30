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

router.route("/:userId")
    .get((req, res)=>{
        const userId = req.params.userId;
        const {session_id} = req.query;

        const query = `SELECT   
                                U.id,
                                U.profileImg,
                                U.nickname,
                                U.introduce,
                                IF(ISNULL(F.follower_id), 'false', 'true') AS is_follow,
                                IFNULL(F2.followCnt, 0) AS followCnt
                       FROM     bixiv_user U
                       LEFT JOIN bixiv_follow F ON U.id = F.target_id AND F.follower_id = ?
                       LEFT JOIN (
                            SELECT	target_id, COUNT(*) AS followCnt
                            FROM	bixiv_follow
                            GROUP BY target_id
                       ) F2 ON U.id = F2.target_id
                       WHERE    id = ?`;
        connection.query(query, [session_id, userId], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                return;
            }
            res.json({ info : results[ 0 ] }); 
        });
    })

router.route("/")
    .post(upload.array('thumb'), (req, res) => {
        const { userId } = req.body;
        const files = req.files;

        const query = "UPDATE bixiv_user SET profileImg = ? WHERE id = ?";

        connection.query(query, [files[ 0 ].path, userId], (err, results) => {
            if (err) {
                console.log("썸네일 등록 실패!", err);
                return;
            }
            res.json({success : true, message : "썸네일 등록 성공"});
        })
    })
  
module.exports = router;