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
        const response = await fetch('https://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        } else {
          console.log('User registered successfully!')
          navigate('/')
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
    <div className='min-h-screen flex flex-column items-center justify-center'>
    <form className="max-w-md mx-auto p-8 bg-gray-100 rounded w-1/2 -mt-14" onSubmit={formik.handleSubmit}>
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
          className="text-blue-800 bg-blue-100 hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10 w-24"
        >
          Reset
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Already have an account? <span className="text-blue-500">Log In</span>
        </p>
        <Link to={'/'}>
            <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            >
            Login
            </button>
        </Link>
      </div>
    </form>
    </div>
  );
}
