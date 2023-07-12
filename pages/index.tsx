import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import NavBar from '../components/Navbar';
import { TicketSection } from '@/components/TicketSection';
import styled from 'styled-components';

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
  const Title = styled.div`
  margin-top: 15px;
  width: 100%;
  margin-left: 22px;
  color: #3b3939 ;

`;

  return (
    <div>
      <NavBar />
      <Title><h1>Tickets Kit Escola Digital</h1></Title>
      <TicketSection/>
    </div>
  ); 
};

export default Home;

