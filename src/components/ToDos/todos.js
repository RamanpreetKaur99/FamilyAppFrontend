import React,{ useState, useEffect } from 'react' 
import axios from 'axios'
import './todos.css'
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'

const ToDos = ({user}) => {

    const [todos,setToDos] = useState(null)
    const [values, setValues] = useState({
        title: '',
        details: '',
        deadline: '',
        completed:'',
    })
    const [refresh, setRefresh] = useState(0)
    const [addtodo, setAddToDo] = useState(false)
    const colors = ['success','primary','warning','info']

    useEffect(() => {
        axios.get('family/alltodoitems/'+user)
        .then(res => {
            console.log(res.data)
            setToDos(res.data)
        })
    },[refresh,addtodo])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleClickAdd = () => {
        let newToDo = {
            'title': values.title, 
            'details': values.details,
            'deadline': values.deadline,
            'completed': false
        }

        axios.post('family/viewtodoitem/' + user + '/',newToDo)
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
            setAddToDo(false)
        })
    }

    const handleClickDelete = (todoid) => {
        axios.delete('family/viewtodoitem/' + todoid)
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
        })
    }

    const handleClickCompleted = (todoid) => {
        axios.put('family/viewtodoitem/' + todoid + '/')
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
        })
    }


    return(
        <div className='container-fluid todos'>
            <div className = 'row'>
                {addtodo?
                    (<div className='col-md-4 formcol'>
                         <div className='row' id= 'textdisplay'>
                            <h2><b>Add New ToDo !!</b></h2>
                        </div>
                        <div className='row'>
                            <Card style={{ width: '18rem', border:'thin',marginLeft: '15%',marginTop:'5%', backgroundColor:'rgb(241, 198, 241)'}}>
                                <Form.Group style={{backgroundColor:'rgb(241, 198, 241)'}}>
                                    <Form.Control name='title' placeholder='Enter Task Title' size="lg" onChange={(e) => handleChange(e)}/>
                                    <br />
                                    <Form.Control name='details' placeholder='Enter Details of task' as='textarea' rows={3} onChange={(e) => handleChange(e)}/>
                                    <br />
                                    <Form.Control name='deadline' placeholder = 'Enter Deadline' type='date' onChange={(e) => handleChange(e)}/>
                                </Form.Group>
                            </Card>
                        </div>
                            <div className='row'>
                                <div className='col-md-9'></div>
                                <Button variant="danger"  style={{borderRadius:'5em',minHeight:'4em',fontWeight:'xx-large'}} className='float-right col-md-2' onClick={() => handleClickAdd()}>➕</Button>
                            </div>
                            
                    </div>)
                    :
                    (<div className='col-md-4 imgcol'>
                                <div className='row justify-content-center' id= 'textdisplay'>
                                    <h2><b>Manage ToDos</b></h2>
                                </div>
                                <div className='row'>
                                        <Card style={{ width: '18rem', backgroundColor:'rgb(241, 198, 241)', border:'none',marginLeft: '15%',marginTop:'5%'}}>
                                            <Card.Img variant="top" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABFFBMVEU6vKf////hjCXynCGjR0DXWkouuaSd29DWxLEluKFqybnV8Ovt3MdeXl51zr/r9/W/5t/nihvVkjHrnSelq2m9mEn5mhGgVEshvq7n28bMxrPk9fL4/fzmmDvdU0OhQkDI6uTSXk6fOzPgjydYxbOP1slJwa2u4diUjHrYVUunZUXBwcFmybio39Unwqz27u7RdkhUVFSF08VJtJ/4zJnkqE3UmEnj4+NtppN8m4hgq5ezdmXNY1KJk4DCaVna5N+yZFyoUErRqKWRl3meNy7n1NPZuLbBioa4dnKib02CX1KSelyxsG9rwqupz7vS18KDx7LeqE6Cx7KZy7aEfnmgnZGPuqizw7C5q53p4NWzraaPj49O69gLAAAK8UlEQVR4nO2dDXvbthHHocSGDUmm1HZrl4hzFU+iulV2anlb16xd063r1rTpuixr1+z7f4/ynXgjeACPIsjH/+fJixNL4s844IDDHUAmBq2W14f9JiLeKdrst7v1wvTspUjdfyx2QcQopX3D1IlSxjbbdehKuA4I8xauEmXRduZCuIyGgJeJ0qmZUUO4jljfj20lyqYrG8JFMCy+RJSewQmXZDD2yYttaptRItwOrwEzUbqEEIbToQLGYjWWyhMuNoO00EJs20QYRoMGrEPkCIfdgom0hloRBoMHjBF3BsLrAQ8ylZjqNArC2SgA41WHMhUvCPt+MizRQw3h2Qg6YSYmz8MzwtVoAAnZaAnHMI4WYksN4ZiaMB5sNISHURFKjZgQhiPxFLnoXiHcjaoJY8SVTLjp+5GQRa8lwsXImpCQvUS4HFc3jEVDkXBcI2kithYJMbuhHz8sIfRGJgu8fQlKg70P+wA0EAjxJjTpEjvceoBIBMI11kBTLLA9mOQygXCJ9EBlHGjmAeGCJ0Sa0VS2H3pAuOIJr1EeiFbLMg9mEPwymCAt77n4iAfT3A4IucnuAuHt2gqfkFaTiNCHwDI6IR+InXoAiE7I7xf4sT2HTMjPkXZeACITcn7Cm4UYLmFUzR88mM1kQiXkpg8h0vO1FyYh88xPZEIk5P2EB2uKQniE/vmJTBaE1Ji756GfyAQnpPvd8lDLyPsJtHU0isCEWS9b7Wue3tJPMJqaRPZ79tf0j/xXYjDcv+a/KS/JvrshsxBKWO6n6rsYv55ojmbRaLlaoGl2MNoMlLBydWuNpfJBSUAmjrxx2VbGzAowYbWqXSiWarmeoKYESSeZwrxgQn5LXLJUwU8AOiF2E06M0RfrfphKsFRrPyHu6WHIFCyBj6XCNhWX2OfgJ5pTzi1l2m6B+0N2EB6sNEcu7rSCAZqyeJ1k/FybOY2Ye7vOt16s/ESBiNqKa+PnWs1LxdzbxYaJfgK+nqDRPkBTg3uym3nLlsrc404UTQ0fZLm2oJFgqUuuR/m0nuBlvXqqyxL3aj3By359yJSMv0R+rSd4OayAJUtN5U3cSZXTGp/KCcY+7E/UyS2KIVuqP3EnVY5xGtFSPYo7qXKORHGW6qufyOQeayu9v7d+IlOLaGI+T/W9dKFVvJQFu7ON54AtI8IeVz+X6iJTwS/dEw5f94TD1z3h8HVPOHzdEw5f94TD1z1hi3cm1IulY1eEdDMLw7UPp2t0RJjvC4celDN2Q1gWp677b8RuCMv8IR8qSrogrNJJRkrIvec4rZTfFx7lSMMf7uND0S06IZ9adOaDy8cm9K8eAZuQyx/yZF8Ym9CvurVEyDUz1bt5c+IbbkUJl4my9wQQt6LEMz+RCZGQ9xMebZviEfKH3fjhJzLZEJq3Q3k/4RGgTUUJCwJS/+ie1TdXAhPSIGmjXd2JJZZ+IjmBG0lNG+1gwryXrfTpT7yfgNQjHHZLNG3NP1H7agRdfpDgJwCdsOlkcTuFxpwsh4qSpVJoxNcjAPyEcOwPioyfBiXkTgiRzxi29RPqqZttZawxgFaU8OUWoWiptvXNU2xA46kz8LF0Jr5l9Z3WfsLPNlRLEaj6DsD1hJ/9kBD5AOncUi39RCYfx9JEUtFMaqlu6wkaXKO5wx2SP8wejAiWGnt/Sz9RvROmzB9lubaQErwP3sWdVNmuniRL9S7upMq+ZoZoi2ZWR3hWNzmsgHVFMx6dgyHLZY1P1UtAvIk7qXKrmZEt1Z+4U6qbuz998skzcpN+4RinEb2/R3GnWDfP/vzk8vLy9NPP0i9dI1F0U023/fITN59dnma6/MsdaVMzU85TvYo7kZsPCsBYT+5aRRNzS5119rAuEgBPTz+9axUvTQ7wmPmVRiUBJogtK0qYX5eyKYCJoY4pr00DGCN+Ph5CLeDp6fOnYyHUAz557+qLp+MgrAM8OTkpEQdNaACsEIdMaAQsEQdM2ABYIA6XsBEwRxwsIQDw5Or5gAkhgDHiXwdLePM3CGBqp8Mk/NUv3v3otwDAky//PkzCGPDhQwVRA3hy9dUgCVNABVEHmHTEARLmgBKiFnCYbVgCCoh6wEH2Qw6QQ6wBPHk+PG8hAJaIdYBffoVNCDhKrZ0kwByxDvDqH9hzGrpd7jq9ml0BTBFrAf+JPvNOtzY6LCjRAMaIZkDU2rV87wbn4hqNtIAP3/n6fRMgZu1akW3R1Z2fNYBv/+Z3OsQCEI+wqgvqqLKrDvDBAx1iCYhX2VVtTHXThvWAOsQKEO2uIC4/o5ONRROgisgBYt0VtKnSFzoZS82AMuLVC/yofrWx2ImNNgGKiFcv8G9D4vL4+gHkEa9e4N+G1PE9JRDACjEGxCbs+p4SGGCBmAAiE3Z9TwkUMENMAXEJXfP4oIIDJogZICph1/eU2AA+ePDWN9mrUNuQ8xON32ufZGkJ+EuCTwjP96bE4Uz2b50AMW9Dgp8/L14HDtTvtYC/bgK0ujmAMUPnsvATTncjuALaEO4W4br2PFYrP+FQjeAMaEGYDSM1TsDqnhKHO0osAXkMcM1MYYQzXWa8sJ5o9BP298y0AHSoe1pMNQjcPSWARGrbu4LcTdSGkOs7iqXa1gVZNmIrQDghnxUsWar1/bh2d3a1A4SPNMLPfcHHel3WE5R1NZNRHgBeu7YXxvjKUrtdTzhO1VwI45mWUI9VWGq364n2gFazNvFSqzC1VL5p8eNOCIB281IWKJYadRl3wgC0nHnTSLTUbu/HRQG0XltI169x9aPocafWo6iOELBVJFlqKfS4ExIgb2Yx4Q7wmJKl5oLce2glHBMlMiGs+oWpC1h0P4EGKMw3CbT8RbFU9LgTHiBhE54QOuDLY2rfJmr6/EggDCPoM/ChFvC9h1AhtqAw54oJJ3vwU7BpaanYfoIitqAY9SJWQ2I5T7W79xCgl3/QELq1oOgOE0KrqWV62eYKvUCWfjdXEV0BxbAXsc0soGQT4Sc+0X/NH8mIzoBUOEglJvThCrVoPpcRHfsgEZfnGWH/NzXS7+cyojsgv5eSE056b8O4G0qI7n1Q9BU5Ye8JmPTRXERsASiOpDlh78fJbeZzAbENoBxeTwnxVwl2ov+ZC4itAKUmzAl7bsTYV/CIrQCpfOZWRtj3AQKP5hziv1uMoprtg5yw13tT6cs5T/j4j285t6Bmn7Ig7CSXCajcVxSA5+c6RCCguotXEPZpp0I3jAHPNa0IAyR0UU/Y42HqkQR4rrYirA9qT4WrCEEHWHYh+koBlBGhgLrDnjhC/EUfTFU3rABFRKCJaqJlEmFPrVhM2QRAHhEKKN8criHs56bmjRawQoQOMtrzyGTCPkbUYsomAxaIQDehjVlrCCer6NiMua9QATNEGGDdvoOGMFlKHXnAienOtYAJImgUpZHh7FCVcLIKjnnETuwrXt/eXvxXBxgjAgApOTMlXGkIY8bDERl/uEh0q0X88fvGlzN6ps5jGgnjaepZ1HgsOI7uLjLdynSPf3jZcOZ9kq+6WTYlzNUQxppdTwkDJ4g4qgS8uP0fT/fjK9L00YxGwQ6QaVVPmLTkan22PQTTzhQ8u1AJH3/3ar/fm1932F7PVrB0RyNh5/r4olKG99PTCfKp0b0ScoBJE/70tPkl9uqTkAd80w3epFdCHvDD7j6mP8IjAfZHGB4JsD/CN7fHAeyP8PWRAPsn7BqwP8IPb48D2ONY+vr2KIB9+sM3ry/+/3H3H/MzV39HhYFD1PoAAAAASUVORK5CYII=" />
                                        </Card>
                                </div>
                                <div className='row'>
                                    <div className='col-md-9'></div>
                                    <Button variant="danger"  style={{borderRadius:'5em',minHeight:'4em',fontWeight:'xx-large'}} className='float-right col-md-2' onClick={() => setAddToDo(true)}>➕</Button>
                                </div>
                            </div>)
                }
                <div className='col itemscol'>
                    <div className='row justify-content-center'>
                    </div>
                    <div className='row justify-content-center' style={{marginTop: '5%'}}>
                        {todos?
                            todos.map((todo,id) => {
                                return (<div>
                                    <Card border = {colors[parseInt(Math.random()*4)]} style={{ width: '20rem',marginLeft:'4%',marginTop:'4%' }}>
                                        {todo['completed']?
                                            <Card.Header className='text-success bg-white' style={{fontSize:'large'}}>
                                                <b>Hurray! Task Completed</b>
                                                <Button variant="white"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickCompleted(todo['id'])} className='float-right'>✔️</Button>  <t /><t />
                                                <Button variant="white"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickDelete(todo['id'])} className='float-right'>❌</Button> 
                                            </Card.Header>:
                                            <Card.Header  className='text-danger bg-white' style={{fontSize:'large'}}>
                                                <b>Task Pending</b>
                                                <Button variant="white"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickCompleted(todo['id'])} className='float-right'>✔️</Button>  <t /><t />
                                                <Button variant="white"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickDelete(todo['id'])} className='float-right'>❌</Button>
                                            </Card.Header>
                                        }
                                            <ListGroup variant="flush" className= {'text-'+colors[parseInt(Math.random()*4)]}>
                                                <ListGroup.Item><b>{todo['title']}</b></ListGroup.Item>
                                                <ListGroup.Item>{todo['details']}</ListGroup.Item>
                                            <ListGroup.Item>Deadline: {todo['deadline']}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </div>)
                            })
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(ToDos);

