import { Route, Routes } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import History from './components/history/History';
import RequiredAuth from './components/requiredAuth/RequiredAuth';
import './App.css'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index element={<Login />} />
      <Route element={<RequiredAuth />}>
      <Route path='/search' element={<Search />} />
      <Route path='/history' element={<History />} />
      </Route>
    </Routes>
    </>
  );

}

export default App;
