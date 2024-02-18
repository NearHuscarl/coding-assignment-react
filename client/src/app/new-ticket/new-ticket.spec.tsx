import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewTicket from './new-ticket';

describe('NewTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <NewTicket />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
