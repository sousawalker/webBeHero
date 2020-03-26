import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import Swal from 'sweetalert2';

import './styles.css';

import logoImage from '../../assets/logo.svg';

import heroesImage from '../../assets/heroes.png';

export default function Logon() {
  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', { id });

      localStorage.setItem('ongId', id);

      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      Swal.fire(`<small>${err}</small>`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />

          <button className="button">Entrar</button>

          <Link className="back-link" to="/register"><FiLogIn size={16} color="#E02041" /> Não tenho cadastro.</Link>
        </form>
      </section>

      <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
