import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import NavBar from '../components/Navbar';
import { TicketSection } from '@/components/TicketSection';

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
      <h1>Tickets Escola Digital</h1>
      <TicketSection />
    </div>
  ); 
};

export default Home;

