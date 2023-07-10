import React from 'react';
import { TicketType, TicketThreadType } from '../types';
import { Ticket } from './Ticket';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

type Props = {
  thread: TicketThreadType;
  eventKey: string;
};

export function TicketThread({ thread, eventKey }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        {thread.thread_code}
      </Accordion.Header>
      <Accordion.Body>
        <Accordion defaultActiveKey="0">
          {thread.tickets && thread.tickets.map((ticket, index) => (
            // Combine thread eventKey with ticket index to form unique eventKey for nested accordion
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
}
