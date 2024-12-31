import  { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridView from '@fullcalendar/daygrid'
import timeGridView from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../Components/Calender.css'


export default function Calender() {

    const [events,setEvents] = useState([])

    const handleSelect = (info) => {

        const {start, ends} = info
        const eventName = prompt('Enter event name')

        if (eventName){
            setEvents([...events,{
                id: 'Teacher Name',
                title: eventName,
                start,
                ends
            }])
        }
    }

  return (
    <>
    <h2>Teacher Schedueler</h2>
      <FullCalendar
        plugins={[dayGridView,timeGridView,interactionPlugin]}
        headerToolbar={{
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
        }}
        nowIndicator={true}
        events={events}
        selectable
        select={handleSelect}
        listDaySideFormat
      />
    </>
  )
}
