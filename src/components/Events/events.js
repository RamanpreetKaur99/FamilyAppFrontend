import React, {Children} from 'react';
import { useState, useEffect } from 'react' 
import axios from 'axios'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Card} from 'react-bootstrap'
import {Form,Col} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'

const localizer = momentLocalizer(moment);
const CURRENT_DATE = moment().toDate();
const ColoredDateCellWrapper = ({children, value}) =>
	React.cloneElement(Children.only(children), {
		style: {
			...children.style,
			backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
		},
	});


const Events = ({user}) => {

    const [events, setEvents] = useState(null)
    const [values, setValues] = useState({
        title: '',
        allDay: true, 
        startDate:null, 
        endDate: null 
    })
    const [refresh, setRefresh] = useState(0)
    const [addevent, setAddEvent] = useState(false)

    useEffect(() => {
        axios.get('family/allevents/' + user)
        .then(res => {
            console.log(res.data)
            setEvents(res.data)
        })
    },[refresh,addevent])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleClickAdd = () => {
        const sdate = moment(values.startDate).format('DD MMM, YYYY')
        const edate = moment(values.endDate).format('DD MMM, YYYY')
        let newEvent = {
            'title': values.title, 
            'startDate': sdate,
            'endDate': edate,
            'allDay': values.allDay,
        }

        axios.post('family/viewevent/'+user+'/',newEvent)
        .then(res => {
            console.log(res.data)
            setRefresh(!refresh)
            setAddEvent(false)
        })
    }

    return(
        <div style={{height:'100vh',margin:'1%'}}>
            {/*<div className='row bg-primary'>
                <h2><i>Family Events</i></h2>
                <h5>Want to add a new Event? 
                <Button variant="danger"  style={{borderRadius:'5em',minHeight:'4em',fontWeight:'xx-large'}} className='float-right' onClick={() => setAddEvent(true)}>➕</Button>
                </h5>
                {/*{addevent?
                    <Card style={{ width: '18rem', border:'thin',marginLeft: '15%',marginTop:'5%', backgroundColor:'rgb(241, 198, 241)'}}>
                            <Form.Group style={{backgroundColor:'rgb(241, 198, 241)'}}>
                                <Form.Control name='title' placeholder='Enter event name' size="lg" onChange={(e) => handleChange(e)}/>
                                <br />
                                <Form.Control name='startDate' placeholder='Enter start date of event' as='date'  onChange={(e) => handleChange(e)}/>
                                <br />
                                <Form.Control name='endDate' placeholder = 'Enter end date of event' type='date' onChange={(e) => handleChange(e)}/>
                            </Form.Group>
                        </Card>
                        <div className='row'>
                            <div className='col-md-9'></div>
                            <Button variant="danger"  style={{borderRadius:'5em',minHeight:'4em',fontWeight:'xx-large'}} className='float-right col-md-2' onClick={() => handleClickAdd()}>➕</Button>
                        </div>
                :
                null
                }
            </div>*/}
            <div style={{textAlign:'center'}}>
                <h6>Want to Add a new Event? <t/><t /><t /><t />
                <Button variant="primary"  style={{borderRadius:'5em',minHeight:'2em',fontWeight:'xx-large'}}  onClick={() => setAddEvent(true)}>➕</Button>
                </h6>
                {addevent?
                    <div>
                        <Card style={{ width: '18rem', border:'thin',marginLeft: '40%',marginTop:'5%', backgroundColor:'rgb(125, 238, 223)'}}>
                            <Form.Group style={{backgroundColor:'rgb(125, 238, 223)'}}>
                                <Form.Control name='title' placeholder='Enter event name' size="lg" onChange={(e) => handleChange(e)}/>
                                <br />
                                <Form.Control name='startDate' placeholder='Enter start date of event' type='date'  onChange={(e) => handleChange(e)}/>
                                <br />
                                <Form.Control name='endDate' placeholder = 'Enter end date of event' type='date' onChange={(e) => handleChange(e)}/>
                            </Form.Group>
                            <Button variant="success"  style={{marginLeft:'40%', borderRadius:'5em',minHeight:'4em',fontWeight:'xx-large'}} className='col-md-2' onClick={() => handleClickAdd()}>➕</Button>
                        </Card>
                    </div>
                    :
                    null
                }
            </div>
            
                <br />
                <Calendar
                    events={events?events:[]}
                    localizer = {localizer}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    components={{
                        dateCellWrapper: ColoredDateCellWrapper,
                    }}
                />
             
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Events);



