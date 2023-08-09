import React from 'react';
import styled from 'styled-components';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import { Admin, Discover, Pokedex } from './pages';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default function App() {
  return (
    <Container>
      <Nav />
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Container>
  );
}
