import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Manage from "../pages/Manage/Manage";
import Update from "../pages/Update/Update";
import Details from "../pages/Details/Details";
import Checkout from "../pages/Checkout/Checkout";
import Signup from "../pages/Signup/Signup";
import Page404 from "../pages/Errorpages/page404";
import Signin from "../pages/Signin/Signin";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";


const Routes = createBrowserRouter(
    [
        {
            path:'/',
            element:<App></App>
        },
        {
            path:'/manage',
            element:<Manage updatedData={[]}></Manage>
        },
        {
            path:'/update',
            element:<Update></Update>
        },
        {
            path:'/details',
            element:<Details></Details>
        },
        {
            path:'/checkout',
            element:<Checkout></Checkout>
        },
        {
            path:'/signup',
            element:<Signup></Signup>
        },
        {
            path:'signin',
            element:<Signin></Signin>
        },
        {
            path:'/error',
            element:<Page404></Page404>
        },
        {
            path:'/payment',
            element:<Payment></Payment>
        },
        {
            path:'/paymentsuccess',
            element:<PaymentSuccess></PaymentSuccess>
        }
    ]
)
export default Routes;

