import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Swal from 'sweetalert2';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function NewIncident() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [value, setValue] = useState('');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('/incident', data, {
        headers: {
          ong_id: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      Swal.fire(`<small>${err}</small>`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>

          <p>Descreva o caso detalhadamente para encontrar um herói que deseja resolver seu caso.</p>

          <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#E02041" /> Página incial</Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do caso" />

          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />

          <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais" />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
