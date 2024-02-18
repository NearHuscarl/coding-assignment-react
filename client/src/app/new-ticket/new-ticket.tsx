import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createTicket } from 'client/src/api/tickets';
import styles from './new-ticket.module.css';

/* eslint-disable-next-line */
export interface NewTicketProps {}

export function NewTicket(props: NewTicketProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const form = e.currentTarget;
      const formData = {
        description: form['description'].value,
      };

      await createTicket(formData);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['container']}>
      <h2>New Ticket</h2>
      <form className={styles['ticketForm']} onSubmit={handleSubmit}>
        <textarea name="description" placeholder="Ticket description" />
        <button type="submit" disabled={isLoading}>
          Create Ticket
        </button>
      </form>
    </div>
  );
}

export default NewTicket;
