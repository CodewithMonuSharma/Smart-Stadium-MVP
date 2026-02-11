import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ShoppingBag,
    TrendingUp,
    Package,
    DollarSign,
    ArrowUpRight,
    ShoppingCart,
    Download,
    Calendar,
    Filter,
    Cpu,
    AlertCircle,
    ArrowRight,
    History,
    Zap,
    Lightbulb,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    AreaChart,
    Area,
    Legend
} from 'recharts';

const REVENUE_DATA = [
    { name: 'Jan', actual: 85, projected: 90 },
    { name: 'Feb', actual: 92, projected: 95 },
    { name: 'Mar', actual: 110, projected: 105 },
    { name: 'Apr', actual: 98, projected: 115 },
    { name: 'May', actual: 125, projected: 130 },
    { name: 'Jun', actual: 140, projected: 145 },
    { name: 'Jul', actual: 135, projected: 140 },
    { name: 'Aug', actual: 120, projected: 125 },
    { name: 'Sep', actual: 145, projected: 150 },
    { name: 'Oct', actual: 160, projected: 155 },
    { name: 'Nov', actual: 150, projected: 165 },
    { name: 'Dec', actual: 165, projected: 175 },
];

const DEMAND_FORECAST_DATA = [
    { time: 'T-6h', historical: 400, predicted: null },
    { time: 'T-5h', historical: 450, predicted: null },
    { time: 'T-4h', historical: 420, predicted: null },
    { time: 'T-3h', historical: 500, predicted: null },
    { time: 'T-2h', historical: 480, predicted: null },
    { time: 'T-1h', historical: 550, predicted: null },
    { time: 'Current', historical: 620, predicted: 620 },
    { time: 'T+1h', historical: null, predicted: 680 },
    { time: 'T+2h', historical: null, predicted: 750 },
    { time: 'T+3h', historical: null, predicted: 840 },
    { time: 'T+4h', historical: null, predicted: 810 },
    { time: 'T+5h', historical: null, predicted: 780 },
];

const TOP_PRODUCTS = [
    { id: 1, name: 'Home Jersey 24/25', category: 'Apparel', sales: 4567, revenue: 315.6, growth: 12.6, stock: 890, rank: 1, status: 'Trending' },
    { id: 2, name: 'Away Scarf', category: 'Apparel', sales: 3421, revenue: 85.5, growth: 8.7, stock: 567, rank: 2, status: 'Trending' },
    { id: 3, name: 'Classic Football', category: 'Equipment', sales: 2890, revenue: 144.4, growth: 11.3, stock: 456, rank: 3, status: 'Normal' },
    { id: 4, name: 'Stadia Cap', category: 'Accessories', sales: 2156, revenue: 53.9, growth: 9.8, stock: 678, rank: 4, status: 'Normal' },
    { id: 5, name: 'Stadium Mug', category: 'Dining', sales: 1845, revenue: 36.9, growth: 5.2, stock: 1234, rank: 5, status: 'Low' },
];

const STOCK_ALERTS = [
    { id: 1, name: 'Home Jersey XL', category: 'Apparel', level: 12, target: 50, status: 'CRITICAL', color: 'bg-red-500' },
    { id: 2, name: 'Hot Dogs', category: 'Food', level: 45, target: 100, status: 'LOW', color: 'bg-orange-500' },
    { id: 3, name: 'Team Scarves', category: 'Accessories', level: 78, target: 150, status: 'WARNING', color: 'bg-amber-500' },
];

export default function Merchandise() {
    const [activeTimeRange, setActiveTimeRange] = useState('7d');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isAutoOptimizing, setIsAutoOptimizing] = useState(false);
    const [inventoryStatus, setInventoryStatus] = useState('All');

    const handleAutoOptimize = () => {
        setIsAutoOptimizing(true);
        setTimeout(() => setIsAutoOptimizing(false), 2000);
    };

    // Filter Logic
    const categoryFilter = (item: any) => {
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Food & Beverage') return item.category === 'Food' || item.category === 'Dining';
        return item.category === activeCategory;
    };

    const timeRangeMultiplier = {
        '24h': 0.15,
        '7d': 1,
        '30d': 4.2,
        '90d': 12.5
    }[activeTimeRange as '24h' | '7d' | '30d' | '90d'] || 1;

    const filteredStockAlerts = STOCK_ALERTS.filter(categoryFilter);
    const filteredTopProducts = TOP_PRODUCTS
        .filter(categoryFilter)
        .map(p => ({
            ...p,
            sales: Math.round(p.sales * timeRangeMultiplier),
            revenue: (p.revenue * timeRangeMultiplier).toFixed(1)
        }));

    const inventoryItems = [
        { name: 'Home Jersey XL', category: 'Apparel', current: 234, target: 300, lead: '7d', status: 'UNDERSTOCK', color: 'bg-orange-500' },
        { name: 'Hot Dogs', category: 'Food', current: 567, target: 500, lead: '2d', status: 'OVERSTOCK', color: 'bg-blue-500' },
        { name: 'Team Scarves', category: 'Accessories', current: 156, target: 150, lead: '5d', status: 'OPTIMAL', color: 'bg-emerald-500' },
        { name: 'Classic Football', category: 'Equipment', current: 456, target: 500, lead: '10d', status: 'LOW', color: 'bg-amber-500' },
    ];

    const filteredInventory = inventoryItems.filter(item => {
        const matchesCategory = categoryFilter(item);
        const matchesStatus = inventoryStatus === 'All' ||
            (inventoryStatus === 'Reorder' && item.status === 'UNDERSTOCK') ||
            item.status.toUpperCase() === inventoryStatus.toUpperCase();
        return matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-10 animate-in fade-in duration-700 px-3 py-10 bg-slate-50 min-h-screen font-['Outfit']">

            {/* Page Header */}
            <div className="px-2">
                <h1 className="text-4xl font-black text-purple-900 tracking-tight">Merchandise Dashboard</h1>
                <p className="text-slate-500 font-medium mt-1">Inventory management, sales analytics, and AI demand forecasting</p>
            </div>

            {/* Header & Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 pr-6 border-r border-slate-100">
                        <Filter size={18} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-500">Filters:</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Range:</span>
                        <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                            {['24h', '7d', '30d', '90d'].map(range => (
                                <button
                                    key={range}
                                    onClick={() => setActiveTimeRange(range)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTimeRange === range ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {range.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category:</span>
                        <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                            {['All', 'Apparel', 'Food & Beverage', 'Accessories'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeCategory === cat ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {cat === 'All' && <Package size={14} />}
                                    {cat === 'Apparel' && <ShoppingBag size={14} />}
                                    {cat === 'Food & Beverage' && <Zap size={14} />}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 h-11 flex items-center gap-2 shadow-lg shadow-purple-100 border-0">
                    <Download size={18} />
                    Export Report
                </Button>
            </div>

            {/* Section 1: Revenue Projection & Stock Alerts */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Revenue Projection */}
                <Card className="lg:col-span-2 p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white overflow-hidden">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Projection</h3>
                            <p className="text-slate-500 mt-1 font-medium">AI-powered revenue forecasting</p>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider">Live Forecast</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100/30">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <Calendar size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Current</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">$127.0K</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">This period</p>
                        </div>
                        <div className="p-6 rounded-xl bg-purple-50/50 border border-purple-100/30">
                            <div className="flex items-center gap-2 text-purple-600 mb-2">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Projected</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">$156.3K</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Next period</p>
                        </div>
                        <div className="p-6 rounded-xl bg-emerald-50/50 border border-emerald-100/30">
                            <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                <ArrowUpRight size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Growth</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">+23.0%</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Expected increase</p>
                        </div>
                    </div>

                    <div className="h-[300px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }} />
                                <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} name="Actual" />
                                <Bar dataKey="projected" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={24} name="Projected" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-6">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Lightbulb size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">AI Recommendation</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                                Based on current trends, increase inventory for apparel and accessories by <span className="text-purple-600">15-20%</span> before the next event. Peak demand expected during weekend matches.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Stock Alerts */}
                <Card className="p-8 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Stock Alerts</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">8 items need attention</p>
                        </div>
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                            <AlertCircle size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <div className="text-center">
                            <p className="text-2xl font-black text-red-500">3</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Critical</p>
                        </div>
                        <div className="text-center border-x border-slate-100">
                            <p className="text-2xl font-black text-orange-500">3</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Low</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-amber-500">2</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Warning</p>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[500px]">
                        {filteredStockAlerts.length > 0 ? filteredStockAlerts.map(alert => (
                            <div key={alert.id} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 transition-all group relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${alert.color}`}></div>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{alert.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400">{alert.category}</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${alert.status === 'CRITICAL' ? 'bg-red-50 text-red-600' :
                                        alert.status === 'LOW' ? 'bg-orange-50 text-orange-600' :
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                        {alert.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 mb-1">Stock Level</p>
                                        <p className="text-sm font-black text-slate-900">{alert.level}/{alert.target}</p>
                                    </div>
                                    <button className="text-[10px] font-black text-purple-600 hover:underline flex items-center gap-1 uppercase tracking-wider">
                                        Order Now <ArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <Package className="text-slate-300 mb-3" size={32} />
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Alerts</p>
                            </div>
                        )}
                    </div>

                    <Button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 font-black text-xs uppercase tracking-widest gap-2 border-0">
                        <ShoppingCart size={16} />
                        Auto-Order All Critical Items
                    </Button>
                </Card>
            </div>

            {/* Section 2: Demand Forecast */}
            <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Demand Forecast</h3>
                        <p className="text-slate-500 mt-1 font-medium">AI-powered predictive analytics</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full border border-slate-200">
                            <Cpu size={14} />
                            <span className="text-[10px] font-black uppercase tracking-wider">ML Model V2.4</span>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100">
                            <span className="text-[10px] font-black uppercase tracking-wider">94.8% Accuracy</span>
                        </div>
                    </div>
                </div>

                <div className="mb-10 text-xs font-bold text-slate-400 uppercase tracking-widest">Demand Trend Analysis</div>

                <div className="h-[350px] w-full mb-12">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DEMAND_FORECAST_DATA} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                            <Area type="monotone" dataKey="historical" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#historicalGradient)" name="Historical" />
                            <Area type="monotone" dataKey="predicted" stroke="#a78bfa" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#predictedGradient)" name="Predicted" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Peak Demand', value: '846', sub: 'Units expected', icon: <ArrowUpRight />, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Avg Demand', value: '648', sub: 'Units per period', icon: <History />, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Growth Rate', value: '+12.4%', sub: 'vs last period', icon: <TrendingUp />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Next Peak', value: '3 Days', sub: 'Weekend match', icon: <Calendar />, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Section 3: Sales Analytics & Inventory Optimizer */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* Sales Analytics */}
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sales Analytics</h3>
                            <p className="text-slate-500 mt-1 font-medium">Top performing products</p>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-slate-100 p-1 bg-slate-50">
                            <span className="text-[10px] font-black text-slate-400 px-3 uppercase tracking-wider">Sort by:</span>
                            <select className="bg-transparent border-none text-[10px] font-black text-slate-600 outline-none pr-3">
                                <option>Sales Volume</option>
                                <option>Revenue</option>
                                <option>Growth</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-blue-500 mb-2">
                                <ShoppingBag size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Total Sales</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900">18,886</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">Units sold</p>
                        </div>
                        <div className="flex flex-col border-x border-slate-100 px-6">
                            <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                <DollarSign size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Total Revenue</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900">$315.6K</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">This period</p>
                        </div>
                        <div className="flex flex-col pl-6">
                            <div className="flex items-center gap-2 text-purple-500 mb-2">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Avg Growth</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900">+12.6%</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">Trending up</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredTopProducts.length > 0 ? filteredTopProducts.map(product => (
                            <div key={product.id} className="p-5 rounded-2xl bg-white border border-slate-50 hover:bg-slate-50 transition-all flex items-center group">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg font-black text-slate-400 mr-6 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                    {product.rank}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-800">{product.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{product.category}</span>
                                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                                            <TrendingUp size={10} />
                                            <span className="text-[9px] font-black uppercase tracking-tighter">Trending</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 mr-6">
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase">Sales</p>
                                        <p className="text-sm font-black text-slate-900">{product.sales.toLocaleString()}</p>
                                    </div>
                                    <div className="text-emerald-500 flex items-center gap-1">
                                        <ArrowUpRight size={14} />
                                        <span className="text-xs font-black">{product.growth}%</span>
                                    </div>
                                </div>
                                <div className="text-right min-w-[80px]">
                                    <p className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase">Stock</p>
                                    <p className="text-sm font-black text-slate-900">{product.stock}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <Search className="text-slate-300 mb-3" size={32} />
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Products Found</p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Inventory Optimizer */}
                <Card className="p-10 border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white flex flex-col">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Inventory Optimizer</h3>
                            <p className="text-slate-500 mt-1 font-medium">AI-powered stock recommendations</p>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <ShoppingCart size={24} />
                        </div>
                    </div>

                    <div className="flex gap-2 p-1 bg-slate-50 rounded-xl mb-10 overflow-x-auto no-scrollbar">
                        {[
                            { label: 'All', count: 8 },
                            { label: 'Optimal', count: 3 },
                            { label: 'Overstock', count: 2 },
                            { label: 'Understock', count: 2 },
                            { label: 'Reorder', count: 1 },
                        ].map(tab => (
                            <button
                                key={tab.label}
                                onClick={() => setInventoryStatus(tab.label)}
                                className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${inventoryStatus === tab.label ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}
                            >
                                {tab.label} <span className={`px-1.5 rounded-md ${inventoryStatus === tab.label ? 'bg-purple-100' : 'bg-slate-200/50'}`}>{tab.count}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto pr-4 max-h-[500px]">
                        {filteredInventory.length > 0 ? filteredInventory.map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="text-base font-bold text-slate-800">{item.name}</h4>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-3 py-1 rounded-md ${item.status === 'UNDERSTOCK' || item.status === 'LOW' ? 'bg-orange-50 text-orange-600' :
                                        item.status === 'OVERSTOCK' ? 'bg-blue-50 text-blue-600' :
                                            'bg-emerald-50 text-emerald-600'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Stock Level</span>
                                        <span className="text-xs font-black text-slate-900">{item.current}/{item.target}</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.current / (item.target * 1.2)) * 100}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-8 text-[11px]">
                                    <div>
                                        <p className="font-bold text-slate-400 mb-1 uppercase tracking-tighter">Current</p>
                                        <p className="font-black text-slate-800 text-lg">{item.current}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-400 mb-1 uppercase tracking-tighter">Optimal</p>
                                        <p className="font-black text-slate-800 text-lg">{item.target}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-400 mb-1 uppercase tracking-tighter">Lead Time</p>
                                        <p className="font-black text-slate-800 text-lg">{item.lead}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                                    <div className="p-2 bg-orange-500 text-white rounded-lg border-0 shadow-sm">
                                        <Package size={16} />
                                    </div>
                                    <p className="text-xs font-bold text-orange-900 flex-1">Order <span className="font-black">100 units</span> to maintain optimal stock</p>
                                    <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50 border border-orange-200 rounded-lg text-[10px] font-black h-8 px-4 border-0 shadow-sm">
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <Zap className="text-slate-300 mb-3 hover:animate-pulse" size={32} />
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Results Found</p>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleAutoOptimize}
                        className={`w-full mt-8 rounded-xl h-12 font-black text-xs uppercase tracking-widest gap-2 transition-all border-0 ${isAutoOptimizing ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200'}`}
                    >
                        {isAutoOptimizing ? (
                            <>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                Optimizing All Inventory...
                            </>
                        ) : (
                            <>
                                <Zap size={16} className="text-amber-400" />
                                Auto-Optimize All Inventory
                            </>
                        )}
                    </Button>
                </Card>
            </div>
        </div>
    );
}
