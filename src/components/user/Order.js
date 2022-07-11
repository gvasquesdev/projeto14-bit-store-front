import styled from "styled-components";

export default function Order ({ index, products, price, address, date }) {

    const displayOrderProducts = products.map(( product, index ) => {
        return (
            <Product>
                <div>
                    <h2>x{product.quantity}</h2>
                    <img src={product.image} alt={`imagem do produto ${product.name}`} />
                    <h2>{product.name}</h2>
                </div>
                <h3>{`R$ ${(product.price*product.quantity).toFixed(2).toString().replace(".", ",")}`}</h3>
            </Product>
        )
    })


    return (
        <Container>
            <div>
                <h1>Pedido #{index}</h1>
                <h2>{date}</h2>
            </div>
            <StyledOl>
                {displayOrderProducts}
            </StyledOl>
            <div>
                <h3>Total:</h3>
                <h4>{`R$ ${price.toFixed(2).toString().replace(".", ",")}`}</h4>

            </div>
            <div>
                <h3>Endereço:</h3>
                <h4>{address}</h4>
            </div>
            
        </Container> 
    )
}

const Product = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        width: 65%;
        height: auto;
        display: flex;
        align-items: center;
    }

    img {
        width: 10vw;
        height: auto;
        margin: 0 4vw 0 2vw;

    }

    h2 {
        width: auto;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 20px;

        color: #5F5F5F;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h2:nth-child(3) {
        width: 65%;
    }

    h3 {
        width: auto;
        white-space: nowrap;
        text-align: right;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #5F5F5F;
    }


`

const Container = styled.div`

    > div {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
    }

    > div h1 {
        width: auto;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #5F5F5F;
        margin: 2vh 0 1.5vh;
    }
    > div h2 {
        width: auto;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #5F5F5F;
        margin: 2vh 0 1.5vh;
    }
    > div h3 {
        width: auto;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #5F5F5F;
        margin: 0 2vw 1vh 0;
    }
    > div h4 {
        width: auto;
        text-align: left;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #5F5F5F;
        margin: 0 0 1vh;
    }


`;

const StyledOl = styled.ol`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 2vh 0 2vh;
`