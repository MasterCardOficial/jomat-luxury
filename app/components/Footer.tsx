"use client";
import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Clock, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Lock, X, Send, Award, Sparkles, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const [email, setEmail] = useState('');

    const handleNavigation = (hash: string) => {
        window.location.hash = hash;
        // Scroll suave al inicio cuando se navega
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        tienda: [
            { n: 'Relojes Maestros', h: '#/relojes' },
            { n: 'Perfumería Nicho', h: '#/perfumes' },
            { n: 'Ofertas Élite', h: '#/ofertas' },
            { n: 'Catálogo Completo', h: '#/shop' }
        ],
        ayuda: [
            { n: 'Centro de Ayuda', h: '#/faq' },
            { n: 'Rastrear Pedido', h: '#/tracking' },
            { n: 'Envíos Blindados', h: '#/shipping' },
            { n: 'Devoluciones VIP', h: '#/returns' },
            { n: 'Soporte Directo', h: '#/contact' }
        ],
        legal: [
            { n: 'Nuestro Legado', h: '#/about' },
            { n: 'Términos de Uso', h: '#/terms' },
            { n: 'Privacidad', h: '#/privacy' },
            { n: 'Garantía Auténtica', h: '#/warranty' }
        ]
    };

    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden border-t border-[#D4AF37]/20">
            {/* Fondo Decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Newsletter & Brand Section */}
                <div className="grid lg:grid-cols-12 gap-16 mb-24 border-b border-white/5 pb-24">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-playfair font-black tracking-tighter mb-2">JOMAT <span className="text-[#D4AF37]">LUXURY</span></h2>
                            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#D4AF37]/60">Tu estilo, tu tiempo, tu aroma.</p>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed max-w-md">
                            Elevando el estilo personal a través de piezas auténticas y curaduría experta. Únete a la élite de la relojería y perfumería en Colombia.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <motion.a key={i} href="#" whileHover={{ y: -5, color: '#D4AF37' }} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors">
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-[#D4AF37]/5 p-10 rounded-[3rem] border border-[#D4AF37]/20 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <Award className="text-[#D4AF37]" size={24} />
                                Únete a la Lista de Élite
                            </h3>
                            <p className="text-gray-400 text-sm mb-8 max-w-md">Recibe acceso prioritario a colecciones de edición limitada y ofertas exclusivas antes que nadie.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico personal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#D4AF37] transition-all font-bold"
                                />
                                <button className="px-8 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl shadow-[#D4AF37]/10">
                                    Suscribirme <Send size={14} />
                                </button>
                            </div>
                        </div>
                        <Sparkles className="absolute -bottom-10 -right-10 text-[#D4AF37]/10 w-48 h-48 group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-[#D4AF37]">Tienda</h4>
                        <ul className="space-y-4">
                            {footerLinks.tienda.map((l, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => handleNavigation(l.h)} 
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group w-full text-left"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] scale-0 group-hover:scale-100 transition-transform"></div>
                                        {l.n}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-[#D4AF37]">Asistencia</h4>
                        <ul className="space-y-4">
                            {footerLinks.ayuda.map((l, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => handleNavigation(l.h)} 
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group w-full text-left"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] scale-0 group-hover:scale-100 transition-transform"></div>
                                        {l.n}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-[#D4AF37]">JoMat Luxury</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((l, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => handleNavigation(l.h)} 
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group w-full text-left"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] scale-0 group-hover:scale-100 transition-transform"></div>
                                        {l.n}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-2 lg:col-span-1 border-t border-white/5 pt-12 lg:border-t-0 lg:pt-0">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-[#D4AF37]">Contacto Directo</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/5 rounded-xl text-[#D4AF37]"><Phone size={18} /></div>
                                <div><p className="text-[10px] uppercase font-black opacity-40 mb-1">WhatsApp Asesor</p><p className="text-sm font-bold">+57 304 666 1245</p></div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/5 rounded-xl text-[#D4AF37]"><MapPin size={18} /></div>
                                <div><p className="text-[10px] uppercase font-black opacity-40 mb-1">Ubicación</p><p className="text-sm font-bold">Cartagena de Indias, Colombia</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payments & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 mb-3">Métodos de Pago Seguros</p>
                        <div className="flex items-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-5" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                            <div className="bg-white/10 px-3 py-1 rounded-lg">
                                <span className="text-[10px] font-black text-white">PSE</span>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-lg">
                                <span className="text-[10px] font-black text-white">Nequi</span>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-lg">
                                <span className="text-[10px] font-black text-white">Bancolombia</span>
                            </div>
                            <CreditCard size={20} className="text-[#D4AF37]/40" />
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-2">© 2026 JoMat Luxury. Prohibida su reproducción total o parcial.</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/40 flex items-center justify-center md:justify-end gap-2">Crafted with Passion <Heart size={10} fill="#D4AF37" className="text-[#D4AF37]" /> In Colombia</p>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Section (Simplified) */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4" onMouseEnter={() => setIsHelpVisible(true)} onMouseLeave={() => setIsHelpVisible(false)}>
                <AnimatePresence>
                    {isHelpVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-w-[320px] relative mb-4 border border-gray-100"
                        >
                            <button onClick={(e) => { e.stopPropagation(); setIsHelpVisible(false); }} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                            <h3 className="text-[#1A2B3B] text-2xl font-bold mb-3 pr-8 leading-tight">¿Necesitas un Asesor?</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">Estamos disponibles ahora mismo para atenderte personalmente.</p>
                            <a href="https://wa.me/573046661245" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#25D366] text-white text-center font-bold rounded-2xl hover:bg-[#1ebd5b] transition-colors shadow-lg shadow-green-200">Iniciar Chat VIP</a>
                        </motion.div>
                    )}
                </AnimatePresence>
                <a href="https://wa.me/573046661245" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:bg-[#1ebd5b] hover:scale-110 transition-all duration-300 relative group flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.982-.363-1.747-.756-2.871-2.506-2.958-2.62-.087-.114-.708-.941-.708-1.797 0-.856.448-1.274.607-1.445.159-.171.347-.214.463-.214l.332.006c.106.005.249-.04.391.299l.542 1.312c.046.111.077.241.004.388-.073.148-.11.239-.217.363-.109.124-.228.277-.326.37l-.216.223c.11.201.243.402.403.593.585.696 1.242 1.157 1.961 1.439l.216-.271c.125-.156.259-.328.423-.328l.352.004c.142.006.285.011.411.066l1.205.592c.126.062.21.093.257.176.047.082.047.477-.097.882zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                </a>
            </div>
        </footer>
    );
}

