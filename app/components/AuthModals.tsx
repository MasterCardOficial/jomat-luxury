"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthModalsProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onSuccess: (user: any) => void;
}

export default function AuthModals({ isOpen, onClose, isDarkMode, onSuccess }: AuthModalsProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`relative w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-100'
                    }`}
            >
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
                >
                    <X size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>

                <div className="p-10 relative">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6 border border-[#D4AF37]/20">
                            <ShieldCheck className="text-[#D4AF37]" size={32} />
                        </div>
                        <h2 className="text-3xl font-playfair font-black mb-2">
                            {mode === 'login' ? 'Bienvenido de Nuevo' : 'Únete a la Élite'}
                        </h2>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {mode === 'login'
                                ? 'Accede a tu bóveda personal de lujo.'
                                : 'Crea tu cuenta para empezar a reseñar y recibir ofertas exclusivas.'}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {mode === 'register' && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" size={18} />
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className={`w-full pl-12 pr-6 py-4 rounded-xl border-2 transition-all outline-none ${isDarkMode
                                        ? 'bg-black/40 border-white/5 focus:border-[#D4AF37]/50 text-white'
                                        : 'bg-gray-50 border-gray-100 focus:border-[#D4AF37]/50'
                                        }`}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" size={18} />
                            <input
                                type="email"
                                placeholder="Correo Institucional / Personal"
                                className={`w-full pl-12 pr-6 py-4 rounded-xl border-2 transition-all outline-none ${isDarkMode
                                    ? 'bg-black/40 border-white/5 focus:border-[#D4AF37]/50 text-white'
                                    : 'bg-gray-50 border-gray-100 focus:border-[#D4AF37]/50'
                                    }`}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" size={18} />
                            <input
                                type="password"
                                placeholder="Contraseña de Seguridad"
                                className={`w-full pl-12 pr-6 py-4 rounded-xl border-2 transition-all outline-none ${isDarkMode
                                    ? 'bg-black/40 border-white/5 focus:border-[#D4AF37]/50 text-white'
                                    : 'bg-gray-50 border-gray-100 focus:border-[#D4AF37]/50'
                                    }`}
                            />
                        </div>

                        {mode === 'register' && (
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="accent-[#D4AF37] w-4 h-4" defaultChecked />
                                <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Recibir ofertas exclusivas por VIP</span>
                            </label>
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                onSuccess({ name: mode === 'login' ? 'Cliente Verificado' : 'Nuevo Miembro' });
                                onClose();
                            }}
                            className="w-full py-5 bg-[#D4AF37] hover:bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group"
                        >
                            {mode === 'login' ? 'Acceder' : 'Crear Cuenta'}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className={`text-xs font-bold uppercase tracking-widest opacity-60`}>
                            {mode === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya eres miembro?'}
                        </p>
                        <button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mt-2 hover:underline"
                        >
                            {mode === 'login' ? 'Registrarme Ahora' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
