import './App.css'

import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorBoundaryFallbackComponent } from './components/ErrorBoundaryFallbackComponent'
import { NotFound } from './components/NotFound'
import TodoMVC from './components/TodoMVC'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoMVC />,
  },
  {
    path: '/active',
    element: <TodoMVC />,
  },
  {
    path: '/completed',
    element: <TodoMVC />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackComponent}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
