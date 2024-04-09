'use client';

import React, {useState} from 'react';
// import registerImage from '../../assets/register.png';
import Card from '@/components/card.js/card';
import Link from 'next/link';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';
// import Loader from '../../components/loader/Loader';
// import {useNavigate} from 'react-router-dom';

import styled from 'styled-components';
import {useRouter} from 'next/navigation';
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

const ImageWrapper = styled.div`
  width: 50%;
  margin-top: 1rem;
  text-align: right;
`;

const RegisterWrapper = styled.div`
  width: 50%;
  padding-top: 4rem;
  margin-left: 10%;
  margin-left: 450px;
`;

const RegisterFormWrapper = styled.div`
  width: 70%;
  height: 80%;
`;

const RegisterTitle = styled.h2`
  text-align: center;
  padding-top: 1rem;
  font-size: 1.5rem;
`;

const RegisterForm = styled.form`
  height: 80%;
  text-align: center;
  padding-bottom: 3rem;
`;

const LoginWrapper = styled.div`
  width: 70%;
  height: 10%;
  margin-left: 2rem;
  display: flex;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const LoginText = styled.div`
  width: 50%;
  text-align: right;
`;

const LoginLinkWrapper = styled.div`
  width: 50%;
  text-align: left;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding-left: 3px;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);

  //   const navigate = useNavigate();
  const router = useRouter();

  const registerHandler = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }
    // setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        toast.success('Registration was successful');
        router.push('/login');
      })
      .catch(error => {
        toast.error(error.message);
      });
    // setIsLoading(false);
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <AuthWrapper>
        {/* <ImageWrapper>
          <img
            src={registerImage}
            alt="Register Image"
            style={{width: '75%'}}
          />
        </ImageWrapper> */}
        <RegisterWrapper>
          <RegisterFormWrapper>
            <Card>
              <RegisterTitle>Register</RegisterTitle>
              <RegisterForm onSubmit={registerHandler}>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                />
                <AuthButton type="submit" background="#ffae00">
                  Register
                </AuthButton>
                <LoginWrapper>
                  <LoginText>Already an account? </LoginText>
                  <LoginLinkWrapper>
                    <LoginLink href="/login">Login</LoginLink>
                  </LoginLinkWrapper>
                </LoginWrapper>
              </RegisterForm>
            </Card>
          </RegisterFormWrapper>
        </RegisterWrapper>
      </AuthWrapper>
    </>
  );
};

export default Register;
