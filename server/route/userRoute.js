const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');

const JWT_KEY = "secret_201363030";

router.route("/")
    .post((req, res)=>{
        const { id, pwd } = req.body;
        const query = `SELECT   *
                       FROM     bixiv_user
                       WHERE    id = ? AND pwd = ?`;
      
        connection.query(query, [id, pwd], (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            const userInfo = results[ 0 ];

            const token = jwt.sign({
              id : userInfo.id,
              nickname : userInfo.nickname,
              profileImg : userInfo.profileImg
            }, JWT_KEY, {expiresIn : "1h"});

            res.json({ success: true, message: "로그인 성공", token});
          } else {
            // 로그인 실패
            res.json({ success: false, message: '실패!' });
          }
        });
    });

  
module.exports = router;