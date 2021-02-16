import React,{ useState, useEffect } from 'react' 
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {login} from '../../store/actions/auth'
import {Redirect, useHistory} from 'react-router-dom'
import axios from 'axios'

const LoginForm = ({ login, error, token }) => {

    const [values, setValues] = useState({
        username: null,
        password: null,
    })
    const { username, password } = values;
    const [errors, setErrors] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const history = useHistory()
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const  handleSubmit = async  (e) =>  {
        e.preventDefault()
        await login({ password, username });
        error!=null?setErrors(error.non_field_errors):setErrors(null)
        setSubmitted(true)
    }

    return(
        (submitted===true && error==='no')?<Redirect to='/' />:
        <div className='container-fluid' style={{backgroundColor:' #8cf0fc', minHeight:'100vh'}}>
            {console.log(errors,submitted) }

            <div className = 'row justify-content-center m-5'>
                <div className='col-12' style={{textAlign:'center'}}>
                   <h3>Login</h3> 
                </div>
                <div className='row'>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control style={{width:'30rem'}}  type="text" placeholder="Enter username" name='username' onChange={(e) => handleChange(e)}/>
                    </Form.Group> 
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Form>
                </div>
               <br />
               <div className='col-12'>
                   <Button style={{marginLeft:'45%'}} variant="primary" type="submit" onClick = {(e) => handleSubmit(e)}>
                    Submit
                    </Button>
               </div>
               <div className='col-12' style={{textAlign:'center'}}>
                   <br />
                    <h6 style={{color:'red'}}>{errors} </h6>
               </div>
                <div className='col-12' style={{marginLeft:'70%'}}>
                    <br />
                    Doesn't have an account? Register<a href="/register">here &nbsp;</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    token: state.auth.token
  });

export default connect(mapStateToProps, {login})(LoginForm)
