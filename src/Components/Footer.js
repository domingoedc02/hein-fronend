import { Container, Row, Col} from "react-bootstrap";
import { CCircle, Facebook, Github, Instagram, Twitter} from "react-bootstrap-icons";
import '../Css-File/Footer.scss'


export default function Footer(){
    return(
        <>
            <Container  fluid>
                <Row className="bg-dark footerRow">
                    <Col className="fCol" >
                        <h1 className="heinLogo">HEiN</h1>
                        <h6 className="info">Luxurios Brands Online Shopping</h6>
                        <h6 className="info">Top e-commerse platform</h6>
                        {/* <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className="w-75 d-inline-block mx-3" type="text" placeholder="Subscribe for newsletter and sales" />
                                <Button>Subscribe</Button>
                            </Form.Group>
                        </Form> */}
                    </Col>
                    <Col className="fCol" >
                        <h4 className="brand" >Brands</h4>
                        <a className="bList" href="/home">Prada</a>
                        <a className="bList" href="/home">Versace</a>
                        <a className="bList" href="/home">Ralph Lauren</a>
                        <a className="bList" href="/home">Balenciaga</a>
                    </Col>
                    <Col className="fCol">
                        <h4 className="brand">Social Media</h4>
                        <div className="sList">
                            <Facebook color="white"  size={25}/>
                            <a className="socials" href="/home"> Facebook</a>
                        </div>
                        <div className="sList">
                            <Twitter color="white" size={25}/>
                            <a className="socials" href="/home">Twitter</a>
                        </div > 
                        <div className="sList">
                            <Instagram color="white" size={25}/>
                            <a className="socials" href="/home">Instagram</a> 
                        </div>
                        <div className="sList">
                            <Github color="white" size={25}/>
                            <a className="socials" href="/home">Github</a>
                        </div>
                    </Col>
                    <Col>
                        <h4 className="brand">Contact Us</h4>
                        <h6 className="cList">Email: sales@heinshop.com</h6>
                        <h6 className="cList">Contact: +63 956 253 8345</h6>
                        <h6 className="cList">Address: HEiN Bldg. Makati, Metro Manila</h6>
                        <h6 className="cList">6F Office, 306, 3011</h6>
                    </Col>
                </Row>
                <Row style={{backgroundColor: "#28282B"}} className="crightRow">
                    <Col>
                        <div className="copyr">
                            <CCircle color="white"/>
                            <a className="copyright" href="/home">2022 HEiN Clothing Inc.</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}