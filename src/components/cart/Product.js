import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import {GoTrashcan} from "react-icons/go"
import styled from "styled-components";

import UserContext from "../../contexts/UserContext.js"

export default function Product ({ getUserCart, name, price, image, quantity }) {
    const navigate = useNavigate()
    const { loading, setLoading, config } = useContext(UserContext)

    function removeFromCart () {
        setLoading(true)
        const promise = axios.post("http://localhost:5000/removefromcart", {name}, config)

        promise.then( res => {
            setLoading(false)
            getUserCart()
        })
        promise.catch( err => {
            setLoading(false)
            if(err.status === 401) {
                alert("Houve um erro com a autenticação do cliente, por favor faça login novamente")
                navigate("/login")
            } else {
                alert("Falha ao remover item do carrinho")
            }
        })

    }

    function increaseProductQuantity () {
        setLoading(true)
        const promise = axios.post("http://localhost:5000/increaseproductquantity", {name}, config)

        promise.then( res => {
            setLoading(false)
            getUserCart()
        })
        promise.catch( err => {
            setLoading(false)
            if(err.status === 401) {
                alert("Houve um erro com a autenticação do cliente, por favor faça login novamente")
                navigate("/login")
            } else {
                alert("Falha ao aumentar quantidade do item")
            }
        })

    }

    function decreaseProductQuantity () {
        setLoading(true)
        const promise = axios.post("http://localhost:5000/decreaseproductquantity", {name}, config)

        promise.then( res => {
            setLoading(false)
            getUserCart()
        })
        promise.catch( err => {
            setLoading(false)
            if(err.status === 401) {
                alert("Houve um erro com a autenticação do cliente, por favor faça login novamente")
                navigate("/login")
            } else {
                alert("Falha ao diminuir quantidade do item")
            }
        })

    }

    return (
        <Container>
            <div>
                <img src={image} alt={`imagem do produto ${name}`} />
                <h2>{name}</h2>
            </div>
            <div onClick={removeFromCart}>
                <StyledTrashCan />
            </div>
            <div>
                <div>
                    <button disabled={(quantity === 1 || loading)} onClick={decreaseProductQuantity}>-</button>
                    <h4>{quantity}</h4>
                    <button disabled={(quantity === 99 || loading)} onClick={increaseProductQuantity}>+</button>
                </div>
                <h5>{`R$ ${(price*quantity).toFixed(2).toString().replace(".", ",")}`}</h5>
            </div>
        </Container> 
    )
}

const StyledTrashCan = styled(GoTrashcan)`
    color: #8f8f8f;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 2vh 0;

    > div > h2 {
        width: 70%;
        height: 15vh;

        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;
        padding-top: 1vh;


        line-height:120%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;


        color: #8f8f8f;
    }

    h5 {
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 20px;

        color: #8f8f8f;
    }

    > div > img {
        width: 15vh;
        height: 15vh;
        margin-right: 4vw;
    }

    > div:nth-child(2) {
        border: 1px solid #8f8f8f;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: -5px;
        top: -5px;
        z-index: 1;
        background-color: #FFFFFF;
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }

    > div:last-child {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        

    }

    > div:first-child {
        display: flex;
        margin-bottom: 1vh;
    }

    div div {
        width: 30%;
        height: 5vh;
        display: flex;
        align-items: center;
        border: 1px solid #8f8f8f;
        border-radius: 10px;
    }

    > div div button {
        width: 30%;
        height: 100%;
        border: 0;
        background-color: #FFFFFF;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 15px;

        color: #4C4C4C;
    }

    button:last-child {
        border-left: 1px solid #8f8f8f;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    button:first-child {
        border-right: 1px solid #8f8f8f;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    button:disabled {
        background-color: #C3C3C3;
        color: #A1A1A1;
    }

    h4 {
        width: 40%;
        text-align: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 15px;

        color: #4C4C4C;
    }
`;