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
    })
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
      
      let dropThing = document.getElementById('draggable-el')
      
      if(dropThing){
        new Draggable(dropThing,{
          itemSelector: 'div',
          eventData: function(eventEl){
            let title = eventEl.getAttribute('title')

            return{title}
          }
        })
      }

    },[])

    async function postData (arg){


      const URL = 'http://127.0.0.1:4000/events/create'
      const title = arg.event.title
      const startDate = arg.event.startStr
      const token = localStorage.getItem('token')

      const evnt = {
        title: title,
        startDate: startDate
      }
    
      try{

        const res = await fetch(URL,{
          method: 'Post',
          headers: {'Content-Type': 'application/json',
                    'Authorization': `${token}`
          },
          body: JSON.stringify(evnt)
        })

        if(!res.ok){
          if(res.status === 404){
            throw new Error(res.statusText)
          }
        }

        const info = await res.json()
        
        setData(info)

      }catch(err){
        console.log(err.message)
        setError(error)
      }
    }

    function clickTing (arg){
      //!This was a test function that might still be
      setNewEvent({...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getDate()})
      console.log(arg)
    }

    function handelAddEventInput(){

      const id = Math.floor(Math.random() * 16)
      const addedEvent = document.getElementById('inputs').value
      document.getElementById('inputs').value = ''
      setEvents([...events, {title: addedEvent, start: '', allDay: '', id: id }])
      
    }

    const handleClicking = (e, nme) => {

      console.log(e)
      const editModal = window.prompt('Enter the data')
      const ting = e.view.calendar.getEvents().map(evnt => evnt._def.title = editModal)
      return e.view.calendar.addEvent({title: ting, date: e.dateStr})
    }

    

  return (
    <>
    
    <div id='Application'>
     <div id='draggable-el'>
  
          <h1>Drag Events</h1>
          {events.map((ev,i) => (
            <div 
              title= {ev.title}
              key={i}
            >
              {ev.title}
            </div>
          ))}
        </div>
          <h1>Add An Event</h1>
          <input type="text" placeholder='add an event' id='inputs' />
          <button onClick={handelAddEventInput}>Add</button>
          <button>Remove</button>

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
        listDaySideFormat
        eventClick={(info) => {
        handleClicking(info)
        postData(info)
        }}
        dayMaxEventRows={true}
        eventBackgroundColor={'blue' ? 'black' : 'yellow'}
      />
    </div>
       
    </>
  )
}