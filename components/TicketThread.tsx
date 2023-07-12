import React from 'react';
import { useState } from 'react';
import { TicketType, TicketThreadType } from '../types';
import { Ticket } from './Ticket';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';


type Props = {
  thread: TicketThreadType;
  eventKey: string;
  selectedTickets: number[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<number[]>>;
};

const StyledBadge = styled(Badge)`
  margin-left: 10px;
  margin-right: 10px;

`;

export function TicketThread({ thread, eventKey, selectedTickets, setSelectedTickets }: Props) {
  const [open, setOpen] = useState(false);
  const firstTicketTitle = thread.tickets.length > 0 ? thread.tickets[0].title : 'No tickets in this thread';


   const getStatusLabel = (status: string) => {
    switch (status) {
      case 'A':
        return 'Open';
      case 'F':
        return 'Closed';
      default:
        return 'Unknown';
    }
  }

return (
   <Card>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header onClick={() => setOpen(!open)}>
          <StyledBadge bg={thread.status === 'A' ? 'success' : 'danger'}>
          {getStatusLabel(thread.status)}
          </StyledBadge>
          {firstTicketTitle}
        </Accordion.Header>
        <Accordion.Body>
          {thread.tickets.map((ticket) => (
  <Ticket 
    key={ticket.id} 
    ticket={ticket} 
    selectedTickets={selectedTickets} 
    setSelectedTickets={setSelectedTickets} 
  />
))}
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  ); 
}

