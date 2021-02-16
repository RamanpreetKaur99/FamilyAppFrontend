import React,{ useState, useEffect } from 'react' 
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {ListGroup} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Register(){

    const [registered, setRegistered] = useState(false)
    const [show, setShow] = useState(false)
    const [family, setFamily] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        const newFamily = {'familyname': family} 
        axios.post('/viewfamily/',newFamily)
        setSubmitted(true)
    }

    const handleChange = (e) => {
        setFamily(e.target.value)
    }

    return(
        submitted?<Redirect to='/login' />:
        <div className='container-fluid'>
            <div className = 'row' style={{marginLeft:'25%'}}>
               {show?
                <div>
                    <Card border="warning" style={{ width: '38rem', marginTop:'15%',textAlign:'center' }}>
                        <Card.Header><h1 style={{color:'red'}}>Welcome to <i><b>TheFamilyApp</b></i></h1></Card.Header>
                        <Card.Body>
                        <Card.Text>
                            <Form.Group>
                                <Form.Control size="lg" type="text" placeholder="Enter Family Name" onChange={(e) => handleChange(e)}/> 
                            <   Button variant="primary" type="submit" onClick={() => handleSubmit()}>Submit</Button>
                            </Form.Group>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
               :
               registered?
                    <Redirect to='/signup' />
                    :
                    <div>
                        <Card border="warning" style={{ width: '38rem', marginTop:'15%', textAlign:'center' }}>
                            <Card.Header><h1>Welcome to <i><b>TheFamilyApp</b></i></h1></Card.Header>
                                <Card.Body>
                                    <Card.Title>Is your Family already registered?</Card.Title>
                                <Card.Text>
                                    <Button variant="primary" onClick={() => setRegistered(true)}>Yes</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="primary" onClick={() => setShow(true)}>No</Button>
                                </Card.Text>
                                </Card.Body>
                        </Card>
                    </div>
                }

            </div>
        </div>
    )
}

export default Register