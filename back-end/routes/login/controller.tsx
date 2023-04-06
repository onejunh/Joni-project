const dbconfig = require('../../config/config.tsx');
const conn = dbconfig.init();
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "select name, nickname, email from jh_user where email = ? and password = ?";
    const params = [email, password];
    conn.query(sql, params,
        (err, result) => {
            if (result.length <= 0) {
                res.status(403).json("아이디나 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }else{
                try {
                    // access token 발급
                    const accessToken = jwt.sign({
                        nickname : result[0].nickname,
                        email : result[0].email,
                    }, process.env.ACCESS_SECRET, {
                        expiresIn: '5m',
                        issuer: 'About Joni'
                    });

                    // refresh token 발급
                    const refreshToken = jwt.sign({
                        nickname : result[0].nickname,
                        email : result[0].email,
                    }, process.env.REFRESH_SECRET, {
                        expiresIn: '24h',
                        issuer: 'About Joni'
                    });

                    res.cookie("accessToken", accessToken, {
                        secure: false,
                        sameSite: 'strict',
                        httpOnly: true
                    });

                    res.cookie("refreshToken", refreshToken, {
                        secure: false,
                        sameSite: 'strict',
                        httpOnly: true
                    });

                    res.status(200).json("성공");

                }catch (error){
                    console.log(error);
                    res.status(500).json(error);
                }
            }
        });
};

exports.accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const sql = "select nickname, email from jh_user where email = ?";
        const params = [data.email];
        conn.query(sql, params,
            (err, result) => {
                if(result.length>0){
                    res.status(200).json(result[0]);
                }else{
                    res.status(403).json("내부 서버 네트워크 오류로 인해 다시 시도해주시기 바랍니다.");
                }
            });
    }catch (error){
        res.status(500).json(error);
    }
};

exports.refreshToken = (req, res) => {
    try{
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);

        const sql = "select nickname, email from jh_user where email = ?";
        const params = [data.email];
        conn.query(sql, params,
            (err, result) => {
                if(result.length>0){
                    // access token 새로 발급
                    const accessToken = jwt.sign({
                        nickname : result[0].nickname,
                        email : result[0].email,
                    }, process.env.ACCESS_SECRET, {
                        expiresIn: '5m',
                        issuer: 'About Joni'
                    });

                    res.cookie("accessToken", accessToken, {
                        secure: false,
                        sameSite: 'strict',
                        httpOnly: true
                    });
                    res.status(200).json("재발급 성공");
                }else{
                    res.status(403).json("내부 서버 네트워크 오류로 인해 다시 시도해주시기 바랍니다.");
                }
            });
    }catch (error){
        res.status(500).json(error);
    }
};

exports.loginSuccess = (req, res) => {
    console.log("?");
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json("no token!");
        }
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const sql = "select seq, name, nickname, gender, phone, birth, join_type, email from jh_user where email = ?";
        const params = [data.email];
        conn.query(sql, params,
            (err, result) => {
                if(result.length>0){
                    res.status(200).json(result[0]);
                }else{
                    res.status(403).json("내부 서버 네트워크 오류로 인해 다시 시도해주시기 바랍니다.");
                }

            });

    }catch (error){
        res.status(500).json(error);
    }
};

exports.logout = (req, res) => {
    try{
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.status(200).json('Logout Success');
    }catch (error) {
        res.status(500).json(error);
    }
};
