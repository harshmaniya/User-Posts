import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from './graphQl/client'
import Verification from "./components/Verification";
import Logout from "./components/Logout";
import UserRoutes from "./components/UserRoutes";
import AdminRoutes from "./components/AdminRoutes";
import Error404 from "./components/Error404";
import PublicRoutes from "./components/PublicRoutes";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from './components/admin/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/userdashboard/*" element={<UserRoutes />} />
          <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotpassword/:token" element={<ForgotPassword />} />
          <Route path="/userverification/:token" element={<Verification />} />
          <Route path="/*" element={<PublicRoutes />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ApolloProvider>
  )
}

export default App
