import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    AlertTriangle,
    MapPin,
    Bell,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle,
    AlertOctagon,
    Zap,
    Clock,
    Pause,
    Shield,
    Megaphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const INITIAL_ZONES = [
    { id: 'north', name: 'North Stand', capacity: 3000, current: 2010, status: 'MODERATE', trend: 'up' }, // 67%
    { id: 'south', name: 'South Stand', capacity: 3000, current: 1680, status: 'MODERATE', trend: 'stable' }, // 56%
    { id: 'east', name: 'East Stand', capacity: 2500, current: 1275, status: 'MODERATE', trend: 'down' }, // 51%
    { id: 'west', name: 'West Stand', capacity: 2500, current: 1800, status: 'MODERATE', trend: 'up' }, // 72%
    { id: 'vip', name: 'VIP Section', capacity: 500, current: 105, status: 'LOW', trend: 'stable' }, // 21%
    { id: 'concourse_a', name: 'Concourse A', capacity: 1000, current: 400, status: 'LOW', trend: 'up' }, // 40%
    { id: 'concourse_b', name: 'Concourse B', capacity: 1000, current: 650, status: 'MODERATE', trend: 'stable' }, // 65%
    { id: 'gate_a', name: 'Gate A', capacity: 500, current: 405, status: 'HIGH', trend: 'up' }, // 81%
    { id: 'gate_b', name: 'Gate B', capacity: 500, current: 290, status: 'MODERATE', trend: 'stable' }, // 58%
];

const INITIAL_ALERTS = [
    { id: 1, location: 'West Stand', level: 'HIGH', message: 'Density exceeds 90% - Immediate action required', time: '12:48:30', action: 'Redirect to Gate B', status: 'new' },
    { id: 2, location: 'Gate A', level: 'MEDIUM', message: 'Slow movement detected - Queue forming', time: '12:46:20', action: 'Open additional lanes', status: 'new' },
    { id: 3, location: 'Concourse B', level: 'MEDIUM', message: 'Approaching capacity threshold', time: '12:44:10', action: 'Deploy staff', status: 'new' },
];

const PREDICTIONS = [
    { time: '15 min', location: 'West Stand', prediction: '95%', confidence: 87, suggestion: 'Open Gate C to distribute crowd' },
    { time: '30 min', location: 'Concourse A', prediction: '90%', confidence: 83, suggestion: 'Increase staff presence' },
    { time: '45 min', location: 'Gate A', prediction: '90%', confidence: 79, suggestion: 'Prepare additional entry lanes' },
    { time: '60 min', location: 'North Stand', prediction: '82%', confidence: 76, suggestion: 'Monitor flow rate' },
];

const SUGGESTED_ACTIONS = [
    { id: 1, type: 'REDIRECT', title: 'Reroute Sector 4', desc: 'Redirect incoming traffic to Gate C', impact: 'High', status: 'pending' },
    { id: 2, type: 'DEPLOY', title: 'Deploy Security', desc: 'Send 2 units to Concourse A', impact: 'Medium', status: 'pending' },
    { id: 3, type: 'ANNOUNCE', title: 'PA Announcement', desc: 'Play "Please move to center" msg', impact: 'Low', status: 'pending' },
];

export default function Crowd() {
    const [zones, setZones] = useState(INITIAL_ZONES);
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);
    const [activeTab, setActiveTab] = useState('predictions');
    const [isLive, setIsLive] = useState(true);
    const [actions, setActions] = useState(SUGGESTED_ACTIONS);

    // Simulation Effect
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            setZones(prevZones => prevZones.map(zone => {
                const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
                const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + change));

                // Update trend
                let newTrend = zone.trend;
                if (change > 5) newTrend = 'up';
                else if (change < -5) newTrend = 'down';
                else newTrend = 'stable';

                // Update status based on new percentage
                const pct = (newCurrent / zone.capacity) * 100;
                let newStatus = 'LOW';
                if (pct >= 90) newStatus = 'CRITICAL';
                else if (pct >= 75) newStatus = 'HIGH';
                else if (pct >= 50) newStatus = 'MODERATE';

                return { ...zone, current: newCurrent, trend: newTrend, status: newStatus };
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, [isLive]);

    // Derived Stats
    const totalPeople = zones.reduce((acc, z) => acc + z.current, 0);
    const totalCapacity = zones.reduce((acc, z) => acc + z.capacity, 0);
    const occupancyRate = ((totalPeople / totalCapacity) * 100).toFixed(1);
    const activeZonesCount = zones.length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CRITICAL': return 'bg-red-500 shadow-xl shadow-red-200';
            case 'HIGH': return 'bg-orange-500 shadow-xl shadow-orange-200';
            case 'MODERATE': return 'bg-yellow-400 shadow-xl shadow-yellow-200';
            case 'LOW': return 'bg-emerald-500 shadow-xl shadow-emerald-200';
            default: return 'bg-slate-300';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'CRITICAL': return 'text-red-600';
            case 'HIGH': return 'text-orange-600';
            case 'MODERATE': return 'text-yellow-600';
            case 'LOW': return 'text-emerald-600';
            default: return 'text-slate-600';
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'CRITICAL': return 'bg-red-50';
            case 'HIGH': return 'bg-orange-50';
            case 'MODERATE': return 'bg-yellow-50';
            case 'LOW': return 'bg-emerald-50';
            default: return 'bg-slate-50';
        }
    };

    const handleAction = (id: number) => {
        setActions(prev => prev.map(a =>
            a.id === id ? { ...a, status: 'executed' } : a
        ));
    };

    const handleMonitorAlert = (id: number) => {
        setAlerts(prev => prev.map(a =>
            a.id === id ? { ...a, status: 'monitoring' } : a
        ));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 p-6 bg-orange-50/30 min-h-screen font-['Outfit']">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight text-orange-950">Crowd Management System</h1>
                    <p className="text-slate-500 mt-2 text-lg">Real-time crowd flow prediction and monitoring</p>
                </div>
                <div>
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-full shadow-lg transition-all hover:scale-105 ${isLive ? 'bg-emerald-500 shadow-emerald-200 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                        {isLive ? (
                            <>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                <span className="font-bold tracking-wide text-sm">LIVE MONITORING</span>
                            </>
                        ) : (
                            <>
                                <Pause size={16} />
                                <span className="font-bold tracking-wide text-sm">PAUSED</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total People"
                    value={totalPeople.toLocaleString()}
                    subtext="↑ Live"
                    icon={<Users size={24} className="text-orange-600" />}
                    accent="border-l-4 border-orange-500"
                    trend="up"
                />
                <StatCard
                    title="Occupancy Rate"
                    value={`${occupancyRate}%`}
                    subtext="81.9% capacity"
                    icon={<Activity size={24} className="text-blue-600" />}
                    accent="border-l-4 border-blue-500"
                    trend="stable"
                />
                <StatCard
                    title="Active Zones"
                    value={activeZonesCount}
                    subtext="All zones operational"
                    icon={<MapPin size={24} className="text-emerald-600" />}
                    accent="border-l-4 border-emerald-500"
                    trend="stable"
                />
                <StatCard
                    title="Active Alerts"
                    value={alerts.length}
                    subtext="Requires attention"
                    icon={<Bell size={24} className="text-red-600" />}
                    accent="border-l-4 border-red-500"
                    isAlert={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Heatmap Section */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-8 border-0 shadow-xl shadow-slate-200/40 rounded-3xl bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live Density Heatmap</h3>
                                <p className="text-base text-slate-500 mt-1">Real-time crowd distribution across stadium zones</p>
                            </div>

                            {/* Auto Updating Badge */}
                            <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-bold text-emerald-700">Auto-updating</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500 mb-6">
                            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-emerald-500"></span> Low (0-50%)</div>
                            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-yellow-400"></span> Moderate (50-75%)</div>
                            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-orange-500"></span> High (75-90%)</div>
                            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-md bg-red-500"></span> Critical (90-100%)</div>
                        </div>

                        {/* Schematic Map Container */}
                        <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] bg-slate-100/50 rounded-3xl p-6 lg:p-10 border border-slate-100">

                            {/* Map Grid */}
                            <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-6">

                                {/* West Stand (Left) */}
                                {(() => {
                                    const zone = zones.find(z => z.id === 'west') || zones[0];
                                    const pct = Math.round((zone.current / zone.capacity) * 100);

                                    return (
                                        <div className={`col-span-3 row-span-6 rounded-3xl flex flex-col items-center justify-center text-white relative group cursor-pointer hover:scale-[1.02] transition-transform ${getStatusColor(zone.status)}`}>
                                            <span className="font-bold text-lg lg:text-xl mb-1 text-center leading-tight opacity-90">{zone.name}</span>
                                            <span className="text-4xl lg:text-6xl font-black tracking-tighter">{pct}%</span>

                                            {/* Gate A Attached */}
                                            {(() => {
                                                const gate = zones.find(z => z.id === 'gate_a') || zones[0];
                                                const gatePct = Math.round((gate.current / gate.capacity) * 100);
                                                return (
                                                    <div className={`absolute -left-3 bottom-1/4 translate-y-1/2 p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[80px] z-10 border-2 border-white/20 ${getStatusColor(gate.status)}`}>
                                                        <span className="text-[10px] font-bold uppercase opacity-90">Gate A</span>
                                                        <span className="text-xl font-black">{gatePct}%</span>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                })()}

                                {/* Middle Column Group */}
                                <div className="col-span-6 row-span-6 flex flex-col gap-4">

                                    {/* North Stand */}
                                    {(() => {
                                        const zone = zones.find(z => z.id === 'north') || zones[0];
                                        const pct = Math.round((zone.current / zone.capacity) * 100);
                                        return (
                                            <div className={`h-1/4 rounded-3xl flex flex-col items-center justify-center text-white relative group cursor-pointer hover:scale-[1.02] transition-transform ${getStatusColor(zone.status)}`}>
                                                <span className="font-bold text-base opacity-90">{zone.name}</span>
                                                <span className="text-3xl font-black leading-none">{pct}%</span>
                                            </div>
                                        );
                                    })()}

                                    {/* Playing Field Area */}
                                    <div className="flex-1 bg-emerald-100/30 border-2 border-emerald-100 border-dashed rounded-3xl relative flex items-center justify-center">

                                        {/* Concourses (Floating top) */}
                                        <div className="absolute -top-3 w-full flex justify-between px-4">
                                            {(() => {
                                                const cA = zones.find(z => z.id === 'concourse_a') || zones[0];
                                                const pctA = Math.round((cA.current / cA.capacity) * 100);
                                                return (
                                                    <div className={`px-4 py-2 rounded-xl shadow-lg text-white flex flex-col items-center ${getStatusColor(cA.status)}`}>
                                                        <span className="text-[10px] font-bold uppercase">Concourse A</span>
                                                        <span className="text-lg font-black">{pctA}%</span>
                                                    </div>
                                                );
                                            })()}
                                            {(() => {
                                                const cB = zones.find(z => z.id === 'concourse_b') || zones[0];
                                                const pctB = Math.round((cB.current / cB.capacity) * 100);
                                                return (
                                                    <div className={`px-4 py-2 rounded-xl shadow-lg text-white flex flex-col items-center ${getStatusColor(cB.status)}`}>
                                                        <span className="text-[10px] font-bold uppercase">Concourse B</span>
                                                        <span className="text-lg font-black">{pctB}%</span>
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        {/* Field Label */}
                                        <div className="text-emerald-300 font-black text-2xl uppercase tracking-widest absolute bottom-4">Playing Field</div>

                                        {/* VIP Section (Center) */}
                                        {(() => {
                                            const zone = zones.find(z => z.id === 'vip') || zones[0];
                                            const pct = Math.round((zone.current / zone.capacity) * 100);
                                            return (
                                                <div className={`w-3/4 py-4 rounded-2xl shadow-xl z-20 backdrop-blur-md bg-opacity-95 flex flex-col items-center justify-center transition-all ${getStatusColor(zone.status)}`}>
                                                    <span className="text-[10px] font-black uppercase opacity-80 tracking-widest text-white">VIP Section</span>
                                                    <span className="text-3xl font-black text-white">{pct}%</span>
                                                </div>
                                            );
                                        })()}

                                    </div>

                                    {/* South Stand */}
                                    {(() => {
                                        const zone = zones.find(z => z.id === 'south') || zones[0];
                                        const pct = Math.round((zone.current / zone.capacity) * 100);
                                        return (
                                            <div className={`h-1/4 rounded-3xl flex flex-col items-center justify-center text-white relative group cursor-pointer hover:scale-[1.02] transition-transform ${getStatusColor(zone.status)}`}>
                                                <span className="font-bold text-base opacity-90">{zone.name}</span>
                                                <span className="text-3xl font-black leading-none">{pct}%</span>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* East Stand (Right) */}
                                {(() => {
                                    const zone = zones.find(z => z.id === 'east') || zones[0];
                                    const pct = Math.round((zone.current / zone.capacity) * 100);

                                    return (
                                        <div className={`col-span-3 row-span-6 rounded-3xl flex flex-col items-center justify-center text-white relative group cursor-pointer hover:scale-[1.02] transition-transform ${getStatusColor(zone.status)}`}>
                                            <span className="font-bold text-lg lg:text-xl mb-1 text-center leading-tight opacity-90">{zone.name}</span>
                                            <span className="text-4xl lg:text-6xl font-black tracking-tighter">{pct}%</span>

                                            {/* Gate B Attached */}
                                            {(() => {
                                                const gate = zones.find(z => z.id === 'gate_b') || zones[0];
                                                const gatePct = Math.round((gate.current / gate.capacity) * 100);
                                                return (
                                                    <div className={`absolute -right-3 bottom-1/4 translate-y-1/2 p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[80px] z-10 border-2 border-white/20 ${getStatusColor(gate.status)}`}>
                                                        <span className="text-[10px] font-bold uppercase opacity-90">Gate B</span>
                                                        <span className="text-xl font-black">{gatePct}%</span>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                })()}

                            </div>
                        </div>
                    </Card>

                    {/* Zone Monitor */}
                    <Card className="p-8 border-0 shadow-xl shadow-slate-200/40 rounded-3xl bg-white">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Zone Monitor</h3>
                                <p className="text-sm text-slate-500">Real-time capacity tracking by zone</p>
                            </div>
                            <div className="bg-slate-100 rounded-lg px-3 py-1 text-xs font-bold text-slate-500">
                                Updating every 2s
                            </div>
                        </div>

                        <div className="space-y-6">
                            {zones.map((zone) => {
                                const percentage = Math.round((zone.current / zone.capacity) * 100);
                                const isCritical = percentage >= 90;
                                const isHigh = percentage >= 75 && percentage < 90;

                                return (
                                    <div key={zone.id}>
                                        <div className="flex justify-between items-end mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${getStatusBg(zone.status)} ${getStatusText(zone.status)}`}>
                                                    <MapPin size={16} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-700 text-sm">{zone.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-medium">{zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} people</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-sm font-black ${getStatusText(zone.status)}`}>{percentage}%</div>
                                                {zone.trend === 'up' && <ArrowUpRight size={12} className="ml-auto text-red-500 animate-pulse" />}
                                                {zone.trend === 'down' && <ArrowDownRight size={12} className="ml-auto text-emerald-500 animate-pulse" />}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                className={`h-full rounded-full transition-all duration-1000 ${getStatusColor(zone.status)}`}
                                            />
                                        </div>
                                        {isCritical && (
                                            <p className="mt-1 text-[10px] font-bold text-red-500 flex items-center gap-1">
                                                <AlertOctagon size={10} /> Overcrowding detected - Redirect traffic
                                            </p>
                                        )}
                                        {isHigh && !isCritical && (
                                            <p className="mt-1 text-[10px] font-bold text-orange-500 flex items-center gap-1">
                                                <AlertTriangle size={10} /> Approaching capacity - Monitor closely
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Alerts & AI */}
                <div className="space-y-8">

                    {/* Active Alerts */}
                    <Card className="p-6 border-0 shadow-xl shadow-red-100/50 rounded-3xl bg-white border-t-4 border-red-500">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Active Alerts</h3>
                                <p className="text-sm text-slate-500">Real-time overcrowding & safety</p>
                            </div>
                            <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-1 rounded-lg">{alerts.length}</span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence>
                                {alerts.map(alert => (
                                    <motion.div
                                        key={alert.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`p-4 rounded-2xl border transition-all ${alert.status === 'monitoring' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${alert.level === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {alert.location}
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase ${alert.level === 'HIGH' ? 'text-red-500' : 'text-orange-500'}`}>
                                                {alert.level}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-1 leading-tight">{alert.message}</h4>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-3">
                                            <Clock size={10} /> {alert.time}
                                            {alert.status === 'monitoring' && <span className="text-indigo-600 font-bold ml-2">• Monitoring Active</span>}
                                        </div>

                                        <div className="bg-white p-3 rounded-xl border border-slate-100 mb-3">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Action:</p>
                                            <p className="text-xs font-bold text-slate-700">{alert.action}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-8 text-xs font-bold"
                                                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                                            >
                                                <CheckCircle size={12} className="mr-1.5" /> Resolve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={alert.status === 'monitoring' ? 'default' : 'outline'}
                                                className={`rounded-xl h-8 text-xs font-bold ${alert.status === 'monitoring' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border-slate-200 text-slate-500'}`}
                                                onClick={() => handleMonitorAlert(alert.id)}
                                            >
                                                <Activity size={12} className="mr-1.5" /> Monitor
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {alerts.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    <CheckCircle size={32} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-sm">All clear - No active alerts</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* AI Flow Prediction */}
                    <Card className="p-6 border-0 shadow-xl shadow-slate-200/40 rounded-3xl bg-white">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900">AI Flow Prediction</h3>
                            <p className="text-sm text-slate-500">Predictive analytics for crowd movement</p>
                        </div>

                        <div className="flex gap-2 mb-6 p-1 bg-slate-50 rounded-xl">
                            <button
                                onClick={() => setActiveTab('predictions')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'predictions' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Predictions
                            </button>
                            <button
                                onClick={() => setActiveTab('actions')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'actions' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Actions
                            </button>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500 text-white rounded-lg">
                                    <Zap size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-indigo-900">AI Engine Active</p>
                                    <p className="text-[10px] text-indigo-600">Analyzing crowd patterns</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Learning
                            </span>
                        </div>

                        <div className="space-y-4">
                            {activeTab === 'predictions' ? (
                                PREDICTIONS.map((pred, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-1.5 py-0.5 rounded">{pred.time}</span>
                                                <span className="text-sm font-bold text-slate-700">{pred.location}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-black text-red-500">{pred.prediction}</span>
                                                <span className="block text-[8px] font-bold text-slate-400 uppercase">Expected</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                                            <span>Confidence Level</span>
                                            <span>{pred.confidence}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full mb-3 overflow-hidden">
                                            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pred.confidence}%` }}></div>
                                        </div>

                                        <div className="bg-orange-50 border border-orange-100 p-2 rounded-xl flex items-start gap-2">
                                            <Activity size={12} className="text-orange-500 mt-0.5 shrink-0" />
                                            <p className="text-xs font-medium text-slate-600 leading-tight">{pred.suggestion}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                actions.map((action) => (
                                    <motion.div
                                        key={action.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`p-3 rounded-2xl border ${action.status === 'executed' ? 'bg-emerald-50 border-emerald-100 opacity-70' : 'bg-white border-slate-100'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                                                    {action.type === 'REDIRECT' && <Shield size={12} />}
                                                    {action.type === 'DEPLOY' && <Users size={12} />}
                                                    {action.type === 'ANNOUNCE' && <Megaphone size={12} />}
                                                </span>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800">{action.title}</h4>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{action.type}</span>
                                                </div>
                                            </div>
                                            {action.status === 'executed' ? (
                                                <span className="text-emerald-600 text-[10px] font-black uppercase flex items-center gap-1">
                                                    <CheckCircle size={10} /> Done
                                                </span>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    className="h-7 px-3 text-[10px] font-bold bg-slate-900 border-0"
                                                    onClick={() => handleAction(action.id)}
                                                >
                                                    Execute
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mb-2 pl-9">{action.desc}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtext, icon, accent, isAlert, trend }: any) {
    return (
        <Card className={`p-6 border-0 shadow-lg rounded-2xl bg-white relative overflow-hidden group ${accent}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        {isAlert && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                        {trend === 'up' && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">↑ Live</span>}
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                    </div>
                    <h3 className={`text-3xl font-black ${isAlert ? 'text-red-600' : 'text-slate-900'} group-hover:scale-105 transition-transform origin-left`}>{value}</h3>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all">
                    {icon}
                </div>
            </div>
            <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                {subtext}
            </p>
        </Card>
    );
}
