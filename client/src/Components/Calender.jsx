"use client"
import { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '../Components/Calender.css'



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
    const calendarRef = useRef(null)

    const handleEventDrop = (info) => {
      
      const updatedEvents = [...events]
      const eventIndex = updatedEvents.findIndex((event) => event.id === info.event.id)
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        start: info.event.start, 
      }
      setEvents(updatedEvents)
    }

    const handleEventResize = (info) => {
      const updatedEvents = [...events];
      const eventIndex = updatedEvents.findIndex((event) => event.id === info.event.id)
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        start: info.event.start, 
        end: info.event.end, 
      }
      setEvents(updatedEvents)
    }

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



  return (
    <>
    <div id='Apptings'>
     <div id='draggable-el'>

          <h1>Drag Events</h1>
          {events.map((tings => (
            <div 
              title= {tings.title}
              key={tings.id}
            >
              {tings.title}
            </div>
          )))}
        </div>
    <h2>Teacher Scheduel</h2>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridView,timeGridView,interactionPlugin,listPlugin]}
        headerToolbar={{
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
        }}
        nowIndicator={true}
        droppable = {true}
        selectable = {true}
        editable = {true}
        events={events}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />
    </div>

    </>
  )
}