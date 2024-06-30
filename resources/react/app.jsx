import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
// import Home from './ui/Home';
// import DateDetail from './ui/DateDetail';
import React, { useEffect } from 'react';

const Home = React.lazy(() => import('./ui/Home'));
const DateDetail = React.lazy(() => import('./ui/DateDetail'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/date/:date",
        element: <DateDetail />,
    },
    {
        path: "about",
        element: <div className="hello">About</div>,
    },
    {
        path: "*",
        element: <NoMatch />,
    },
]);

function NoMatch() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [])

    return '';
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <RouterProvider router={router} />
);
