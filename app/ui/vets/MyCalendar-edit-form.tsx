'use client'
import React, { useState } from "react";

import { Calendar, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar'
import moment from "moment";
import 'moment-timezone'
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Box, Modal, Button, TextInput, useMantineTheme } from '@mantine/core';
import { inter } from "../fonts";
import { Veterinary, VetSchedule } from "@/app/lib/definitions";
import { createVetSchedule, editVetSchedule } from '@/app/lib/actions';
import { update } from "@react-spring/web";
import { v4 as uuidv4 } from 'uuid';



const DragAndDropCalendar = withDragAndDrop<CalendarEvent>(Calendar); // Note the generics here
moment.locale("es");
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: any;
  end: any;
  allDay?: boolean;
  status?: boolean;
}

interface CalendarProps {
  vetSchedule?: VetSchedule[];
  setVetEvent: (vetEvent: any) => void;
  vet: Veterinary;

}


export default function MyCalendar({ vetSchedule, setVetEvent, vet }: CalendarProps) {
  const theme = useMantineTheme();
   
  const initialEvents = vetSchedule?.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_time,
    end: event.end_time
  }));

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents || []);
  const [view, setView] = useState<View>(Views.WEEK);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventInfo, setNewEventInfo] = useState({ title: '', start: null as Date | null, end: null as Date | null });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const moveEvent: withDragAndDropProps<CalendarEvent>['onEventDrop'] = async ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
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
      user_id: '',
      vet_id: vet.id,
      title: event.title,
      start_time: new Date(start),
      end_time: new Date(end),
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
    })
  };

  const resizeEvent: withDragAndDropProps<CalendarEvent>['onEventResize'] = async ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
    await editVetSchedule({
      id: event.id,
      user_id: '',
      vet_id: vet.id,
      title: event.title,
      start_time: new Date(start),
      end_time: new Date(end),
      status: true,
      created_date: new Date(),
      updated_date: new Date(),
    })
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setSelectedEvent(null); 
    setNewEventInfo({ title: '', start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event); // Carga el evento seleccionado
    setNewEventInfo({ title: event.title, start: event.start, end: event.end });
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

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setVetEvent(updatedEvents);
      setModalOpen(false);
    }
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
        onSelectEvent={handleSelectEvent}

        defaultView={Views.MONTH}
        view={view} // Vista actual controlada por el estado
        date={date} // Include the date prop
        onNavigate={(date) => {
          setDate(new Date(date));
      }}
      eventPropGetter={(event, start, end, isSelected) => {
        console.log('event::: ', event);
        let newStyle = {
          backgroundColor: theme.colors.primary[1],
          color: "black",
          borderRadius: "5px",
          border : "1px solid gray",
        };

        if (event.status === true) {
          newStyle.backgroundColor = theme.colors.primary[4];
        }

        return {
          className: "",
          style: newStyle
        };
      
      }
    }
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
        <Button variant="outline" color="primary" onClick={handleCreateEvent} style={{ marginTop: 10 }}>Crear Evento</Button>
        {selectedEvent && (
          <Button onClick={handleDeleteEvent} style={{ marginTop: 10, marginLeft: 10 }}  variant="outline" color="red">
            Eliminar Evento
          </Button>
        )}     
        </Modal>
    </Box>
  );
}
