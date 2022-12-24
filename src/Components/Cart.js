import { useRef } from "react"
import { Fragment, useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import Swal from "sweetalert2"
import UserContext from "../UserContext"
import './../Css-File/Cart.css'





export default function Cart(){
    // const coupons = [{couponID: "HEIN2022", Discount: 0.25}, {couponID: "HEIN2023", Discount: 0.30}, {couponID: "WELCOME", Discount: 0.50}, {couponID: "FIRST", Discount: 0.50}]
    const { user} = useContext(UserContext)
    let [count, setCount] = useState(1)
    // const [productDetail, setProductDetail] = useState([])
    // const [cartData, setCartData] = useState([])
    // const [totalData, setToalData] =useState()
    // let cartArr = []
    let [totalAmount, setTotalAmount] = useState()
    const [userCoupon, setUserCoupon] = useState()
    const [userValidCoupon, setUserValidCoupon] = useState("none")
    const [cartId, setCartId] = useState()
    const [name, setName] = useState()
    const [newPrice, setNewPrice] =useState()
    const [productIds, setProductIds] = useState([])
    const [cartData, setCartData] = useState([])
    let loopCount = parseInt(localStorage.getItem("cartItemsCount"));
    const effectRan = useRef(false)
    const [userDiscount, setUserDiscount] = useState(0)
    const [tempData, setTempData] = useState([])
    const [itemNamesData, setItemsNameData] = useState()
    const [subTotalAmount, setSubtotalAmount] = useState()
    const [email, setEmail] = useState()
    const [userTax, setUserTax] = useState(0)
    const [shippingFee, setUserShippingFee] = useState(0)
    const [finalTotal, setFinalTotal] = useState(0)
    let itemNames = []

    if (window.performance) {
        if (performance.navigation.type == 1) {
            window.location.href="http://localhost:3000/home"
        }
    }

    useEffect(() => {
        setEmail(user.email)
        localStorage.setItem("cartItemsCount", JSON.stringify(loopCount+1))
        if(loopCount < 5){
            fetch("https://hein-server.herokuapp.com/product/view-cart",{
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
            // setProductId(data)
            let arr = data.map(items => {
                return items.cartItems
            })
            let newArr = [...new Set(arr)]

                
            setProductIds(newArr)


            // localStorage.setItem("cart", `${data.length}`)
        })
        }
        if(loopCount < 5){
            const tempArr = []
            if(productIds.length !== 0){
                sessionStorage.setItem("Total Amount", 0)
                let tempX = 0
                productIds.forEach(element => {
                    fetch("https://hein-server.herokuapp.com/product/get-product", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: element
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        tempArr.push(data)
                        itemNames.push(data.name)
                        setItemsNameData(itemNames)
                        
                        sessionStorage.setItem(data.name+" price", JSON.stringify(data.price))
                        localStorage.setItem(data.name, 1)
                        let tempPrice = parseInt(sessionStorage.getItem(data.name+" price"))
                        let tempCount = parseInt(localStorage.getItem(data.name))
                        let tempTotal = parseInt(sessionStorage.getItem("Total Amount"))
                        
                        tempX += data.price
                        
                        setSubtotalAmount(tempX)
                        sessionStorage.setItem("Total Amount", JSON.stringify(tempX))
                        // sessionStorage.setItem("Total Amount", JSON.stringify(parseInt(sessionStorage.getItem("Total Amount"))+= localStorage.getItem(data.name) * sessionStorage.getItem(data.name+" price")))
                        setTempData(tempArr)
                    })

                })
                
                


                const uniqueIds = [];
                const uniqueIds2 = [];

                const unique = tempData.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id);
                    if (!isDuplicate) {
                        uniqueIds.push(element.id);

                        return true;
                    } else{
                        uniqueIds2.push(element);
                        return false
                    }

                    
                });

                setCartData(tempData)

            }
        }
    }, [productIds])


       
    const deleteCart = () =>{
        if(cartId !== ""){
            fetch("https://hein-server.herokuapp.com/product/delete-cart", {
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
                    setTimeout(function(){
                        // localStorage.setItem("cartItemsCount", JSON.stringify(0))
                        window.location.href = "http://localhost:3000/cart"
                    }, 1000)
                    
                }
            })
        }
        
    }
    const validCoupon = () =>{
        if(userCoupon === "WELCOME"){
            let tempDis = (0.5*subTotalAmount)
            setUserValidCoupon("WELCOME")
            setUserDiscount(tempDis.toFixed(2))
        } else if(userCoupon === "FIRST"){
            let tempDis = (0.3*subTotalAmount)
            setUserValidCoupon("FIRST")
            setUserDiscount(tempDis.toFixed(2))
            
        } else if(userCoupon === "HEIN2022"){
            let tempDis = (0.22*subTotalAmount)
            setUserValidCoupon("HEIN2022")
            setUserDiscount(tempDis.toFixed(2))
            
        } else if(userCoupon === "NEWYEAR2023"){
            let tempDis = (0.3*subTotalAmount)
            setUserValidCoupon("NEWYEAR2023")
            setUserDiscount(tempDis.toFixed(2))
            
        } else{
            setUserValidCoupon("none")
            setUserDiscount(0)
        }
        // coupons.map(code => {
        //     if(code.couponID === userCoupon){
        //         console.log(code.couponID === userCoupon)
        //         let tempDis = (code.Discount*subTotalAmount)
        //         console.log((code.Discount*subTotalAmount).toFixed(2))
        //         setUserValidCoupon(code.couponID)
        //         setUserDiscount(tempDis.toFixed(2))
        //         return true
                
        //     }
        //     else{
                
  
        //     }
        // })
    }
    useEffect(() => {
        validCoupon()
    }, [userCoupon, subTotalAmount])
    
    useEffect(() => {
        let temptax = subTotalAmount*0.1
        setUserTax(temptax.toFixed(2))
        let tempShipping = subTotalAmount*0.005
        
        setUserShippingFee(tempShipping.toFixed(2))

        setFinalTotal(((parseInt(subTotalAmount-userDiscount))+(parseInt(userTax+shippingFee))).toFixed(2))

        negative()
    }, [subTotalAmount, userDiscount])


    const Data = () => {

        if(cartData !== []){
                let keyId = 0
                // for(let i = 0; i < itemNamesData.length(); i++){
                //     localStorage.setItem(itemNamesData[i], JSON.stringify("1"))
                //     sessionStorage.setItem(itemNamesData[i]+" subtotal", JSON.stringify("0"))
                // }
                
                let tempX = parseInt(sessionStorage.getItem("Total Amount"))
                return cartData.map(items => {
                const {price, name, img } = items
                    
                    
                    function incrementCount() {
                        if(name === name){
                            localStorage.setItem(name, JSON.stringify(parseInt(localStorage.getItem(name))+1))
                            sessionStorage.setItem(name+" subtotal", JSON.stringify((parseInt(price) *parseInt(localStorage.getItem(name)))))
                            tempX += parseInt(price)
                            setSubtotalAmount(tempX)
                            sessionStorage.setItem("Total Amount", JSON.stringify(tempX))
                        }
                        count=count+1
                        setCount(count);
                        setTotalAmount(price)
                        setName(name)
                    setNewPrice(price)
                    setCartId(items._id)
                        
                    }
                    function decrementCount() {
                        if(name === name){
                            localStorage.setItem(name, JSON.stringify(parseInt(localStorage.getItem(name))-1))
                            sessionStorage.setItem(name+" subtotal", JSON.stringify((parseInt(price) *parseInt(localStorage.getItem(name)))))
                            tempX -= parseInt(price)
                            setSubtotalAmount(tempX)
                            sessionStorage.setItem("Total Amount", JSON.stringify(tempX))
                        }
                        
                        count = count - 1;
                        setCount(count);
                        setTotalAmount(price)
                        setName(name)
                    setNewPrice(price)
                    setCartId(items._id)
                    }
                    
                    keyId+=1
                    return (
                        <Fragment key={items._id+keyId}>
                            <Row className="cartItemsRow">
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <img src={img} className="cartImg"/>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h5 className="txt">{name}</h5>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    {(items.branchType === "sale") ?<> 
                                        <h5  className="txt">Php {parseInt(price) - ((parseInt(items.onSale.discount) / 100) * parseInt(items.price) )}</h5></>: <><h5 className="txt">Php {price}</h5></>}
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <div className="App">
                                            <button className="button" onClick={decrementCount}>-</button>
                                            <div className="button">{localStorage.getItem(name)}</div>
                                            <button className="button" onClick={incrementCount}>+</button>
                                        </div>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h5 className="txt">Php {(parseInt(price) *parseInt(localStorage.getItem(name)))}</h5>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <Button className="mid btn-danger deleteBtn" onClick={() => {{setCartId(items._id); deleteCart();}}} >delete</Button>
                                </Col>
                            </Row>
                            {/* <tr>
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
                                
                            </tr> */}
                        </Fragment>
                    )
                // }
                
            })
        } 
    }
    function checkOut(){
        if(user.id !== "" ){
            return cartData.map(itemsCart => {
                const {name, price} =itemsCart
                console.log(name)
                fetch("http://localhost:4000/order/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        totalAmount: (parseInt(localStorage.getItem(name)*price)),
                        username: user.username,
                        price: price,
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


            })

        }
    }
    const negative = () => {
        if(userDiscount > 0){
            return <h5 className="d-inline">-</h5>
        } else{
            return <h5 className="d-inline">&nbsp;</h5>
        }
    }

    return (
        <>
            <Container>
                <Row>

                   <Col lg={12}>
                       <h1 className="text-center">Cart</h1>
                        <Container>
                            <Row className="cartRow">
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory"></h4>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory">Name</h4>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory">Price</h4>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory">Quantity</h4>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory">Subtotal</h4>
                                </Col>
                                <Col lg="2" md="2" sm="2" xs="2">
                                    <h4 className="cartCategory"></h4>
                                </Col>
                            </Row>
                            {Data()}
                            <Row className="lastRow">
                                <Container>
                                    <Row>
                                        <Col lg="7">
                                
                                    <Form className="addressForm">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Coupon: </Form.Label>
                                            <Form.Control onChange={(e) => setUserCoupon(e.target.value)} className="w-50 d-inline-block mx-3" type="text" placeholder="Coupon Code" />
                                            <Button onClick={() => validCoupon()} className="validateBtn w-25">Validate</Button>
                                            <Form.Text className="d-block">
                                                Use this coupons "WELCOME", "FIRST", "HEIN2022", "NEWYEAR2023"
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Address: </Form.Label>
                                            <Form.Control className="w-75 d-inline-block mx-3" type="text" placeholder="Enter address" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Postal:&nbsp;&nbsp;&nbsp;</Form.Label>
                                            <Form.Control className="w-75 d-inline-block mx-3" type="text" placeholder="Enter Postal Code" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                            <Form.Control className="w-75 d-inline-block mx-3" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col className="voiceAmount" lg="5">
                                    <h5 className="totalTxt">Coupon:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; {userValidCoupon}</h5>
                                    <h5 className="totalTxt">Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Php {subTotalAmount}</h5>
                                    <h5 className="totalTxt">Discount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; {negative()}Php {userDiscount}</h5>
                                    <h5 className="totalTxt">Estimated Tax: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Php {userTax}</h5>
                                    <h5 className="totalTxt">Shipping fee: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php {shippingFee}</h5>
                                    <h5 className="totalTxt am">Total Amount: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php {finalTotal}</h5>
                                    <Button className="checkoutBtn" onClick={() => checkOut()}>Checkout</Button>
                                </Col>
                                    </Row>
                                </Container>
                            </Row>
                        </Container>
                   </Col>
                        
                   
                    
                    
                    
                </Row>
            </Container>
        </>
    )
}