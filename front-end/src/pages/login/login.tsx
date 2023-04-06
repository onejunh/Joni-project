import React, {useEffect, useState} from 'react';
import '../../assets/css/login/login.css';
import {
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import {useAxios} from "../../hooks/useAxios";

const Login = () => {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleClick = async () => {
        await fetchData();
    };

    //axios request
    const url = process.env.BASIC_URL + "/login/login";
    const params = {
        email: inputId,
        password : inputPw
    }

    const { loading, code, data, fetchData, setCode } = useAxios(url, "POST", params);

    //axios response
    if(code>0){
        if (code == 200) {
            window.open("/", "_self");
        } else {
            alert(data);
            setCode(0); // code 초기화
        }
    }


    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4' label='Email address' id='inputId' value={inputId}
                      onChange={(e) => setInputId(e.target.value)} type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='inputPw' value={inputPw}
                      onChange={(e) => setInputPw(e.target.value)} type='password'/>

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                <a href="!#">Forgot password?</a>
            </div>

            {loading ? (
                <MDBBtn className="mb-4">Loading...</MDBBtn>
            ) : (
                <MDBBtn className="mb-4" onClick={handleClick}>Sign in</MDBBtn>
            )}

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='google' size="sm"/>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                        <MDBIcon fab icon='github' size="sm"/>
                    </MDBBtn>

                </div>
            </div>
        </MDBContainer>
    );
}

export default Login;