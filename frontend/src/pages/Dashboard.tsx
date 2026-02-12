import {
    Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Cell
} from 'recharts';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
    Calendar, Activity, Zap,
    Ticket, Users, Bell, Shield, ChevronRight,
    CheckCircle, Clock, ShoppingBag, Leaf,
    Monitor, Heart, ArrowUp, AlertCircle, Info, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- EXACT MOCK DATA FROM IMAGE ---

const ATTENDANCE_DATA = {
    '24h': [
        { time: '08:00', value: 4500 }, { time: '10:00', value: 8200 }, { time: '12:00', value: 15600 },
        { time: '14:00', value: 24500 }, { time: '16:00', value: 18200 }, { time: '18:00', value: 12400 },
        { time: '20:00', value: 6800 }
    ],
    '7d': [
        { time: 'Mon', value: 18000 }, { time: 'Tue', value: 21500 }, { time: 'Wed', value: 15400 },
        { time: 'Thu', value: 26800 }, { time: 'Fri', value: 32400 }, { time: 'Sat', value: 41200 },
        { time: 'Sun', value: 38500 }
    ],
    '30d': [
        { time: 'W1', value: 95000 }, { time: 'W2', value: 112000 }, { time: 'W3', value: 108000 }, { time: 'W4', value: 125000 }
    ]
};

const REVENUE_STREAMS = [
    { name: 'Tickets', value: 456800, percentage: 45, color: 'bg-purple-600' },
    { name: 'Merchandise', value: 254300, percentage: 25, color: 'bg-blue-600' },
    { name: 'Food & Beverage', value: 203500, percentage: 20, color: 'bg-indigo-600' },
    { name: 'Parking', value: 101700, percentage: 10, color: 'bg-cyan-500' },
];

const RECENT_ALERTS = [
    { id: 1, title: 'High Crowd Density', desc: 'Section A-12 approaching capacity limit', time: '2 minutes ago', priority: 'High', color: 'bg-orange-500', icon: <AlertCircle size={16} /> },
    { id: 2, title: 'Energy Optimization', desc: 'HVAC system adjusted for optimal efficiency', time: '15 minutes ago', priority: 'Low', color: 'bg-blue-500', icon: <Info size={16} /> },
    { id: 3, title: 'Ticket Validation', desc: 'Gate 5 processing speed improved by 23%', time: '32 minutes ago', priority: 'Medium', color: 'bg-emerald-500', icon: <CheckCircle2 size={16} /> },
    { id: 4, title: 'Merchandise Stock', desc: 'Section B-4 jerseys low stock', time: '45 minutes ago', priority: 'Medium', color: 'bg-orange-400', icon: <AlertCircle size={16} /> },
];

const ACTIVITY_FEED = [
    { id: 1, user: 'Sarah Johnson', action: 'validated ticket', detail: 'Gate 3 - Section B-15', time: '1 min ago', icon: <Ticket size={14} />, color: 'bg-purple-500 text-white' },
    { id: 2, user: 'System', action: 'crowd alert triggered', detail: 'High density in Section A-12', time: '3 mins ago', icon: <Users size={14} />, color: 'bg-orange-500 text-white' },
    { id: 3, user: 'AI System', action: 'optimized energy usage', detail: 'Reduced consumption by 8.4%', time: '12 mins ago', icon: <Zap size={14} />, color: 'bg-emerald-500 text-white' },
    { id: 4, user: 'Mike Chen', action: 'updated inventory', detail: 'Added 500 team jerseys', time: '25 mins ago', icon: <ShoppingBag size={14} />, color: 'bg-teal-500 text-white' },
    { id: 5, user: 'Emma Wilson', action: 'processed refund', detail: 'Ticket #TK-45892', time: '34 mins ago', icon: <Ticket size={14} />, color: 'bg-blue-500 text-white' },
];

const SYSTEMS_HEALTH = [
    { name: 'Ticketing System', uptime: '99.9%', response: '45ms', status: 'Operational' },
    { name: 'Crowd Monitoring', uptime: '99.8%', response: '52ms', status: 'Operational' },
    { name: 'Energy Management', uptime: '99.7%', response: '38ms', status: 'Operational' },
    { name: 'Analytics Engine', uptime: '99.9%', response: '41ms', status: 'Operational' },
    { name: 'Security Systems', uptime: '98.5%', response: '67ms', status: 'Warning' },
    { name: 'Payment Gateway', uptime: '99.9%', response: '33ms', status: 'Operational' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [attendanceTab, setAttendanceTab] = useState<'24h' | '7d' | '30d'>('24h');
    const [currentTime, setCurrentTime] = useState(new Date());

    const [stats, setStats] = useState<any>(null);

    // Real-time clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Real-time backend data polling
    const fetchStats = async () => {
        try {
            const res = await axios.get('/dashboard-data');
            setStats(res.data);
        } catch (err) {
            console.error("Backend fetch error:", err);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 space-y-10 max-w-[1800px] mx-auto overflow-x-hidden text-[#111827]">

            {/* --- HEADER --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center overflow-hidden p-2">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-[44px] font-bold leading-tight tracking-tight text-[#111827]">Welcome back, Monu Sharma!</h1>
                        <p className="text-slate-500 font-normal text-lg mt-1">Here's what's happening with your stadium today</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Card className="flex items-center gap-4 px-6 py-3 bg-white border-0 shadow-soft rounded-xl">
                        <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
                            <Clock size={20} className="stroke-[2.5]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Current Time</p>
                            <p className="text-xl font-semibold text-[#111827] tabular-nums mt-1.5 h-6">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </p>
                        </div>
                    </Card>

                    <div className="flex items-center gap-2 px-4 py-2 bg-[#E1F5FE] text-[#0288D1] text-[11px] font-semibold rounded-full border border-[#B3E5FC] uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" /> LIVE
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={<Calendar size={20} />} label="Active Events" value={stats?.active_events ?? "12"} trend="+2" isPositive={true} color="text-white bg-[#9c27b0]" />
                <MetricCard icon={<Users size={20} />} label="Stadium Occupancy" value={`${stats?.occupancy_percentage ?? "84"}%`} trend="+5.2%" isPositive={true} color="text-white bg-[#448aff]" />
                <MetricCard icon={<Clock size={20} />} label="System Health" value={`${stats?.system_health ?? "97"}%`} trend="+0.5%" isPositive={true} color="text-white bg-[#00bcd4]" />
                <MetricCard icon={<Zap size={20} />} label="Energy Usage" value={`${stats?.energy?.total_usage ?? "1054"} kWh`} trend="-8.4%" isPositive={true} color="text-white bg-[#4caf50]" />

                <MetricCard icon={<Ticket size={20} />} label="Tickets Sold" value={stats?.ticketing?.total_sold ?? "18,943"} trend="+12.3%" isPositive={true} color="text-white bg-[#ff7043]" />
                <MetricCard icon={<Activity size={20} />} label="Total Revenue" value={`$${stats?.merchandise?.total_revenue?.toLocaleString() ?? "456.8K"}`} trend="+18.7%" isPositive={true} color="text-white bg-[#26a69a]" />
                <MetricCard icon={<Bell size={20} />} label="Critical Zones" value={stats?.crowd?.critical_zones ?? "3"} trend="-2" isPositive={false} color="text-white bg-[#ef5350]" />
                <MetricCard icon={<Shield size={20} />} label="Security Health" value="97%" trend="+0.5%" isPositive={true} color="text-white bg-[#26c6da]" />
            </div>

            {/* --- MIDDLE SECTION: HEALTH & ACTIONS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* System Health Component */}
                <Card className="lg:col-span-2 p-8 border-0 shadow-soft-lg rounded-xl bg-white">
                    <div className="flex justify-between items-center mb-10 text-[#111827]">
                        <h3 className="text-2xl font-semibold">System Health</h3>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[28px] font-bold text-[#00a67e] leading-none kpi-value">{stats?.system_health ?? 83}%</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Overall Health</p>
                            </div>
                            <div className="relative w-16 h-16 transform -rotate-90">
                                <svg className="w-full h-full">
                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - (stats?.system_health ?? 83) / 100)} className="text-[#00a67e]" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center rotate-90 scale-75">
                                    <div className="p-1.5 bg-[#00a67e] rounded-full text-white">
                                        <Heart size={14} className="fill-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {SYSTEMS_HEALTH.map((sys, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[#F9FAFC] transition-all hover:bg-[#F1F4F9]">
                                <div className="flex items-center gap-5">
                                    <div className={`p-2 rounded-full ${sys.status === 'Operational' ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#FFFDE7] text-[#FBC02D]'}`}>
                                        <CheckCircle size={18} className="stroke-[3]" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-slate-900">{sys.name}</h4>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                                            Uptime: <span className="text-slate-500">{sys.uptime}</span> <span className="mx-2">•</span> Response: <span className="text-slate-500">{sys.response}</span>
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${sys.status === 'Operational' ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#FFF9C4] text-[#FBC02D]'}`}>
                                    {sys.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-0 mt-10 pt-8 border-t border-slate-50">
                        <HealthStat value={stats?.crowd?.total_zones ?? "5"} label="Zones Active" color="text-[#4CAF50]" />
                        <HealthStat value={stats?.crowd?.critical_zones ?? "1"} label="Warnings" color="text-[#FBC02D]" />
                        <HealthStat value="0" label="Critical" color="text-[#EF5350]" />
                    </div>
                </Card>

                {/* Quick Actions Component */}
                <Card className="p-8 border-0 shadow-soft-lg rounded-xl bg-white flex flex-col">
                    <h3 className="text-2xl font-semibold text-[#111827] mb-8">Quick Actions</h3>
                    <div className="space-y-5 flex-1">
                        <ActionButton icon={<Ticket size={18} />} label="Validate Ticket" color="bg-[#9c27b0]" onClick={() => navigate('/ticketing')} />
                        <ActionButton icon={<Users size={18} />} label="View Crowd" color="bg-[#e65100]" onClick={() => navigate('/crowd')} />
                        <ActionButton icon={<Zap size={18} />} label="Energy Stats" color="bg-[#2e7d32]" onClick={() => navigate('/energy')} />
                        <ActionButton icon={<Monitor size={18} />} label="View Reports" color="bg-[#1565c0]" onClick={() => navigate('/analytics')} />
                        <ActionButton icon={<ShoppingBag size={18} />} label="Merchandise" color="bg-[#00838f]" onClick={() => navigate('/merchandise')} />
                        <ActionButton icon={<Leaf size={18} />} label="Sustainability" color="bg-[#2e7d32]" onClick={() => navigate('/sustainability')} />
                    </div>
                    <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl py-4 text-sm font-semibold shadow-lg transition-all hover:opacity-90 active:scale-[0.98] uppercase tracking-widest">
                        Generate Report
                    </button>
                </Card>
            </div>

            {/* --- BOTTOM SECTION: TRENDS & ANALYTICS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Attendance Trend Chart */}
                <Card className="p-8 border-0 shadow-soft-lg rounded-xl bg-white">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-semibold text-[#111827]">Attendance Trend</h3>
                        <div className="flex gap-1 p-1 bg-[#F1F3F6] rounded-lg">
                            {(['24h', '7d', '30d'] as const).map(tab => (
                                <button key={tab} onClick={() => setAttendanceTab(tab)} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${attendanceTab === tab ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ATTENDANCE_DATA[attendanceTab]} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4A4AE2" />
                                        <stop offset="100%" stopColor="#9c27b0" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F8F9FB" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B0B4BC', fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B0B4BC', fontWeight: 600 }} ticks={[0, 12000, 25000]} tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}K`} />
                                <Tooltip cursor={{ fill: '#F5F7FA', radius: 4 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={45}>
                                    {ATTENDANCE_DATA[attendanceTab].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value >= 24000 ? 'url(#barGradient)' : '#E6E9EF'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[35px] left-[78%] -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none">
                            24,500
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-50">
                        <ChartInsight label="Peak Today" value="24.5K" isPositive={true} />
                        <ChartInsight label="Current" value="18.2K" isPositive={true} />
                        <ChartInsight label="vs Yesterday" value="+15.3%" isPositive={true} />
                    </div>
                </Card>

                {/* Revenue Breakdown Progress Bars */}
                <Card className="p-8 border-0 shadow-soft-lg rounded-xl bg-white">
                    <div className="flex justify-between items-start mb-10">
                        <h3 className="text-2xl font-semibold text-[#111827]">Revenue Breakdown</h3>
                        <div className="text-right">
                            <p className="text-[32px] font-bold text-[#111827] leading-none">$1.02M</p>
                            <p className="text-[11px] font-bold text-emerald-600 uppercase mt-1.5 tracking-wider">+12.5% vs last week</p>
                        </div>
                    </div>

                    <div className="space-y-7 mb-10">
                        {REVENUE_STREAMS.map((item, idx) => (
                            <div key={idx} className="space-y-2.5">
                                <div className="flex justify-between text-[14px]">
                                    <span className="font-bold text-slate-900">{item.name}</span>
                                    <span className="font-bold text-slate-950 kpi-value">
                                        ${(item.value / 1000).toFixed(1)}K <span className="text-slate-400 font-medium ml-1">({item.percentage}%)</span>
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-[#F1F3F6] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{
                                            background: item.name === 'Tickets' ? 'linear-gradient(to right, #9c27b0, #6161E1)' :
                                                item.name === 'Merchandise' ? 'linear-gradient(to right, #448aff, #2979ff)' :
                                                    item.name === 'Food & Beverage' ? 'linear-gradient(to right, #26a69a, #00897b)' :
                                                        'linear-gradient(to right, #00bcd4, #00acc1)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#E8F5E9] p-5 rounded-[1.2rem] flex flex-col items-center justify-center text-center">
                            <ArrowUp className="text-[#4CAF50] mb-1.5" size={18} />
                            <p className="text-[22px] font-bold text-[#2E7D32] leading-none kpi-value">+18.7%</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Growth Rate</p>
                        </div>
                        <div className="bg-[#E3F2FD] p-5 rounded-[1.2rem] flex flex-col items-center justify-center text-center">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2196F3] text-[14px] font-bold shadow-sm mb-1.5">
                                $
                            </div>
                            <p className="text-[22px] font-bold text-[#1565C0] leading-none kpi-value">$42.3K</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Avg per Event</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- FINAL SECTION: ALERTS & ACTIVITY --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">

                {/* Recent Alerts List */}
                <Card className="p-8 border-0 shadow-soft-lg rounded-2xl bg-white flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-[#111827]">Recent Alerts</h3>
                        <span className="px-3 py-1 bg-red-50 text-[#E11D48] text-[10px] font-bold rounded-full uppercase tracking-wider">1 High Priority</span>
                    </div>

                    <div className="space-y-4 flex-1 custom-scrollbar overflow-y-auto max-h-[440px] pr-2">
                        {(stats?.alerts || RECENT_ALERTS).map((alert: any) => (
                            <div key={alert.id} className="flex gap-5 p-5 rounded-2xl bg-[#F8FAFC] relative group transition-all hover:bg-[#F1F3F6] items-start">
                                <div className={`w-12 h-12 rounded-full ${alert.color || (alert.level === 'error' ? 'bg-red-500' : 'bg-orange-500')} text-white shrink-0 shadow-sm flex items-center justify-center`}>
                                    {alert.icon || <AlertCircle size={16} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-[17px] font-bold text-[#6a1b9a] tracking-tight">{alert.title || alert.action}</h4>
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${(alert.priority || alert.level) === 'High' || (alert.priority || alert.level) === 'error' ? 'bg-[#FFF1F2] text-[#E11D48]' :
                                                (alert.priority || alert.level) === 'Medium' || (alert.priority || alert.level) === 'warning' ? 'bg-[#FEFCE8] text-[#A16207]' :
                                                    'bg-[#EFF6FF] text-[#2563EB]'
                                            }`}>
                                            {alert.priority || alert.level || 'Info'}
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-slate-500 font-medium mb-2">{alert.desc || alert.detail}</p>
                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                                        <Clock size={12} className="stroke-[2.5]" /> {alert.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <button className="text-[#a12bc1] text-[14px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity" onClick={() => navigate('/analytics')}>View All Alerts</button>
                    </div>
                </Card>

                {/* Activity Feed Feed */}
                <Card className="p-8 border-0 shadow-soft-lg rounded-2xl bg-white flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-bold text-[#111827]">Activity Feed</h3>
                        <button className="text-[#a12bc1] text-sm font-bold hover:opacity-80 transition-opacity">View All</button>
                    </div>

                    <div className="relative flex-1 custom-scrollbar overflow-y-auto max-h-[440px] pr-2">
                        <div className="absolute left-6 top-2 bottom-6 w-[2px] bg-[#F1F3F6]" />

                        <div className="space-y-0 relative">
                            {(stats?.activity || ACTIVITY_FEED).map((activity: any) => (
                                <div key={activity.id} className="flex gap-5 group items-start pb-8">
                                    <div className={`w-12 h-12 rounded-full ${activity.color || 'bg-purple-500 text-white'} flex items-center justify-center shrink-0 z-10 shadow-sm group-hover:scale-105 transition-transform`}>
                                        {activity.icon || <Ticket size={14} />}
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[15px] font-normal text-slate-600">
                                                    <span className="font-bold text-[#111827] mr-1">{activity.user}</span>
                                                    {activity.action}
                                                </p>
                                                <p className="text-[13px] text-slate-400 font-medium mt-0.5">{activity.detail}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                                    {activity.time} <ArrowUp size={10} className="text-slate-400" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 mt-12 pt-10 border-t border-slate-50">
                        <ChartInsight label="Today" value="247" color="text-[#a12bc1]" />
                        <ChartInsight label="This Week" value="1.8K" color="text-[#2196F3]" />
                        <ChartInsight label="Growth" value="+23%" color="text-[#4CAF50]" />
                    </div>
                </Card>
            </div>

        </div>
    );
}

// --- SUBCOMPONENTS ---

function MetricCard({ icon, label, value, trend, isPositive, color }: any) {
    return (
        <Card className="p-6 border border-slate-50 shadow-soft rounded-xl bg-white relative overflow-hidden transition-all hover:shadow-soft-lg">
            <div className="absolute top-4 right-4 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CAF50]"></span>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-2.5 rounded-lg ${color} shadow-sm`}>
                        {icon}
                    </div>
                    <div className={`flex items-center gap-1 font-semibold text-[10px] px-2.5 py-1 rounded-full ${isPositive ? 'text-[#388E3C] bg-[#E8F5E9]' : 'text-slate-400 bg-slate-50'}`}>
                        {trend}
                    </div>
                </div>
                <p className="text-[32px] font-bold leading-none mb-1 text-[#111827] kpi-value">{value}</p>
                <p className="text-xs font-medium text-slate-400">{label}</p>
            </div>
        </Card>
    );
}

function HealthStat({ value, label, color }: any) {
    return (
        <div className="flex flex-col items-center flex-1">
            <span className={`text-[32px] font-bold ${color} kpi-value mb-1`}>{value}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}

function ActionButton({ icon, label, color, onClick }: any) {
    return (
        <button onClick={onClick} className="w-full flex items-center justify-between p-4 rounded-xl bg-[#F4F8FF] border border-transparent hover:bg-[#EBF2FF] transition-all group">
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${color} text-white shadow-md transition-all duration-300 group-hover:scale-105`}>
                    {icon}
                </div>
                <span className="text-[15px] font-semibold text-slate-800">{label}</span>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
        </button>
    );
}

function ChartInsight({ label, value, color }: any) {
    return (
        <div className="text-center">
            <p className={`text-[28px] font-bold ${color || 'text-[#111827]'} kpi-value mb-1`}>{value}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-2">{label}</p>
        </div>
    );
}
