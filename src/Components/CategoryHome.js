import { Col, Container, Row, Card, Button } from "react-bootstrap"
import './../Css-File/CategoryHome.css'



export default function CategoryHome(){

    

    return(
        <Container  className="my-3">
            
            <Row>
                <Col xs={12} md={4} lg={4}>
                    <Card className="bg-dark text-white imgCover">
                        <Card.Img src="https://i.pinimg.com/originals/71/1a/e1/711ae11210fd5f2874795536a9037351.jpg" alt="Card image" className="h1"/>
                        <Card.ImgOverlay>
                            <Button className="shpBTN bt1">SALE</Button>
                            </Card.ImgOverlay>
                     </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card className="bg-dark text-white imgCover">
                        <Card.Img src="https://i.pinimg.com/474x/4e/56/09/4e5609ec101f631d542e9c9456376adc.jpg" alt="Card image"  className="h1"/>
                        <Card.ImgOverlay>
                            <Button className="shpBTN bt2">NEW ARIVED</Button>
                        </Card.ImgOverlay>
                     </Card>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Card className="bg-dark text-white imgCover">
                        <Card.Img src="https://i.pinimg.com/originals/7a/5d/6c/7a5d6ccdcf3de0bac0f3854ce3d1ee7c.jpg" alt="Card image" className="h1"/>
                        <Card.ImgOverlay>
                            <Button className="shpBTN bt3">SHOP</Button>
                        </Card.ImgOverlay>
                     </Card>
                </Col>
            </Row>
        </Container>
    )
}