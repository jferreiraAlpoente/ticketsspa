import { useEffect, useState } from 'react';
import { getTicketThreads, getTickets, createComment, login, logout } from '../lib/api';

export default function TestPage() {
  const [data, setData] = useState(null);

  // Replace these placeholders with actual data
  const testUsername = 'admin';
  const testPassword = 'admin';
  const user = 1;
  const text = 'This is a test comment';

  useEffect(() => {
    console.log('useEffect called...');  // add this line
    
    // Test the login function
    login(testUsername, testPassword)
      .then(response => {
        console.log('Login response:', response);
        setData(response);

        // Test the getTicketThreads and getTickets functions after a successful login
        getTicketThreads().then(response => console.log('Ticket Threads:', response));
        getTickets().then(response => console.log('Tickets:', response));

        // Test the createComment function
        createComment(user, text).then(response => console.log('New Comment:', response));

        // Test the logout function
        logout().then(() => console.log('Logged out'));
      })
      .catch(err => {
        console.error('Login error:', err);
      });
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
