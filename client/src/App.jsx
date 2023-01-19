import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Admin from './Pages/Admin';
import CheckTiket from './Pages/CheckTiket';
import FromPemesanan from './Pages/FromPemesanan';
import Laporan from './Pages/Laporan';
import Login from './Pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' index element={<FromPemesanan />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/check' element={<CheckTiket/>}></Route>
        <Route path='/laporan' element={<Laporan/>}></Route>
        {/* <Route path='/register' element={<Register/>}></Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
