function Header() {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="font-bold text-2xl text-center">
                Hi Arawela!
            </div>
            <button className="btn btn-error" onClick={() => {window.location.href = "/";}}>
                Logout
            </button>
        </div>
    );
}

export default Header;