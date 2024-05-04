'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';
import {auth} from '@/firebase/config';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {ShowOnLogin, ShowOnLogout} from '../hiddenLink/hiddenLink';
import {useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {REMOVE_ACTIVE_USER, SET_ACTIVE_USER} from '@/redux/slice/authSlice';
import {FaUserAlt} from 'react-icons/fa';

export default function MainHeader() {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('isLoggedIn===>', isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (user.displayName === null) {
          const atIndex = user.email.indexOf('@');
          const username = user.email.substring(0, atIndex).split('.')[0];
          const finalUserName =
            username.charAt(0).toUpperCase() + username.slice(1);

          setUsername(finalUserName);
        } else {
          setUsername(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        setUsername('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully!');
        router.push('/');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <ShowOnLogin>
              <li>
                <NavLink href="/">
                  <FaUserAlt size={15} />
                  Hi,{userName}
                </NavLink>
              </li>
            </ShowOnLogin>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
            <ShowOnLogout>
              <li>
                <NavLink href="/login">Login</NavLink>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <NavLink href="/myRecipes">My Recipes</NavLink>
              </li>
            </ShowOnLogin>
            <ShowOnLogin>
              <li>
                <NavLink href="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </header>
    </>
  );
}
