import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './userApi';
import './auth.css';
import Cookies from 'js-cookie';

const Login = () => {
    // State to store the form data (username, password)
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // useNavigate hook to redirect user after successful login
    const navigate = useNavigate();


    // Function to update form data when the user types in the fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission (login)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', formData);
            const userData = await login(formData);
            console.log('Login successful:', userData);
            alert(`Welcome, ${userData.username}!`);
            // Save user data in a cookie
            Cookies.set('user', JSON.stringify(userData), { expires: 7 });
            //localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');

        } catch (err) {
            console.error('Login error:', err.response || err.message);
            setError('Invalid username or password');

        };
    }

    

  
    return (
        <div className="login-container">
            <div>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <button onClick={() => navigate('/register')}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;