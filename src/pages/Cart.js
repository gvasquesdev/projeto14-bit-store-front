import styled from "styled-components"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {TiShoppingCart} from "react-icons/ti"
import Product from "../components/cart/Product.js"
import axios from "axios"
import dayjs from "dayjs";

import UserContext from "../contexts/UserContext.js"
import { HeaderWithButtons } from "../components/Header";

export default function Cart () {
    const navigate = useNavigate()
    const { loading, setLoading, config } = useContext(UserContext)

    const [ userCart, setUserCart ] = useState([])
    const [ cartStatus, setCartStatus ] = useState("")
    const [ address, setAddress] = useState("")
    const [ totalPrice, setTotalPrice ] = useState(0)

    useEffect(() => {
        setLoading(true)
        getUserCart()
        calcPrice()
	}, []);

    useEffect(() => {
        calcPrice()
	}, [userCart]);

    function getUserCart () {
        const promise = axios.get("http://localhost:5000/carts", config)

        promise.then( res => {
            setLoading(false)
            setCartStatus("registered")
            setUserCart(res.data)
        })
        promise.catch( err => {
            setLoading(false)
            if(err.response.status === 401) {
                setCartStatus("unregistered")
            }
        })
    }

    function calcPrice () {
        let totalPrice = 0
        userCart.map(( product ) => {
            totalPrice += product.price*product.quantity
        })
        setTotalPrice(totalPrice)
    }

    function registerSale (event) {
        event.preventDefault()
        setLoading(true)

        const body = {
            products: userCart,
            price: totalPrice,
            address: address.toString(),
            date: dayjs(Date.now()).format("DD/MM/YYYY")
        }

        const promise = axios.post("http://localhost:5000/sales", body, config)

        promise.then( res => {
            setLoading(false)
            alert("Pedido realizado com sucesso!")
            navigate("/")
        })
        promise.catch( err => {
            setLoading(false)
            if(err.response.status === 401) {
                alert("Houve um erro com a autenticação do cliente, por favor faça login novamente")
                navigate("/login")
            }
        })

    }

    const displayUserCart = userCart.map(( product, index ) => {
        return (
            <>
                <Product key={index} getUserCart={getUserCart} name={product.name} price={product.price} image={product.image} quantity={product.quantity} />
                <Separator />
            </>

        )
    })


    return (
        <>
            <HeaderWithButtons />
            <Container> 
                <h1>Meu carrinho</h1>
                <Separator />
                {loading ? null : userCart.length ? null : cartStatus === "registered" ?
                <div>
                    <StyledShoppingCart />
                    <h2>Seu carrinho está vazio</h2>
                    <button onClick={() => navigate("/")}>Escolher novos produtos</button>
                </div>
                :
                <div>
                    <StyledShoppingCart />
                    <h2>É necessário ter um login no site para salvar itens no carrinho</h2>
                    <button onClick={() => navigate("/login")}>Fazer login</button>
                    <h3 onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se aqui</h3>
                </div>}
                {userCart.length ? 
                <StyledOl>
                    {displayUserCart} 
                </StyledOl>
                : null}    
                {userCart.length ? 
                <div>
                    <h1>Dados do pedido</h1>
                    <form onSubmit={registerSale}>
                        <div>
                            <h4>Valor total:</h4>
                            <h3>{`R$ ${totalPrice.toFixed(2).toString().replace(".", ",")}`}</h3>
                        </div>
                        <h4>Endereço de entrega:</h4>
                        <input disabled={loading} placeholder="Ex: Rua Bananal, Inhoaíba, Rio de Janeiro - RJ" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                        <button type="submit" disabled={!(address) || loading}>Finalizar pedido</button>
                        <h5 onClick={() => navigate("/")}>Ainda não terminou? Clique aqui para escolher novos produtos</h5>
                    </form>
                    
                </div>
                : null}   
            </Container> 
        </>
    )
}

const StyledShoppingCart = styled(TiShoppingCart)`
    color: #8f8f8f;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 4vh;
`

const StyledOl = styled.ol`
    width: 100%;
    height: auto;
    
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
	width: 100vw;
    height: 2000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8vh;
    padding: 0 4% 10vh;
	background-color: #FFFFFF;

    h1 {
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

    > h1 {
        margin-top: 5vh;
    }

    > div > h2 {
        width: 100%;
        font-family: 'Lato';
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;

        color: #8f8f8f;
        margin: 2vh 0 4vh;
    }

    h3 {
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

    form h4 {
        width: 100%;
        font-family: 'Lato';
        text-align: left;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;

        color: #8f8f8f;
    }

    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

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
    }

    form h3 {
        color: #3D3D3D;
        margin: 0;
        text-align: right;
        font-size: 20px;
    }

    form div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 3vh 0;
    }

    form h5 {
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
        margin: 3vh 0 5vh 0;
        padding: 0 0 0 15px;
        display: flex;
        align-items: center;
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
`

const Separator = styled.div`
    width: 100%;
    height: 0.8vh;
    background: #E8E8E8;
    border-radius: 5px;
`