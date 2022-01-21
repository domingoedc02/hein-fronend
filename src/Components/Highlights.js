import { Carousel } from "react-bootstrap"
import Banner1 from './../Images/Banner1.png'
import Banner2 from './../Images/Banner2.png'
import Banner3 from './../Images/Banner3.png'
import Banner4 from './../Images/Banner4.png'
import './../Css-File/Highlights.css'

export default function Highlights(){

    return(
        <Carousel indicators={false} controls={true} className="highlights">
            <Carousel.Item interval={1500} >
                <img
                    className="d-block w-100 c1"
                    src={Banner1}
                    alt=""
                />
                
            </Carousel.Item>
            <Carousel.Item interval={1500} >
                <img
                    className="d-block w-100 c2"
                    src={Banner2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100 c3"
                    src={Banner3}
                    alt="Third slide"
                />
                
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100 c4"
                    src={Banner4}
                    alt="Third slide"
                />

            </Carousel.Item>
        </Carousel>
    )
}