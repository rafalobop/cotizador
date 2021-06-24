import React, { useState } from 'react';
import './css/app.css';
import Header from './components/Header';
import Formulario from './components/Formulario';
import styled from '@emotion/styled/dist/emotion-styled.cjs';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Loader from './components/Loader';
const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

const App = () => {
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const { cotizacion, datos } = resumen;

  return (
    <>
      <Contenedor>
        <Header titulo="Cotizador de Seguro" />
        <ContenedorFormulario>
          <Formulario setResumen={setResumen} setLoading={setLoading} />
          {loading ? <Loader /> : null}
          <Resumen datos={datos} />
          {!loading ? <Resultado cotizacion={cotizacion} /> : null}
        </ContenedorFormulario>
      </Contenedor>
    </>
  );
};

export default App;
