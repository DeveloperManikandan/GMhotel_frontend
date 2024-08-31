import axios from 'axios';
import React, { useState } from 'react';

const Loginpage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        if (email === '' || password === '') {
            alert('Please fill all the fields');
            return;
        }

        try {
            const user = { email, password };
            const result = await axios.post('https://gmhotel.onrender.com/api/user/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(result.data);
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            window.location.href = '/home';
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='bs'>
                        <h2>Login here...</h2>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='email@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            className='form-control'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button type="submit" className='btn btn-primary' onClick={login}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
