import React, { useState, useEffect } from 'react';

const Form = () => {
  // States
  const [user, setUser] = useState({
    state: '',
    city: '',
    name: '',
    email: '',
  });
  const [data, setData] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState({
    errDep: '',
    errCity: '',
    errName: '',
    errEmail: '',
    errGlobal: '',
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getDataColombia();
  }, []);

  const getDataColombia = async () => {
    try {
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

      const URL =
        'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json';

      const resp = await fetch(PROXY_URL + URL, {
        mode: 'cors',
        method: 'GET',
      });

      const data = await resp.json();

      setData(data);
      setStates(Object.keys(data));
    } catch (error) {
      return 'No existe';
    }
  };

  const sendForm = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    await fetch('http://localhost:4000/api/add', requestOptions).then((response) =>
      response.json()
    );
  };

  const { state, city, name, email } = user;
  const { errDep, errCity, errName, errEmail, errGlobal } = error;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'state') {
      setCities(data[e.target.value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pattern = new RegExp('^[a-zA-Z ]+$');

    // Validations
    if (
      state.trim() === '' &&
      city.trim() === '' &&
      name.trim() === '' &&
      email.trim() === ''
    ) {
      setError({
        errGlobal: 'Todos los campos son obligatorios',
      });
      return;
      
    } else if (name.trim().length > 50) {
      setError({
        errName: 'Máximo 50 caracteres',
      });
      return;
      
    } else if (!pattern.test(name.trim())) {
      setError({
        errName: 'Es obligatorio y solo letras',
      });
      
    } else if (email.trim().length > 30) {
      setError({
        errEmail: 'Máximo 30 caracteres',
      });
      
    } else if (state.trim() === '' || city.trim() === '') {
      setError({
        errGlobal: 'Departamento y ciudad son obligatorios',
      });
      return;
      
    } else if (name.trim() === '' || email.trim() === '') {
      setError({
        errGlobal: 'Nombre y Correo son obligatorios',
      });
      return;

    } else {
      sendForm();
      setError({
        errGlobal: '',
      });
      setUser({
        ...user,
        name: '',
        email: '',
      });
      setSuccess('Usuario Guardado Exitosamente');
    }
  };

  return (
    <div className="container-form">
      <form
        className="p-5 mt-5 form-contacto needs-validation"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="form-group">
          <label htmlFor="state">Departamento*</label>
          <select
            className="form-control"
            id="states"
            name="state"
            onChange={handleChange}
          >
            <option className="placeholder" value="">
              Seleccione Departamento
            </option>
            {states
              ? states.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))
              : null}
          </select>
          {errDep ? <p className="error text-center">{errDep}</p> : null}
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad*</label>
          <select
            className="form-control"
            id="cities"
            name="city"
            onChange={handleChange}
          >
            <option className="placeholder" value="">
              Seleccione Ciudad
            </option>
            {cities
              ? cities.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))
              : null}
          </select>
          {errCity ? <p className="error text-center">{errCity}</p> : null}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre*</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Pepito de Jesús"
            value={name}
            onChange={handleChange}
          />
          {errName ? <p className="error text-center">{errName}</p> : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo*</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Pepitodejesus@gmail.com"
            value={email}
            onChange={handleChange}
          />
          {errEmail ? <p className="error text-center">{errEmail}</p> : null}
        </div>
        {(() => {
          if (success && errGlobal === '')
            return <p className="success text-center">{success}</p>;
          else if (errGlobal)
            return <p className="error text-center">{errGlobal}</p>;
          else return null;
        })()}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-uppercase">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
