import React, { useState, useEffect } from 'react';
import { getTicketThreads } from '../lib/api';
import { TicketThreadType } from '../types';
import { TicketThread } from './TicketThread';
import Accordion from 'react-bootstrap/Accordion';

export function TicketThreadList() {
  const [threads, setThreads] = useState<TicketThreadType[]>([]);

  useEffect(() => {
    async function fetchThreads() {
      const threads = await getTicketThreads();
      setThreads(threads);
    }

    fetchThreads();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      {threads.map((thread, index) => (
        <TicketThread key={thread.id} thread={thread} eventKey={index.toString()} />
      ))}
    </Accordion>
  );
}
