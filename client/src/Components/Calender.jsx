"use client"
import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '../Components/Calender.css'

export default function Calender() {
  const [events, setEvents] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [isRemoveMode, setIsRemoveMode] = useState(false) // State to track "remove mode"

  const calendarRef = useRef(null) // Reference for FullCalendar

  useEffect(() => {
    let dropTing = document.getElementById('draggable-el')

    if (dropTing) {
      new Draggable(dropTing, {
        itemSelector: 'div',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title')
          let id = eventEl.getAttribute('data')
          let start = eventEl.getAttribute('start')

          return { title, id, start }
        }
      })
    }
  }, [])

  function addEvent(data) {
    const event = {
      title: data.draggedEl.innerText,
      start: data.date.toISOString(),
      allDay: data.allDay,
      id: new Date().getTime().toString() // Generate a unique ID
    }
    setAllEvents([...allEvents, event])
  }

  function handleAddEventInput() {
    const addedEvent = document.getElementById('inputs').value
    document.getElementById('inputs').value = ''
    const newId = new Date().getTime().toString() // Generate a unique ID
    setEvents([...events, { title: addedEvent, id: newId }])
    setAllEvents([...allEvents, { title: addedEvent, start: '', allDay: false, id: newId }])
  }

  function toggleRemoveMode() {
    setIsRemoveMode(!isRemoveMode) // Toggle remove mode on/off
  }

  function handleEventClick(info) {
    if (isRemoveMode) {
      if (window.confirm(`Are you sure you want to delete the event: "${info.event.title}"?`)) {
        info.event.remove() // Remove the clicked event
        console.log(`Event with ID ${info.event.id} removed.`)
      }
      setIsRemoveMode(false) // Turn off remove mode after deletion
    } else {
      console.log(`Clicked on event: ${info.event.title}`)
    }
  }

  return (
    <>
      <div id="Apptings">
        <div id="draggable-el">
          <h1>Drag Events</h1>
          {events.map((tings, i) => (
            <div title={tings.title} key={i}>
              {tings.title}
            </div>
          ))}
        </div>
        <h1>Add An Event</h1>
        <input type="text" placeholder="add an event" id="inputs" />
        <button onClick={handleAddEventInput}>Add</button>
        <button onClick={toggleRemoveMode} style={{ backgroundColor: isRemoveMode ? 'red' : '' }}>
          {isRemoveMode ? 'Cancel Remove Mode' : 'Remove'}
        </button>

        <h2>Teacher Schedule</h2>
        <FullCalendar
          ref={calendarRef} // Attach the ref to FullCalendar
          plugins={[dayGridView, timeGridView, interactionPlugin, listPlugin]}
          headerToolbar={{
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
          }}
          nowIndicator={true}
          droppable={true}
          selectable={true}
          editable={true}
          drop={(data) => addEvent(data)}
          events={allEvents} // Use the `allEvents` state for calendar events
          eventClick={handleEventClick} // Handle click to remove event if in remove mode
          dayMaxEventRows={true}
        />
      </div>
    </>
  )
}
