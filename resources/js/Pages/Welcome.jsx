import {Head} from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';

export default function Welcome({auth}) {
    return (<>
        <div className="bg-gray-900">    
            <Head title="Welcome"/>
            <div className="flex flex-col min-h-screen">
                <Navbar auth={auth}/>
                <main className="flex justify-center items-center text-white flex-1">
                    Home
                </main>
                <Footer/>
            </div>
        </div>    
    </>);
};

