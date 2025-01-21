"use client"
import { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '../Components/Calender.css'
import { number } from 'prop-types'




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
    
    //added code to handle dropping events into delete area
    function handleEventDrop(info) {
      if (info.draggedEl.id === 'delete-area') {
        setIdToDelete(info.event.id);
        setShowDeleteModal(true);
      }
    }

    //added code to initialize confirmation of deletion
    function confirmDelete() {
      setAllEvents(allEvents.filter(event => event.id !== idToDelete)); //this is a kind of clunky way to separate out the events not selected
      setShowDeleteModal(false);
    }

    //added code to allow cancellation
    function cancelDelete() {
      setShowDeleteModal(false);
      setIdToDelete(null);
    }
  







    function addEvent(data){

      const event = {...newEvent, start: data.date, allDay }
    } 

    function handleDeleteModal (data){

      setShowDeleteModal(true)
      setIdToDelete(data.event.id)
      console.log(data)
    } 


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
    <h2>Teacher Schedule</h2>
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
        events={allEvents}
        eventClick={(data) => handleDeleteModal(data)}
      />
    </div>
    <div id="delete-area" style={{ marginTop: '20px', padding: '10px', background: '#f8d7da', color: '#721c24', textAlign: 'center' }}>
          🗑️ Drag Here to Delete
        </div>
      

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this event?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}