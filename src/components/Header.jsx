import React from 'react';
import styled from '@emotion/styled/dist/emotion-styled.cjs';

const ContenedorHeader = styled.header`
  background-color: #26c6da;
  padding: 10px;
  font-weight: bold;
  color: #fff;
`;
const TextoHeader = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
`;
const Header = ({ titulo }) => {
  return (
    <ContenedorHeader>
      <TextoHeader>{titulo}</TextoHeader>
    </ContenedorHeader>
  );
};

export default Header;
