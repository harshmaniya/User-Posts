import GetUsers from "./GetUsers";
import Navbar from "./Navbar";

const AdminDashboard = () => {


    return (
        <>
            <div>
                <Navbar />
                <div className="p-6">
                    <GetUsers />
                </div>

            </div>

        </>
    )
}

export default AdminDashboard;