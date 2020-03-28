import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import axios from 'axios';

import api from '../../services/api';

import Swal from 'sweetalert2';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Profile() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  const CancelToken = axios.CancelToken;

  let cancel;

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

  async function handleSearch(search) {
    cancel && cancel();

    try {
      let response = await api.get(`/incidents/${ongId}?search=${search}`, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        })
      });

      setIncidents(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        Swal.fire(`${err}`);
      }
    }
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

      <form>
        <input onKeyUp={(e) => { handleSearch(e.target.value) }} placeholder="Digite sua pesquisa" />
      </form>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>

            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>

            <p>{incident.description}</p>

            <strong>VALOR:</strong>

            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value).replace(/^(\D+)/, '$1 ')}</p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
