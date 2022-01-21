import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import './../Css-File/AppNavbar.css'
import { Fragment, useContext } from "react"
import cart from './../Images/shopping-cart.png'
import loginLogo from './../Images/login.png'
import UserContext from "./../UserContext"




export default function AppNavbar(){
    const {user, setBranding} = useContext(UserContext)
 
    
     


   
    


    


    

    let token = localStorage.getItem("token")


    let adminDashboard = (user.isAdmin === true) ?
        <Fragment>
            <NavDropdown.Item as={NavLink} to="/admin-dashboard">Admin Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Transaction Details</NavDropdown.Item>
        </Fragment>
    :
        <NavDropdown.Item href="#action/3.2">Transaction Details</NavDropdown.Item>
    

    let userNav = (token === null) ?
        <Fragment>
            <NavDropdown.Item as={NavLink} to={'/login'}>Login</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to={'/register'}>Register</NavDropdown.Item>
        </Fragment>
    :
        <Fragment>
            
            
                {adminDashboard}
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to={'/logout'}>Logout</NavDropdown.Item>
        </Fragment>

    
    return(
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="Nav">
            <Container >
                <Navbar.Brand href="/" className="d-block  logo">HEiN</Navbar.Brand>
                
                    <Nav>
                        <>
                        {/* <Nav.Link as={NavLink} to={`/cart/${user.username}`}> */}
                            <a href={`/cart/${user.username}`}  className="logo-img " >
                                {localStorage.getItem("cart")} <img src={cart} alt="Logo" className="img" ></img>
                            </a>
                        {/* </Nav.Link> */}
                            
                        

                        </>
                    </Nav>
                    
                
            </Container>
        </Navbar>
        
            <Container >
                <Nav justify variant="tabs" defaultActiveKey="/" className="Nav2" >
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Balenciaga" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "all"})} as={NavLink} to="/balenciaga/all" className="text-center">All Items</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "T-shirt"})} as={NavLink} to='balenciaga/t-shirt' className="text-center">T-shirts</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "Hoodie"})} as={NavLink} to="/balenciaga/hoodie" className="text-center">Hoodies</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "Pants"})} as={NavLink} to="/balenciaga/pants" className="text-center">Pants</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "Shoes"})} as={NavLink} to="/balenciaga/shoes" className="text-center">Shoes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Balenciaga", category: "Accessories"})} as={NavLink} to="/balenciaga/accessories" className="text-center">Accessories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Versace" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "all"})} as={NavLink} to="/versace/all" className="text-center">All Items</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "T-shirt"})} as={NavLink} to="/versace/t-shirt" className="text-center">T-shirts</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "Pants"})} as={NavLink} to="/versace/pants" className="text-center">Pants</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "Jacket"})} as={NavLink} to="/versace/jacket" className="text-center">Jackest</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "Shoes"})} as={NavLink} to="/versace/shoes" className="text-center">Shoes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Versace", category: "Accessories"})} as={NavLink} to="/versace/accessories" className="text-center">Accessories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Prada" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "all"})} as={NavLink} to="/prada/all" className="text-center">All Items</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "T-shirt"})} as={NavLink} to="/prada/t-shirt" className="text-center">T-shirts</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "Pants"})} as={NavLink} to="/prada/pants" className="text-center">Pants</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "Jacket"})} as={NavLink} to="/prada/jacket" className="text-center">Jackets</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "Hoodie"})} as={NavLink} to="/prada/hoodie" className="text-center">Hoodies</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "Shoes"})} as={NavLink} to="/prada/shoes" className="text-center">Shoes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Prada", category: "Accessories"})} as={NavLink} to="/prada/accessories" className="text-center">Accessories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="Ralph Lauren" id="basic-nav-dropdown" >
                            <NavDropdown.Item onClick={() => setBranding({brand: "Ralph Lauren", category: "all"})} as={NavLink} to="/ralph-lauren/all" className="text-center">All Items</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Ralph Lauren", category: "T-shirt"})} as={NavLink} to="/ralph-lauren/t-shirt" className="text-center"> T-shirts</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Ralph Lauren", category: "Pants"})} as={NavLink} to="/ralph-lauren/pants" className="text-center">Pants</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Ralph Lauren", category: "Shoes"})} as={NavLink} to="/ralph-lauren/shoes" className="text-center">Shoes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setBranding({brand: "Ralph Lauren", category: "Accessories"})} as={NavLink} to="/ralph-lauren/accessories" className="text-center">Accessories</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                    <Nav.Item>
                            <NavDropdown title={
                                <div>
                                    <img src={loginLogo} alt="login" className="login-logo"/>
                                </div>
                            } id="basic-nav-dropdown">
                                {userNav}
                            </NavDropdown>
                    </Nav.Item>
                </Nav>
            </Container>

        </Fragment>
        
    )
}