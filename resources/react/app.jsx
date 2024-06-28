import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import DateDetail from './ui/DateDetail';

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
]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <RouterProvider router={router} />
);
