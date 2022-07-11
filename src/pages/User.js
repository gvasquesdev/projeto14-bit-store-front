import styled from "styled-components";
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import UserContext from "../contexts/UserContext.js"
import Order from "../components/user/Order.js"
import { HeaderWithButtons } from "../components/Header";

export default function User () {

    const navigate = useNavigate()
    const { config } = useContext(UserContext)
    const [ userName, setUserName ] = useState("")
    const [ userEmail, setUserEmail ] = useState("")
    const [ userOrders, setUserOrders ] = useState([])


    useEffect(() => {
        getUserData()
	}, []);

    function getUserData () {

        const promise = axios.get("http://localhost:5000/sales", config)

        promise.then( res => {
            setUserName(res.data.user.name)
            setUserEmail(res.data.user.email)
            setUserOrders(res.data.userOrders)
        })
        promise.catch( err => {
            if(err.response.status === 401) {
                alert("Houve um erro com a autenticação do cliente, por favor faça login novamente")
                navigate("/login")     
            }
        })

    }

    function logout () {
        localStorage.removeItem("config")
        navigate("/login")
    }

    const displayUserOrders = userOrders.map(( order, index ) => {
        return (
            <>
                <Order key={index} index={index+1} products={order.products} price={order.price} address={order.address} date={order.date} />
                <Separator />
            </>

        )
    })



    return (
        <>
            <HeaderWithButtons />
            <Container>
                {userName.length ? 
                <>
                    <h1>Minha conta</h1>
                    <Separator />
                    <h2> Olá, {userName}</h2>
                    <h3>email cadastrado: {userEmail}</h3>
                    <button onClick={logout}>Deslogar</button>
                    <Separator />
                    <h1>Meus pedidos</h1>
                    {userOrders.length ? 
                        <StyledOl>
                            {displayUserOrders}
                        </StyledOl> :
                        <h2>Você ainda não realizou nenhum pedido com esta conta :(</h2>
                    }

                </>
                : null}
            </Container> 
        </>
    )
}

const StyledOl = styled.ol`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
	width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 4%;
	background-color: #FFFFFF;
    margin-top: 12vh;

    > h1 {
        width: 100%;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;

        color: #5F5F5F;
        margin: 2vh 0 1.5vh;
    }
    > h1:nth-child(6) {
        margin-bottom: 3vh;
    }

    > h2 {
        width: 100%;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;

        color: #8f8f8f;
        margin: 2vh 0 1.5vh;
    }

    > h2:last-child {
        text-align: center;
    }
    > h3 {
        width: 100%;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 20px;

        color: #8f8f8f;
        margin: 0 0 2vh;
    }

    button {
        width: 50vw;
        height: auto;
        display: flex;
        justify-content: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 14px;
        border: 0;
        padding: 10px;
        border-radius: 5px;
        margin: 2vh;

        color: #FFFFFF;
        background: #01BC84;
    }
`;

const Separator = styled.div`
    width: 100%;
    height: 0.8vh;
    background: #E8E8E8;
    border-radius: 5px;
`