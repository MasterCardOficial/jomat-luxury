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
        </footer>
    );
}

