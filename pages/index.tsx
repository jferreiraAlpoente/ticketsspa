import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import NavBar from '../components/Navbar';
import { TicketThreadList } from '../components/TicketThreadList';


const Home = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading]);

  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <div>
        <TicketThreadList />
      </div>
    </div>
  );
};

export default Home;

