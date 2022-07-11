import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import axios from "axios"

import UserContext from "../../contexts/UserContext.js"
import { Navigate } from "react-router-dom"

export default function Product ({ name, price, image, department }) {
    const navigate = useNavigate()

    const { loading, setLoading, config } = useContext(UserContext)

    function addToUserCart () {
        setLoading(true)

        const body = {
            name,
            price,
            image,
            department
        }

        const promise = axios.post("https://bit-store-back.herokuapp.com/addtocart", body, config)

        promise.then( res => {
            setLoading(false)
            alert("Produto adicionado ao carrinho!")
            }
        )
        promise.catch( err => {
            setLoading(false)
            if(err.response.status === 401) {
                if (window.confirm("É necessário ter um login no site para registrar produtos no carrinho! \n Deseja ser redirecionado(a) para tela de login?")) {
                   navigate("/login") 
                }
            } else if (err.response.status === 409) {
                alert(err.response.data.error)
            } else {
                alert("Houve um erro ao registar o produto no carrinho")
            }
            }  
        )
    }

    return (
        <>
            <Container>
                <img src={image} alt={`imagem do produto ${name}`} />
                <h1>{name}</h1>
                <h2>{`R$ ${(price).toFixed(2).toString().replace(".", ",")}`}</h2>
                <button disabled={loading} onClick={addToUserCart}>Adicionar ao carrinho</button>
            </Container> 
        </>
    )
}
const Container = styled.div`
    width: 45vw;
    height: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
	background-color: #FFFFFF;
    margin-bottom: 8vh;

    img {
        width: 100%;
        height: auto;
        margin-bottom: 2vh;
    }

    h1 {
        width: 100%;
        height: 10vw;
        text-align: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;


        color: #8f8f8f;
    }

    h2 {
        width: 33vw;
        height: auto;
        text-align: center;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        color: #5F5F5F;
        margin: 1vh 0;
    }
    
    button {
        width: 100%;
        height: auto;
        padding: 5px;
        color: #01BC84;
        background: #FFFFFF;
        border: 2px solid #01BC84;
    }

`;