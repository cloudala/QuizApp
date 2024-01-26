import { useFormik } from 'formik';
import ErrorMessage from './ErrorMessage';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
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
        // Assuming values is an object that you want to send to the server
        const response = await fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        } else {
          console.log('User registered successfully!')
          navigate('/login')
        }
        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error.message);
        // Handle the error as needed (e.g., display an error message to the user)
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded" onSubmit={formik.handleSubmit}>
      <h1 className='font-semibold text-xl mb-3'>Sign Up</h1>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage message={formik.errors.name} />
        ) : (
          <></>
        )}
      </div>
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
          Sign Up
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Already have an account? <span className="text-blue-500">Log In</span>
        </p>
        <Link to={'/login'}>
            <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={() => console.log('Navigate to Login')}
            >
            Login
            </button>
        </Link>
      </div>
    </form>
  );
}
