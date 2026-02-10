import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Users, Zap, ShoppingBag, Activity, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const zoneData = [
    { subject: 'North Stand', A: 120, full: 150 },
    { subject: 'South Stand', A: 98, full: 150 },
    { subject: 'East Stand', A: 86, full: 150 },
    { subject: 'West Stand', A: 99, full: 150 },
    { subject: 'VIP Lounge', A: 85, full: 150 },
    { subject: 'Box Seats', A: 65, full: 150 },
];

const chartData = [
    { time: '09:00', attendance: 5000, energy: 200, revenue: 1200, crowd: 20 },
    { time: '11:00', attendance: 12000, energy: 350, revenue: 4500, crowd: 45 },
    { time: '13:00', attendance: 35000, energy: 580, revenue: 15000, crowd: 70 },
    { time: '15:00', attendance: 48000, energy: 620, revenue: 25000, crowd: 85 },
    { time: '17:00', attendance: 52000, energy: 640, revenue: 32000, crowd: 90 },
    { time: '19:00', attendance: 45000, energy: 600, revenue: 18000, crowd: 75 },
    { time: '21:00', attendance: 15000, energy: 400, revenue: 5000, crowd: 30 },
];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState<any>({
        active_events: 0,
        occupancy_percentage: 0,
        system_health: 100,
        ticketing: { total_sold: 0, fraud_alerts: 0 },
        crowd: { critical_zones: 0, total_zones: 0 },
        energy: { total_usage: 0 },
        merchandise: { total_revenue: 0, total_items: 0 }
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get('/dashboard-data');
                setStats(res.data);
            } catch (err) {
                console.error("Dashboard stats fetch failed", err);
            }
        };
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const scrollToFeatures = () => {
        const element = document.getElementById('analytics-overview');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="space-y-24 pb-32 bg-[#f4f7ff] min-h-screen font-['Outfit'] overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-12 px-6 text-center lg:text-left">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/50 shadow-sm text-purple-600 font-bold text-xs uppercase tracking-widest"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-ping" />
                                    Synchronized Control
                                </motion.div>
                                <Button
                                    onClick={logout}
                                    variant="outline"
                                    className="rounded-full border-red-100 text-red-600 hover:bg-red-50 font-bold text-xs h-9 px-4 uppercase tracking-tighter"
                                >
                                    Terminate Session
                                </Button>
                            </div>
                            <h1 className="text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                Neural Center of<br />
                                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Stadium Analytics
                                </span>
                            </h1>
                            <p className="text-slate-500 text-2xl font-medium tracking-tight max-w-xl mx-auto lg:mx-0">
                                Welcome, {user?.username || 'Monu Sharma'}. Visualizing real-time stadium dynamics with precision.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <Button
                                onClick={scrollToFeatures}
                                className="bg-slate-900 text-white hover:bg-slate-800 rounded-3xl px-12 py-8 text-xl font-black shadow-2xl transition-all hover:scale-105 group"
                            >
                                Vision Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-[650px] relative perspective-1000"
                    >
                        <div className="relative rounded-[5rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(30,58,138,0.4)] border-[16px] border-white group">
                            <img
                                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200"
                                alt="Stadium Live View"
                                className="w-full aspect-video object-cover transition-transform duration-[8s] group-hover:scale-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 px-8 py-5 rounded-[2.5rem] text-white">
                                    <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 flex items-center justify-center p-1">
                                        <div className="w-full h-full bg-emerald-500 rounded-full" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Secure Node</p>
                                        <p className="text-xl font-black italic">{stats.system_health}% Operational</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Graphical Analytics Overview */}
            <section id="analytics-overview" className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Performance Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 space-y-10"
                    >
                        <Card className="border-0 shadow-2xl shadow-blue-100/30 rounded-[4rem] p-12 bg-white overflow-hidden relative group">
                            <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Dynamic Pulse</h3>
                                    <p className="text-slate-400 font-semibold italic text-lg opacity-80">Real-time throughput metrics</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-blue-600 px-8 py-5 rounded-[2rem] text-white shadow-xl shadow-blue-600/30">
                                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Live Attend</p>
                                        <p className="text-4xl font-black italic">{(stats.occupancy_percentage * 500).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[500px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPulseEnergy" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecf0f5" />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 900 }}
                                            dy={20}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-slate-900 border border-white/10 p-6 rounded-[2rem] shadow-2xl text-white backdrop-blur-xl">
                                                            <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-4">Timeline Index</p>
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                                                    <p className="text-2xl font-black">{payload[0].value?.toLocaleString()} <span className="text-[10px] opacity-40 uppercase">Crowd</span></p>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                                                    <p className="text-2xl font-black">{payload[1]?.value} <span className="text-[10px] opacity-40 uppercase">Energy</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={8} fillOpacity={1} fill="url(#colorPulse)" animationDuration={2000} />
                                        <Area type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={8} fillOpacity={1} fill="url(#colorPulseEnergy)" animationDuration={2500} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Side Distribution Charts */}
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="border-0 shadow-2xl shadow-blue-100/30 rounded-[4rem] p-10 bg-slate-900 text-white relative overflow-hidden h-full">
                                <div className="relative z-10 flex flex-col h-full items-center text-center">
                                    <h4 className="text-xl font-black uppercase tracking-[0.3em] mb-12 opacity-40 italic">Zone Density</h4>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={zoneData}>
                                                <PolarGrid stroke="#ffffff10" />
                                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 700 }} />
                                                <Radar
                                                    name="Capacity"
                                                    dataKey="A"
                                                    stroke="#6366f1"
                                                    fill="#6366f1"
                                                    fillOpacity={0.6}
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-8 space-y-4 w-full">
                                        <div className="flex justify-between items-center text-xs font-black italic border-t border-white/5 pt-8">
                                            <span className="opacity-30 uppercase">Peak Vector</span>
                                            <span className="text-purple-400">NORTH STAND (87%)</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[4rem] p-10 shadow-2xl shadow-blue-100/30 flex flex-col justify-center items-center text-center gap-6 group hover:translate-y-[-10px] transition-transform"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <Trophy size={32} />
                            </div>
                            <div>
                                <h4 className="text-5xl font-black tracking-tighter text-slate-900 italic">{stats.active_events}</h4>
                                <p className="font-black opacity-30 uppercase text-[10px] tracking-widest mt-2">Active Sessions</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Graphical Grid */}
            <section className="max-w-7xl mx-auto px-6 space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase">Core Operations</h2>
                    <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CapabilityGraphCard
                        title="Ticketing"
                        value={stats.ticketing.total_sold}
                        subValue={`${stats.ticketing.fraud_alerts} Alerts`}
                        icon={<Ticket size={24} />}
                        color="purple"
                        data={[12, 19, 15, 25, 22, 30, 28]}
                        link="/ticketing"
                    />
                    <CapabilityGraphCard
                        title="Crowd"
                        value={`${stats.occupancy_percentage}%`}
                        subValue={`${stats.crowd.critical_zones} High Zones`}
                        icon={<Users size={24} />}
                        color="orange"
                        data={[30, 45, 60, 55, 75, 85, 90]}
                        link="/crowd"
                    />
                    <CapabilityGraphCard
                        title="Energy"
                        value={`${stats.energy.total_usage}kW`}
                        subValue="Optimal Status"
                        icon={<Zap size={24} />}
                        color="emerald"
                        data={[200, 350, 400, 450, 420, 480, 500]}
                        link="/energy"
                    />
                    <CapabilityGraphCard
                        title="Commerce"
                        value={`$${stats.merchandise.total_revenue}`}
                        subValue={`${stats.merchandise.total_items} Items`}
                        icon={<ShoppingBag size={24} />}
                        color="cyan"
                        data={[40, 55, 45, 70, 65, 80, 75]}
                        link="/merchandise"
                    />
                </div>
            </section>

            {/* Smart Footer CTA */}
            <section className="max-w-7xl mx-auto px-6">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative py-24 px-12 rounded-[5rem] bg-[#0a0a1a] overflow-hidden group shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f620_0%,transparent_50%)]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-20" />
                    <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-7xl font-black text-white leading-[0.9] tracking-tighter">Ready to Scale Your Stadium?</h2>
                            <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                                Deploy next-generation AI modules and real-time visualization tools to your infrastructure today.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button className="bg-white text-purple-700 hover:bg-slate-100 rounded-[2rem] px-14 py-8 font-black text-2xl shadow-2xl transition-all hover:scale-105">
                                Upgrade Plan
                            </Button>
                            <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 rounded-[2rem] px-14 py-8 font-black text-2xl transition-all hover:scale-105 backdrop-blur-md">
                                System Settings
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

function CapabilityGraphCard({ title, value, subValue, icon, color, data, link }: any) {
    const colorMap: any = {
        purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-600', stroke: '#9333ea' },
        orange: { bg: 'bg-orange-600', light: 'bg-orange-50', text: 'text-orange-600', stroke: '#ea580c' },
        emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600', stroke: '#059669' },
        cyan: { bg: 'bg-cyan-600', light: 'bg-cyan-50', text: 'text-cyan-600', stroke: '#0891b2' }
    };

    const theme = colorMap[color];
    const chartData = data.map((v: number, i: number) => ({ val: v, i }));

    return (
        <Link to={link}>
            <motion.div
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-100/50 border border-white hover:shadow-blue-200/50 transition-all h-full flex flex-col gap-8 relative overflow-hidden"
            >
                <div className="flex justify-between items-start relative z-10">
                    <div className={`p-5 rounded-2xl ${theme.bg} text-white shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                        {icon}
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</p>
                        <h4 className="text-3xl font-black text-slate-900">{value}</h4>
                        <p className={`text-xs font-bold ${theme.text} opacity-80`}>{subValue}</p>
                    </div>
                </div>

                <div className="h-24 w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <Area
                                type="monotone"
                                dataKey="val"
                                stroke={theme.stroke}
                                strokeWidth={3}
                                fill={theme.stroke}
                                fillOpacity={0.05}
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex items-center gap-2 relative z-10 opacity-40 font-bold text-[10px] uppercase tracking-tighter">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    Detailed Logistics
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-[60px] -mr-16 -mt-16 opacity-50" />
            </motion.div>
        </Link >
    );
}
