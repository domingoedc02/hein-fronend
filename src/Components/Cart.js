import { Fragment, useContext, useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import Swal from "sweetalert2"
import UserContext from "../UserContext"
import './../Css-File/Cart.css'





export default function Cart(){
    const {cartItems, user} = useContext(UserContext)
    let [count, setCount] = useState(1)
    // const [productDetail, setProductDetail] = useState([])
    // const [cartData, setCartData] = useState([])
    // const [totalData, setToalData] =useState()
    // let cartArr = []
    let [totalAmount, setTotalAmount] = useState()
    const [cartId, setCartId] = useState()
    const [name, setName] = useState()
    const [newPrice, setNewPrice] =useState()


                    
    
    // const getProduct = () =>{
    //     fetch("http://localhost:4000/product/view-cart",{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             userId: user.id
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // setProductId(data)
    //         let arr = data.map(items => {
    //             const {cartItems, quantity} = items
    //             return {cartItems, quantity}
    //         })
    //         // setProductId(arr)
    //         setProductDetail(arr)
    //         // localStorage.setItem("cart", `${data.length}`)
    //     })
    //     if(productDetail !== []){
    //         productDetail.map(element => {
    //             fetch("http://localhost:4000/product/get-product", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     id: element.cartItems
    //                 })
    //             })
    //             .then(response => response.json())
    //             .then(data => cartArr.push(data))
                    
    //         })
    //         setCartData(cartArr)
    //         setProductDetail([])
            
    //     } else{
    //         setProductDetail([])
    //     }
    // }

    const deleteCart = () =>{
        if(cartId !== ""){
            fetch("https://domingo-capstone2.herokuapp.com/product/delete-cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    cartItems: cartId
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data !== null){
                    Swal.fire({
                        title: "Successful",
                        icon: "success",
                        text: "The item is now removed in your cart"
                    })
                }
            })
        }
    }

    const Data = () => {
        if(cartItems.productIds !== []){
            
                return cartItems.productIds.map(items => {
                const {price, name, img } = items
                    
                // function incrementCount() {
                //     let temp = count + 1
                //     setCount(temp)
                //     let subtotal = price * count
                //     fetch("http://localhost:4000/product/update-cart", {
                //         method: "PUT",
                //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify({
                //             userId: user.id,
                //             cartItems: items._id,
                //             quantity: count,
                //             subtotal: subtotal
                //         })
                //     })
                //     .then(response => response.json())
                //     .then(data => console.log(data))
                // }
                // function decrementCount() {
                //     let temp = count - 1
                //     setCount(temp)
                //     let subtotal = price * count
                //     fetch("http://localhost:4000/product/update-cart", {
                //         method: "PUT",
                //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify({
                //             userId: user.id,
                //             cartItems: items._id,
                //             quantity: count,
                //             subtotal: subtotal
                //         })
                //     })
                //     .then(response => response.json())
                //     .then(data => console.log(data))
                // }
                // if(items._id !== undefined){
                    
                    function incrementCount() {
                        count = count + 1;
                        setCount(count);
                        setTotalAmount(price)
                        setName(name)
                    setNewPrice(price)
                    setCartId(items._id)
                    }
                    function decrementCount() {
                        count = count - 1;
                        setCount(count);
                        setTotalAmount(price)
                        setName(name)
                    setNewPrice(price)
                    setCartId(items._id)
                    }
                    return (
                        <Fragment key={items._id}>
                            <tr>
                                <td>
                                    <img src={img} className="cartImg"/>
                                </td>
                                <td className="mid">
                                    <h5 className="mid">Name: {name}</h5>
                                    {(items.branchType === "sale") ?<> 
                                        <h6  className="mid">Price: Php {parseInt(price) - ((parseInt(items.onSale.discount) / 100) * parseInt(items.price) )}</h6></>: <><h6 className="mid">Price: Php {price}</h6></>}

                                        <div className="App">
                                            <button className="button" onClick={decrementCount}>-</button>
                                            <div className="button">{count}</div>
                                            <button className="button" onClick={incrementCount}>+</button>
                                        </div>
                                </td>
                                <td className="w-25 mid">
                                    <h5 className="mid">Subtotal: Php {(parseInt(price) * count)}</h5>
                                </td>
                                <td>
                                    <Button className="mid btn-danger" onClick={() => {{setCartId(items._id); deleteCart();}}} >delete</Button>
                                </td>
                                
                            </tr>
                        </Fragment>
                    )
                // }
                
            })
        }
    }
    function checkOut(){
        if(name !== "" ){
            fetch("https://domingo-capstone2.herokuapp.com/order/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    totalAmount: totalAmount,
                    username: user.username,
                    price: newPrice,
                    name: name
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: 'Checkout Successfully',
                    icon: 'success',
                    text: 'Check your transaction details '
                })
                deleteCart()
            })
        }
    }
 

    return (
        <>
            <Container>
                <Row>

                   <Col lg={12}>
                       <h1 className="text-center">Cart</h1>
                        <Table striped bordered hover className="tables w-100">
                            <thead className="w-100">
                                    {/* <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr> */}
                            </thead>
                            <tbody>
                                {Data()}
                                <tr className="w-100">
                                    <td className="w-75" colSpan={2}></td>
                                    <td  colSpan={2}><h5>Total: {totalAmount * count}</h5></td>
                                    
                                </tr>

                            </tbody>
                            <Button className="w-100" onClick={() => checkOut()}>Checkout</Button>
                        </Table>
                   </Col>
                        
                   
                    
                    
                    
                </Row>
            </Container>
        </>
    )
}