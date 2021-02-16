import React,{ useState, useEffect } from 'react' 
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {register} from '../../store/actions/auth'
import {Redirect,useHistory} from 'react-router-dom'
import axios from 'axios'


const SignupForm = ({ register, error }) => {

    const [values, setValues] = useState({
        username: null,
        email:null,
        name:null, 
        password1: null,
        password2:null,
        family: null,
    })

    const [families, setFamilies] = useState(null)
    const [errors, setErrors] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const { name, username, family, email, password1, password2 } = values;


    useEffect(() => {
        axios.get('allfamilies/')
        .then(res => {
            console.log(res.data)
            setFamilies(res.data)
        })
    },[])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        if (password1 !== password2) {
         alert('Passwords do not match')
        } else {
        register({ name, password1, email, password2, username, family });
        console.log()
        error!=null?setErrors(error):setErrors(null)
        setSubmitted(true)
        //<Redirect to="/login" />
        }

    }

    return(
        (submitted===true && error==='no')?<Redirect to='/login' />:
        <div className='container-fluid'  style={{backgroundColor:' #e8ec68 ', minHeight:'100vh'}}>
            {console.log(submitted,error,errors)}
            <div className = 'row justify-content-center m-5'>
            <div className='col-12' style={{textAlign:'center'}}>
                   <h3>Register</h3> 
                </div>
                <div className='row'>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required={true} style={{width:'30rem'}} type="text" placeholder="Enter full name" name='name' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required={true}  type="email" placeholder="Enter email" name='email' onChange={(e) => handleChange(e)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required={true}  type="text" placeholder="Enter username" name='username' onChange={(e) => handleChange(e)}/>
                        <Form.Text className="text-muted">
                        Username must not contain any spaces
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Chose Family</Form.Label>
                        <Form.Control required={true}  as="select" name='family' onChange={(e) => handleChange(e)}>
                        {families?
                            families.map(family => {
                               return <option value={family['id']}>{family['familyname']}</option>
                            })
                        :null}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required={true}  type="password" placeholder="Password" name='password1' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required={true}  type="password" placeholder="Password" name="password2" onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Form>
                </div>
               <div className='col-12' style={{textAlign:'center'}}>
                   <br />
                    <h6 style={{color:'red'}}>
                        {errors && errors.email?errors.email:null}<br />
                        {errors && errors.username?errors.username: null}<br />
                        {errors && errors.password?errors.password1:null}
                    </h6>
               </div>
               <div className='col-12'>
                   <Button style={{marginLeft:'45%'}} variant="primary" type="submit" onClick = {(e) => handleSubmit(e)}>
                    Submit
                    </Button>
               </div>
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
  });

export default connect(mapStateToProps, {register})(SignupForm)
