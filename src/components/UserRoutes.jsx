import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "../utilities/Authentication";
import UserDashboard from './user/UserDashboard';
import CreatePost from './user/CreatePost';
import Profile from './user/Profile';
import UpdatePost from './user/UpdatePost';
import Error404 from './Error404';

function UserRoutes() {
    const navigate = useNavigate();
    const tempRoll = localStorage.getItem("roll")
    const token = Authentication()  
    if (!token || tempRoll !== "user") {
        navigate('/admin-dashboard')
        return null;
    }

    return (
        token && tempRoll === "user" && 
        
        <Routes>    
            <Route exact path='/' element={<UserDashboard />} />
            <Route exact path="create-post" element={<CreatePost />} />
            <Route exact path="profile" element={<Profile />} />
            <Route exact path="updatepost/:id" element={<UpdatePost />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default UserRoutes