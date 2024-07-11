'use client'

import React, { useState } from "react";

import { Calendar, momentLocalizer, SlotInfo, stringOrDate, View, Views } from 'react-big-calendar'
import moment from "moment";
import 'moment-timezone'
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Box, Modal, Button, TextInput, useMantineTheme } from '@mantine/core';
import { Appointments, VetSchedule } from "@/app/lib/definitions";
import { v4 as uuidv4 } from 'uuid';
import { stat } from "fs";

interface CalendarEvent {
  id: string;
  title: string;
  start: stringOrDate;
  end: stringOrDate;
  allDay?: boolean;
  status?: boolean;
}

const DragAndDropCalendar = withDragAndDrop<CalendarEvent>(Calendar); // Note the generics here
moment.locale("es");
const localizer = momentLocalizer(moment);



interface CalendarProps {
  appointments: any[]
  vetSchedule: VetSchedule[];
  setVetEvent: (vetEvent: CalendarEvent[]) => void;
  setSelectedAppointments: (appointments: Appointments[]) => void;
  selectedAppointments: Appointments[];
  
}


export default function MyCalendar({ appointments, vetSchedule, setVetEvent, setSelectedAppointments, selectedAppointments }: CalendarProps) {
  const appointments_and_vetschedule = appointments.concat(vetSchedule ?? []);
  const theme = useMantineTheme();
   
  const initialEvents = appointments_and_vetschedule?.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_time,
    end: event.end_time,
    status: event.status,
  })) || [];

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [view, setView] = useState<View>(Views.WEEK);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventInfo, setNewEventInfo] = useState({ title: '', start: null as Date | null, end: null as Date | null });

  const moveEvent: withDragAndDropProps<CalendarEvent>['onEventDrop'] = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
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
    setVetEvent(nextEvents);

    
  };

  const resizeEvent: withDragAndDropProps<CalendarEvent>['onEventResize'] = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
    setVetEvent(nextEvents);

   
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setNewEventInfo({ title: '', start, end });
    setModalOpen(true);


  
    
  };

  
  const handleCreateEvent = () => {
    if (newEventInfo.start && newEventInfo.end) {
      const newEvent: CalendarEvent = {
        id: uuidv4(),
        title: newEventInfo.title,
        start: newEventInfo.start,
        end: newEventInfo.end,
        allDay: false,
        status: false, // or your default value
      };

      const newAppointment: Appointments = {
        ...newEvent,
        start_time: newEvent.start as Date,
        end_time: newEvent.end as Date,
        created_date: new Date(),
        updated_date: new Date(),
        user_id: '',
        pet_id: '1',
        vet_id: '1',
        status: false,

      };

      setEvents(events.concat([newEvent]));
      setVetEvent?.(events.concat([newEvent]));
      setSelectedAppointments?.(selectedAppointments?.concat([newAppointment]));
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
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={handleSelectSlot}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        view={view} // Vista actual controlada por el estado
        date={date} // https://stackoverflow.com/questions/78011246/react-big-calendar-next-and-back-buttons-not-navigating-to-the-correct-month
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
          onChange={
            (event) => setNewEventInfo({ ...newEventInfo, title: event.currentTarget.value })
          }
        />
        <Button onClick={handleCreateEvent} style={{ marginTop: 10 }}>Crear Evento</Button>
      </Modal>
    </Box>
  );
}
