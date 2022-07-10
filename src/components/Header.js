import styled from "styled-components";
import { CartOutline, PeopleCircleOutline } from "react-ionicons";
import { Link } from "react-router-dom";




export function HeaderWithButtons () {

    return (
        <ContainerWithButtons>
            <Link to="/carrinho" >
            <CartOutline color={'#C1D8EC'} height="40px" width="40px" />
            </Link>
            <h1>Bit Store</h1>
            <Link to="/login">
            <PeopleCircleOutline color={'#C1D8EC'} height="40px" width="40px"/>
            </Link>
        </ContainerWithButtons>
    )

}

export function HeaderWithoutButtons () {

    return (
        <ContainerWithoutButtons>
            <h1>Bit Store</h1>
        </ContainerWithoutButtons>
    )
}


const ContainerWithButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 15vh;
    background: #222222;

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
    width: 100%;
    height: 15vh;
    background: #222222;

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