'use client'
import React, { useState } from "react";

import { Calendar, momentLocalizer, SlotInfo, stringOrDate, View, Views } from 'react-big-calendar'
import moment from "moment";
import 'moment-timezone'
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Box, Modal, Button, TextInput, useMantineTheme } from '@mantine/core';
import { VetSchedule } from "@/app/lib/definitions";
import { v4 as uuidv4 } from 'uuid';

interface CalendarEvent {
  id: string;
  title: string;
  start: any;
  end: any;
  allDay?: boolean;
  status?: boolean;
}


const DragAndDropCalendar = withDragAndDrop<CalendarEvent>(Calendar); // Note the generics here
moment.locale("es");
const localizer = momentLocalizer(moment);



interface CalendarProps {
  vetSchedule?: VetSchedule[];
  setVetEvent: (vetEvent: any) => void;
  
}


export default function MyCalendar({ vetSchedule, setVetEvent }: CalendarProps) {

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const initialEvents = vetSchedule?.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_time,
    end: event.end_time
  })) || [];
  const theme = useMantineTheme();

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

  
  const handleCreateEvent = async () => {

    let newEvent = {
      id: uuidv4(),
      title: newEventInfo.title,
      start: newEventInfo.start,
      end: newEventInfo.end,
      allDay: false
    };
    

    setEvents(events.concat([newEvent]));
    setVetEvent(events.concat([newEvent]));
    setModalOpen(false);
   
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
        date={date} // https://stackoverflow.com/questions/78011246/react-big-calendar-next-and-back-buttons-not-navigating-to-the-correct-month
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
          onChange={
            (event) => setNewEventInfo({ ...newEventInfo, title: event.currentTarget.value })
          }
        />
        <Button onClick={handleCreateEvent} style={{ marginTop: 10 }}>Crear Evento</Button>
      </Modal>
    </Box>
  );
}
