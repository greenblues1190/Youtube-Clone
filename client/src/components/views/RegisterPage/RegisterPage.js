import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function RegisterPage(props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              alert('회원가입이 완료되었습니다.');
              props.history.push('/login');
            } else {
              alert(response.payload.err.errmsg);
            }
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
            <div className="max-w-sm mt-10">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Registeration
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  By signing up, you agree to the{' '}
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EB%94%94%EC%A7%80%ED%84%B8%EC%BD%98%ED%85%90%EC%B8%A0%20%EC%9D%B4%EC%9A%A9%20%ED%91%9C%EC%A4%80%EC%95%BD%EA%B4%80"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    className="no-underline border-b border-grey-dark text-grey-dark"
                    href="https://www.privacy.go.kr/a3sc/per/inf/perInfStep01.do"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
              <div className="my-5">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="Name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                        {errors.name && touched.name && (
                          <span className="text-red-500 font-normal">
                            {' '}
                            {errors.name}
                          </span>
                        )}
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Last Name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                        {errors.lastName && touched.lastName && (
                          <span className="text-red-500 font-normal">
                            {' '}
                            {errors.lastName}
                          </span>
                        )}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Last Name"
                      />
                    </div>

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
                        placeholder="Email"
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
                        placeholder="Password (6 characters and above)"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Confirm Password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                        {errors.confirmPassword && touched.confirmPassword && (
                          <span className="text-red-500 font-normal">
                            {' '}
                            {errors.confirmPassword}
                          </span>
                        )}
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-2">
                    <button
                      onClick={handleSubmit}
                      type="primary"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <p className="mt-1 text-sm text-gray-600">
                  Already have an account?{' '}
                  <a
                    className="no-underline border-b border-blue text-blue"
                    href="../login/"
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
