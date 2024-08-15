import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Manage from "../pages/Manage/Manage";
import Update from "../pages/Update/Update";
import Details from "../pages/Details/Details";


const Routes = createBrowserRouter(
    [
        {
            path:'/',
            element:<App></App>
        },
        {
            path:'/manage',
            element:<Manage></Manage>
        },
        {
            path:'/update',
            element:<Update></Update>
        },
        {
            path:'/details',
            element:<Details></Details>
        }
    ]
)
export default Routes;

