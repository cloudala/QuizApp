import React, {useContext} from 'react'
import { useFormik } from 'formik';
import ErrorMessage from './ErrorMessage';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function LoginForm() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
          'Invalid password! A password must contain at least: 8 characters, one uppercase letter, one lowercase letter, and one digit!'
        )
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        } else {
          const {id} = await response.json()
          console.log(id)
          const userDataResponse = await fetch(`https://localhost:4000/api/users/${id}`);
          const userData = await userDataResponse.json();
          console.log(userData)
          setUser(userData)
          console.log('User logged in successfully!')
          navigate('/quizzes')
        }
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded" onSubmit={formik.handleSubmit}>
      <h1 className='font-semibold text-xl mb-3'>Login</h1>
      <div className="mb-4">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorMessage message={formik.errors.email} />
        ) : (
          <></>
        )}
      </div>

      {/* Password field */}
      <div className="mb-4">
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage message={formik.errors.password} />
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reset
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account? <span className="text-blue-500">Sign Up</span>
        </p>
        <Link to={'/register'}>
          <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={() => console.log('Navigate to Sign Up')}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
}
