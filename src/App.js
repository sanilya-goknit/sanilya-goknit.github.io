import logo from './logo.svg';
import './App.scss';
import {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify';
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid'
import EditFrame from "./Components/EditFrame";

function App() {
  const navigate = useNavigate()
  const [authRes, setAuthRes] = useState({});

  useEffect(() => {
    Auth.currentSession().then(res => {
      setAuthRes(res)
    }).catch(() => {
      navigate('login')
    })
  }, []);

  const logout = () => {
    Auth.signOut().then(res => {
      navigate('/login')
    })
  };

  return (
    <div className="container pt-4">

      <EditFrame />
    </div>
  );
}

export default App;
