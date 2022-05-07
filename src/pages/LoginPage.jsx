import React, { useState, useEffect } from 'react';
import './styles/LoginPage.css';
import PropTypes from 'prop-types';
import cooking from '../images/cooking.svg';

const LoginPage = ({ history }) => {
  /* ------SETANDO ESTADOS--------- */
  const [inputsState, setInputsState] = useState({
    email: '',
    password: '',
  });
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(true);

  /* ------FUNÇÃO QUE LIDA COM CADA MUDANÇA QUE HOUVER NOS INPUTS (EMAIL E SENHA)------*/
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };

  /* Assim que botão é clicado salva os Tokens e o user no localStorage. Após,
   redireciona a página para a tela principal de comidas */
  const handleClick = () => {
    const user = {
      email: inputsState.email,
    };

    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(user));

    history.push('/comidas');
  };

  /* useEffect utilizado para que toda vez que o inputsState for alterado, seja verificado se o
    e-mail e password são validos ou não. Se forem validos, o botão é habilitado. */
  useEffect(() => {
    const emailVerification = /\S+@\S+\.\S+/;
    const isValidEmail = emailVerification.test(inputsState.email);
    const MIN_LENGTH = 6;
    const isValidPassword = inputsState.password.length > MIN_LENGTH;

    if (isValidEmail && isValidPassword) {
      setBtnDisabledStatus(false);
    } else {
      setBtnDisabledStatus(true);
    }
  }, [inputsState]);

  return (
    <div className="main-login">
		<div className="left-login">
			<h1> Faça login <br/> E crie receitas incriveis</h1>
			<img className="left-login-image" src={ cooking }alt="Astronaulta flutuando" />
		</div>
		<div className="right-login">
			<div className="card-login">
				<h1>Login</h1>
				<div className="textfield">
					<label htmlFor="email">Usuário</label>
					<input 
            type="email"
            placeholder="name@example.com"
            name="email"
            id="email"
            onChange={ handleChange }
            value={ inputsState.email }
            data-testid="email-input" />
				</div>
				<div className="textfield">
					<label htmlFor="password">Senha</label>
					<input 
            type="password" 
            placeholder="Password"
            id="password"
            name="password"
            onChange={ handleChange }
            value={ inputsState.password }
            data-testid="password-input" />
				</div>
				<button 
          className="btn-login" 
          disabled={ btnDisabledStatus }
          onClick={ handleClick }
          data-testid="login-submit-btn" 
          >
            Login
        </button>
			</div>
		</div>
	</div>
  ); 
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginPage;
