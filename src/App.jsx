import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          path: '', element: <Home />
        },
        {
          path: 'home', element: <Home />
        },
        {
          path: 'products', element: <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        },
        {
          path: 'categories', element: <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        },
        {
          path: 'login', element: <Login />
        },
        {
          path: 'register', element: <Register />
        },
        {
          path: '*', element: <Notfound />
        }
      ]
    }
  ]);

  const ReactQueryConfig = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={ ReactQueryConfig }>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )
}

export default App 