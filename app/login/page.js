'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
// import loginImage from '../../assets/login.jpg';
// import {Link} from 'react-router-dom';
// import {AiOutlineGoogle} from 'react-icons/ai';
import Card from '@/components/card.js/card';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';
// import {useNavigate} from 'react-router-dom';
// import Loader from '../../components/loader/Loader';
// import {toast} from 'react-toastify';
// import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
// import {useDispatch, useSelector} from 'react-redux';
// import {selectPreviousURL} from '../../redux/slice/cartSlice';
// import {REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice';
import {toast} from 'react-toastify';

const AuthWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: space-between;
`;

const AuthButton = styled.button`
  width: 73%;
  height: 10%;
  font-size: 0.9rem;
  background: ${props => props.background};
  border: none;
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 70%;
  height: 10%;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid grey;
`;

const LoginWrapper = styled.div`
  width: 50%;
  padding-top: 2rem;
  margin-left: 450px;
`;

const ImageWrapper = styled.div`
  width: 50%;
  text-align: right;
`;

const LoginFormWrapper = styled.div`
  width: 60%;
  height: 80%;
`;

const LoginTitle = styled.h2`
  text-align: center;
  padding-top: 1rem;
  font-size: 1.5rem;
`;

const LoginForm = styled.form`
  height: 80%;
  text-align: center;
`;

const ResetLinkWrapper = styled.div`
  margin-top: 1rem;
  width: 50%;
`;

// const ResetLink = styled(Link)`
//   text-decoration: none;
//   color: black;
//   font-size: 0.8rem;
//   font-weight: bold;
// `;

const RegisterWrapper = styled.div`
  width: 80%;
  height: 10%;
  margin-left: 1.3rem;
  display: flex;
  font-size: 0.8rem;
  margin-top: 1rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const RegisterText = styled.div`
  width: 50%;
  text-align: right;
`;

const RegisterLinkWrapper = styled.div`
  width: 50%;
  text-align: left;
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding-left: 3px;
`;

const Text = styled.p`
  margin-top: 0rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  console.log('email error2', emailError);
  const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(false);
  //   const previousURL = useSelector(selectPreviousURL);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const redirectUser = () => {
  //     if (previousURL.includes('cart')) {
  //       navigate('/cart');
  //     } else {
  //       navigate('/');
  //     }
  //   };
  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const loginHandler = event => {
    event.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    console.log('isEmailValid', isEmailValid);
    console.log('isPasswordValid', isPasswordValid);
    console.log('email error', emailError);
    console.log('password error', passwordError);

    if (!isEmailValid && !isPasswordValid) {
      console.log('greska');
      return;
    } else {
      // setIsLoading(true);
      console.log('LOGIN');
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          toast.success('Login Successful!');
          router.push('/');
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          toast.error(error.message);
        });
      // setIsLoading(false);
    }
  };

  //   const provider = new GoogleAuthProvider();
  //   const loginWithGoogle = () => {
  //     signInWithPopup(auth, provider)
  //       .then(result => {
  //         toast.success('Login successfully!');
  //         redirectUser();
  //       })
  //       .catch(error => {
  //         toast.error(error.messagge);
  //       });
  //   };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <AuthWrapper>
        {/* <ImageWrapper>
          <img src={loginImage} alt="Login Image" style={{width: '90%'}} />
        </ImageWrapper> */}
        <LoginWrapper>
          <LoginFormWrapper>
            <Card>
              <LoginTitle>Login</LoginTitle>
              <LoginForm onSubmit={loginHandler}>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                {emailError !== '' && (
                  <p
                    style={{
                      margin: '0',
                      color: 'red',

                      fontSize: '0.8rem',
                      marginTop: '-10px',
                      paddingBottom: '5px',
                    }}
                  >
                    {emailError}
                  </p>
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  // required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                {passwordError !== '' && (
                  <p
                    style={{
                      margin: '0',
                      color: 'red',

                      fontSize: '0.8rem',
                      marginTop: '-10px',
                      paddingBottom: '5px',
                    }}
                  >
                    {passwordError}
                  </p>
                )}
                <AuthButton type="submit" background="cornflowerblue">
                  Login
                </AuthButton>
                {/* <ResetLinkWrapper> */}
                {/* <ResetLink to="/reset">Forgot Password?</ResetLink> */}
                {/* </ResetLinkWrapper> */}
                {/* <Text>-- or --</Text> */}
                {/* <AuthButton background="#ffae00" onClick={loginWithGoogle}> */}
                {/* <AiOutlineGoogle
                  color="white"
                  size="20"
                  style={{marginRight: '5px', marginTop: '-4px'}}
                />
                Login With Google */}
                {/* </AuthButton> */}
                <RegisterWrapper>
                  <RegisterText>Don't have an account? </RegisterText>
                  <RegisterLinkWrapper>
                    <RegisterLink href="/register">Register</RegisterLink>
                  </RegisterLinkWrapper>
                </RegisterWrapper>
              </LoginForm>
            </Card>
          </LoginFormWrapper>
        </LoginWrapper>
      </AuthWrapper>
    </>
  );
};

export default Login;
