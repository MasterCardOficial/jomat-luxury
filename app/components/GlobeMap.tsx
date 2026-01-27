"use client";

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, TrendingUp, X } from 'lucide-react';

const cities = [
    { name: "Bogotá", coordinates: [-74.0721, 4.7110], sales: 854, trending: true },
    { name: "Medellín", coordinates: [-75.5636, 6.2518], sales: 620, trending: true },
    { name: "Cali", coordinates: [-76.5320, 3.4516], sales: 485, trending: false },
    { name: "Barranquilla", coordinates: [-74.7993, 10.9685], sales: 410, trending: false },
    { name: "Cartagena", coordinates: [-75.4832, 10.3910], sales: 390, trending: true },
];

let globalGlobeZoomed = false; // Persists across internal navigation, resets on page reload

export default function GlobeMap({ isDarkMode }: { isDarkMode: boolean }) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [viewState, setViewState] = useState<'globe' | 'zooming' | 'map'>('globe');
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const spinRef = useRef(true);

    useEffect(() => {
        if (map.current) return;
        let animationFrameId: number;

        // Initialize map with a slight offset to allow a "flight" effect
        map.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            center: [0, 10], // Start offset for better animation
            zoom: 1.5,
            pitch: 0,
            // @ts-ignore
            projection: 'globe',
            attributionControl: false,
            dragRotate: false,
            touchZoomRotate: false
        });

        // Check if already zoomed in this session
        if (globalGlobeZoomed) {
            spinRef.current = false;
            map.current.jumpTo({
                center: [-74.2973, 4.5709],
                zoom: 4.5
            });
            setViewState('map');
        }

        const zoomToColombia = () => {
            if (!map.current || globalGlobeZoomed) return;

            spinRef.current = false; // Stop the spin
            globalGlobeZoomed = true;
            setViewState('zooming');

            map.current.flyTo({
                center: [-74.2973, 4.5709],
                zoom: 4.5,
                speed: 1.2, // Slightly slower for more elegance
                curve: 1.5,
                essential: true
            });

            map.current.once('moveend', () => {
                setViewState('map');
                document.querySelectorAll('.marker-point').forEach((el: any) => {
                    el.style.opacity = '1';
                });
            });
        };

        map.current.on('load', () => {
            // Add markers
            cities.forEach((city) => {
                const el = document.createElement('div');
                el.className = 'relative flex items-center justify-center w-4 h-4 cursor-pointer marker-point transition-opacity duration-1000';
                if (globalGlobeZoomed) {
                    el.classList.remove('opacity-0');
                } else {
                    el.classList.add('opacity-0');
                }

                el.innerHTML = `
                    <span class="absolute w-full h-full rounded-full bg-[#D4AF37] opacity-75 animate-ripple"></span>
                    <span class="relative w-full h-full rounded-full bg-[#D4AF37] border-2 border-white shadow-[0_0_10px_#D4AF37]"></span>
                `;

                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setSelectedCity(city);
                    map.current?.flyTo({ center: city.coordinates as [number, number], zoom: 12, speed: 1.8, curve: 1 });
                });

                new maplibregl.Marker({ element: el })
                    .setLngLat(city.coordinates as [number, number])
                    .addTo(map.current!);
            });

            // Start animation loop
            const spin = () => {
                if (!map.current || !spinRef.current) return;
                const center = map.current.getCenter();
                center.lng -= 0.1;
                map.current.setCenter(center);
                animationFrameId = requestAnimationFrame(spin);
            };

            if (!globalGlobeZoomed) {
                spin(); // Start spin if not zoomed
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            zoomToColombia();
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.8 }); // Increased threshold to see spin longer

                if (mapContainer.current) {
                    observer.observe(mapContainer.current);
                }
            } else {
                // Ensure markers are visible if already zoomed
                setTimeout(() => {
                    document.querySelectorAll('.marker-point').forEach((el: any) => {
                        el.style.opacity = '1';
                    });
                }, 100);
            }
        });

        return () => {
            spinRef.current = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    return (
        <section className={`relative w-full h-full min-h-125 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* City Detail Popup */}
            <AnimatePresence>
                {selectedCity && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#0a0a0a] border border-[#D4AF37] p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full pointer-events-auto text-center"
                    >
                        <button onClick={() => setSelectedCity(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                        <h3 className="text-3xl font-playfair font-black text-[#D4AF37] mb-2">{selectedCity.name}</h3>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">Centro de Distribución</p>

                        <div className="flex justify-center gap-8 mb-8">
                            <div className="text-center">
                                <span className="block text-2xl font-black text-white">{selectedCity.sales}</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Envíos Mes</span>
                            </div>
                            {selectedCity.trending && (
                                <div className="text-center">
                                    <span className="text-2xl font-black text-green-500 flex justify-center items-center gap-1"><TrendingUp size={20} /> High</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Demanda</span>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setSelectedCity(null)} className="w-full py-3 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors">Cerrar Detalle</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
