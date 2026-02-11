import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Download,
    Users,
    Heart,
    Play,
    ArrowLeftRight,
    AlertCircle,
    Clock,
    Database,
    Settings,
    Activity,
    Wifi,
    UserCheck,
    ChevronRight,
    LayoutDashboard,
    Bell,
    FileText,
    ShieldAlert,
    ExternalLink,
    CheckCircle2,
    XCircle,
    FileSearch,
    Clock3
} from 'lucide-react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const PERFORMANCE_DATA = [
    { time: '0h', value: 45 },
    { time: '1h', value: 52 },
    { time: '2h', value: 48 },
    { time: '3h', value: 70 },
    { time: '4h', value: 61 },
    { time: '5h', value: 38 },
    { time: '6h', value: 65 },
    { time: '7h', value: 42 },
    { time: '8h', value: 58 },
    { time: '9h', value: 50 },
    { time: '10h', value: 44 },
    { time: '11h', value: 55 },
    { time: '12h', value: 78 },
    { time: '13h', value: 85 },
    { time: '14h', value: 40 },
    { time: '15h', value: 62 },
    { time: '16h', value: 72 },
    { time: '17h', value: 54 },
    { time: '18h', value: 82 },
    { time: '19h', value: 49 },
    { time: '20h', value: 68 },
    { time: '21h', value: 57 },
    { time: '22h', value: 75 },
    { time: '23h', value: 63 },
];

const KPI_SPARKLINE_DATA = [
    { value: 40 }, { value: 30 }, { value: 45 }, { value: 50 }, { value: 35 },
    { value: 60 }, { value: 55 }, { value: 40 }, { value: 45 }, { value: 50 }
];

export default function Analytics() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [timeRange, setTimeRange] = useState('24H');
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-['Outfit'] pb-10 bg-slate-50/50 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 pt-6">
                <div>
                    <h1 className="text-4xl font-black text-[#1e40af] tracking-tight">Real-Time Analytics Hub</h1>
                    <p className="text-slate-500 font-medium mt-1">Comprehensive operational insights and reporting</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Data</span>
                    </div>
                    <Button
                        onClick={handleExport}
                        className="rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-11 flex items-center gap-2 shadow-lg shadow-blue-200 border-0 font-bold transition-all active:scale-95"
                    >
                        {isExporting ? (
                            <Activity className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm w-fit">
                {[
                    { id: 'Overview', icon: <LayoutDashboard size={18} /> },
                    { id: 'Alerts', icon: <Bell size={18} /> },
                    { id: 'Reports', icon: <FileText size={18} /> }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-[#2563eb] text-white shadow-md shadow-blue-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                    >
                        {tab.icon}
                        {tab.id}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'Overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* KPI Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { label: 'Active Users', value: '2,438.91', trend: '↓ 0.5%', trendColor: 'text-red-500', trendBg: 'bg-red-50', icon: <Users size={16} />, iconColor: 'text-blue-600', iconBg: 'bg-blue-50' },
                                { label: 'System Health', value: '99.65 %', trend: '↑ 1%', trendColor: 'text-emerald-500', trendBg: 'bg-emerald-50', icon: <Heart size={16} />, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
                                { label: 'Avg Response Time', value: '124.64 ms', trend: '↓ 1.7%', trendColor: 'text-red-500', trendBg: 'bg-red-50', icon: <Play size={16} />, iconColor: 'text-purple-600', iconBg: 'bg-purple-50' },
                                { label: 'Throughput', value: '1,565.44 /min', trend: '↑ 0.8%', trendColor: 'text-emerald-500', trendBg: 'bg-emerald-50', icon: <ArrowLeftRight size={16} />, iconColor: 'text-orange-600', iconBg: 'bg-orange-50' },
                                { label: 'Error Rate', value: '0.12 %', trend: '↑ 1.1%', trendColor: 'text-emerald-500', trendBg: 'bg-emerald-50', icon: <AlertCircle size={16} />, iconColor: 'text-red-600', iconBg: 'bg-red-50' },
                                { label: 'Uptime', value: '100 %', trend: '↑ 0%', trendColor: 'text-emerald-500', trendBg: 'bg-emerald-50', icon: <Clock size={16} />, iconColor: 'text-cyan-600', iconBg: 'bg-cyan-50' },
                            ].map((kpi, idx) => (
                                <Card key={idx} className="p-6 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${kpi.iconBg} ${kpi.iconColor}`}>
                                            {kpi.icon}
                                        </div>
                                        <div className={`px-2 py-1 rounded-md text-[10px] font-black ${kpi.trendBg} ${kpi.trendColor} flex items-center gap-1`}>
                                            {kpi.trend}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                                        <p className="text-3xl font-black text-slate-800">{kpi.value}</p>
                                    </div>
                                    <div className="h-12 w-full mt-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={KPI_SPARKLINE_DATA}>
                                                <Bar dataKey="value" fill={idx % 2 === 0 ? '#3b82f6' : '#10b981'} radius={[2, 2, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* System Resources & Operational Status */}
                        <div className="grid lg:grid-cols-2 gap-8">

                            {/* System Resources */}
                            <Card className="p-10 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">System Resources</h3>
                                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                        <Database size={20} />
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    {[
                                        { label: 'CPU Usage', value: 62.3, color: 'bg-blue-500' },
                                        { label: 'Memory Usage', value: 72.7, color: 'bg-purple-500' },
                                        { label: 'Disk Usage', value: 45.8, color: 'bg-emerald-500' },
                                        { label: 'Network Traffic', value: 825, max: 1000, color: 'bg-orange-500', unit: ' Mbps' },
                                    ].map((resource, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-slate-600 tracking-wide">{resource.label}</span>
                                                <span className={`text-sm font-black ${resource.color.replace('bg-', 'text-')}`}>
                                                    {resource.value}{resource.unit || '%'}
                                                </span>
                                            </div>
                                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(resource.value / (resource.max || 100)) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                                                    className={`h-full ${resource.color} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Operational Status */}
                            <Card className="p-10 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Operational Status</h3>
                                    <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                                        <Settings size={20} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { id: 'Gates', label: 'Active Gates', value: '12 / 16', percent: 75, icon: <Activity size={20} />, color: 'bg-blue-500' },
                                        { id: 'Sensors', label: 'Active Sensors', value: '248 / 256', percent: 97, icon: <Wifi size={20} />, color: 'bg-purple-500' },
                                        { id: 'Staff', label: 'Online Staff', value: '87 / 92', percent: 95, icon: <UserCheck size={20} />, color: 'bg-emerald-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                                            <div className={`p-4 rounded-xl text-white ${item.color} shadow-lg shadow-blue-100`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="text-xl font-black text-slate-800">{item.value}</p>
                                            </div>
                                            <div className={`text-3xl font-black tracking-tighter ${item.color.replace('bg-', 'text-')}`}>
                                                {item.percent}%
                                            </div>
                                            <div className="p-2 rounded-full text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Performance Trends */}
                        <Card className="p-10 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Performance Trends</h3>
                                    <p className="text-slate-500 font-medium mt-1">System performance over time</p>
                                </div>
                                <div className="flex gap-1.5 p-1 bg-slate-50 rounded-xl">
                                    {['1H', '24H', '7D', '30D'].map(range => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${timeRange === range
                                                    ? 'bg-white text-[#2563eb] shadow-sm'
                                                    : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[400px] w-full mb-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={PERFORMANCE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0ea5e9" />
                                                <stop offset="100%" stopColor="#2563eb" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="time"
                                            stroke="#94a3b8"
                                            fontSize={11}
                                            fontWeight="bold"
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val) => val.includes('h') && parseInt(val) % 3 === 0 ? val : ''}
                                        />
                                        <YAxis stroke="#94a3b8" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} hide />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc', radius: 8 }}
                                            contentStyle={{
                                                borderRadius: '16px',
                                                border: 'none',
                                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                                padding: '12px 16px'
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            fill="url(#barGradient)"
                                            radius={[8, 8, 4, 4]}
                                            barSize={40}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
                                {[
                                    { label: 'Average', value: '61.1%', color: 'text-blue-500' },
                                    { label: 'Peak', value: '92.7%', color: 'text-emerald-500' },
                                    { label: 'Minimum', value: '30.3%', color: 'text-orange-500' },
                                    { label: 'Variance', value: '62.4%', color: 'text-purple-500' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center md:text-left">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'Alerts' && (
                    <motion.div
                        key="alerts"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <Card className="p-8 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white min-h-[500px]">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800">System Alerts</h3>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-slate-600">Clear All</Button>
                                    <Button variant="ghost" className="text-xs font-bold text-[#2563eb] hover:bg-blue-50">Settings</Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: 1, status: 'Critical', msg: 'System Latency > 200ms in Zone-A', time: '2m ago', icon: <XCircle className="text-red-500" /> },
                                    { id: 2, status: 'Warning', msg: 'CPU Usage peak at 89% on Node-4', time: '15m ago', icon: <AlertCircle className="text-amber-500" /> },
                                    { id: 3, status: 'Success', msg: 'Backup sync completed successfully', time: '1h ago', icon: <CheckCircle2 className="text-emerald-500" /> },
                                    { id: 4, status: 'Info', msg: 'New administrative login from unknown IP', time: '3h ago', icon: <Clock3 className="text-blue-500" /> },
                                ].map((alert) => (
                                    <div key={alert.id} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                                        <div className="flex items-center gap-5">
                                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                                {alert.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${alert.status === 'Critical' ? 'bg-red-50 text-red-600' :
                                                            alert.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                                                                alert.status === 'Success' ? 'bg-emerald-50 text-emerald-600' :
                                                                    'bg-blue-50 text-blue-600'
                                                        }`}>{alert.status}</span>
                                                    <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-700">{alert.msg}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'Reports' && (
                    <motion.div
                        key="reports"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="space-y-6"
                    >
                        <Card className="p-8 border-0 shadow-xl shadow-slate-200/40 rounded-2xl bg-white min-h-[500px]">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                                        <FileSearch size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800">Operational Reports</h3>
                                </div>
                                <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-2">
                                    Generate New
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Weekly Performance Audit', date: 'Feb 10, 2026', size: '2.4 MB', type: 'PDF' },
                                    { title: 'System Resource Utilization', date: 'Feb 08, 2026', size: '1.1 MB', type: 'CSV' },
                                    { title: 'Network Security Snapshot', date: 'Feb 05, 2026', size: '845 KB', type: 'PDF' },
                                    { title: 'Monthly KPI Aggregation', date: 'Jan 31, 2026', size: '4.2 MB', type: 'PDF' },
                                ].map((report, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-white rounded-xl shadow-sm text-purple-500 group-hover:scale-110 transition-transform">
                                                <FileText size={20} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase">{report.type}</span>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-800 mb-1">{report.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mb-6">{report.date} • {report.size}</p>
                                        <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-lg h-9 gap-2">
                                            <Download size={14} /> Download
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
