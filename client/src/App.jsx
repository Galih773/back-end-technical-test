import {BrowserRouter,Routes,Route} from 'react-router-dom';
import FromPemesanan from './Pages/FromPemesanan';
import Login from './Pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' index element={<FromPemesanan />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        {/* <Route path='/register' element={<Register/>}></Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
