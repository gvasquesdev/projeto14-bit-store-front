import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext.js";

export default function SignInForm () {

    const { setConfig, loading, setLoading} = useContext(UserContext)
    const navigate = useNavigate()

    const [ emailLogin, setEmailLogin ] = useState("")
    const [ passwordLogin, setPasswordLogin ] = useState("")


    useEffect(() => { 
        setLoading(false)
	}, []);

    function Logar (event) {
        event.preventDefault()
        setLoading(true)

        const body = {
            email: emailLogin,
            password: passwordLogin
        }

        const promise = axios.post("https://bit-store-back.herokuapp.com/signIn", body)

        promise.then( res => {
            localStorage.setItem("config", res.data.token)
            setLoading(false)
            setConfig({headers: {Authorization: `Bearer ${res.data.token}`}})
            navigate("/")
            }
        )
        promise.catch( err => {
            setLoading(false)
            if(err.response.status === 401) {
                alert(err.response.data.error)
            }
            }  
        )

    }

    return (
        <Container>
            <form onSubmit={Logar}>
                <input disabled={loading} placeholder="email" type="email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                <input disabled={loading} placeholder="senha" type="password" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} />
                <button type="submit" disabled={!(emailLogin && passwordLogin) || loading}>Entrar</button>
                <h2 onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se aqui</h2>
            </form>
        </Container>
    )
}

const Container = styled.div`
	width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;

    button {
        width: 80vw;
        display: flex;
        justify-content: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;
        border: 0;
        padding: 10px;
        margin-top: 3vh;
        border-radius: 5px;

        color: #FFFFFF;
        background: #01BC84;
    }

    form {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3vh 0;
    }


    form h2 {
        width: 100%;
        font-family: 'Lato';
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 20px;

        color: #01BC84;
        margin: 2vh 0 4vh;

    }

    form input {
        width: 100%;
        height: 5vh;
        padding: 0 0 0 15px;
        display: flex;
        align-items: center;
        margin: 0 0 2vh;
        border: 1px solid #8f8f8f;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 16px;
        color: #000000;
        background: #FFFFFF;
    }
    form input:disabled {
        color: #AFAFAF;
        background: #F2F2F2;
    }
    form input::placeholder {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #8f8f8f;
    }
    form button:disabled {
        opacity: 0.3;
    }
`;