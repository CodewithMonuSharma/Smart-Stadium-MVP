import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Ticket,
    Users,
    Zap,
    BarChart3,
    Leaf,
    Globe,
    ShoppingBag
} from 'lucide-react';

const navItems = [
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

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col h-full shadow-sm z-50">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-slate-50">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />

                        <span className="text-xl font-bold text-[#111827] tracking-tight">
                            Smart Stadium
                        </span>
                    </Link>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5">
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                                    ? 'bg-purple-50 text-purple-700 font-semibold'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-full" />
                                )}
                                <Icon
                                    size={20}
                                    className={`transition-colors ${isActive ? 'text-purple-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / User Profile Area */}
                <div className="p-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                            MS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#111827] truncate">Monu Sharma</p>
                            <p className="text-[11px] font-medium text-slate-400 truncate tracking-wide">System Manager</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden fixed top-0 w-full bg-white z-50 border-b p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Globe className="text-purple-600" />
                    <span className="font-bold">Smart Stadium</span>
                </div>
                {/* Simple mobile menu trigger could go here */}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
