import React, { useState } from 'react';
import styled from '@emotion/styled/dist/emotion-styled.cjs';
import {
  obtenerDiferenciaYear,
  obtenerDiferenciaMarca,
  obtenerDiferenciaPlan,
} from '../helpers/cotizacion';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;
const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s;
    border-radius: 20px;
  }
`;
const Error = styled.div`
  background-color: #f00;
  color: #fff;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setLoading }) => {
  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: '',
  });

  const { marca, year, plan } = datos;
  const [error, setError] = useState(false);
  const obtenerInfo = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const cotizarSeguro = (e) => {
    e.preventDefault();
    if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
      setError(true);
      setTimeout(() => {
        setError();
      }, 2000);
      return;
    }
    setError(false);

    //base 2000
    let resultado = 2000;
    //obtener diferencia de precio segun los años
    const diferencia = obtenerDiferenciaYear(year);
    //por año restar el 3% de diferencia
    resultado -= (diferencia * 3 * resultado) / 100;
    // console.log(resultado);

    //direrencia segun marca
    resultado = obtenerDiferenciaMarca(marca) * resultado;
    // console.log(resultado);

    //diferencia segun plan
    const incrementoPlan = obtenerDiferenciaPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    console.log(resultado);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResumen({
        cotizacion: resultado,
        datos,
      });
    }, 2000);
    //pasarResumen
  };

  return (
    <>
      <form action="" onSubmit={cotizarSeguro}>
        {error ? <Error>Debes completar todos los campos</Error> : null}
        <Campo>
          <Label>Marca</Label>
          <Select name="marca" value={marca} onChange={obtenerInfo}>
            <option value=""> -- Seleccione --</option>
            <option value="americano">Americano</option>
            <option value="europeo">Europeo</option>
            <option value="asiatico">Asiatico</option>
          </Select>
        </Campo>
        <Campo>
          <Label>Año</Label>
          <Select name="year" value={year} onChange={obtenerInfo}>
            <option value="">-- Seleccione --</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
          </Select>
        </Campo>
        <Campo>
          <Label>Plan</Label>
          <InputRadio
            type="radio"
            name="plan"
            value="basico"
            checked={plan === 'basico'}
            onChange={obtenerInfo}
          />
          Basico
          <InputRadio
            type="radio"
            name="plan"
            value="completo"
            checked={plan === 'completo'}
            onChange={obtenerInfo}
          />
          Completo
        </Campo>
        <Boton type="submit">Cotizar</Boton>
      </form>
    </>
  );
};

export default Formulario;
