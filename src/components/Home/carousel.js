import react from 'react'
import Carousel from 'react-bootstrap/Carousel'

function CarouselHome(){
    return(
        <div className='container-fluid'>
            <div className='row'>
                <Carousel>
                    <Carousel.Item style={{margin:'5%',width:'75em', height:'30em'}}>
                        <img
                        className="d-block w-100"
                        src="https://i.pinimg.com/originals/0a/3a/5f/0a3a5f1552a67821aa4b253a14ec86f3.png"
                        alt="First slide"
                        height = '100%'
                        />
                        <Carousel.Caption>
                        <h1>JOIN THE FAMILY APP</h1>
                        <p>Wants to be connected to your family all the time? Then register here :)</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselHome