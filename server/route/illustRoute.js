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
        const query = `SELECT   *
                       FROM     bixiv_illustration I1
                       INNER JOIN bixiv_image I2 ON I1.illustration_id = I2.illustration_id`;
        connection.query(query, (err, results) => {
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
        const userId = "user1";
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

router.route("/:id")
    .get((req, res) => {
        const illustId = req.params.id;

        const query = `SELECT   *
                       FROM     bixiv_illustration I1
                       INNER JOIN bixiv_image I2 ON I1.illustration_id = I2.illustration_id
                       WHERE    I1.illustration_id = ?`;
        connection.query(query, [illustId], (err, results) => {
            if (err) {
                console.error("쿼리 에러!", err);
                return;
            }
            res.json({info : results});
        });
    });

module.exports = router;