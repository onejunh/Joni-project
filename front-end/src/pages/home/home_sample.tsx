import React, {useState} from 'react';
import axios from "axios";

const App = () => {
    const [data, setData] = useState("HI~");

    function clicked() {
        const url = "http://localhost:8080/user/getName";
        axios({
            url: url,
            method: "GET",
            data: {},
        }).then(function(response) {
                setData(response.data[0].nickname);
                console.log("성공");
        })
        .catch(function(error) {
            alert(error.response.data);
        })
    }

    return (
        <>
            <h1>{data}</h1>
            <button onClick={clicked}>Joni World!</button>
        </>
    )
}

export default App;