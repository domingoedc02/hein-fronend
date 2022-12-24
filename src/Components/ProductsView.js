
import { useState, useEffect, useContext } from "react"
import { Card, Button, Row, Col, Container, Badge, Modal } from "react-bootstrap"
import Swal from "sweetalert2"
import UserContext from "../UserContext"
import './../Css-File/ProductsView.css'




export default function ProductsView(){

    

    const [products, setProducts] = useState([])
    const {branding, user} = useContext(UserContext)
    const [productData, setProductData] = useState({})

    

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const addToCart = () =>{
        if(user.id !== null){
            if(user.isAdmin !== true ){
                fetch("https://hein-server.herokuapp.com/product/add-to-cart",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            cartItems: productData._id,
                            quantity: 1,
                            subtotal: productData.price
                    })
                })
                .then(response => response.json())
                

                Swal.fire({
                title: "Added Successful",
                icon: "success",
                text: "The item is added in your cart",
                timer: 3000
            })

                
                
            } else{
                Swal.fire({
                    title: "Added Failed",
                    icon: "error",
                    text: "Only consumer can add to cart",
                    timer: 3000
                })
            }
        } else{
            Swal.fire({
                title: "Added Failed",
                icon: "error",
                text: "Please login before you add in cart",
                timer: 3000
            })
        }
    }

    
    
    

    const fetchData = () => {
        if(branding.brand === "all" && branding.category === "all"){
            document.title = `"HEiN | ${branding.brand}`
            fetch("https://hein-server.herokuapp.com/product/active-products",{
            })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
        } else if(branding.brand !== "all" && branding.category === "all"){
           document.title = `"HEiN | ${branding.brand}`
            fetch("https://hein-server.herokuapp.com/product/get-brands", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    brand: branding.brand
                })
        })
            .then(response => response.json())
            .then(data => {
                
                setProducts(data)
            })
        } else if(branding.brand !== "all" && branding.category !== "all"){
            document.title = `"HEiN | ${branding.brand}`
             fetch("https://hein-server.herokuapp.com/product/get-both", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    brand: branding.brand,
                    category: branding.category
                })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data)
            })
        }
        
    }

    useEffect(() => {
        localStorage.setItem("cartItemsCount", "0")
        fetchData()
    }, [branding])
    
    
    return (
        <Container >
            <Row>

                <Col lg={12} md={12} sm={12}>
                    <Row>
                        {products.map((items) => {
                            
                            const {name, description, price, img} = items
                            
                            
                            return(
                                     <Col key={items._id} lg={3} md={4} sm={12} xs={12}>
                                        <Card   style={{ background: '#1B1212'}} className="cards" >
                                            
                                            <div  className="image-bg">
                                                <Card.Img variant="top" src={img} className="images" />
                                            </div>
                                            
                                            <Card.Body >
                                                <Card.Title className="text-white">{items.brand} - {name} {(items.branchType === "sale") ?
                                                                        <><Badge bg="danger" className="color-dark">{items.branchType}</Badge> <Badge bg="danger" className="color-dark">{items.onSale.discount}%</Badge></>: 
                                                                        (items.branchType === "new") ? 
                                                                        <Badge bg="warning">{items.branchType}</Badge>:<></>
                                                                        } </Card.Title>
                                                
                                                <Card.Text className="text text-white">
                                                <span className="text-white">Description:</span> {description} 
                                                </Card.Text>
                                                {(items.branchType === "sale") ?<> 
                                                            <Card.Text  className="text-white">Price: <span className="sale text-white">PHP {items.price}</span> PHP {parseInt(price) - ((parseInt(items.onSale.discount) / 100) * parseInt(price) )}</Card.Text></>: <><Card.Text className="text-white">Price: PHP {price}</Card.Text></>}
                                                <Button variant="light "  onClick={() => {handleShow(); setProductData(items);}} className="d-block mx-auto">Add to Cart</Button>
                                                    <Modal show={show} onHide={handleClose} className="modals">
                                                        <Modal.Header closeButton className="">
                                                        <Modal.Title className="d-block mx-auto modalTitle">{productData.brand}</Modal.Title>
                                                        </Modal.Header>
                                                         
                                                        <Modal.Body>  
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <img className="modalImg" src={productData.img} alt="null"/>
                                                                </Col>
                                                                <Col lg={6} className="modalDetails">
                                                                    <h5 className="mt-3">Name: {productData.name}</h5>
                                                                    <h6 className="my-0 ">Brand: {productData.brand}</h6>
                                                                    <h6 className="my-0">Category: {productData.category}</h6>
                                                                    {(productData.branchType === "sale") ?<> 
                                                                    <h6  className="">Price: <span className="sale">Php {productData.price}</span> Php {parseInt(productData.price) - ((parseInt(productData.onSale.discount) / 100) * parseInt(productData.price) )}</h6></>: <><h6 className="">Price: Php {productData.price}</h6></>}
                                                                            <>DESCRIPTION</><p>{productData.description}</p>
                                                                </Col>
                                                            </Row>  
                                                           
                                                             
                                                        </Modal.Body>
                                                        <Modal.Footer className="d-block mx-auto">
                                                        <Button variant="dark" onClick={handleClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="success" onClick={() => {addToCart(); handleClose();}}>
                                                            Add to Cart
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            
                            )
                        })}
                       
                        
                    </Row>
                </Col>
            </Row>
            

        </Container>
    )

} 
