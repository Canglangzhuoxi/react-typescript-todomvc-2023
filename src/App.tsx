import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import { NotFound } from './NotFound'
import TodoMVC from './TodoMVC'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoMVC />,
    // loader: ,
  },
  {
    path: '/active',
    element: <TodoMVC />,
    // loader: ,
  },
  {
    path: '/completed',
    element: <TodoMVC />,
    // loader: ,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
