import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { HeaderWithButtons } from "../components/Header.js";
import Product from "../components/cart/Product.js"


export default function Home () {

    const [products , setProducts ] = useState([])


        const promise = axios.get("https://localhost:5000/getallproducts")

        promise.then( res => {
           const { productsarr } = res.data;
           setProducts(productsarr);
           console.log(productsarr);
        }, [])
        promise.catch( err => {
            console.error(err);
            }
        );


    const renderingCards = products.map((product,index) => {
            return (
                    <Product key={index}  name={product.name} price={product.price} image={product.image}  />
                    <Separator />
            );  
        });
        
        <ol>
            {renderingCards}
        </ol>
    


    return (
        <>
            <HeaderWithButtons>
                <Container>
                    <Separator />
                    <div>
                        {products.length ? 
                        
                        <StyledOl>
                            {renderingCards} 
                        </StyledOl>
                        : null}    
                    </div>
                </Container> 
            </HeaderWithButtons>
        </>
    )
}
const Container = styled.div`
	width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 4%;
	background-color: #FFFFFF;

    h1 {
        font-family: 'VT323';
        font-style: normal;
        font-weight: 400;
        font-size: 58px;
        line-height: 58px;

        color: #000000;
    }
`;

const StyledOl = styled.ol`
    width: 100%;
    height: auto;
    
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

const Separator = styled.div`
    width: 100%;
    height: 0.8vh;
    background: #E8E8E8;
    border-radius: 5px;
`