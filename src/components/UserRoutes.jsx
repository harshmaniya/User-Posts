import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from "../utilities/Authentication";
import UserDashboard from './user/UserDashboard';
import CreatePost from './user/CreatePost';
import Profile from './user/Profile';
import UpdatePost from './user/UpdatePost';
import Error404 from './Error404';
import Navbar from './user/Navbar';
import ProfileUpdate from './user/ProfileUpdate';

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
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<UserDashboard />} />
                <Route path="create-post" element={<CreatePost />} />
                <Route path="profile">
                    <Route index element={<Profile />} />
                    <Route path="update" element={<ProfileUpdate />} />
                </Route>
                <Route path="updatepost/:id" element={<UpdatePost />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
        </>
    )
}

export default UserRoutes