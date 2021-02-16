import React,{ useState, useEffect } from 'react' 
import axios from 'axios'
import {Card} from 'react-bootstrap'
import {Form,Col, Row} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux' 

const Bills = ({user}) => {

    const [values, setValues] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const months = ['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December']

    useEffect(() => {
        axios.get('family/allbills/'+user)
        .then(res => {
            setValues(res.data)
            console.log(res.data)
        })
    },[refresh,user])

    
    const handleElectricity = (event,id) => {
        let temp = values
        console.log(event.target.value)
        temp.electricity[id] = event.target.checked=="on"?1:0
        setValues(values)
        axios.put('family/viewbills/' + user + '/', temp)
        .then(res => {
            console.log(res.data) 
        })
        setRefresh(true)
        
    }

    const handleWater = (event,id) => {
        let temp = values
        temp.water[id] = event.target.value=="on"?1:0
        setValues(values)
        temp['family']=1
        axios.put('family/viewbills/' + user + '/', temp)
        .then(res => {
            console.log(res.data) 
        })
        
    }

    const handleMaid = (event,id) => {
        let temp = values
        temp.maid[id] = event.target.value=="on"?1:0
        setValues(values)
        temp['family']=1
        axios.put('family/viewbills/' + user + '/', temp)
        .then(res => {
            console.log(res.data) 
        })
        
    }

    const handleGasCylinder = (event,id) => {
        let temp = values
        temp.gascylinder[id] = event.target.value=="on"?1:0
        setValues(values)
        temp['family']=1
        axios.put('family/viewbills/' + user + '/', temp)
        .then(res => {
            console.log(res.data) 
        })
        
    }
    
    return(
        <div className='container-fluid' style={{backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWa-fB6I16aBU1LS2O3KOdXB1Y5MveN2G_rw&usqp=CAU)"}}>
            {values?
            <div className='row'>
            <div className='col-md-6'>
                <Card style={{ width: '26rem', margin: '15%', backgroundColor:'#fae830' }}>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col style={{backgroundColor:'white',fontSize:'large', textAlign:'center'}}>
                                   <br /><br /><br /> <h4>Electricity <br />Bill</h4>
                                </Col>
                                <Col>
                                    <Form>
                                        {months.map((month,id) => {
                                            return <Form.Check 
                                            type='checkbox'
                                            defaultChecked= {values.electricity[id]}
                                            name = 'electricity'
                                            onChange = {(e) => handleElectricity(e,id)}
                                            label = {month}  
                                        />
                                        })}
                                        
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-md-6'>
                <Card style={{ width: '23rem', margin: '15%', backgroundColor:'#f7a16c' }}>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col style={{backgroundColor:'white',fontSize:'large', textAlign:'center'}}>
                                <br /><br /><br /> <h4>Water <br />Bill</h4>
                                </Col>
                                <Col>
                                    <Form>
                                        {months.map((month,id) => {
                                            return <Form.Check 
                                            type='checkbox'
                                            defaultChecked= {values.water[id]}
                                            name = 'water'
                                            onChange = {(e) => handleWater(e,id)}
                                            label = {month}  
                                        />
                                        })}
                                        
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div  className='col-md-6'>
                <Card style={{ width: '23rem', margin: '15%', backgroundColor:'#f690e3' }}>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col style={{backgroundColor:'white',fontSize:'large', textAlign:'center'}}>
                                <br /><br /><br /> <h4>Maid <br />Payment</h4>
                                </Col>
                                <Col>
                                    <Form>
                                        {months.map((month,id) => {
                                            return <Form.Check 
                                            type='checkbox'
                                            defaultChecked= {values.maid[id]}
                                            name = 'maid'
                                            onChange = {(e) => handleMaid(e,id)}
                                            label = {month}  
                                        />
                                        })}
                                        
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div  className='col-md-6'>
                <Card style={{ width: '23rem' , margin: '15%' , backgroundColor:'#52fa30'}}>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col style={{backgroundColor:'white',fontSize:'large', textAlign:'center'}}>
                                    <br /><br /><br /> <h4>Gas <br />Cylinder <br /> Filled</h4>
                                </Col>
                                <Col>
                                    <Form>
                                        {months.map((month,id) => {
                                            return <Form.Check 
                                            type='checkbox'
                                            defaultChecked= {values?values.gascylinder[id]:0}
                                            name = 'cylinder'
                                            onChange = {(e) => handleGasCylinder(e,id)}
                                            label = {month}  
                                        />
                                        })}
                                        
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
        :
        null  }
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Bills);

