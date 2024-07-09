'use client'
import React, { useState } from "react";

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from "moment";
import 'moment-timezone'
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Box, Modal, Button, TextInput } from '@mantine/core';
import { inter } from "../fonts";
import { VetSchedule } from "@/app/lib/definitions";
import { createVetSchedule, updateVetSchedule } from '@/app/lib/actions';
import { update } from "@react-spring/web";



const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale("es");
const localizer = momentLocalizer(moment);



interface CalendarProps {
  vetSchedule?: VetSchedule[];
}


export default function MyCalendar({ vetSchedule }: CalendarProps) {
  console.log('vetSchedule::: ', vetSchedule);
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const initialEvents = vetSchedule?.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_time,
    end: event.end_time
  }));

  const [events, setEvents] = useState(initialEvents || []);
  const [view, setView] = useState(Views.WEEK); // Estado para la vista actual
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventInfo, setNewEventInfo] = useState({ title: '', start: null, end: null });

  const moveEvent = async ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
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
    
    await updateVetSchedule({
      id: event.id,
      user_id: userId,
      vet_id: 'e9e4dbd1-59d3-466a-9e06-2ffcc3759f38',
      title: event.title,
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
    })
  };

  const resizeEvent = async ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
    await updateVetSchedule({
      id: event.id,
      user_id: userId,
      vet_id: 'e9e4dbd1-59d3-466a-9e06-2ffcc3759f38',
      title: event.title,
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
    })
  };

  const handleSelectSlot = async ({ start, end }) => {

    setModalOpen(true);
    
  };

  
  const handleCreateEvent = async () => {
    let idList = events.map(a => a.id);
    let newId = Math.max(...idList) + 1;
    let newEvent = {
      id: newId,
      title: newEventInfo.title,
      start: newEventInfo.start,
      end: newEventInfo.end,
      allDay: false,
    };
    const start_time = newEventInfo.start ? new Date(newEventInfo.start).toISOString() : new Date().toISOString();
    const end_time = newEventInfo.end ? new Date(newEventInfo.end).toISOString() : new Date().toISOString();


    setEvents(events.concat([newEvent]));
    setModalOpen(false);
    await createVetSchedule({
      id: '',
      user_id: userId,
      vet_id: 'e9e4dbd1-59d3-466a-9e06-2ffcc3759f38',
      title: newEventInfo.title,
      start_time: start_time,
      end_time: end_time,
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
    })
  };
  const [date, setDate] = useState(new Date());

  return (
    <Box>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        style={{ height: 700 }}
        selectable
        onView={(newView) => setView(newView)} // Manejar cambio de vista
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={handleSelectSlot}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        view={view} // Vista actual controlada por el estado
        date={date} // Include the date prop
        onNavigate={(date) => {
          setDate(new Date(date));
      }}
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
