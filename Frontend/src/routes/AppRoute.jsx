import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/login'
import Dashboard from '../pages/Dashboard'
import UploadMaterial from '../pages/uploadmaterial'
import Wishlist from '../pages/wishlist'    
import MaterialDetail from '../pages/MaterialDetail';
import MyMaterials from "../pages/MyMaterial";

const AppRoute = () => {
  return (
    <Routes>    
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route
        path="/material/:id"
        element={<MaterialDetail />}
      /> 
        <Route path='/uploadmaterial' element={<UploadMaterial/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path="/my-materials" element={<MyMaterials />} />
        <Route path ="/upload" element={<UploadMaterial />} />
        
    </Routes>

    
  )
}

export default AppRoute 
