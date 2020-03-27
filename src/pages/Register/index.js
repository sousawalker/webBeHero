import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Swal from "sweetalert2";

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [whatsapp, setWhatsapp] = useState('');

  const [city, setCity] = useState('');

  const [state, setState] = useState('');

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state
    };

    try {
      const response = await api.post('/ong', data);

      Swal.fire(`Seu id de acesso: <small>${response.data.id}</small>`).then(() => {
        history.push('/');
      });
    } catch (err) {
      Swal.fire(`Erro no cadastro, tente novamente. <small>${err}</small>`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/"><FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro.</Link>
        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />

          <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />

          <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />

            <input placeholder="UF" style={{ width: 80 }} value={state} onChange={e => setState(e.target.value)} />
          </div>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}