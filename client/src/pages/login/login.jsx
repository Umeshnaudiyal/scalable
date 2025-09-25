import { useState } from 'react';
import './Login.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login({ onToggle }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/login', { username: formData.email, password: formData.password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setIsLoading(true);
      if (res) {
        setTimeout(() => { 
          const data = localStorage.setItem('data', JSON.stringify(res.data));
          const token = localStorage.setItem('token', JSON.stringify(res.data.jwttoken));
         
          navigate('/dashboard');
          console.log(res);
          setFormData({
            email: '',
            password: ''
          })
          setIsLoading(false);
          Swal.fire({
            title: "Login successfull",
            text: "You successfully logged In!",
            icon: "success"
          });

        }, 2000)
      }
    }
    catch (err) {
      setIsLoading(true);
      console.log(err);
      setTimeout(() => {

        Swal.fire({
          title: "Login failed",
          text: "Sign up first to continue!",
          icon: "error"
        });
        // navigate('/signup');
        setIsLoading(false);
      }, 2000);

    }


    // Simulate API call

  };

  return (
    <div className="h-[100vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden ">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <div className="login-container bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${formData.email ? 'has-value' : ''}`}
              required
            />
            <label className="form-label">Email Address</label>

          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input  ${formData.password ? 'has-value' : ''}`}
              required
            />
            <label className="form-label">Password</label>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className={`submit-btn  text-white ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>Don't have an account?
            <Link to={'/signup'} className="toggle-btn">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;