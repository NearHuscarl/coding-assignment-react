import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import {
  assignTicket,
  fetchTicket,
  markComplete,
  markIncomplete,
} from 'client/src/api/tickets';
import { fetchUsers } from 'client/src/api/users';
import styles from './ticket-details.module.css';

export interface TTicketDetailsProps {}

export function TicketDetails(props: TTicketDetailsProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [disableCompletedCheckbox, setDisableCompletedCheckbox] =
    useState(false);
  const [disableAsigneeSelect, setDisableAsigneeSelect] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  // const [users, setUsers] = useState<Record<User['id'], User>>({});
  const { id } = useParams();

  if (!id) {
    return <div>Invalid ticket ID: ${id}</div>;
  }

  useEffect(() => {
    const assigneeId = parseInt(id, 10);
    Promise.all([fetchTicket(assigneeId), fetchUsers()]).then(
      ([ticketResult, userResults]) => {
        const users = userResults.data ?? [];
        setUsers([{ id: -1, name: 'Unassigned' }, ...users]);
        setTicket(ticketResult.data ?? null);
      }
    );
  }, [id]);

  return (
    <div className={styles['tickets']}>
      {ticket === null && <span>...</span>}
      {ticket !== null && (
        <div>
          <h2>Ticket #{ticket.id}</h2>
          <div className={styles['ticketDetail']}>
            <div className={styles['ticketProperty']}>
              <div>Description:</div>
              <span>{ticket.description}</span>
            </div>
            <div className={styles['ticketProperty']}>
              <label htmlFor="asignee-select">Assignee:</label>
              <select
                name="asignee"
                id="asignee-select"
                defaultValue={ticket.assigneeId ?? -1}
                disabled={disableAsigneeSelect}
                onChange={async (e) => {
                  try {
                    setDisableAsigneeSelect(true);

                    const userId = parseInt(e.target.value, 10);
                    const user = users.find((u) => u.id === userId);

                    if (user) {
                      await assignTicket(ticket.id, user.id);
                    }
                  } finally {
                    setDisableAsigneeSelect(false);
                  }
                }}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles['ticketProperty']}>
              <label htmlFor="status-select">Completed:</label>
              <input
                type="checkbox"
                id="completed-checkbox"
                defaultChecked={ticket.completed}
                disabled={disableCompletedCheckbox}
                onChange={async (e) => {
                  try {
                    setDisableCompletedCheckbox(true);

                    const completed = e.target.checked;

                    if (completed) {
                      await markComplete(ticket.id);
                    } else {
                      await markIncomplete(ticket.id);
                    }
                  } finally {
                    setDisableCompletedCheckbox(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
