import styled from "styled-components";
import { HeaderWithoutButtons } from "../components/Header";
import SignUpForm from "../components/authentication/SignUpForm.js"

export default function SignIn () {
    return (
        <>
            <HeaderWithoutButtons />
            <Container>
                <h1>Fazer Login</h1>
                <Separator />
                <SignUpForm />
            </Container> 
        </>
    )
}
const Container = styled.div`
	width: 100vw;
    height: auto;
    margin-top: 12vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 4%;
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
    
`;

const Separator = styled.div`
    width: 100%;
    height: 0.8vh;
    background: #E8E8E8;
    border-radius: 5px;
`