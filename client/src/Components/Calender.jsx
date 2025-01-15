"use client"
import React ,{ useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '../Components/Calender.css'
import modalPlugin from '@fullcalendar/interaction'

import DropArg from '@fullcalendar/interaction'



export default function Calender() {

 
    const [events, setEvents] = useState([
      {title: 'Classroom 1', id: '1'},
      {title: 'Classroom 2', id: '2'},
      {title: 'Classroom 3', id: '3'},
      {title: 'Classroom 4', id: '4'},
      {title: 'Classroom 5', id: '5'}
    ])

    const [allEvents, setAllevents] = useState([])
    const [showmodal, setShowModal] = useState(false)
    const [eventToEdit, setEventToEdit] = useState(null)
    const [newEvent, setNewEvent] = useState({
      title: '',
      start: '',
      allDay: false,
      id: 0
    })

    useEffect(() => {
      
      let dropTing = document.getElementById('draggable-el')
      
      if(dropTing){
        new Draggable(dropTing,{
          itemSelector: 'div',
          eventData: function(eventEl){
            let title = eventEl.getAttribute('title')
            let id = eventEl.getAttribute('data')
            let start = eventEl.getAttribute('start')
            return{title, id, start}
          }
        })
      }

    },[])

    function clickTing (arg){

      setNewEvent({...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getDate()})
      setShowModal(true)
    }

    function addEvent(data = DropArg){
      
      const event = {...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay}
      console.log(event)
      setAllevents([...allEvents, event])
    }

    function handelAddEventInput(){

      const addedEvent = document.getElementById('inputs').value
      document.getElementById('inputs').value = ''
      console.log(addedEvent)
      setEvents([...events, {title: addedEvent, start: '', allDay: '', id: events.id}])
      console.dir(events)
    
    }



  return (
    <>
    
    <div id='Apptings'>
     <div id='draggable-el'>
  
          <h1>Drag Events</h1>
          {events.map((tings,i) => (
            <div 
              title= {tings.title}
              key={i}
            >
              {tings.title}
            </div>
          ))}
        </div>
          <h1>Add An Event</h1>
          <input type="text" placeholder='add an event' id='inputs' />
          <button onClick={handelAddEventInput}>Add</button>

    <h2>Teacher Scheduel</h2>
      <FullCalendar
        plugins={[dayGridView,timeGridView,interactionPlugin,listPlugin, modalPlugin]}
        headerToolbar={{
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
        }}
        nowIndicator={true}
        droppable = {true}
        selectable = {true}
        editable = {true}
        drop={(data) => addEvent(data)}
        dateClick={clickTing}
      />
    </div>
       
    </>
  )
}