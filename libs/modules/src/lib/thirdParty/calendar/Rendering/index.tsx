import React from 'react';
import { momentLocalizer } from 'react-big-calendar';
import events from '../events';
import moment from 'moment';
import { StyledCalendar } from '../index.styled';

const localizer = momentLocalizer(moment);

type EventType = {
  title: string;
  desc: string;
};

function Event({ event }: { event: EventType }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

function EventAgenda({ event }: { event: EventType }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const Rendering = () => {
  return (
    <StyledCalendar
      events={events}
      localizer={localizer}
      defaultDate={new Date(2021, 10, 1)}
      defaultView="agenda"
      components={{
        event: Event,
        agenda: {
          event: EventAgenda,
        },
      }}
    />
  );
};

export default Rendering;
