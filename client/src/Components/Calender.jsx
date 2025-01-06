"use client"
import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '../Components/Calender.css'



export default function Calender() {

 
    const [events, setEvents] = useState([
      {title: 'ting 1', id: '1'},
      {title: 'ting 2', id: '2'},
      {title: 'ting 3', id: '3'},
      {title: 'ting 4', id: '4'},
      {title: 'ting 5', id: '5'}
    ])

    const [allEvents, setAllevents] = useState([])
    const [showmodal, setShowModal] = useState(false)

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
        plugins={[dayGridView,timeGridView,interactionPlugin,listPlugin]}
        headerToolbar={{
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
        }}
        nowIndicator={true}
        droppable = {true}
        selectable = {true}
        editable = {true}
        events={{}}
        dateClick={{}}
      />
    </div>

    </>
  )
}