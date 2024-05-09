import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import UserProfile from '../pages/UserProfile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'user-profile',
                element: <UserProfile />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            }
        ]
    }
])

export default router;