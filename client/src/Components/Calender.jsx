"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "../Components/Calender.css";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  // Load stored events from localStorage when the component mounts
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

  // Initialize Draggable events
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");

    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".draggable-event",
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
            id: new Date().getTime().toString(),
          };
        },
      });
    }
  }, []);

  // Add new event from input field
  const handleAddEvent = () => {
    const inputValue = document.getElementById("inputs").value;
    if (!inputValue) return; // Prevent empty events

    const newEvent = {
      title: inputValue,
      id: new Date().getTime().toString(), // Unique ID based on timestamp
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    document.getElementById("inputs").value = ""; // Clear input
  };

  // Handle dropping events onto the calendar
  const handleEventDrop = (data) => {
    const droppedEvent = {
      title: data.draggedEl.innerText,
      start: data.date.toISOString(),
      allDay: data.allDay,
      id: new Date().getTime().toString(),
    };

    setEvents((prevEvents) => [...prevEvents, droppedEvent]);
  };

  return (
    <div id="Apptings">
      {/* Draggable Event List */}
      <div id="draggable-el">
        <h1>Drag Events</h1>
        {events.map((event, i) => (
          <div key={i} className="draggable-event">
            {event.title}
          </div>
        ))}
      </div>

      {/* Add Event Section */}
      <h1>Add An Event</h1>
      <input type="text" placeholder="Add an event" id="inputs" />
      <button onClick={handleAddEvent}>Add</button>
      <button
        onClick={() => {
          setEvents([]);
          localStorage.removeItem("calendarEvents"); // Clear local storage
        }}
      >
        Clear All
      </button>

      {/* FullCalendar Component */}
      <h2>Teacher Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          center: "title",
          left: "dayGridMonth,timeGridWeek,dayGridDay,listWeek",
        }}
        nowIndicator={true}
        droppable={true} // Allow external events to be dropped
        selectable={true}
        editable={true}
        events={events} // Pass stored events to FullCalendar
        drop={(data) => handleEventDrop(data)}
      />
    </div>
  );
}
