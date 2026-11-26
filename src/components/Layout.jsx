import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

// Scrolls to the #hash target after navigating, or back to the top on a plain route change.
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const target = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (target) {
                target.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}

export default function Layout() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-bg bg-[radial-gradient(1100px_520px_at_10%_-10%,rgba(20,70,95,0.30),transparent_60%),radial-gradient(900px_460px_at_100%_0%,rgba(205,164,90,0.08),transparent_55%)] font-sans text-base leading-[1.75] text-white max-[480px]:text-[15px]">
            <ScrollManager />
            <div className="bg-aurora" aria-hidden="true"></div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
