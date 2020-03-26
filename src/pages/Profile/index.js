import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import Swal from 'sweetalert2';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Profile() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get(`/incidents/${ongId}`).then((res) => {
      setIncidents(res.data);
    });
  }, [ongId]);

  function handleDeleteIncident(id) {
    try {
      Swal.fire({
        title: `Deseja deletar o caso de id: <small>${id}</small>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim, deletar'
      }).then(async (choice) => {
        if (choice.value) {
          await api.delete(`/incident/${id}`, { headers: { ong_id: ongId }});

          await api.get(`/incidents/${ongId}`).then((res) => { setIncidents(res.data); });
        }
      });
    } catch (err) {
      Swal.fire(`${err}`);
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImage} alt="Be The Hero" />

        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>

            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>

            <p>{incident.description}</p>

            <strong>VALOR:</strong>

            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
