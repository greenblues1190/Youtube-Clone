import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push('/');
              } else {
                setFormErrorMessage('Check out your Account or Password again');
              }
            })
            .catch((err) => {
              setFormErrorMessage('Check out your Account or Password again');
              setTimeout(() => {
                setFormErrorMessage('');
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          // dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          // handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <div className="w-96 mt-10">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Log In
                </h3>
              </div>
              <div className="my-5">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="Email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                        {errors.email && touched.email && (
                          <span className="text-red-500 font-normal">
                            {' '}
                            {errors.email}
                          </span>
                        )}
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                        {errors.password && touched.password && (
                          <span className="text-red-500 font-normal">
                            {' '}
                            {errors.password}
                          </span>
                        )}
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                      />
                    </div>

                    {formErrorMessage && (
                      <div className="flex text-red-500 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p className="ml-2 text-sm font-normal">
                          {formErrorMessage}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3 bg-gray-50 flex justify-between sm:px-6 space-x-2">
                    <div className="py-2 flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleRememberMe}
                        checked={rememberMe}
                      />
                      <p className="text-sm ml-2">Remember me</p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      type="primary"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <p className="mt-1 text-sm text-gray-600">
                  <a
                    className="no-underline border-b border-blue text-blue"
                    href="/reset_user"
                  >
                    forgot password
                  </a>{' '}
                  or{' '}
                  <a
                    className="no-underline border-b border-blue text-blue"
                    href="/register"
                  >
                    register now!
                  </a>
                </p>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
