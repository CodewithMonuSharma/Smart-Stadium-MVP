import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Activity, TrendingDown, Leaf, Lightbulb, ArrowDownRight, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Energy() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/energy/');
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !data) return <div className="flex items-center justify-center h-[60vh]">Loading Energy Data...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Energy & Sustainability</h1>
                    <p className="text-slate-500">AI-optimized power distribution and carbon tracking</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200 rounded-xl">Generate Report</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">Optimize Usage</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                                <Zap size={24} />
                            </div>
                            <span className="text-emerald-500 flex items-center text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
                                <ArrowDownRight size={14} className="mr-1" /> 12%
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Current Load</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{data.summary.total_usage} kW</p>
                        <p className="text-xs text-slate-400 mt-2">Real-time consumption</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                                <TrendingDown size={24} />
                            </div>
                            <span className="text-blue-500 flex items-center text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                                SAVING
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Projected Savings</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">$4,820</p>
                        <p className="text-xs text-slate-400 mt-2">Monthly forecast</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                                <Leaf size={24} />
                            </div>
                            <span className="text-amber-500 flex items-center text-xs font-bold bg-amber-50 px-2 py-1 rounded-full">
                                AI ADAPT
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Sustainability Score</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">92/100</p>
                        <p className="text-xs text-slate-400 mt-2">Carbon efficiency rating</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-900 rounded-xl text-white">
                                <Activity size={24} />
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Grid Health</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">STABLE</p>
                        <p className="text-xs text-slate-400 mt-2">All systems normal</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-50">
                        <CardTitle className="text-lg">Power Consumption Analysis</CardTitle>
                        <CardDescription>Live usage vs AI future predictions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.history}>
                                    <defs>
                                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPredict" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="usage"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorUsage)"
                                        name="Current Usage (kW)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="prediction"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        fillOpacity={1}
                                        fill="url(#colorPredict)"
                                        name="AI Forecast (kW)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Recommendations */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Lightbulb size={24} />
                                </div>
                                <h3 className="text-xl font-bold">AI Recommendations</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <CheckCircle size={18} className="shrink-0 mt-1 opacity-80" />
                                    <p className="text-sm">Dim non-critical concourse lighting by 20% between events to save 150 kWh/day.</p>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle size={18} className="shrink-0 mt-1 opacity-80" />
                                    <p className="text-sm">Pre-cool Zone B starting 10:00 AM to avoid peak grid pricing at 1:00 PM.</p>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle size={18} className="shrink-0 mt-1 opacity-80" />
                                    <p className="text-sm">Shift maintenance recharge cycles to nighttime 12 AM - 4 AM window.</p>
                                </li>
                            </ul>
                            <Button className="w-full mt-8 bg-white text-emerald-700 hover:bg-emerald-50 font-bold">Apply All Insights</Button>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Active Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {data.meters.map((meter: any) => (
                                <div key={meter.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                            <Activity size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{meter.zone}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">{meter.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-600">{meter.current_reading} kW</p>
                                        <span className="text-[10px] text-slate-400">Stable</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
