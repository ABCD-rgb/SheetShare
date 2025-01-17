
function Login() {
    return (
        <div className="flex justify-around h-screen">
            <div className="card w-full h-96">
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="pl-6 text-center lg:text-left">
                        <h1 className="text-6xl font-bold">SheetShare</h1>
                        <p className="py-6">
                            Simple collaborative spreadsheet. 
                        </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="username" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="/signup" className="label-text-alt link link-hover">No account yet?</a>
                            </label>
                            </div>
                            <div className="form-control pt-6">
                            <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;