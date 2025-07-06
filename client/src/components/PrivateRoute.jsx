import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
