import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Activity,
    QrCode,
    Users,
    Zap,
    ShoppingCart,
    BarChart3,
    Leaf,

    ArrowUpRight,
    CheckCircle2,
    Twitter,
    Linkedin,
    Facebook
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    // Removed auto-redirect to dashboard to allow authenticated users to see the landing page

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 font-['Outfit']">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                <Activity size={20} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Smart Stadium
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            {['Dashboard', 'Ticketing', 'Crowd', 'Energy', 'Analytics', 'Sustainability'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => navigate('/' + item.toLowerCase())}
                                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button className="bg-slate-900 text-white rounded-full px-6 font-bold shadow-lg" onClick={() => navigate('/dashboard')}>Enter Dashboard</Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="dashboard" className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h1 className="text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-[1.1] tracking-tighter">
                                    Welcome to Smart Stadium!
                                </h1>
                                <p className="text-2xl text-gray-600 font-medium tracking-tight">
                                    Smart Stadium Management System
                                </p>
                            </div>

                            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-blue-100/50 border border-white/50 max-w-lg">
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-purple-600">12</div>
                                        <div className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Active Events</div>
                                    </div>
                                    <div className="text-center border-x border-gray-100 px-4">
                                        <div className="text-4xl font-black text-blue-600">87%</div>
                                        <div className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Occupancy</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-emerald-500">98%</div>
                                        <div className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">System Health</div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex items-center gap-3 px-10 py-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-purple-200"
                            >
                                <LayoutDashboard size={24} /> Go to Dashboard
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(30,58,138,0.25)] border-[12px] border-white">
                                <img
                                    alt="Smart Stadium Dashboard"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                            </div>
                            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-2xl border border-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-black text-gray-800 tracking-widest">LIVE STATUS</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">Core Capabilities</h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <FeatureCard
                            id="ticketing"
                            title="Smart Ticketing"
                            desc="QR/NFC-based digital tickets with fraud detection"
                            icon={<QrCode size={32} />}
                            color="bg-purple-600"
                            points={["Real-time entry validation", "AI-powered fraud detection", "Duplicate prevention"]}
                            onClick={() => navigate('/ticketing')}
                        />
                        <FeatureCard
                            id="crowd"
                            title="Crowd Management"
                            desc="Real-time crowd flow prediction and monitoring"
                            icon={<Users size={32} />}
                            color="bg-orange-600"
                            badge="LIVE"
                            points={["Live density heatmaps", "Overcrowding alerts", "Smart gate redirection"]}
                            onClick={() => navigate('/crowd')}
                        />
                        <FeatureCard
                            id="energy"
                            title="Energy Management"
                            desc="AI-powered energy optimization and monitoring"
                            icon={<Zap size={32} />}
                            color="bg-emerald-600"
                            points={["Consumption monitoring", "Demand prediction", "Auto-optimization"]}
                            onClick={() => navigate('/energy')}
                        />
                        <FeatureCard
                            id="analytics"
                            title="Merchandise Analytics"
                            desc="Demand forecasting and inventory optimization"
                            icon={<ShoppingCart size={32} />}
                            color="bg-teal-600"
                            points={["Demand forecasting", "Inventory optimization", "Sales analytics"]}
                            onClick={() => navigate('/merchandise')}
                        />

                        <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-50 hover:shadow-2xl transition-all group overflow-hidden relative">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <BarChart3 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Real-Time Analytics</h3>
                                    <p className="text-gray-500 font-medium">Global operational insights</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                                    <div className="text-2xl font-black text-blue-600">2.4K</div>
                                    <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Users</div>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                    <div className="text-2xl font-black text-purple-600">156</div>
                                    <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Alerts</div>
                                </div>
                                <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                                    <div className="text-2xl font-black text-emerald-600">94%</div>
                                    <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Score</div>
                                </div>
                            </div>
                            <Button onClick={() => navigate('/analytics')} variant="ghost" className="w-full rounded-2xl font-bold bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all h-12">
                                Explore Analytics
                            </Button>
                        </div>

                        <div id="sustainability" className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-50 hover:shadow-2xl transition-all relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <Leaf size={200} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                        <Leaf size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Sustainability</h3>
                                        <p className="text-gray-500 font-medium">Environmental impact tracking</p>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-8">
                                    <div className="relative w-28 h-28 rounded-full border-[10px] border-emerald-50 border-t-emerald-500 flex items-center justify-center">
                                        <span className="text-2xl font-black text-emerald-600">85%</span>
                                    </div>
                                </div>
                                <Button onClick={() => navigate('/sustainability')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold h-12">
                                    Green Initiatives
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transform Operations */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0px)', backgroundSize: '40px 40px' }}></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">Transform Your Stadium Operations</h2>
                    <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                        Experience the future of smart stadium management with AI-powered insights and real-time control
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                        <Button onClick={() => navigate('/dashboard')} className="bg-white text-purple-600 hover:bg-slate-50 px-12 py-8 rounded-full text-xl font-black shadow-2xl transition-all hover:scale-105">
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-600 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center">
                                    <Activity size={24} />
                                </div>
                                <span className="text-2xl font-black tracking-tighter uppercase">Smart Stadium</span>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed font-medium">
                                Next-generation stadium management powered by AI and real-time analytics
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black mb-6 text-lg tracking-widest uppercase opacity-60">Features</h4>
                            <ul className="space-y-4 font-bold">
                                {['Ticketing', 'Crowd', 'Energy', 'Analytics'].map(item => (
                                    <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/80 hover:text-white transition-colors">{item} Management</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black mb-6 text-lg tracking-widest uppercase opacity-60">Company</h4>
                            <ul className="space-y-4 font-bold">
                                {['About Us', 'Careers', 'Contact', 'Support'].map(item => (
                                    <li key={item}><a href="#" className="text-white/80 hover:text-white transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black mb-6 text-lg tracking-widest uppercase opacity-60">Connect</h4>
                            <div className="flex gap-4">
                                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                                    <a key={i} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer">
                                        <Icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-10 text-center text-sm font-bold opacity-60 uppercase tracking-widest">
                        <p>© 2026 Smart Stadium Management System. All rights reserved. | Powered by Readdy</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ id, title, desc, icon, color, points, badge, onClick }: any) {
    return (
        <div
            id={id}
            onClick={onClick}
            className="group bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
        >
            <div className="flex items-start gap-5 mb-8">
                <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform relative`}>
                    {icon}
                    {badge && (
                        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 font-black shadow-lg">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {badge}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-purple-600 transition-colors uppercase">{title}</h3>
                    <p className="text-gray-500 font-medium">{desc}</p>
                </div>
            </div>
            <div className="space-y-4">
                {points.map((p: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-cyan-500" size={18} />
                        <span className="text-sm font-bold text-gray-700">{p}</span>
                    </div>
                ))}
            </div>
            <ArrowUpRight className="absolute bottom-10 right-10 text-slate-200 group-hover:text-purple-600 transition-colors" size={24} />
        </div>
    );
}
