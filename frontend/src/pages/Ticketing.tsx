import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ScanLine,
    CheckCircle,
    AlertTriangle,
    DoorOpen,
    QrCode,
    Download,
    Share2,
    Plus,
    ShieldAlert,
    AlertOctagon,
    Ban,
    History,
    Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Ticketing() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [validationResult, setValidationResult] = useState<any>(null);
    const [scanActive, setScanActive] = useState(false);
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'DUPLICATE', severity: 'HIGH', title: 'TKT-2025-045 • Gate B2', desc: 'Same ticket scanned at multiple gates simultaneously', time: '12:28:42' },
        { id: 2, type: 'SUSPICIOUS', severity: 'MEDIUM', title: 'TKT-2025-078 • Gate A1', desc: 'Unusual scanning pattern detected', time: '12:26:42' },
    ]);

    // Stats
    const stats = {
        totalScanned: "2,848",
        validEntries: "2,791",
        fraudDetected: "12",
        activeGates: "8"
    };

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

    const handleSimulateScan = async () => {
        setScanActive(true);

        // Simulate API delay
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3;
            setValidationResult({
                success: isSuccess,
                code: "TKT-2025-001",
                gate: "Gate A1",
                time: new Date().toLocaleTimeString(),
                message: isSuccess ? "Entry approved - Welcome!" : "Ticket already used"
            });
            setScanActive(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700 p-2 bg-slate-50 min-h-screen font-['Outfit']">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-purple-600 tracking-tight">Smart Ticketing System</h1>
                    <p className="text-slate-500 mt-2 text-lg">QR/NFC-based digital tickets with AI-powered fraud detection</p>
                </div>
                <div>
                    <div className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-2.5 rounded-full shadow-lg shadow-emerald-200 transition-transform hover:scale-105 cursor-default">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <span className="font-bold tracking-wide text-sm">SYSTEM ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Scanned"
                    value={stats.totalScanned}
                    subtext="↑ Live updating"
                    icon={<ScanLine size={20} className="text-purple-600" />}
                    accent="border-l-4 border-purple-500"
                />
                <StatCard
                    title="Valid Entries"
                    value={stats.validEntries}
                    subtext="98.0% success rate"
                    icon={<CheckCircle size={20} className="text-emerald-500" />}
                    accent="border-l-4 border-emerald-500"
                />
                <StatCard
                    title="Fraud Detected"
                    value={stats.fraudDetected}
                    subtext="🛡 AI Protected"
                    icon={<AlertTriangle size={20} className="text-red-500" />}
                    accent="border-l-4 border-red-500"
                />
                <StatCard
                    title="Active Gates"
                    value={stats.activeGates}
                    subtext="• All operational"
                    icon={<DoorOpen size={20} className="text-blue-500" />}
                    accent="border-l-4 border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Left Column: Generator & Fraud */}
                <div className="lg:col-span-5 space-y-4">

                    {/* Ticket Generator Card */}
                    <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Ticket Generator</h3>
                                <p className="text-sm text-slate-500">Generate QR/NFC digital tickets</p>
                            </div>
                            <Button
                                onClick={() => {
                                    const newTicket = {
                                        id: Date.now(),
                                        ticket_code: `TKT-2025-${Math.floor(Math.random() * 10000)}`,
                                        customer_name: "New Guest",
                                        seat_number: `Sec ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]} • Seat ${Math.floor(Math.random() * 50) + 1}`,
                                        is_validated: false
                                    };
                                    setTickets([newTicket, ...tickets]);
                                }}
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-200"
                            >
                                <Plus size={18} className="mr-2" /> Generate Ticket
                            </Button>
                        </div>

                        {/* Ticket Preview Mockup (Dynamic) */}
                        <div className="border border-slate-100 rounded-3xl p-6 bg-white shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                            <div className="flex justify-between items-start mb-6 pl-4">
                                <div>
                                    <h4 className="text-lg font-black text-slate-800">Championship Final</h4>
                                    <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">ACTIVE</span>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-xl">
                                    <QrCode size={32} className="text-purple-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 pl-4 text-sm">
                                <div>
                                    <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">Ticket ID</p>
                                    <p className="font-mono font-bold text-slate-700">{tickets[0]?.ticket_code || 'TKT-2025-001'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">Seat</p>
                                    <p className="font-bold text-slate-700">{tickets[0]?.seat_number || 'Sec A • Seat 12'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">Date</p>
                                    <p className="font-bold text-slate-700">2025-02-15</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">Time</p>
                                    <p className="font-bold text-slate-700">19:00</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 pl-4">
                                <span className="text-2xl font-black text-purple-600">$85.00</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-purple-600">
                                        <Download size={16} className="mr-1" /> Download
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-purple-600">
                                        <Share2 size={16} className="mr-1" /> Share
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Recently Generated Tickets */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recently Generated</p>
                            <div className="space-y-2">
                                {tickets.filter(t => t.ticket_code && t.ticket_code.startsWith('TKT-2025')).slice(0, 3).map(t => (
                                    <div key={t.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <QrCode size={14} className="text-purple-500" />
                                            <span className="text-xs font-bold text-slate-700">{t.ticket_code}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400">Just now</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* AI Fraud Detection Card */}
                    <Card className="p-6 border-0 shadow-lg rounded-3xl bg-white border-l-4 border-l-red-500">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="text-red-500" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">AI Fraud Detection</h3>
                                    <p className="text-xs text-slate-500">Real-time threat monitoring</p>
                                </div>
                            </div>
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">● ACTIVE</span>
                        </div>

                        {/* Fraud Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-red-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-black text-red-600">2</div>
                                <div className="text-[10px] uppercase font-bold text-red-400">Active Alerts</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-black text-orange-600">98.7%</div>
                                <div className="text-[10px] uppercase font-bold text-orange-400">Detection Rate</div>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-black text-emerald-600">0</div>
                                <div className="text-[10px] uppercase font-bold text-emerald-400">False Positives</div>
                            </div>
                        </div>

                        {/* Alerts List */}
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {alerts.map(alert => (
                                <div key={alert.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-lg ${alert.severity === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {alert.severity === 'HIGH' ? <AlertOctagon size={14} /> : <AlertTriangle size={14} />}
                                            </div>
                                            <span className={`text-xs font-black uppercase ${alert.severity === 'HIGH' ? 'text-red-600' : 'text-orange-600'}`}>
                                                {alert.type} <span className={`px-1.5 py-0.5 rounded text-[9px] ml-1 opacity-80 ${alert.severity === 'HIGH' ? 'bg-red-200' : 'bg-orange-200'}`}>{alert.severity}</span>
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-400">{alert.time}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-800 mb-1">{alert.title}</h4>
                                    <p className="text-xs text-slate-500 mb-3">{alert.desc}</p>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="h-8 bg-red-600 hover:bg-red-700 text-white rounded-lg w-full text-xs font-bold"
                                            onClick={() => {
                                                setAlerts(prev => prev.filter(p => p.id !== alert.id));
                                            }}
                                        >
                                            <Ban size={12} className="mr-1.5" /> Block Ticket
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 border-slate-200 w-full text-xs font-bold text-slate-600"
                                            onClick={() => {
                                                setAlerts(prev => prev.filter(p => p.id !== alert.id));
                                            }}
                                        >
                                            Investigate
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500 rounded-lg">
                                    <ShieldAlert size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">AI Engine Status</p>
                                    <p className="text-[10px] text-slate-400">Neural network v3.2.1</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">● LEARNING</span>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Entry Validator */}
                <div className="lg:col-span-7">
                    <Card className="h-full border-0 shadow-lg rounded-3xl bg-white p-8 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900">Entry Validator</h3>
                            <p className="text-slate-500">Real-time ticket scanning and validation</p>
                        </div>

                        {/* Scan Area */}
                        <div className="bg-slate-50 rounded-[3rem] border-2 border-dashed border-purple-200 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <AnimatePresence mode="wait">
                                {scanActive ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="relative z-10"
                                    >
                                        <div className="w-32 h-32 bg-purple-100 rounded-3xl flex items-center justify-center animate-pulse">
                                            <QrCode size={48} className="text-purple-600" />
                                        </div>
                                        <p className="mt-6 text-purple-600 font-bold animate-pulse">Scanning...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="relative z-10 flex flex-col items-center"
                                    >
                                        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl shadow-purple-100 flex items-center justify-center mb-6">
                                            <ScanLine size={48} className="text-slate-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to scan</h4>
                                        <p className="text-slate-500 mb-8 max-w-xs">Click below to simulate ticket scanning or connect a hardware scanner.</p>

                                        <Button
                                            onClick={handleSimulateScan}
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl px-10 py-6 text-lg font-bold shadow-xl shadow-purple-200 transition-transform hover:scale-105"
                                        >
                                            <QrCode className="mr-2" /> Scan Ticket
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Manual Entry Input */}
                        <div className="mt-8">
                            <div className="flex gap-3">
                                <Input
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 font-mono text-center uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                                    placeholder="Enter Ticket ID manually"
                                    id="manualTicketInput"
                                />
                                <Button
                                    className="h-12 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                                    onClick={() => {
                                        const input = document.getElementById('manualTicketInput') as HTMLInputElement;
                                        if (input.value) {
                                            setScanActive(true);
                                            setTimeout(() => {
                                                setValidationResult({
                                                    success: true,
                                                    code: input.value.toUpperCase(),
                                                    gate: "Manual Entry",
                                                    time: new Date().toLocaleTimeString(),
                                                    message: "Manual validation approved"
                                                });
                                                setScanActive(false);
                                                input.value = "";
                                            }, 1000);
                                        }
                                    }}
                                >
                                    Validate
                                </Button>
                            </div>
                        </div>

                        {/* Recent Validations */}
                        <div className="mt-10 flex-1">
                            <div className="flex items-center gap-2 mb-6">
                                <History className="text-purple-600" size={20} />
                                <h4 className="text-lg font-bold text-slate-900">Recent Validations</h4>
                            </div>

                            <div className="space-y-4">
                                {/* Result Card (Dynamic) */}
                                <AnimatePresence>
                                    {validationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`p-4 rounded-2xl border flex items-center justify-between ${validationResult.success ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${validationResult.success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                                    {validationResult.success ? <CheckCircle size={20} /> : <AlertOctagon size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{validationResult.code}</p>
                                                    <p className={`text-xs font-bold ${validationResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                                        {validationResult.message}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-mono text-slate-400">{validationResult.time}</p>
                                                <p className="text-xs font-bold text-slate-500">{validationResult.gate}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Ticket History List (Mock/Filtered Real) */}
                                {tickets.slice(0, 4).map((ticket, i) => (
                                    <div key={i} className="p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-md transition-all`}>
                                                <Ticket size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{ticket.ticket_code || "TKT-GEN-00" + i}</p>
                                                <p className="text-xs text-slate-500">{ticket.customer_name || "Guest User"} • Seat {ticket.seat_number || "Gen"}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${ticket.is_validated ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                {ticket.is_validated ? 'Used' : 'Valid'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtext, icon, accent }: any) {
    return (
        <Card className={`p-6 border-0 shadow-lg rounded-2xl bg-white relative overflow-hidden group ${accent}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">{value}</h3>
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
