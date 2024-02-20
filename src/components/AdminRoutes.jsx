import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "../utilities/Authentication";
import AdminDashboard from './admin/AdminDashboard';
import UpdateUser from './admin/UpdateUser';
import ViewPosts from './admin/ViewPosts';
import Error404 from './Error404';

function AdminRoutes() {
    const navigate = useNavigate();
    const tempRoll = localStorage.getItem("roll")   
    const token = Authentication()
    if(!token || tempRoll !== "admin"){
        navigate('/userdashboard')
        return null;
    }
        return (
            token && tempRoll === "admin" &&<Routes>              
                <Route path="/" element={<AdminDashboard />} />
                <Route path="update-user/:id" element={<UpdateUser />} />
                <Route path="view-post/:id" element={<ViewPosts />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        );  
}

export default AdminRoutes;
