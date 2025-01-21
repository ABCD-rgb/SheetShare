import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="font-bold text-2xl text-center">
                Hi {localStorage.getItem("username")}!
            </div>
            <button className="btn btn-error" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Header;