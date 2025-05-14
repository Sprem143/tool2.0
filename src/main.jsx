import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './userContext.jsx';

import App from './App.jsx'
import E_login from './ecomManagement/E_login.jsx';
import OsEmpSignup from './orderManagement/employee/OmEmpSignup.jsx';
import O_login from './orderManagement/employee/O_login.jsx';
import Employee2 from './orderManagement/employee/Employee2.jsx';
import OmAdminSignup from './orderManagement/admin/OmAdminSignup.jsx';
import Admin from './orderManagement/admin/Admin.jsx';
import PrepEmployee from './orderManagement/prepcenter/PrepEmployee.jsx';
import Datewise from './orderManagement/mutual/Datewise.jsx';
// import Sheet from './orderManagement/admin/Sheet.jsx';
import OAuthSuccess from './orderManagement/mutual/OAuthSuccess.jsx';
import Brandscrapping from './ecomManagement/employee/Brandscrapping.jsx';
import CheckProduct from './ecomManagement/employee/CheckProduct.jsx';
import Inventory from './ecomManagement/employee/Inventory.jsx';
import Sheet from './orderManagement/mutual/Sheet.jsx';
import Header from './Header.jsx';
import Boscovs from './ecomManagement/employee/Boscovs.jsx';
import BabyName from './BabyName.jsx';
import Academy from './ecomManagement/employee/Academy.jsx';
import ExtractSKU from './orderManagement/mutual/ExtractSKU.jsx';
import Walmart from './ecomManagement/employee/Walmart.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <UserProvider>
         <Header/>
         <Routes>

            <Route path='/om/employee' element={<Employee2 />} />
            <Route path='/google-sheet' element={<Sheet />} />
            <Route path='/' element={<App />} />
            <Route path='/em/login' element={<E_login />} />
            <Route path='/om/login' element={<O_login />} />
            <Route path='/om/employee/signup' element={<OsEmpSignup />} />
            <Route path='/om/admin/signup' element={<OmAdminSignup />} />
            <Route path='/om/admin' element={<Admin />} />
            <Route path='/om/prep-employee' element={<PrepEmployee />} />
            <Route path='/om/date-wise' element={<Datewise />} />
            <Route path='/om/date-wise' element={<Datewise />} />
            {/* <Route path='/sheet' element={<Sheet/>}/> */}
            <Route path='/oauth-success' element={<OAuthSuccess />} />

            <Route path='/ecom/belk-brand-scrapping' element={<Brandscrapping />} />
            <Route path='/ecom/boscovs-brand-scrapping' element={<Boscovs />} />
            <Route path='/ecom/academy-brand-scrapping' element={<Academy />} />
            <Route path='/ecom/walmart-brand-scrapping' element={<Walmart />} />

            <Route path='/ecom/check-product' element={<CheckProduct />} />
            <Route path='/ecom/inventory-update' element={<Inventory />} />
            <Route path='/baby' element={<BabyName />} />
            <Route path='/extract-sku' element={<ExtractSKU />} />
         </Routes>
      </UserProvider>
   </BrowserRouter>
)
