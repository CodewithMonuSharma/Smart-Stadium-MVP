import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, TrendingUp, Package, DollarSign, ArrowUpRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Merchandise() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('/merchandise/');
                setItems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const stats = [
        { label: "Total Revenue", value: "$45,280", icon: <DollarSign />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Items Sold", value: "1,284", icon: <ShoppingBag />, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Low Stock", value: "12 Items", icon: <Package />, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Forecasted Demand", value: "+22%", icon: <TrendingUp />, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    if (loading) return <div className="flex items-center justify-center h-[60vh]">Loading Inventory...</div>;

    const chartData = items.map(item => ({
        name: item.name,
        sales: item.sold_count,
        stock: item.stock_quantity
    }));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Merchandise Analytics</h1>
                    <p className="text-slate-500">Retail performance tracking and inventory forecasting</p>
                </div>
                <div className="flex gap-3">
                    <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200">
                        <Package className="w-4 h-4 mr-2" />
                        Manage Stock
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-slate-400">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <Card className="lg:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl">Top Selling Products</CardTitle>
                        <CardDescription>Units sold vs current stock levels</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} name="Units Sold" />
                                    <Bar dataKey="stock" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} name="Remaining Stock" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Insights */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <TrendingUp className="text-purple-600" size={20} />
                            Demand Forecast
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900">{item.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full uppercase">High Demand</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900">+{Math.floor(Math.random() * 40 + 10)}%</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Next Match</p>
                                </div>
                            </div>
                        ))}

                        <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl text-white">
                            <h4 className="font-bold flex items-center gap-2 mb-2">
                                <Package size={18} /> Smart Refill Alpha
                            </h4>
                            <p className="text-sm text-purple-100 mb-4 opacity-90">
                                AI suggests restocking **Home Jersey (Large)** and **Commemorative Scarves** before next Tuesday's local derby.
                            </p>
                            <Button className="w-full bg-white text-purple-700 hover:bg-purple-50 font-bold rounded-xl h-11">
                                Approve Restock
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Catalog Table */}
                <Card className="lg:col-span-3 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-8 py-5 text-left">Product Details</th>
                                    <th className="px-8 py-5 text-left">Category</th>
                                    <th className="px-8 py-5 text-left">Price</th>
                                    <th className="px-8 py-5 text-left">Units Sold</th>
                                    <th className="px-8 py-5 text-left">Inventory</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                                                    <ShoppingCart size={20} />
                                                </div>
                                                <span className="font-bold text-slate-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm text-slate-500">{item.category}</span>
                                        </td>
                                        <td className="px-8 py-6 font-mono text-slate-900 font-medium">
                                            ${item.price}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-slate-900">{item.sold_count}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${item.stock_quantity < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${Math.min(100, (item.stock_quantity / 500) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">{item.stock_quantity}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg">
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
