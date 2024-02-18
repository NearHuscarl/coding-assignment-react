import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';
import NewTicket from './new-ticket/new-ticket';

const App = () => {
  return (
    <div className={styles['app']}>
      <h1>Ticketing App</h1>
      <Routes>
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
        <Route path="/new" element={<NewTicket />} />
      </Routes>
    </div>
  );
};

export default App;
