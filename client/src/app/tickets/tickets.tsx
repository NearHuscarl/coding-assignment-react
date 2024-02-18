import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Ticket } from '@acme/shared-models';
import { fetchTickets } from 'client/src/api/tickets';
import styles from './tickets.module.css';

export interface TTicketsProps {}

const FILTER_STATUSES = {
  '-1': 'All',
  0: 'In Progress',
  1: 'Complete',
};

export function Tickets(props: TTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState('-1');
  const navigate = useNavigate();
  const filteredTickets = tickets.filter((t) => {
    switch (statusFilter) {
      case '0':
        return !t.completed;
      case '1':
        return t.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    fetchTickets().then((result) => {
      setTickets(result.data ?? []);
    });
  }, []);

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      <div className={styles['ticketFilter']}>
        <label htmlFor="filter-select">Status:</label>
        <select
          name="filter"
          id="filter-select"
          defaultValue="-1"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {Object.entries(FILTER_STATUSES).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={() => navigate('/new')}>Create Ticket</button>
      </div>
      {tickets.length === 0 && <span data-testid="loading">...</span>}
      <ul>
        {filteredTickets.map((t) => (
          <li key={t.id}>
            <Link to={`/${t.id}`}>
              Ticket {t.id} - {t.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
