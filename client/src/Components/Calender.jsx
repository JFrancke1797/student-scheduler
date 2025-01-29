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

 
    const [events, setEvents] = useState([])

    const [allEvents, setAllevents] = useState([])
    const [newEvent, setNewEvent] = useState({
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0
    })

    useEffect(() => {
      const fetchEvents = async () => {
        const token = localStorage.getItem('token')
        const { data } = await fetch('http://127.0.0.1:4000/events', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setEvents(data);
      }
      fetchEvents()
    }, [])

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
      //!This was a test function that might still be used
      setNewEvent({...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getDate()})
      console.log(arg)
    }

    function addEvent(data = DropArg){
      
      const event = {...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay}
      setAllevents([...allEvents, event])
    }

    function handelAddEventInput(){

      const addedEvent = document.getElementById('inputs').value
      document.getElementById('inputs').value = ''
      setEvents([...events, {title: addedEvent, start: '', allDay: '', id: events.id}])
    
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
          <button>Remove</button>

    <h2>Teacher Schedule</h2>
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
        listDaySideFormat
        drop={(data) => addEvent(data)}
        eventClick={(info) => {
          console.log(info)
        }}
        dayMaxEventRows={true}
      />
    </div>
       
    </>
  )
}