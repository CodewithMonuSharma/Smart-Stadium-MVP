import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Bar, Line, ComposedChart, PieChart, Pie, Cell, BarChart
} from 'recharts';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

// Mock Data matching the clean aesthetic from the reference
const salesGrowthData = [
    { month: 'Oct', segmentA: 1000, segmentB: 1100, segmentC: 980 },
    { month: 'Nov', segmentA: 1180, segmentB: 1200, segmentC: 1000 },
    { month: 'Dec', segmentA: 1250, segmentB: 1220, segmentC: 1090 },
];

const salesPerRepData = [
    { name: 'Jan', repA: 1600, repB: 2000, repC: 1700, target: 1400 },
    { name: 'Feb', repA: 1300, repB: 1600, repC: 1400, target: 1200 },
    { name: 'Mar', repA: 1000, repB: 2200, repC: 1900, target: 1300 },
];

const ticketSalesData = [
    { name: 'Standard', value: 400 },
    { name: 'VIP', value: 300 },
    { name: 'Premium', value: 300 },
    { name: 'Student', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const hourlyTrafficData = [
    { hour: '10am', visitors: 1200 },
    { hour: '12pm', visitors: 3000 },
    { hour: '2pm', visitors: 4500 },
    { hour: '4pm', visitors: 3800 },
    { hour: '6pm', visitors: 5200 },
    { hour: '8pm', visitors: 4100 },
];

export default function Dashboard() {
    const [filter, setFilter] = useState({
        dateRange: 'This Month',
        serviceType: 'All',
        zoneType: 'All'
    });

    const [stats, setStats] = useState<any>({
        active_events: 12,
        occupancy_percentage: 87,
        system_health: 98,
        ticketing: { total_sold: 2104, fraud_alerts: 5 },
        crowd: { critical_zones: 2 },
        energy: { total_usage: 1553 },
        merchandise: { total_revenue: 8290 }
    });

    const [loading, setLoading] = useState(false);

    // Multipliers for filter simulation
    const dateMultipliers: Record<string, number> = {
        'This Month': 1,
        'Last Month': 0.85,
        'Last Quarter': 2.5,
        'This Year': 10.2
    };

    const serviceMultipliers: Record<string, number> = {
        'All': 1,
        'Ticketing': 1.2,
        'Merch': 0.8,
        'Food & Bev': 0.7
    };

    // Calculate dynamic stats
    const multiplier = dateMultipliers[filter.dateRange] * serviceMultipliers[filter.serviceType];

    const displayStats = {
        ...stats,
        ticketing: {
            ...stats.ticketing,
            total_sold: Math.round(stats.ticketing.total_sold * multiplier)
        },
        energy: {
            ...stats.energy,
            total_usage: Math.round(stats.energy.total_usage * multiplier)
        },
        merchandise: {
            ...stats.merchandise,
            total_revenue: Math.round(stats.merchandise.total_revenue * multiplier)
        },
        occupancy_percentage: filter.zoneType === 'VIP Area' ? 95 :
            filter.zoneType === 'North Zone' ? 82 :
                filter.zoneType === 'South Zone' ? 78 : 87
    };

    // Filter chart data
    const filteredGrowthData = salesGrowthData.map(d => ({
        ...d,
        segmentA: (filter.zoneType === 'All' || filter.zoneType === 'North Zone' ? d.segmentA * multiplier : 0),
        segmentB: (filter.zoneType === 'All' || filter.zoneType === 'VIP Area' ? d.segmentB * multiplier : 0),
        segmentC: (filter.zoneType === 'All' || filter.zoneType === 'South Zone' ? d.segmentC * multiplier : 0),
    }));

    const filteredCategoryData = salesPerRepData.map(d => ({
        ...d,
        repA: d.repA * multiplier,
        repB: d.repB * multiplier,
        repC: d.repC * multiplier,
    }));

    const filteredTicketData = ticketSalesData.map(d => ({
        ...d,
        value: Math.round(d.value * multiplier)
    }));

    const filteredTrafficData = hourlyTrafficData.map(d => ({
        ...d,
        visitors: Math.round(d.visitors * multiplier)
    }));

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // In a real app, we would pass filters to the API:
                // axios.get('/dashboard-data', { params: filter })
                const res = await axios.get('/dashboard-data');
                if (res.data) setStats(res.data);
            } catch (err) {
                console.log("Using default mock data");
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };
        fetchDashboardData();
    }, [filter]);

    return (
        <div className={`min-h-screen bg-slate-50 p-8 font-['Outfit'] transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">

                        <div>
                            <h1 className="text-3xl font-black text-[#1e40af] tracking-tight">Stadium Operational Dashboard</h1>
                            <p className="text-slate-500 text-sm font-medium mt-1">Real-time overview of {stats.active_events} active events</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm z-20">
                        <FilterButton
                            label="Auto date range"
                            value={filter.dateRange}
                            icon={<Calendar size={14} />}
                            options={['This Month', 'Last Month', 'Last Quarter', 'This Year']}
                            onChange={(val) => setFilter(prev => ({ ...prev, dateRange: val }))}
                        />
                        <FilterButton
                            label="Services"
                            value={filter.serviceType}
                            options={['All', 'Ticketing', 'Merch', 'Food & Bev']}
                            onChange={(val) => setFilter(prev => ({ ...prev, serviceType: val }))}
                        />
                        <FilterButton
                            label="Zones"
                            value={filter.zoneType}
                            options={['All', 'North Zone', 'South Zone', 'VIP Area']}
                            onChange={(val) => setFilter(prev => ({ ...prev, zoneType: val }))}
                        />
                    </div>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Tickets Sold"
                        value={displayStats.ticketing.total_sold.toLocaleString()}
                        trend="+20%"
                        isPositive={true}
                        subtext="vs previous 30 days"
                    />
                    <MetricCard
                        title="Avg. Occupancy"
                        value={`${displayStats.occupancy_percentage}%`}
                        trend="+15%"
                        isPositive={true}
                        subtext="vs previous 30 days"
                    />
                    <MetricCard
                        title="Energy Usage"
                        value={`${displayStats.energy.total_usage} kW`}
                        trend="+7.3%"
                        isPositive={true}
                        subtext="vs previous 30 days"
                    />
                    <MetricCard
                        title="Revenue Growth"
                        value={`${(displayStats.merchandise.total_revenue / 1000).toFixed(2)}%`}
                        trend="+1.3%"
                        isPositive={true}
                        subtext="vs previous 30 days"
                    />
                </div>

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Chart: Line Chart */}
                    <Card className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-700">Attendance Growth by Zone</h3>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={filteredGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="segmentA" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorA)" name="North Zone" />
                                    <Area type="monotone" dataKey="segmentB" stroke="#eab308" strokeWidth={3} fill="none" name="VIP" />
                                    <Area type="monotone" dataKey="segmentC" stroke="#a855f7" strokeWidth={3} fill="none" name="South Zone" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <LegendItem color="bg-blue-500" label="North Zone" />
                            <LegendItem color="bg-yellow-500" label="VIP" />
                            <LegendItem color="bg-purple-500" label="South Zone" />
                        </div>
                    </Card>

                    {/* Right Chart: Mixed Bar/Line */}
                    <Card className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-700">Revenue per Category</h3>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={filteredCategoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Bar dataKey="repA" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20} name="Merch" />
                                    <Bar dataKey="repB" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} name="Tickets" />
                                    <Bar dataKey="repC" fill="#1d4ed8" radius={[4, 4, 0, 0]} barSize={20} name="Food" />
                                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} dot={false} name="Target" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <LegendItem color="bg-blue-300" label="Merch" />
                            <LegendItem color="bg-blue-500" label="Tickets" />
                            <LegendItem color="bg-blue-800" label="Food" />
                            <LegendItem color="bg-red-500" label="Target" />
                        </div>
                    </Card>

                </div>

                {/* Additional Overview Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Donut Chart: Ticket Distribution */}
                    <Card className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white lg:col-span-1">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-700">Ticket Sales Distribution</h3>
                        </div>
                        <div className="h-[250px] flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={filteredTicketData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {ticketSalesData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black text-slate-800">1.2k</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {ticketSalesData.map((data, index) => (
                                <LegendItem key={data.name} color={`bg-[${COLORS[index]}]`} label={data.name} />
                            ))}
                        </div>
                    </Card>

                    {/* Bar Chart: Hourly Traffic */}
                    <Card className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white lg:col-span-2">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-700">Overall Hourly Traffic</h3>
                        </div>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={filteredTrafficData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Subcomponents for the dashboard

function FilterButton({ label, value, icon, options, onChange }: {
    label: string,
    value: string,
    icon?: React.ReactNode,
    options: string[],
    onChange: (val: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col px-4 py-1 cursor-pointer hover:bg-slate-50 transition-colors border-r last:border-r-0 border-slate-100">
            <div onClick={() => setIsOpen(!isOpen)} className="w-full">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    {icon} {label}
                </span>
                <span className="text-sm font-bold text-slate-700 flex items-center justify-between gap-2 min-w-[100px]">
                    {value}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[140px] bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            className={`px-4 py-2 text-sm font-medium hover:bg-slate-50 cursor-pointer ${value === opt ? 'text-purple-600 bg-purple-50' : 'text-slate-600'}`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}

            {/* Backdrop to close menu */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}

function MetricCard({ title, value, trend, isPositive, subtext }: any) {
    return (
        <Card className="p-8 rounded-3xl border border-slate-100 shadow-sm bg-white hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-slate-500 mb-4">{title}</h3>
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-800 tracking-tight">{value}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trend}
                </span>
                <span className="text-xs text-slate-400 font-medium">{subtext}</span>
            </div>
        </Card>
    );
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-xs font-bold text-slate-500">{label}</span>
        </div>
    );
}
