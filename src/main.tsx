import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChangeMyMind, Complete, Consent, Survey, ThankYou } from '@features'
import { store } from '@redux/store'
import App from '@src/App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@src/index.css'
import '@src/reset.css'
import { AuthRouteGuard } from '@guards'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthRouteGuard>
            <Consent />
          </AuthRouteGuard>
        )
      },
      {
        path: '/survey',
        element: (
          <AuthRouteGuard>
            <Survey />
          </AuthRouteGuard>
        )
      },
      {
        path: '/change-my-mind',
        element: (
          <AuthRouteGuard>
            <ChangeMyMind />
          </AuthRouteGuard>
        )
      },
      {
        path: '/complete',
        element: (
          <AuthRouteGuard>
            <Complete />
          </AuthRouteGuard>
        )
      },
      {
        path: 'thank-you',
        element: (
          <AuthRouteGuard>
            <ThankYou />
          </AuthRouteGuard>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
