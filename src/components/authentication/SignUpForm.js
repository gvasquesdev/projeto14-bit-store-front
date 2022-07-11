import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext.js";

export default function SignUpForm () {

    const { setConfig, loading, setLoading} = useContext(UserContext)
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ cpf, setCpf ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")


    useEffect(() => { 
        setLoading(false)
	}, []);

    function Logar (event) {
        event.preventDefault()
        setLoading(true)

        const body = {
            name,
            email,
            cpf,
            password
        }

        const promise = axios.post("http://localhost:5000/signUp", body)

        promise.then( res => {
            setLoading(false)
            navigate("/login")
            }
        )
        promise.catch( err => {
            setLoading(false)
            if(err.response.status === 409) {
                alert(err.response.data.error)
            }
            if(err.response.status === 400) {
                if(err.response.data.error[0].context.label === "password") {
                    alert("Senha inválida! \n Senhas devem conter: \n No mínimo 5 dígitos, \n Ao menos 1 número, \n Ao menos 1 letra maíuscula, \n Ao menos 1 letra minúscula, \n Ao menos 1 caractere especial ")
                } else if (err.response.data.error[0].context.label === "cpf") {
                    alert("Insira um CPF ou CNPJ válido")
                } else if (err.response.data.error[0].context.label === "email") {
                    alert("Insira um email válido")
                } else {
                    alert("Houve um erro no cadastro, confirme os dados e tente novamente")
                }
            }
            }  
        )

    }

    return (
        <Container>
            <form onSubmit={Logar}>
                <input disabled={loading} placeholder="nome" type="text" value={name} onChange={e => setName(e.target.value)} />
                <input disabled={loading} placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input disabled={loading} placeholder="CPF ou CNPJ" type="text" value={cpf} onChange={e => setCpf(e.target.value)} />
                <input disabled={loading} placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input disabled={loading} placeholder="confirme a sua senha" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit" disabled={!(name && email && cpf && password && confirmPassword) || password !== confirmPassword || loading}>Cadastrar</button>
                <h2 onClick={() => navigate("/login")}>Já tem uma conta? Entre aqui</h2>
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
        border-radius: 5px;

        color: #FFFFFF;
        background: #01BC84;
    }

    form {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3vh 0 3vh;
    }



    form div {
        width: 100%;
        display: flex;
        justify-content: space-between;
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