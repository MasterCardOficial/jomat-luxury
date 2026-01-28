"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Accessibility, X, Type, Eye, Moon, Sun,
    AlignLeft, BookOpen, EyeOff, RotateCcw,
    ChevronRight
} from 'lucide-react';

interface AccessibilitySettings {
    textSize: number;
    highContrast: boolean;
    darkMode: boolean;
    textSpacing: number;
    screenReader: boolean;
    colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'grayscale';
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
    textSize: 100,
    highContrast: false,
    darkMode: true,
    textSpacing: 0,
    screenReader: false,
    colorBlindness: 'none'
};

export default function AccessibilityMenu({ isGlobalDarkMode, toggleGlobalDarkMode }: { isGlobalDarkMode: boolean, toggleGlobalDarkMode: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

    // Apply settings to DOM
    useEffect(() => {
        const root = document.documentElement;

        // Text Size
        root.style.setProperty('--font-size-scale', (settings.textSize / 100).toString());
        if (settings.textSize !== 100) root.classList.add('accessibility-text-scaling');
        else root.classList.remove('accessibility-text-scaling');

        // High Contrast
        if (settings.highContrast) root.classList.add('high-contrast');
        else root.classList.remove('high-contrast');

        // Text Spacing
        root.style.setProperty('--letter-spacing-scale', (settings.textSpacing * 0.05) + 'em');
        root.style.setProperty('--line-height-scale', (1.5 + settings.textSpacing * 0.2).toString());
        if (settings.textSpacing > 0) root.classList.add('text-spacing-wide');
        else root.classList.remove('text-spacing-wide');

        // Color Blindness
        root.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'grayscale');
        if (settings.colorBlindness !== 'none') {
            root.classList.add(settings.colorBlindness);
        }

    }, [settings]);

    // Sync with global dark mode
    useEffect(() => {
        setSettings(s => ({ ...s, darkMode: isGlobalDarkMode }));
    }, [isGlobalDarkMode]);

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        if (!isGlobalDarkMode) toggleGlobalDarkMode();
    };

    const toggleSetting = (key: keyof AccessibilitySettings) => {
        if (key === 'darkMode') {
            toggleGlobalDarkMode();
        } else if (typeof settings[key] === 'boolean') {
            setSettings(s => ({ ...s, [key]: !s[key] }));
        }
    };

    const adjustTextSize = (delta: number) => {
        setSettings(s => ({ ...s, textSize: Math.min(150, Math.max(75, s.textSize + delta)) }));
    };

    const cycleTextSpacing = () => {
        setSettings(s => ({ ...s, textSpacing: (s.textSpacing + 1) % 4 }));
    };

    const cycleColorBlindness = () => {
        const modes: AccessibilitySettings['colorBlindness'][] = ['none', 'protanopia', 'deuteranopia', 'tritanopia', 'grayscale'];
        const currentIndex = modes.indexOf(settings.colorBlindness);
        setSettings(s => ({ ...s, colorBlindness: modes[(currentIndex + 1) % modes.length] }));
    };

    const speakPage = () => {
        if ('speechSynthesis' in window) {
            const text = document.body.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tu navegador no soporta lectura de voz.");
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 md:bottom-28 left-4 md:left-8 z-[60] w-12 h-12 md:w-14 md:h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition-colors"
            >
                {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Accessibility size={24} className="md:w-7 md:h-7" />}
            </motion.button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
                    />
                )}
            </AnimatePresence>

            {/* Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        className="fixed bottom-40 md:bottom-48 left-4 md:left-8 z-[60] w-[calc(100vw-2rem)] max-w-[350px] bg-[#2a1b54] text-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden border border-indigo-500/30 p-4 md:p-6 font-montserrat"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-600 p-2 rounded-lg">
                                    <Accessibility size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Accesibilidad</h3>
                                    <p className="text-[10px] text-gray-300 uppercase tracking-widest font-black">Personaliza tu experiencia</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {/* Text Size Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${settings.textSize !== 100 ? 'bg-green-700 border-green-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`} onClick={() => adjustTextSize(12.5)}>
                                <div className="relative">
                                    <Type size={32} />
                                    {settings.textSize !== 100 && (
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className="text-xs font-bold text-center">Tamaño texto</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${settings.textSize >= (75 + i * 15) ? 'bg-white' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* High Contrast Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${settings.highContrast ? 'bg-indigo-700 border-indigo-500 shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`} onClick={() => toggleSetting('highContrast')}>
                                <Eye size={32} />
                                <span className="text-xs font-bold text-center">Alto contraste</span>
                            </div>

                            {/* Dark Mode Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10`} onClick={() => toggleGlobalDarkMode()}>
                                {settings.darkMode ? <Moon size={32} /> : <Sun size={32} />}
                                <span className="text-xs font-bold text-center">Modo {settings.darkMode ? 'oscuro' : 'claro'}</span>
                            </div>

                            {/* Text Spacing Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${settings.textSpacing > 0 ? 'bg-indigo-700 border-indigo-500 shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`} onClick={cycleTextSpacing}>
                                <div className="relative">
                                    <AlignLeft size={32} />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-black underline">A</div>
                                </div>
                                <span className="text-xs font-bold text-center">Espaciado texto</span>
                            </div>

                            {/* Read Page Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer bg-white/5 border-white/10 hover:bg-white/10`} onClick={speakPage}>
                                <BookOpen size={32} />
                                <span className="text-xs font-bold text-center">Leer página</span>
                            </div>

                            {/* Daltonism Card */}
                            <div className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${settings.colorBlindness !== 'none' ? 'bg-indigo-700 border-indigo-500 shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10'}`} onClick={cycleColorBlindness}>
                                <EyeOff size={32} />
                                <span className="text-xs font-bold text-center">Daltonismo</span>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={resetSettings}
                            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center gap-3 border border-white/10 transition-colors mb-4"
                        >
                            <RotateCcw size={20} />
                            <span className="font-bold">Restablecer todo</span>
                        </motion.button>

                        {/* Keyboard Shortcut Indicator */}
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold">
                            <span className="bg-white/10 px-2 py-1 rounded">Alt</span>
                            <span>+</span>
                            <span className="bg-white/10 px-2 py-1 rounded">L</span>
                            <span>para leer la página</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
