'use client'
import React, { useState } from "react";

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Box, Modal, Button, TextInput } from '@mantine/core';
import { inter } from "../fonts";
import { VetSchedule } from "@/app/lib/definitions";


const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);



interface CalendarProps {
  vetSchedule: VetSchedule[];
}


export default function MyCalendar({ vetSchedule }: CalendarProps) {

  const initialEvents = vetSchedule.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    allDay: false,
  }));

  const [events, setEvents] = useState(initialEvents);
  const [view, setView] = useState(Views.WEEK); // Estado para la vista actual
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventInfo, setNewEventInfo] = useState({ title: '', start: null, end: null });

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEventInfo({ title: '', start, end });
    setModalOpen(true);
  };

  
  const handleCreateEvent = () => {
    let idList = events.map(a => a.id);
    let newId = Math.max(...idList) + 1;
    let newEvent = {
      id: newId,
      title: newEventInfo.title,
      start: newEventInfo.start,
      end: newEventInfo.end,
      allDay: false,
    };
    setEvents(events.concat([newEvent]));
    setModalOpen(false);
  };

  return (
    <Box>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        view={view} // Vista actual controlada por el estado
        style={{ height: 700 }}
        
        selectable
        popup
        onView={(newView) => setView(newView)} // Manejar cambio de vista
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={handleSelectSlot}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
      />
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Nuevo Evento"
      >
        <TextInput
          label="Título del Evento"
          value={newEventInfo.title}
          onChange={(e) => setNewEventInfo({ ...newEventInfo, title: e.currentTarget.value })}
        />
        <Button onClick={handleCreateEvent} style={{ marginTop: 10 }}>Crear Evento</Button>
      </Modal>
    </Box>
  );
}
