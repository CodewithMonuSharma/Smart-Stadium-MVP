import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ticket, Search, CheckCircle, AlertOctagon, ScanLine, Clock, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Ticketing() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [validating, setValidating] = useState(false);
    const [validationResult, setValidationResult] = useState<any>(null);

    const fetchTickets = async () => {
        try {
            const res = await axios.get('/tickets/');
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleValidate = async (code: string) => {
        setValidating(true);
        setValidationResult(null);
        try {
            const res = await axios.post('/validate-ticket', { code });
            setValidationResult({ success: true, ...res.data });
            fetchTickets();
        } catch (err: any) {
            setValidationResult({ success: false, ...err.response?.data });
        } finally {
            setValidating(false);
        }
    };

    const filteredTickets = tickets.filter(t =>
        t.ticket_code.toLowerCase().includes(search.toLowerCase()) ||
        t.customer_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Smart Ticketing</h1>
                    <p className="text-slate-500">Manage digital access and AI fraud detection</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            placeholder="Search ticket or name..."
                            className="pl-10 h-11 w-64 rounded-xl border-slate-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button className="h-11 rounded-xl bg-purple-600 hover:bg-purple-700">
                        Generate Ticket
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Validation Panel */}
                <Card className="lg:col-span-1 border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-slate-900 text-white">
                        <div className="flex items-center gap-2">
                            <ScanLine className="w-5 h-5 text-purple-400" />
                            <CardTitle className="text-lg">Access Validation</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500">Scan QR Code or enter code manually for AI validation.</p>
                            <div className="flex gap-2">
                                <Input
                                    id="ticketCode"
                                    placeholder="TICKET-123"
                                    className="h-12 text-lg font-mono uppercase"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleValidate((e.target as HTMLInputElement).value);
                                    }}
                                />
                                <Button
                                    className="h-12 px-6 bg-purple-600"
                                    onClick={() => {
                                        const input = document.getElementById('ticketCode') as HTMLInputElement;
                                        handleValidate(input.value);
                                    }}
                                    disabled={validating}
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {validationResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`p-6 rounded-2xl border ${validationResult.success
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                                        : 'bg-red-50 border-red-100 text-red-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {validationResult.success
                                            ? <CheckCircle className="w-8 h-8 text-emerald-500" />
                                            : <AlertOctagon className="w-8 h-8 text-red-500" />
                                        }
                                        <div>
                                            <h4 className="font-bold text-lg">{validationResult.success ? 'Access Granted' : 'Access Denied'}</h4>
                                            <p className="text-sm opacity-80">{validationResult.reason || 'Verification complete'}</p>
                                        </div>
                                    </div>
                                    {validationResult.success && (
                                        <div className="space-y-2 pt-4 border-t border-emerald-200/50">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">Customer:</span>
                                                <span>{validationResult.details.customer_name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">Seat:</span>
                                                <span>{validationResult.details.seat_number}</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                            <div className="flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 text-purple-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-purple-900">AI Security Active</p>
                                    <p className="text-xs text-purple-700">Predictive fraud detection is analyzing scan patterns in real-time.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tickets List */}
                <Card className="lg:col-span-2 border-0 shadow-xl shadow-slate-200/50 rounded-2xl">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg">Recent Tickets</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Ticket</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">AI Risk</th>
                                        <th className="px-6 py-4">Entry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredTickets.map((t) => (
                                        <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <Ticket size={16} />
                                                    </div>
                                                    <span className="font-mono font-medium text-slate-700">{t.ticket_code}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                    <span className="text-sm font-medium">{t.customer_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.is_validated
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {t.is_validated ? 'Scanned' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden w-16">
                                                        <div
                                                            className={`h-full rounded-full ${t.fraud_score > 0.7 ? 'bg-red-500' :
                                                                t.fraud_score > 0.3 ? 'bg-orange-400' : 'bg-emerald-500'
                                                                }`}
                                                            style={{ width: `${t.fraud_score * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-mono">{Math.round(t.fraud_score * 100)}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {t.entry_time ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                        <Clock size={12} />
                                                        <span>{new Date(t.entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-300">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredTickets.length === 0 && (
                            <div className="p-12 text-center text-slate-400 italic">
                                No tickets found matching your search.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
