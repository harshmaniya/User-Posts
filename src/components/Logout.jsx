import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    const logoutBtn = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('roll')
        navigate('/')
    }
    return (
        <>
            <button onClick={logoutBtn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Logout
            </button>
        </>
    )
}
export default Logout;