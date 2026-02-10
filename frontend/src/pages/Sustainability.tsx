import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Droplets, Wind, Sun, Trash2, Recycle, Award, ArrowRight, Activity } from 'lucide-react';
import { ResponsiveContainer, XAxis, Tooltip, AreaChart, Area } from 'recharts';

export default function Sustainability() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const carbonData = [
        { month: 'Sep', footprint: 450, offset: 120 },
        { month: 'Oct', footprint: 420, offset: 150 },
        { month: 'Nov', footprint: 380, offset: 180 },
        { month: 'Dec', footprint: 350, offset: 210 },
        { month: 'Jan', footprint: 310, offset: 250 },
        { month: 'Feb', footprint: 280, offset: 290 },
    ];

    if (loading) return <div className="flex items-center justify-center h-[60vh]">Measuring Environmental Impact...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sustainability Hub</h1>
                    <p className="text-slate-500">Zero-carbon stadium initiatives and environmental tracking</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <Award className="text-emerald-600" size={20} />
                    <span className="text-sm font-bold text-emerald-700">Gold Status: Top 1% Sustainable Arena</span>
                </div>
            </div>

            {/* Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white overflow-hidden group">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                    <Leaf size={32} />
                                </div>
                                <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">-24% YoY</span>
                            </div>
                            <h3 className="text-slate-900 text-2xl font-bold">Carbon Footprint</h3>
                            <p className="text-slate-500 text-sm mt-2">Annual CO2 emissions reduction targets</p>
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Current Offset</p>
                                <p className="text-4xl font-black text-slate-900 mt-1">1,240 <span className="text-lg font-bold text-slate-400">Tons</span></p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white overflow-hidden group">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    <Droplets size={32} />
                                </div>
                                <span className="text-blue-500 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">+18% Recycled</span>
                            </div>
                            <h3 className="text-slate-900 text-2xl font-bold">Water Recovery</h3>
                            <p className="text-slate-500 text-sm mt-2">Rainwater harvesting and greywater reuse</p>
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Daily Savings</p>
                                <p className="text-4xl font-black text-slate-900 mt-1">45.8 <span className="text-lg font-bold text-slate-400">kL</span></p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white p-6">
                        <CardHeader className="px-0">
                            <CardTitle className="text-lg">Decarbonization Roadmap</CardTitle>
                        </CardHeader>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={carbonData}>
                                    <defs>
                                        <linearGradient id="colorFootprint" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="footprint" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFootprint)" name="CO2 Emissions" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={10} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
                        <h3 className="text-2xl font-extrabold mb-4">Green Energy Mix</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Solar Array', value: 65, icon: <Sun size={18} />, color: 'bg-amber-400' },
                                { label: 'Wind Credits', value: 20, icon: <Wind size={18} />, color: 'bg-blue-400' },
                                { label: 'Grid Renewable', value: 15, icon: <Activity size={18} />, color: 'bg-emerald-400' },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            {s.icon}
                                            <span className="text-sm font-bold text-slate-300">{s.label}</span>
                                        </div>
                                        <span className="text-sm font-bold">{s.value}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className={`${s.color} h-full rounded-full`} style={{ width: `${s.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white p-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 z-0"></div>
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Recycle className="text-emerald-600" /> Waste Management
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                            <Trash2 size={18} />
                                        </div>
                                        <span className="font-bold text-slate-700">Compostable</span>
                                    </div>
                                    <span className="text-sm font-black text-emerald-600">8.2 Tons</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-200 rounded-lg text-slate-500">
                                            <Recycle size={18} />
                                        </div>
                                        <span className="font-bold text-slate-700">Recyclables</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-600">12.4 Tons</span>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full mt-6 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold rounded-xl group">
                                View Full Audit <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
