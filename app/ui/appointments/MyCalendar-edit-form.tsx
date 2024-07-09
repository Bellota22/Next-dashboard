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
import { Veterinary, VetSchedule } from "@/app/lib/definitions";
import { createVetSchedule, editVetSchedule } from '@/app/lib/actions';
import { update } from "@react-spring/web";
import { v4 as uuidv4 } from 'uuid';



const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale("es");
const localizer = momentLocalizer(moment);



interface CalendarProps {
  vetSchedule?: VetSchedule[];
  setVetEvent: (vetEvent: any) => void;
  vet: Veterinary;

}


export default function MyCalendar({ vetSchedule, setVetEvent, vet }: CalendarProps) {
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
    
    await editVetSchedule({
      id: event.id,
      user_id: userId,
      vet_id: vet.id,
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
    await editVetSchedule({
      id: event.id,
      user_id: userId,
      vet_id: vet.id,
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

    let newEvent = {
      id:  uuidv4(),
      title: newEventInfo.title,
      start: newEventInfo.start,
      end: newEventInfo.end,
      allDay: false,
    };

    setEvents(events.concat([newEvent]));
    setModalOpen(false);
    setVetEvent(events.concat([newEvent]));

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
