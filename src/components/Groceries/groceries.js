import React,{ useState, useEffect } from 'react' 
import axios from 'axios'
import './groceries.css'
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'

const Groceries = ({user}) => {

    const [groceries,setGroceries] = useState(null)
    const [item, setItem] = useState({})
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        axios.get('family/allgroceryitems/' + user)
        .then(res => {
            console.log(res.data)
            setGroceries(res.data)
        })
    },[refresh,item])

    const handleClickAdd = () => {
        let newItem = {
            'item': item, 
            'purchased': false
        }

        axios.post('family/viewgroceryitem/'+user+'/',newItem)
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
        })
    }

    const handleClickDelete = (itemid) => {
        axios.delete('family/viewgroceryitem/' + itemid)
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
        })
    }

    const handleClickCompleted = (itemid) => {
        axios.put('family/viewgroceryitem/' + itemid + '/')
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
        })
    }


    return(
        <div className='container-fluid groceries'>
            <div className = 'row'>
                <div className='col-md-4 imgcol'>
                    <div className='row' id= 'textdisplay'>
                        <h2><b>Manage Groceries</b></h2>
                    </div>
                    <div className='row groceryimgparent'>
                        <img id="groceryimg" src="https://www.chatelaine.com/wp-content/uploads/2018/03/order-groceries-online.jpg" />
                    </div>
                </div>
                <div className='col itemscol'>
                    <div className='row justify-content-center'>
                        <Form style={{width:'26em'}}>
                            <Form.Row className="align-items-center">
                                <Col sm={9} className="my-1">
                                <Form.Control  style={{minWidth:'7rem'}} id="inlineFormInputName" placeholder="Enter Item" onChange={(event) => setItem(event.target.value)}/>
                                </Col>
                                <Col sm={3}>
                                <Button variant="primary"  style={{borderRadius:'5em', minHeight:'3em', minWidth: '3em'}} className='float-right' onClick={() => handleClickAdd()}>╋</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                    <div className='row justify-content-center' style={{marginTop: '5%'}}>
                        {groceries?
                            groceries.map((item,id) => {
                                return (<div>
                                    <Card border="success" style={{ width: '18rem',marginLeft:'4%', marginTop:'2%' }}>
                                        <Card.Header style={{fontSize: 'large'}}> 
                                            {item['purchased']? <s>{item['item']}</s>: item['item']}
                                            <Button variant="light"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickDelete(item['id'])} className='float-right'>❌</Button> 
                                            <Button variant="light"  style={{borderRadius:'5em', maxWidth:'2em'}} onClick={() => handleClickCompleted(item['id'])} className='float-right'>✔️</Button> 
                                        </Card.Header> 
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

export default connect(mapStateToProps)(Groceries);

