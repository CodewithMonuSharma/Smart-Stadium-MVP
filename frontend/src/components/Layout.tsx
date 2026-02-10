import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, Users, Zap, ShoppingBag, BarChart3, Leaf, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Ticketing', path: '/ticketing', icon: Ticket },
    { name: 'Crowd', path: '/crowd', icon: Users },
    { name: 'Energy', path: '/energy', icon: Zap },
    { name: 'Merchandise', path: '/merchandise', icon: ShoppingBag },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Sustainability', path: '/sustainability', icon: Leaf },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        Smart Stadium
                    </Link>
                </div>
                <nav className="mt-6 px-4 space-y-2 flex-1">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors bg-white font-bold w-full"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {sidebarItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-gray-900">Monu Sharma</span>
                            <span className="text-xs text-gray-500">Administrator</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                            MS
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
