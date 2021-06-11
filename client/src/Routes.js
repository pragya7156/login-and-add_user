import AddUsers from './pages/addusers';
import GetUsers from './pages/getusers';
import Login from './auth/login';
import PageNotFound from './pages/pagenotfound';
import { BiAddToQueue } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5';

export const header = [
    {
        name:"Add Users",
        path:"/addusers",
        icon: BiAddToQueue,
        component:AddUsers
    },
    {
        name:"View Users",
        path:"/getusers",
        icon: IoEyeSharp,
        component:GetUsers
    },
];

export const others = [
    {
        path:"/",
        component:Login
    },
    {
        path:"*",
        component:PageNotFound
    },
];