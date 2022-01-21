import {  useContext, useState } from "react";
import { Col, Container, Row} from "react-bootstrap";
import UserContext from "../UserContext";
import './../Css-File/Cart.css';





export default function Cart(){
    const { user } = useContext(UserContext)
    const [cartData, setCartData] = useState()
    const [productId, setProductId] = useState([])
    let arrData = []
  


    const carts = () => {
        fetch("http://localhost:4000/product/view-cart",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.id
            })

        })
                    .then(response => response.json())
            .then(data => {
                let dataId = data.map(id => {
                    return id.cartItems
                })
                
                setProductId(dataId)
                getProduct()
            })
    }
    


    const getProduct = () => {
            let getp = productId.map(item => {
                
            return (<>{fetch("http://localhost:4000/product/get-product",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: item
                })
            })
            .then(response => response.json())
            .then(data => {
                
                arrData.push(data)
                return data.result
            })
            .catch(error => error)
        }</>)})
        setCartData(arrData)
         console.log(cartData)
        
       
    }
    let count = 1
    if(count === 1){
        
        count++
        console.log(count)
    } 
   




    return (
        <>
            <Container>
                
                <Row className="align-items-center">
                    <h1 className="text-center mt-5">Cart</h1>
                    <Col className="col ">
                         {/* <Table striped bordered hover className="d-block mx-auto">
                            <thead>
                                <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                             <tbody>
                               {cartData.map(items => {
                                   return (
                                       <Fragment key={items._id}>
                                           <tr>
                                               <td>{<img src={items.img} alt="null"/>}</td>
                                               <td>{items.name}</td>
                                               <td>
                                                   <Button>-</Button>
                                                   <Button>+</Button>
                                               </td>
                                               <td>Hello</td>
                                               <td></td>
                                           </tr>

                                       </Fragment>
                                   )
                               })}
                               <tr>
                                   <td>Hello</td>
                               </tr>
                            </tbody>
                        </Table>  */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}