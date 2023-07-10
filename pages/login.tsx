import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-100 mx-auto">
          <strong><h2 className="text-center mb-3">Kit Escola Digital</h2></strong>
          <div className="text-center">
            <img src="/alpoente.png" className="d-block mx-auto mb-4" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
