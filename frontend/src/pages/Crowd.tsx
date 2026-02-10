import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, AlertTriangle, ArrowUpRight, Activity, Map, TrendingUp, ShieldAlert, Navigation } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { motion } from 'framer-motion';

export default function Crowd() {
    const [zones, setZones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const predictionData = [
        { time: '10:00', count: 1200 },
        { time: '11:00', count: 3500 },
        { time: '12:00', count: 15000 },
        { time: '13:00', count: 22000 },
        { time: '14:00', count: 21000 },
        { time: '15:00', count: 18000 },
    ];

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await axios.get('/crowd/');
                setZones(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchZones();
        const interval = setInterval(fetchZones, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="flex items-center justify-center h-[60vh]">Interpreting Crowd Dynamics...</div>;

    const totalAttendance = zones.reduce((acc, z) => acc + z.current_count, 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Crowd Intelligence</h1>
                    <p className="text-slate-500">AI-powered flow optimization and zone monitoring</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl border-slate-200">
                        <Navigation size={16} className="mr-2" />
                        Evacuation Mode
                    </Button>
                    <Button className="rounded-xl bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200">
                        <Activity size={16} className="mr-2" />
                        Live Monitoring
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white group">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <Users size={24} />
                            </div>
                            <span className="text-blue-500 flex items-center text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                                LIVE
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Attendance</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">{totalAttendance.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium flex items-center">
                            <ArrowUpRight size={14} className="mr-1 text-emerald-500" /> +12% from last update
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white group">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                <AlertTriangle size={24} />
                            </div>
                            <span className="text-red-500 flex items-center text-xs font-bold bg-red-50 px-2 py-1 rounded-full animate-pulse">
                                CRITICAL
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Congestion Zones</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">{zones.filter(z => z.status === 'red').length} Active</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">South Stand & East Wing Alpha</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-purple-900 text-white">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <TrendingUp className="text-purple-300" />
                            <h4 className="font-bold text-lg">AI Flow Optimization</h4>
                        </div>
                        <p className="text-purple-100 text-sm leading-relaxed mb-6">
                            Redirection suggested for South Stand. Opening Overflow Gate B in 5 minutes will reduce pressure by **18%**.
                        </p>
                        <Button className="w-full bg-white text-purple-900 hover:bg-purple-50 font-bold rounded-xl h-11">
                            Execute Protocol
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Heatmap Simulation */}
                <Card className="lg:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Real-Time Capacity Heatmap</CardTitle>
                                <CardDescription>Zone-by-zone occupancy visualizer</CardDescription>
                            </div>
                            <div className="flex gap-1">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {zones.map((zone, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-6 rounded-[2rem] border-2 flex justify-between items-center transition-all duration-300 hover:shadow-lg ${zone.status === 'red' ? 'bg-red-50/50 border-red-100' :
                                        zone.status === 'yellow' ? 'bg-amber-50/50 border-amber-100' : 'bg-emerald-50/50 border-emerald-100'
                                        }`}
                                >
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800">{zone.name}</h4>
                                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase">
                                            <Activity size={12} /> {zone.current_count} / {zone.capacity}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-2xl font-black text-sm ${zone.status === 'red' ? 'text-red-600 bg-red-100' :
                                        zone.status === 'yellow' ? 'text-amber-600 bg-amber-100' : 'text-emerald-600 bg-emerald-100'
                                        }`}>
                                        {Math.round((zone.current_count / zone.capacity) * 100)}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={zones}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="current_count" radius={[12, 12, 0, 0]} barSize={40}>
                                        {zones.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.status === 'red' ? '#ef4444' : entry.status === 'yellow' ? '#f59e0b' : '#10b981'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Prediction */}
                <div className="space-y-8">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white p-6">
                        <CardHeader className="px-0">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldAlert className="text-orange-500" /> AI Attendance Forecast
                            </CardTitle>
                        </CardHeader>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={predictionData}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
                        <div className="p-4 bg-white/10 rounded-2xl inline-block mb-6">
                            <Map className="text-orange-400" size={32} />
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tight">Access Points</h3>
                        <div className="space-y-4">
                            {[
                                { name: "North Gate A", status: "Active" },
                                { name: "South Gate B", status: "Redirecting" },
                                { name: "East VIP", status: "Active" }
                            ].map((gate, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                                    <span className="text-sm font-bold text-slate-300">{gate.name}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${gate.status === 'Active' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                        {gate.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-8 text-white hover:bg-white/10 font-bold rounded-xl border border-white/10 h-11">
                            Live Camera Feeds
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
