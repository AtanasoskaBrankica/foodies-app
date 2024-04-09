import {useSelector} from 'react-redux';

export const ShowOnLogin = ({children}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('isLoggedIn1', isLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return;
};

export const ShowOnLogout = ({children}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('isLoggedIn2', isLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return;
};
