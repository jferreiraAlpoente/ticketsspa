// components/LoginForm.tsx

import React, { useState, useContext, FormEvent } from 'react';
import { useRouter } from 'next/router'; 
import { login } from '../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../contexts/AuthContext';


const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  
  
  const { setAuthToken } = useContext(AuthContext);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData.username, formData.password, setAuthToken);
      localStorage.setItem('authToken', response.token);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1 text-center ">
        <label className="form-label ">Nome:</label>
        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className="mb-3 text-center">
        <label className="form-label">Palavra-Passe:</label>
        <div className="input-group">
          <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={formData.password} onChange={handleChange} />
          <div className="input-group-append">
            <button type="button" className={`btn ${showPassword ? "btn" : "btn"}`} onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
