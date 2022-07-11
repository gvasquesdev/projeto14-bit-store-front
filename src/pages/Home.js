import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { HeaderWithButtons } from "../components/Header.js";
import Product from "../components/home/Product.js"

import UserContext from "../contexts/UserContext.js"

export default function Home () {

    const { loading, setLoading} = useContext(UserContext)

    const [ products , setProducts ] = useState([])

    useEffect(() => {
        setLoading(false)
        getProducts()
	}, []);


    function getProducts () {
        const promise = axios.get("https://bit-store-back.herokuapp.com/getallproducts")

        promise.then( res => {
           setProducts(res.data);
        }, [])
        promise.catch( err => {
            console.error(err);
            }
        );
    }

    const renderingCards = products.map((product,index) => {
        return (
            <Product key={index} name={product.name} price={product.price} image={product.image} department={product.department}  />
        );  
    });
        


    return (
        <>
            <HeaderWithButtons />
            <Container>
                {products.length ? 
                    <StyledOl>
                        {renderingCards} 
                    </StyledOl>
                : null}    
            </Container> 
        </>
    )
}

const Container = styled.div`
	width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 14vh;
    align-items: center;
    padding: 0 4%;
	background-color: #FFFFFF;

`;

const StyledOl = styled.ol`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10vh;
`;