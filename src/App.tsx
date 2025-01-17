import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// pages
// import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Sheet from './pages/Sheet';

function App() {
  const router = createBrowserRouter(   
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />,
        <Route path="/signup" element={<Signup />} />,
        <Route path="/sheet" element={<Sheet />} />,
      </>
    )
  );  

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
