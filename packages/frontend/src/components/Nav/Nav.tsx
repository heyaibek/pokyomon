import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  gap: 1rem;
  background: #333;
  color: white;

  & > a {
    color: white;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

export default function Nav() {
	const { user } = useAuth();

	return (
		<NavContainer>
			<h2>Pokyomon</h2>
			<Spacer />
			<Link to="/">Discover</Link>
			<Link to="/pokedex">My Pokedex</Link>
			<Spacer />
			<p>{user ? user.displayName : 'Account'}</p>
		</NavContainer>
	);
}
