// App.jsx
import './App.css'
import Context from './contexts/Context'
import useDeveloper from './hooks/useDeveloper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './views/Home'
import Registro from './views/Register'
import Login from './views/Login'
import Perfil from './views/Profile'
import Create from './views/Create'
import EditPublication from './views/EditPublication'
import PublicationDetails from './views/PublicationDetails';

const App = () => {
  const globalState = useDeveloper()

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registrarse' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/create' element={<Create />} />
          <Route path="/editpublication/:id" element={<EditPublication />} />
          <Route path='/publications/:id' element={<PublicationDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
