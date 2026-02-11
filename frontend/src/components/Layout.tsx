import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ticketing', path: '/ticketing' },
    { name: 'Crowd', path: '/crowd' },
    { name: 'Energy', path: '/energy' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Sustainability', path: '/sustainability' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Horizontal Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        {/* Logo Section */}
                        <div className="flex-shrink-0 flex items-center space-x-2">
                            <Globe className="h-8 w-8 text-blue-500" />
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                                Smart Stadium
                            </Link>
                        </div>

                        {/* Navigation Links (Center) */}
                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive
                                                ? 'text-purple-600 font-bold'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Section: No Login/Logout, Public App */}
                        <div className="flex items-center space-x-4">
                            {/* Optional: Add a simple button that fits the public theme if needed */}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
