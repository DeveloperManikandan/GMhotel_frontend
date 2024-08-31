import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);



    async  function register() {
        if (password == cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            setLoading(true);
            axios.post('https://gmhotel.onrender.com/api/user/register', user, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => console.log(response))
              .catch(error => console.error(error));
              setSuccess(true);
              setName('');
              setEmail('');
              setPassword('');
              setCpassword('');
            //   nav('/login');
              
        }
        else {
            alert('Passwords not matched')
        }
        setLoading(false);
    }

    return (
        loading ? <Loader/> : error ? <Error/> :
        <div >
            {success && <Success message='Registration sucsess'/> }
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='bs'>
                        <h2>Register Page</h2>
                        <input type="text" className='form-control' placeholder='user-name'
                            value={name} onChange={(e) => setName(e.target.value)} />
                        <br />
                        <input type="text" className='form-control' placeholder='email@gmail.com'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <input type="text" className='form-control' placeholder='password'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <input type="text" className='form-control' placeholder='confirm-password'
                            value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                        <br />
                        <button type="submit" className='btn btn-primary' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
