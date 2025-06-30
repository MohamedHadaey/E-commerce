import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import Categories from './Components/Categories/Categories';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import Brands from './components/Brands/Brands';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';

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
          path: 'product-details/:id', element: <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        },
        {
          path: 'categories', element: <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        },
        {
          path: 'brands', element: <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        },
        {
          path: 'cart', element: <ProtectedRoute>
            <Cart />
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
        <QueryClientProvider client={ReactQueryConfig}>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )
}

export default App 