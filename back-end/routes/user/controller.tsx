const dbconfig = require('../../config/config.tsx');
const conn = dbconfig.init();

exports.getUser = (req, res) => {
    const name = "한준d희";
    const sql = "select email, nickname from jh_user where name = ?";
    conn.query(sql, name,
        (err, result) => {
            if (result.length>0) {
                console.log("My name is...", result[0].email);
                res.send(result);
            }else{
                res.status(403).json("존재하지 않는 아이디입니다.");
            }

        });
};