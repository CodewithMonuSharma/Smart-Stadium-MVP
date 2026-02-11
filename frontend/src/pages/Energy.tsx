import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Zap,
    Activity,
    Leaf,
    CheckCircle,
    Settings,
    Cpu,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

// Mock Data for Graph
const GENERATE_CHART_DATA = () => {
    const data = [];
    const points = 20;
    const startTime = new Date();
    startTime.setHours(9, 50, 0);

    for (let i = 0; i < points; i++) {
        const time = new Date(startTime.getTime() + i * 15 * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            current: 2000 + Math.random() * 1500,
            displayTime: i === 0 ? "09:50 AM" : i === Math.floor(points / 2) ? "12:50 PM" : i === points - 1 ? "01:35 PM" : ""
        });
    }
    return data;
};

const PREDICTIONS = [
    { time: '01:51 PM', status: 'NORMAL', usage: '2,948', confidence: 91, trend: 'stable' },
    { time: '02:51 PM', status: 'PARTIAL', usage: '2,814', confidence: 85, trend: 'down' },
    { time: '03:51 PM', status: 'NORMAL', usage: '2,918', confidence: 88, trend: 'up' },
    { time: '04:51 PM', status: 'NORMAL', usage: '2,817', confidence: 93, trend: 'stable' },
    { time: '05:51 PM', status: 'HIGH', usage: '3,087', confidence: 78, trend: 'up' },
    { time: '06:51 PM', status: 'CRITICAL', usage: '3,149', confidence: 89, trend: 'up' },
];

const OPTIMIZATION_CONTROLS = [
    { id: 'hvac', name: 'Smart HVAC Control', desc: 'Adjust temperature based on occupancy and weather', impact: '15%', saved: '0.2K', status: true },
    { id: 'lighting', name: 'Lighting Optimization', desc: 'Dim non-critical lights in low traffic areas', impact: '12%', saved: '0.1K', status: true },
    { id: 'balancing', name: 'Load Balancing', desc: 'Distribute power demand across phases efficiently', impact: '8%', saved: '0.3K', status: true },
    { id: 'peak', name: 'Peak Shaving', desc: 'Reduce consumption during peak hours', impact: '10%', saved: '0.2K', status: false },
];

const ZONE_BREAKDOWN = [
    { id: 1, name: 'HVAC Systems', devices: 142, usage: 1402, capacity: 1800, status: 'HIGH', trend: 'up' },
    { id: 2, name: 'Field Lighting', devices: 58, usage: 1177, capacity: 1500, status: 'HIGH', trend: 'up' },
    { id: 3, name: 'Main Seating', devices: 324, usage: 884, capacity: 1200, status: 'OPTIMAL', trend: 'up' },
    { id: 4, name: 'Kitchen & Food', devices: 42, usage: 687, capacity: 1000, status: 'CRITICAL', trend: 'stable' },
    { id: 5, name: 'Concourse', devices: 156, usage: 617, capacity: 800, status: 'HIGH', trend: 'down' },
    { id: 6, name: 'VIP Lounges', devices: 48, usage: 426, capacity: 600, status: 'HIGH', trend: 'stable' },
    { id: 7, name: 'Parking Areas', devices: 112, usage: 242, capacity: 400, status: 'OPTIMAL', trend: 'up' },
    { id: 8, name: 'Admin Offices', devices: 34, usage: 163, capacity: 300, status: 'OPTIMAL', trend: 'stable' },
];

export default function Energy() {
    const [chartData] = useState(GENERATE_CHART_DATA());
    const [controls, setControls] = useState(OPTIMIZATION_CONTROLS);
    const [isMonitoring, setIsMonitoring] = useState(true);
    const [activeTab, setActiveTab] = useState('1H');

    // Stats simulation
    const [currentUsage, setCurrentUsage] = useState(2706);
    const [efficiency, setEfficiency] = useState(85);
    const [costSavings] = useState(27.6);

    useEffect(() => {
        if (!isMonitoring) return;

        const interval = setInterval(() => {
            setCurrentUsage(prev => prev + Math.floor(Math.random() * 21) - 10);
            setEfficiency(prev => Math.min(100, Math.max(70, prev + (Math.random() * 2 - 1))));
        }, 3000);

        return () => clearInterval(interval);
    }, [isMonitoring]);

    const toggleControl = (id: string) => {
        setControls(prev => prev.map(c =>
            c.id === id ? { ...c, status: !c.status } : c
        ));
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700 px-3 py-10 bg-slate-50 min-h-screen font-['Outfit']">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 px-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Energy Management Console</h1>
                    <p className="text-slate-500 mt-2 text-lg">AI-powered energy optimization and monitoring</p>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsMonitoring(!isMonitoring)}
                        className={`flex items-center gap-4 px-8 py-3.5 rounded-full shadow-xl transition-all hover:scale-105 ${isMonitoring ? 'bg-emerald-500 shadow-emerald-200 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        {isMonitoring ? (
                            <>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                <span className="font-bold tracking-wide text-sm">ACTIVE MONITORING</span>
                            </>
                        ) : (
                            <>
                                <Pause size={16} />
                                <span className="font-bold tracking-wide text-sm">MONITORING PAUSED</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Top Row: KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <StatCard
                    title="Current Usage"
                    value={`${currentUsage.toLocaleString()} kW`}
                    subtext="Peak: 3,220 kW"
                    icon={<Zap size={24} className="text-emerald-600" />}
                    trend="live"
                />
                <StatCard
                    title="Efficiency Score"
                    value={`${efficiency.toFixed(0)}%`}
                    subtext="+5% month-over-month"
                    icon={<Leaf size={24} className="text-emerald-600" />}
                    trend="up"
                />
                <StatCard
                    title="Cost Savings"
                    value={`$${costSavings}K`}
                    subtext="vs baseline period 2024"
                    icon={<Activity size={24} className="text-blue-600" />}
                    trend="up"
                />
                <Card className="p-8 border-0 shadow-lg rounded-2xl bg-emerald-600 text-white relative overflow-hidden group min-h-[220px]">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Cpu size={32} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest bg-emerald-400 px-3 py-1.5 rounded-full">ACTIVE</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">AI Optimizer</h3>
                        <p className="text-emerald-100 text-sm mb-6">Running optimization task...</p>
                        <div className="w-full h-1.5 bg-emerald-700 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ['20%', '95%', '40%', '75%'] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="h-full bg-white"
                            />
                        </div>
                    </div>
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-16 h-16 bg-emerald-400 rounded-full blur-2xl opacity-40"></div>
                </Card>
            </div>

            {/* Middle Section: Main Chart (Full Width) */}
            <div className="px-4">
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Real-Time Consumption</h3>
                            <p className="text-base text-slate-500 mt-1">Live energy usage monitoring across all zones</p>
                        </div>
                        <div className="flex gap-3 p-1.5 bg-slate-100 rounded-xl">
                            {['1H', '6H', '24H', '7D'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <MetricBadge label="Current" value={`${currentUsage}`} unit="kWh" color="text-emerald-600" bg="bg-emerald-50/50" />
                        <MetricBadge label="Peak" value="3,396" unit="kWh" color="text-red-500" bg="bg-red-50/50" />
                        <MetricBadge label="Average" value="3,065" unit="kWh" color="text-blue-600" bg="bg-blue-50/50" />
                        <MetricBadge label="Low" value="2,810" unit="kWh" color="text-emerald-500" bg="bg-emerald-50/50" />
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="displayTime"
                                    stroke="#94a3b8"
                                    fontSize={10}
                                    fontWeight="bold"
                                    tickLine={false}
                                    axisLine={false}
                                    interval={0}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[0, 4000]}
                                    ticks={[0, 1000, 2000, 3000]}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#64748b' }}
                                />
                                <Area
                                    type="linear"
                                    dataKey="current"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#usageGradient)"
                                    dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-800">System Operating Normally</p>
                                <p className="text-xs text-slate-500">All zones within optimal range</p>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400">Last updated: {new Date().toLocaleTimeString()}</p>
                    </div>
                </Card>
            </div>

            {/* Split Section: Optimization(Left) and Prediction(Right) */}
            <div className="grid lg:grid-cols-2 gap-8 px-4">

                {/* Auto-Optimization (Now on Left) */}
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Auto-Optimization</h3>
                            <p className="text-base text-slate-500">AI-powered efficiency controls</p>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg mb-1">ACTIVE RULES</div>
                            <span className="text-sm font-black text-emerald-600 tracking-tighter">{controls.filter(c => c.status).length}/{controls.length}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-50/50">
                            <p className="text-sm font-bold text-emerald-800 mb-2">Total Impact</p>
                            <p className="text-4xl font-black text-emerald-600">45%</p>
                            <p className="text-[10px] font-black text-emerald-400 mt-2 uppercase tracking-widest">Energy saved</p>
                        </div>
                        <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-50/50">
                            <p className="text-sm font-bold text-indigo-800 mb-2">Savings Today</p>
                            <p className="text-4xl font-black text-indigo-600">$0.8K</p>
                            <p className="text-[10px] font-black text-indigo-400 mt-2 uppercase tracking-widest">Cost reduced</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {controls.map((control) => (
                            <div key={control.id} className="flex items-start gap-6">
                                <button
                                    onClick={() => toggleControl(control.id)}
                                    className={`shrink-0 w-16 h-8 rounded-full relative transition-colors ${control.status ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                >
                                    <motion.div
                                        animate={{ x: control.status ? 32 : 0 }}
                                        className="absolute top-1.5 left-1.5 w-5 h-5 bg-white rounded-full shadow-md"
                                    />
                                </button>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-slate-800">{control.name}</h4>
                                        <span className={`text-xs font-black px-3 py-1 rounded-lg ${control.status ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                            {control.status ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{control.desc}</p>
                                    {control.status && (
                                        <div className="flex items-center gap-6">
                                            <div className="flex-1">
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: control.impact }}
                                                        className="h-full bg-emerald-400"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 tracking-widest uppercase whitespace-nowrap">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                Optimizing
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-10 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all group">
                        <Settings size={20} className="group-hover:rotate-45 transition-transform" />
                        <span className="text-sm font-bold">Configure All Rules</span>
                    </button>
                </Card>

                {/* AI Demand Prediction (Now on Right) */}
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">AI Demand Prediction</h3>
                            <p className="text-base text-slate-500">Next 6 hours forecast</p>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg mb-1 uppercase">Accuracy</div>
                            <span className="text-sm font-black text-blue-600">92%</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100/50 rounded-xl p-6 mb-10 flex items-center gap-6">
                        <div className="p-3 bg-blue-600 text-white rounded-2xl">
                            <Cpu size={28} />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-blue-900 leading-tight">Neural Network Active</p>
                            <p className="text-sm text-blue-600 font-medium mt-1">Processing real-time data patterns</p>
                        </div>
                        <span className="text-xs uppercase font-bold text-blue-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Learning
                        </span>
                    </div>

                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        {PREDICTIONS.map((pred, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="text-center min-w-[70px]">
                                        <p className="text-sm font-black text-slate-800">{pred.time}</p>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block ${pred.status === 'CRITICAL' ? 'bg-red-100 text-red-600' :
                                            pred.status === 'HIGH' ? 'bg-orange-100 text-orange-600' :
                                                'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            {pred.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 px-8">
                                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2">
                                        <span>Confidence</span>
                                        <span>{pred.confidence}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${pred.confidence}%` }}></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-slate-800">{pred.usage} kW</p>
                                    <p className="text-[10px] font-black text-slate-300 uppercase mt-0.5">ESTIMATED</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-xs text-slate-400 italic font-medium leading-relaxed">
                        * Predictions based on historical demand, weather data, and event schedules.
                    </div>
                </Card>
            </div>

            {/* Bottom Section: Zone Breakdown */}
            <div className="px-4 pb-12">
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Zone-Based Breakdown</h3>
                            <p className="text-lg text-slate-500 mt-1">Energy consumption by stadium zones</p>
                        </div>
                        <div className="flex gap-3 p-1.5 bg-slate-100 rounded-lg">
                            {['Consumption', 'Status', 'Name'].map(tab => (
                                <button
                                    key={tab}
                                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${tab === 'Status' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-100/50 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-emerald-800 opacity-70 mb-1 leading-tight uppercase tracking-wider">Total Usage</p>
                            <p className="text-2xl font-black text-emerald-600">5,159</p>
                            <p className="text-[10px] font-bold text-emerald-400">of 7,000 kWh</p>
                        </div>
                        <div className="p-5 rounded-xl bg-blue-50 border border-blue-100/50 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-blue-800 opacity-70 mb-1 leading-tight uppercase tracking-wider">Active Zones</p>
                            <p className="text-2xl font-black text-blue-600">8</p>
                            <p className="text-[10px] font-bold text-blue-400">All monitored</p>
                        </div>
                        <div className="p-5 rounded-xl bg-red-50 border border-red-100/50 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-red-800 opacity-70 mb-1 leading-tight uppercase tracking-wider">Alerts</p>
                            <p className="text-2xl font-black text-red-600">0</p>
                            <p className="text-[10px] font-bold text-red-400">Needs attention</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {ZONE_BREAKDOWN.map((zone) => {
                            const usagePct = (zone.usage / zone.capacity) * 100;
                            const isHigh = usagePct > 75;
                            return (
                                <div key={zone.id} className="p-6 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all hover:bg-slate-50/50 group bg-white flex flex-col md:flex-row gap-6">
                                    {/* Left Rectangle: Info */}
                                    <div className="flex-1 min-w-[200px]">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-lg font-black text-slate-800 leading-tight">{zone.name}</h4>
                                            <div className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${isHigh
                                                ? 'bg-orange-50 border-orange-100 text-orange-600'
                                                : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                                }`}>
                                                {isHigh ? 'HIGH' : 'OK'}
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 mb-4">{zone.devices} DEVICES</p>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            {zone.trend === 'up' ? <ArrowUpRight size={14} className={isHigh ? "text-orange-500" : "text-emerald-500"} /> : <ArrowDownRight size={14} className="text-emerald-500" />}
                                            <span className="text-[10px] font-black uppercase">Trend: {zone.trend}</span>
                                        </div>
                                    </div>

                                    {/* Right Rectangle: Usage & Action */}
                                    <div className="flex-1 border-l border-slate-100 pl-6 flex flex-col justify-between">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-3xl font-black text-slate-900">{zone.usage}</span>
                                                <span className="text-[10px] font-bold text-slate-400">/ {zone.capacity} kWh</span>
                                            </div>
                                            <div className="relative mb-1">
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${usagePct}%` }}
                                                        className={`h-full ${isHigh ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[9px] font-bold text-right text-slate-400 uppercase tracking-tighter">{usagePct.toFixed(1)}% CAPACITY</p>
                                        </div>

                                        <Button
                                            className="w-full h-10 rounded-lg text-xs font-black transition-all shadow-sm bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
                                        >
                                            <Settings size={14} />
                                            OPTIMIZE
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

        </div>
    );
}

function StatCard({ title, value, subtext, icon, trend }: any) {
    return (
        <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white relative overflow-hidden group min-h-[220px]">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                    {icon}
                </div>
                {trend === 'live' && (
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg flex items-center gap-2 border border-emerald-100">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider">LIVE</span>
                    </div>
                )}
                {trend === 'up' && (
                    <div className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1">
                        <ArrowUpRight size={12} /> UP
                    </div>
                )}
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-2 group-hover:scale-105 transition-transform origin-left">{value}</h3>
            <p className="text-base font-bold text-slate-400 mb-1">{title}</p>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{subtext}</p>
        </Card>
    );
}

function MetricBadge({ label, value, unit, color, bg }: any) {
    return (
        <div className={`${bg} ${color} p-6 rounded-xl border border-white/50 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 min-h-[140px] flex flex-col justify-center`}>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
            <p className="text-3xl font-black leading-none mb-2">{value}</p>
            <p className="text-[10px] font-bold text-slate-400">{unit}</p>
        </div>
    );
}

function Pause({ size, className }: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
        </svg>
    );
}
