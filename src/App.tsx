import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// pages
import Home from './pages/Home';
import Sheet from './pages/Sheet';

function App() {
  const router = createBrowserRouter(   
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />,
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
