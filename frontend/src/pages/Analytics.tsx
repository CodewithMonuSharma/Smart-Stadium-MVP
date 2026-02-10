import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Calendar, Download, Activity,
    Shield, Globe
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, PieChart, Pie
} from 'recharts';

export default function Analytics() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const performanceData = [
        { name: 'Mon', revenue: 4200, users: 2400 },
        { name: 'Tue', revenue: 3800, users: 1398 },
        { name: 'Wed', revenue: 5600, users: 9800 },
        { name: 'Thu', revenue: 4900, users: 3908 },
        { name: 'Fri', revenue: 7200, users: 4800 },
        { name: 'Sat', revenue: 9800, users: 12000 },
        { name: 'Sun', revenue: 8400, users: 11000 },
    ];

    const trafficSources = [
        { name: 'Mobile App', value: 45, color: '#8b5cf6' },
        { name: 'Web Portal', value: 30, color: '#3b82f6' },
        { name: 'On-site Kiosk', value: 15, color: '#10b981' },
        { name: 'API Partner', value: 10, color: '#f59e0b' },
    ];

    if (loading) return <div className="flex items-center justify-center h-[60vh]">Compiling Systems Analytics...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Analytics</h1>
                    <p className="text-slate-500">Global performance metrics and AI traffic analysis</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 7 Days
                    </Button>
                    <Button className="rounded-xl bg-slate-900 border hover:bg-slate-800 text-white shadow-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Traffic Overview */}
                <Card className="md:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Session Growth</CardTitle>
                            <CardDescription>Engagement metrics across all digital platforms</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                                <span className="text-[10px] font-bold text-purple-700 uppercase">Users</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Sources Card */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Channel Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={trafficSources}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {trafficSources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3 mt-4">
                            {trafficSources.map((s, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                                        <span className="text-sm text-slate-600">{s.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{s.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* System Efficiency */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-slate-900 text-white">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/10 rounded-2xl">
                                <Shield className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Network Security</h3>
                                <p className="text-slate-400 text-xs">Edge protection active</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Threat Mitigation</span>
                                    <span className="text-emerald-400 font-bold">100%</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full">
                                    <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">System Uptime</span>
                                    <span className="text-purple-400 font-bold">99.98%</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full">
                                    <div className="bg-purple-500 h-full rounded-full w-[99.9%]"></div>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-8 bg-white text-slate-900 hover:bg-slate-100 font-bold h-11">
                            Run Full Audit
                        </Button>
                    </CardContent>
                </Card>

                {/* Real-Time Metrics */}
                <Card className="md:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
                        <CardTitle className="text-lg">Real-Time Terminal Logs</CardTitle>
                        <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold animate-pulse">
                            <Globe size={12} /> LIVE STREAM
                        </span>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50">
                            {[
                                { event: 'API Authentication Success', source: 'Kiosk-7', status: 'secure', time: '12:45:01' },
                                { event: 'Occupancy Threshold Reached', source: 'Zone-A', status: 'warning', time: '12:44:59' },
                                { event: 'Ticket SKU UpdateSync', source: 'Store-DB', status: 'secure', time: '12:44:52' },
                                { event: 'Energy Optimization Wave', source: 'AI-Core', status: 'info', time: '12:44:48' },
                                { event: 'New Session Initialized', source: 'Mobile-App', status: 'secure', time: '12:44:35' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-1.5 rounded-lg ${log.status === 'secure' ? 'bg-emerald-50 text-emerald-500' :
                                            log.status === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                                            }`}>
                                            <Activity size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{log.event}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">Source: {log.source}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-400">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
