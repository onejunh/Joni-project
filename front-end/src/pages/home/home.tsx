import React, {useState, useEffect} from 'react';
import axios from "axios";
import Login from "../login/login";
import {useAxios} from "../../hooks/useAxios";

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        nickname: undefined
    });

    const accessToken = () => {
        const url = "http://localhost:8080/login/accessToken";
        axios({
            url: url,
            method: "POST",
        }).then((result) => {
            console.log(result.data);
        });;
    }

    const refreshToken = () => {
        const url = "http://localhost:8080/login/refreshToken";
        axios({
            url: url,
            method: "POST",
        }).then((result) => {
            console.log(result.data);
        });
    }

    const login = () => {
        window.open("/login", "_self")
    };

    const logout = () => {
        const url = "http://localhost:8080/login/logout";
        axios({
            url: url,
            method: "POST",
        }).then((result) => {
            localStorage.removeItem('tokenYn');
            window.open("/login", "_self");
        });
    };
    useEffect(() => {
        loginSuccess();
    }, []);

    const { loading, code, data, setCode } =
        useAxios(process.env.BASIC_URL + "/login/success","POST",null);

    console.log(code,data);
    const loginSuccess = () => {
        //axios response
        if(code>0){
            if (code == 200) {
                setIsLogin(true);
                setUser(data);
            } else {
                alert(data);
                setCode(0); // code 초기화
            }
        }
    }

    return (
        <div>
            {isLogin ? (
                <>
                    <h1>Joni World!</h1>
                    <h3>{user.nickname} 님이 로그인했습니다.</h3>
                    <button onClick={logout}>Logout</button>

                    <button onClick={accessToken}>get AccessToken</button>
                    <button onClick={refreshToken}>get RefreshToken</button>
                </>
            ) : (
                <>
                    <Login />
                </>
            )}
        </div>
    )
}

export default App;