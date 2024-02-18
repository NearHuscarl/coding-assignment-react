import { render, screen, fireEvent } from '@testing-library/react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Tickets from './tickets';

const mockResponse = (data: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

describe('Tickets', () => {
  it('should render the initial view correctly', async () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('Tickets');
    expect(screen.getByTestId('loading')).toHaveTextContent('...');
  });

  it('should render all tickets after fetching', async () => {
    mockResponse([
      { id: 1, description: 'Description 1', completed: false },
      { id: 2, description: 'Description 2', completed: true },
    ]);

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const listItems = await screen.findAllByRole('link');
    expect(listItems.length).toBe(2);
    expect(listItems[0]).toHaveTextContent('Ticket 1 - Description 1');
    expect(listItems[1]).toHaveTextContent('Ticket 2 - Description 2');
  });

  it('should change to new page when hitting the button', async () => {
    const navigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    const button = await screen.findByRole('button');

    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/new');
  });
});
