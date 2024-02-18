import { Ticket } from '@acme/shared-models';
import { TFetchResult } from './types';
import { handleException } from './utils';

const TICKET_API = '/api/tickets';

export async function fetchTickets(): TFetchResult<Ticket[]> {
  try {
    const data = await fetch(TICKET_API);
    return { data: await data.json(), error: null };
  } catch (error) {
    handleException(error);
    return { data: [], error };
  }
}

export async function fetchTicket(id: Ticket['id']): TFetchResult<Ticket> {
  try {
    const data = await fetch(`${TICKET_API}/${id}`);
    return { data: await data.json(), error: null };
  } catch (error) {
    handleException(error);
    return { data: null, error };
  }
}

export async function createTicket(formData: object): TFetchResult<Ticket> {
  try {
    const data = await fetch(TICKET_API, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    return { data: await data.json(), error: null };
  } catch (error) {
    handleException(error);
    return { data: null, error };
  }
}

export async function assignTicket(
  id: Ticket['id'],
  assigneeId: number
): TFetchResult<boolean> {
  try {
    const url =
      assigneeId !== -1
        ? `${TICKET_API}/${id}/assign/${assigneeId}`
        : `${TICKET_API}/${id}/unassign`;

    await fetch(url, { method: 'PUT' });
    return { data: true, error: null };
  } catch (error) {
    handleException(error);
    return { data: false, error };
  }
}

export async function markComplete(id: Ticket['id']): TFetchResult<boolean> {
  try {
    const data = await fetch(`${TICKET_API}/${id}/complete`, { method: 'PUT' });
    return { data: true, error: null };
  } catch (error) {
    handleException(error);
    return { data: false, error };
  }
}

export async function markIncomplete(id: Ticket['id']): TFetchResult<boolean> {
  try {
    await fetch(`${TICKET_API}/${id}/complete`, {
      method: 'DELETE',
    });
    return { data: true, error: null };
  } catch (error) {
    handleException(error);
    return { data: false, error };
  }
}
