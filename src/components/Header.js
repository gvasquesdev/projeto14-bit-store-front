import styled from "styled-components";
import { CartOutline, PersonCircleOutline } from "react-ionicons";
import { useContext } from "react"
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom"

import UserContext from "../contexts/UserContext.js"

export function HeaderWithButtons () {
    const navigate = useNavigate()

    const { config } = useContext(UserContext)

    function checkLogin () {

        const promise = axios.get("https://bit-store-back.herokuapp.com/sales", config)

        promise.then( res => {
            navigate("/minha-conta")
        })
        promise.catch( err => {
            if(err.response.status === 401) {
                navigate("/login")   
            }
            
        })
    }

    return (
        <ContainerWithButtons>
            <Link to="/carrinho" >
            <CartOutline color={'#C1D8EC'} height="40px" width="40px" />
            </Link>
            <StyledLink to="/" >
                <h1>Bit Store</h1>
            </StyledLink>
            <div onClick={checkLogin}>
                <PersonCircleOutline color={'#C1D8EC'} height="40px" width="40px"/>
            </div>
        </ContainerWithButtons>
    )

}

export function HeaderWithoutButtons () {

    return (
        <ContainerWithoutButtons>
            <StyledLink to="/" >
                <h1>Bit Store</h1>
            </StyledLink>
        </ContainerWithoutButtons>
    )
}

const StyledLink = styled(Link)`
    text-decoration: none;
`

const ContainerWithButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 10vh;
    background: #222222;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;

    h1 {
        font-family: 'VT323';
        font-style: normal;
        font-weight: 400;
        font-size: 58px;
        line-height: 58px;

        color: #01BC84;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`

const ContainerWithoutButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 10vh;
    background: #222222;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;

    h1 {
        font-family: 'VT323';
        font-style: normal;
        font-weight: 400;
        font-size: 58px;
        line-height: 58px;

        color: #01BC84;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`