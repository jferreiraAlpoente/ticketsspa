import { TicketThreadList } from './TicketThreadList';
import { ThreadControls } from './ThreadControls';
import { useEffect, useState } from 'react';
import { getTickets } from '@/lib/api';
import { TicketThreadType } from '@/types';
import { getTicketThreads } from '@/lib/api';
import Pagination from 'react-bootstrap/Pagination';

export function TicketSection() {
 const [originalThreads, setOriginalThreads] = useState<TicketThreadType[]>([]);
  const [filteredThreads, setFilteredThreads] = useState<TicketThreadType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 8; 


  // Fetch threads
  useEffect(() => {
    const fetchThreads = async () => {
      const threads = await getTicketThreads();
      setOriginalThreads(threads);
      setFilteredThreads(threads);
    };

    fetchThreads();
  }, []);


  const handleFilterChange = (filter: string) => {
  const lowercasedFilter = filter.toLowerCase();

  const newFilteredThreads = originalThreads
    .map(thread => {
      const filteredTickets = thread.tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(lowercasedFilter) ||
        ticket.body.toLowerCase().includes(lowercasedFilter)
      );

      return {
        ...thread,
        tickets: filteredTickets,
      };
    })
    .filter(thread => thread.tickets.length > 0); // Only keep threads that still have tickets after filtering

  setFilteredThreads(newFilteredThreads);
};

const handleStatusChange = (status: string) => {
  const newFilteredThreads = originalThreads.filter(thread =>
    status === '' ? true : thread.status === status
  );

  setFilteredThreads(newFilteredThreads);
};

const handleSortChange = (sort: string) => {
  const newSortedThreads = [...filteredThreads].sort((a, b) => {
    if (sort === 'mostRecent') {
      return new Date(b.tickets[0].date).getTime() - new Date(a.tickets[0].date).getTime();
    } else {
      return new Date(a.tickets[0].date).getTime() - new Date(b.tickets[0].date).getTime();
    }
  });

  setFilteredThreads(newSortedThreads);
};

 const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(indexOfFirstThread, indexOfLastThread);

  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }


    return (
    <div>
      <ThreadControls onFilterChange={handleFilterChange} onSortChange={handleSortChange} onStatusChange={handleStatusChange} />
      <TicketThreadList threads={currentThreads} />
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => setCurrentPage(old => Math.max(1, old - 1))} />
        {items}
        <Pagination.Next onClick={() => setCurrentPage(old => Math.min(totalPages, old + 1))} />
      </Pagination>
    </div>
  );
}

