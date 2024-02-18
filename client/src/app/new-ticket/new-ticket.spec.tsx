import { render } from '@testing-library/react';

import NewTicket from './new-ticket';

describe('NewTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewTicket />);
    expect(baseElement).toBeTruthy();
  });
});
