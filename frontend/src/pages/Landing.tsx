import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
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

export default function Landing() {
    const navigate = useNavigate();

    // Removed auto-redirect to dashboard to allow authenticated users to see the landing page

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#111827]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                <Activity size={20} />
                            </div> */}
                            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />

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
                        {/* <div className="flex gap-4">
                            <Button className="bg-slate-900 text-white rounded-full px-6 font-bold shadow-lg" onClick={() => navigate('/dashboard')}>Enter Dashboard</Button>
                        </div> */}
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
                                <h1 className="text-[48px] md:text-[56px] font-bold text-[#111827] leading-[1.2] tracking-tight">
                                    Welcome to Smart Stadium!
                                </h1>
                                <p className="text-xl text-slate-500 font-medium tracking-tight leading-relaxed">
                                    Next-generation Stadium Management System powered by AI and real-time analytics.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-soft-lg border border-slate-50 max-w-lg">
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600">12</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Active Events</div>
                                    </div>
                                    <div className="text-center border-x border-slate-100 px-4">
                                        <div className="text-3xl font-bold text-blue-600">87%</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Occupancy</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-emerald-500">98%</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">System Health</div>
                                    </div>
                                </div>
                            </div>

                            {/* <Button
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-xl hover:opacity-90 transition-all shadow-xl shadow-purple-100"
                            >
                                <LayoutDashboard size={22} /> Go to Dashboard
                            </Button> */}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >

                            <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(30,58,138,0.25)]">
                                <img
                                    alt="Smart Stadium Dashboard"
                                    className="w-full h-full object-cover"
                                    src="https://readdy.ai/api/search-image?query=modern%20futuristic%20smart%20stadium%20aerial%20view%20with%20digital%20technology%20overlay%20holographic%20data%20visualization%20glowing%20purple%20and%20blue%20lights%20high-tech%20control%20center%20dashboard%20screens%20showing%20real-time%20analytics%20clean%20minimalist%20background&amp;width=800&amp;height=600&amp;seq=stadium-hero-001&amp;orientation=landscape"
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
            <section id="features" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-[36px] font-semibold text-[#111827] mb-4 tracking-tight">Core Capabilities</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Advanced solutions for modern stadium management.</p>
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

                        <FeatureCard
                            id="realtime-analytics"
                            title="Real-Time Analytics"
                            desc="Global operational insights and reporting"
                            icon={<BarChart3 size={32} />}
                            color="bg-blue-600"
                            points={["Global dashboard metrics", "Automated weekly reports", "Historical trend analysis"]}
                            onClick={() => navigate('/analytics')}
                        />

                        <FeatureCard
                            id="sustainability"
                            title="Sustainability"
                            desc="Environmental impact and energy tracking"
                            icon={<Leaf size={32} />}
                            color="bg-emerald-500"
                            points={["Eco-score monitoring", "Waste management tracking", "Green energy reporting"]}
                            onClick={() => navigate('/sustainability')}
                        />
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
                    <h2 className="text-[48px] font-bold text-white leading-tight tracking-tight">Transform Your Stadium Operations</h2>
                    <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Experience the future of smart stadium management with AI-powered insights and real-time control.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                        <Button onClick={() => navigate('/dashboard')} className="bg-white text-purple-600 hover:bg-slate-50 px-10 py-6 rounded-xl text-lg font-bold shadow-xl transition-all">
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#111827] text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Logo" className=" w-9 h-9 object-contain" />
                                <span className="text-xl font-bold tracking-tight">Smart Stadium</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-normal">
                                Next-generation stadium management powered by AI and real-time analytics.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-[0.1em] uppercase">Features</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                {['Ticketing', 'Crowd', 'Energy', 'Analytics'].map(item => (
                                    <li key={item}><a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors">{item} Management</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-[0.1em] uppercase">Company</h4>
                            <ul className="space-y-4 text-sm font-medium">
                                {['About Us', 'Careers', 'Contact', 'Support'].map(item => (
                                    <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-[0.1em] uppercase">Connect</h4>
                            <div className="flex gap-3">
                                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                                    <a key={i} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all cursor-pointer">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-10 text-center text-[12px] font-medium text-slate-500 uppercase tracking-widest">
                        <p>© 2026 Smart Stadium Management System. All rights reserved.</p>
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
            className="group bg-[#F8FAFC] rounded-2xl p-8 shadow-soft border border-slate-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
        >
            <div className="flex items-start gap-4 mb-8">
                <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform relative`}>
                    {icon}
                    {badge && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold shadow-md">
                            <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> {badge}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#111827] mb-1 tracking-tight group-hover:text-purple-600 transition-colors uppercase">{title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
                </div>
            </div>
            <div className="space-y-3">
                {points.map((p: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-blue-500" size={16} />
                        <span className="text-sm font-semibold text-slate-600">{p}</span>
                    </div>
                ))}
            </div>
            <ArrowUpRight className="absolute bottom-8 right-8 text-slate-200 group-hover:text-purple-600 transition-colors" size={20} />
        </div>
    );
}
