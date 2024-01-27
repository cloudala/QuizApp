import React, {useContext} from 'react';
import { useFormik } from 'formik';
import { UserContext } from '../contexts/UserContext';
import * as Yup from 'yup';
import ErrorMessage from './ErrorMessage';

export default function UpdateUserForm({ user }) {
  const {updateUser} = useContext(UserContext)
  const inputStyles = 'w-5/6 p-2 m-3 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300'
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    validationSchema: Yup.object({
        name: Yup.string(),
        email: Yup.string().email('Invalid email address'),
        password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            'Invalid password! A password must contain at least: 8 characters, one uppercase letter, one lowercase letter, and one digit!'
          ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`https://localhost:4000/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
            console.error('Failed to update user');
        } else {
            const updatedUserData = await fetch(`https://localhost:4000/api/users/${user.id}`);
            const updatedUser = await updatedUserData.json();
            updateUser(updatedUser);
            console.log('User updated successfully');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit} className='bg-gray-50 rounded-lg pt-2'>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputStyles}
      />
      {formik.touched.name && formik.errors.name ? (
        <ErrorMessage message={formik.errors.name} />
      ) : (
        <></>
      )}
      <br />
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputStyles}
      />
      {formik.touched.email && formik.errors.email ? (
        <ErrorMessage message={formik.errors.email} />
      ) : (
        <></>
      )}
      <br />
      <input
        type="text"
        id="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputStyles}
      />
      {formik.touched.password && formik.errors.password ? (
        <ErrorMessage message={formik.errors.password} />
      ) : (
        <></>
      )}
      <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={formik.handleReset}
            className='w-36 text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Reset
          </button>
          <button
            type='submit'
            className='w-36 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Update User
          </button>
        </div>
    </form>
  );
}