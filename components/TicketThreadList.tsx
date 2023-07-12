import React, { useState, useEffect } from 'react';
import { getTicketThreads } from '../lib/api';
import { TicketThreadType } from '../types';
import { TicketThread } from './TicketThread';
import { Ticket } from './Ticket';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  threads: TicketThreadType[];
};


const ThreadCard = styled(Card)`
  margin: 10px;
  border: none;
`;

// export function TicketThreadList({ tickets }: Props) {
//   const [threads, setThreads] = useState<TicketThreadType[]>([]);

//   useEffect(() => {
//     async function fetchThreads() {
//       const threads = await getTicketThreads();
//       setThreads(threads);
//     }

//     fetchThreads();
//   }, []);

//   return (
//     <Accordion defaultActiveKey="0">
//       {threads.map((thread, index) => (
//         <TicketThread key={thread.id} thread={thread} eventKey={index.toString()} />
//       ))}
//     </Accordion>
//   );
// }

export function TicketThreadList({ threads }: Props) {
  return (
    <ThreadCard>
      <Card.Body>
      <Accordion defaultActiveKey="0">
      {threads.map((thread, index) => (
        <TicketThread key={thread.id} thread={thread} eventKey={index.toString()} />
      ))}
    </Accordion>
</Card.Body>
</ThreadCard>
  );
}