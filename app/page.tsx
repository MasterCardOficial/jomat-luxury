"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    ShoppingBag, Heart, Search, Menu, X, Star, ChevronRight, Truck, ShieldCheck, Zap,
    MessageCircle, ArrowUp, Check, Facebook, Instagram, Twitter, Clock, ArrowRight,
    Minus, Plus, Trash2, Gift, Award, Smartphone, Info, ChevronDown, Filter, SlidersHorizontal,
    Users, TrendingUp, AlertTriangle, XCircle, DollarSign, Tag, Quote, MapPin, User, RotateCcw, Sparkles, Lock, Mail, Phone, Youtube, Package,
    CreditCard, Banknote, Building2, Wallet, Shield, Bell, Home, ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence, useInView, animate, useScroll, useSpring } from 'framer-motion';
import GlobeMap from './components/GlobeMap';
import AccessibilityMenu from './components/AccessibilityMenu';
import AuthModals from './components/AuthModals';

// Detectar dispositivos móviles para desactivar animaciones pesadas
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// --- DATA: PRODUCTOS ---
const PRODUCTS = [
    {
        id: 1,
        name: "Invicta Pro Diver Gold",
        brand: "Invicta",
        category: "Relojes",
        price: 899000,
        originalPrice: 1499000,
        retailPrice: 2100000,
        occasion: ["Gala", "Diario"],
        stock: 12,
        badge: "MÁS VENDIDO",
        badgeColor: "bg-orange-500",
        rating: 4.9,
        reviews: 347,
        stockStatus: "En stock",
        stockLimit: 0,
        viewers: 6,
        discount: 40,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585123334904-845d60e97a29?auto=format&fit=crop&q=80&w=800"
        ],
        description: "La excelencia del buceo se encuentra con la elegancia del oro. Este Invicta Pro Diver no es solo un reloj, es una declaración de éxito. Diseñado para conquistar profundidades mientras mantiene un estilo sofisticado que brilla en cualquier evento. El movimiento automático japonés NH35A garantiza precisión suiza a precio accesible.",
        features: [
            "Resistencia al agua profesional 200m (20 ATM)",
            "Movimiento automático japonés NH35A de 24 joyas",
            "Cristal Flame Fusion resistente a rayones",
            "Bisel unidireccional con marcadores luminosos",
            "Corona de rosca para máxima hermeticidad",
            "Manecillas e índices con Super-LumiNova",
            "Brazalete de acero inoxidable 316L con cierre desplegable",
            "Caja con baño de oro 18k auténtico"
        ],
        specs: { 
            "Material de Caja": "Acero Inoxidable 316L con baño 18k",
            "Diámetro": "40mm",
            "Grosor": "13mm",
            "Peso": "185g",
            "Cristal": "Flame Fusion Anti-reflejo",
            "Movimiento": "Automático NH35A (Japón)",
            "Reserva de Marcha": "41 horas",
            "Frecuencia": "21,600 vph",
            "Joyas": "24 rubíes sintéticos",
            "Resistencia al Agua": "200m / 20 ATM / 660ft",
            "Brazalete": "Acero Inoxidable 316L",
            "Ancho de Brazalete": "20mm",
            "Tipo de Cierre": "Desplegable con seguridad",
            "Funciones": "Horas, Minutos, Segundos, Fecha"
        },
        freeShipping: true,
        flashSale: true,
        flashSaleEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        authenticityCertificate: "INV-2026-001347",
        warranty: "2 años"
    },
    {
        id: 2,
        name: "Technomarine Cruise Blue",
        brand: "Technomarine",
        category: "Relojes",
        price: 1299000,
        originalPrice: 1599000,
        retailPrice: 2400000,
        occasion: ["Deportivo", "Diario"],
        stock: 8,
        badge: "NUEVO",
        badgeColor: "bg-blue-600",
        rating: 5.0,
        reviews: 189,
        stockStatus: "Solo 8 disponibles",
        stockLimit: 8,
        viewers: 7,
        discount: 19,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Inspirado en el espíritu náutico y la aventura marina. El Cruise combina materiales de alta gama como titanio grado 5 con un diseño vanguardista que desafía las convenciones. Su correa de silicona intercambiable te permite personalizar tu estilo según la ocasión, mientras el movimiento suizo Ronda garantiza precisión absoluta.",
        features: [
            "Correa de silicona hipoalergénica ultra-resistente",
            "Sistema de biseles intercambiables patentado",
            "Caja de titanio grado 5 ultraligero",
            "Movimiento de cuarzo suizo Ronda",
            "Cristal de zafiro con tratamiento AR",
            "Resistencia al agua 200m certificada",
            "3 correas intercambiables incluidas",
            "Sistema quick-release sin herramientas"
        ],
        specs: { 
            "Material de Caja": "Titanio Grado 5",
            "Diámetro": "45mm",
            "Grosor": "14.5mm",
            "Peso": "95g (ultraligero)",
            "Cristal": "Zafiro Anti-reflejo",
            "Movimiento": "Cuarzo Suizo Ronda 715",
            "Precisión": "±15 segundos/mes",
            "Vida de Batería": "3 años",
            "Resistencia al Agua": "200m / 20 ATM",
            "Correa": "Silicona Hipoalergénica",
            "Ancho de Correa": "22mm",
            "Sistema de Cambio": "Quick-Release",
            "Colores Incluidos": "Azul, Negro, Naranja",
            "Funciones": "Horas, Minutos, Segundos, Fecha, Bisel Giratorio"
        },
        freeShipping: true,
        flashSale: false,
        authenticityCertificate: "TCH-2026-008921",
        warranty: "2 años"
    },
    {
        id: 4,
        name: "Casio G-Shock Black",
        brand: "Casio",
        category: "Relojes",
        price: 499000,
        originalPrice: 699000,
        retailPrice: 850000,
        occasion: ["Deportivo", "Aventura"],
        stock: 25,
        badge: "OFERTA",
        badgeColor: "bg-red-600",
        rating: 4.8,
        reviews: 523,
        stockStatus: "En stock",
        stockLimit: 0,
        viewers: 8,
        discount: 29,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800"
        ],
        description: "La resistencia absoluta. El GA-2100 redefine el minimalismo con la durabilidad legendaria de G-Shock. Conocido como 'CasiOak', este modelo combina la estructura resistente a impactos con un diseño octagonal elegante inspirado en relojes de lujo. Perfecto para quien busca indestructibilidad sin sacrificar estilo.",
        features: [
            "Estructura resistente a impactos G-SHOCK",
            "Resistencia al agua 200m para natación",
            "Iluminación LED de doble cara",
            "Caja ultradelgada de solo 11.8mm",
            "Hora mundial 31 zonas horarias",
            "5 alarmas diarias + señal horaria",
            "Cronómetro 1/100 seg - 24 horas",
            "Batería de 3 años de duración"
        ],
        specs: { 
            "Material de Caja": "Resina Carbon Core Guard",
            "Diámetro": "45.4mm",
            "Grosor": "11.8mm (ultra-fino)",
            "Peso": "51g (ultraligero)",
            "Cristal": "Mineral resistente a rayones",
            "Movimiento": "Análogo-Digital Cuarzo",
            "Precisión": "±15 segundos/mes",
            "Vida de Batería": "3 años (CR2016)",
            "Resistencia al Agua": "200m / 20 ATM",
            "Correa": "Resina reforzada",
            "Ancho de Correa": "25mm",
            "Resistencia a Impactos": "Certificada G-SHOCK",
            "Iluminación": "LED Super Illuminator",
            "Funciones": "Hora Mundial, Cronómetro, Timer, 5 Alarmas, Calendario Automático"
        },
        freeShipping: true,
        flashSale: true,
        flashSaleEndsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        authenticityCertificate: "CAS-2026-005234",
        warranty: "2 años"
    },
    {
        id: 10,
        name: "Reloj Clásico Dorado Premium",
        brand: "JoMat Collection",
        category: "Relojes",
        price: 799000,
        originalPrice: 999000,
        retailPrice: 1500000,
        occasion: ["Gala", "Regalo"],
        stock: 5,
        badge: "EXCLUSIVO",
        badgeColor: "bg-purple-600",
        rating: 4.9,
        reviews: 156,
        stockStatus: "Solo 5 disponibles",
        stockLimit: 5,
        viewers: 5,
        discount: 20,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Elegancia atemporal para el caballero moderno. Una pieza de colección exclusiva de JoMat que combina el refinamiento clásico con tecnología japonesa de precisión. Su diseño ultra-fino de apenas 7mm lo hace perfecto para usar bajo la manga de una camisa de vestir, mientras el acabado dorado pulido capta la luz con sofisticación.",
        features: [
            "Diseño ultra-fino de solo 7mm de grosor",
            "Acero quirúrgico 316L hipoalergénico",
            "Movimiento de cuarzo japonés Miyota",
            "Cristal de zafiro resistente a rayones",
            "Numerales romanos grabados a mano",
            "Acabado PVD dorado 5 micras",
            "Correa de cuero genuino italiano",
            "Resistente al agua 50m (5 ATM)"
        ],
        specs: { 
            "Material de Caja": "Acero Quirúrgico 316L",
            "Diámetro": "40mm",
            "Grosor": "7mm (ultra-fino)",
            "Peso": "65g con correa",
            "Cristal": "Zafiro Anti-reflejo",
            "Movimiento": "Cuarzo Japonés Miyota 2035",
            "Precisión": "±20 segundos/mes",
            "Vida de Batería": "3 años (SR621SW)",
            "Resistencia al Agua": "50m / 5 ATM",
            "Correa": "Cuero Genuino Italiano",
            "Ancho de Correa": "20mm",
            "Acabado": "PVD Dorado 5 micras",
            "Tipo de Cierre": "Hebilla clásica de acero",
            "Funciones": "Horas, Minutos, Segundos"
        },
        freeShipping: true,
        authenticityCertificate: "JMC-2026-CLD156",
        warranty: "3 años"
    },
    {
        id: 6,
        name: "G-Shock Digital Sport",
        brand: "Casio",
        category: "Relojes",
        price: 399000,
        originalPrice: 549000,
        retailPrice: 700000,
        occasion: ["Deportivo", "Diario"],
        stock: 3,
        badge: "OFERTA",
        badgeColor: "bg-red-600",
        rating: 4.7,
        reviews: 412,
        stockStatus: "Solo 3 disponibles",
        stockLimit: 3,
        viewers: 9,
        discount: 27,
        image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1553531796-dba46c5ace20?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Perfecto para la aventura diaria. Precisión atómica y estructura a prueba de todo. Este G-Shock digital clásico ha acompañado a aventureros durante décadas. Con sincronización atómica vía radio, nunca necesitarás ajustar la hora. La estructura resistente a impactos protege el módulo interno de cualquier caída o golpe.",
        features: [
            "Sincronización de hora atómica por radio",
            "Estructura resistente a impactos G-SHOCK",
            "Resistencia al agua 200m profesional",
            "Iluminación LED Electro-luminiscente",
            "Cronómetro 1/100 seg con split",
            "Timer de cuenta regresiva 24 horas",
            "5 alarmas diarias multifunción",
            "Batería solar con 10 meses de reserva"
        ],
        specs: { 
            "Material de Caja": "Resina reforzada con fibra",
            "Diámetro": "48.9mm",
            "Grosor": "16.3mm",
            "Peso": "72g",
            "Cristal": "Mineral resistente",
            "Movimiento": "Digital Cuarzo Multi-banda 6",
            "Recepción": "6 estaciones de radio mundial",
            "Precisión": "±15 segundos/mes (sin señal)",
            "Energía": "Solar + Batería CR2025",
            "Autonomía": "10 meses sin exposición",
            "Resistencia al Agua": "200m / 20 ATM",
            "Correa": "Resina ultra-duradera",
            "Ancho de Correa": "25.6mm",
            "Temperatura Operativa": "-20°C a 60°C",
            "Funciones": "Hora Mundial 31 ciudades, Cronómetro, Timer, 5 Alarmas, Calendario Perpetuo"
        },
        freeShipping: false,
        authenticityCertificate: "CAS-2026-GW412",
        warranty: "2 años"
    },
    {
        id: 3,
        name: "Lattafa Khamrah 100ml",
        brand: "Lattafa",
        category: "Perfumes",
        price: 249000,
        originalPrice: 349000,
        retailPrice: 450000,
        occasion: ["Gala", "Noche", "Regalo"],
        stock: 15,
        badge: "MÁS VENDIDO",
        badgeColor: "bg-orange-500",
        rating: 4.8,
        reviews: 678,
        stockStatus: "En stock",
        stockLimit: 0,
        viewers: 10,
        discount: 29,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Obra maestra olfativa inspirada en la opulencia árabe. Una explosión de especias dulces con vainilla, canela y oud que evoluciona durante horas en tu piel. Perfecto para ocasiones especiales donde quieres dejar huella.",
        features: [
            "Duración excepcional de 10-12 horas", 
            "Estela potente que perdura todo el día", 
            "Presentación de lujo con frasco artesanal", 
            "Ideal para clima frío y eventos nocturnos",
            "Frasco recargable de vidrio premium",
            "Certificado de autenticidad incluido"
        ],
        specs: { 
            "Volumen": "100ml", 
            "Concentración": "Eau de Parfum (EDP)",
            "Familia Olfativa": "Oriental Especiado",
            "Notas de Salida": "Canela, Nuez Moscada, Cardamomo",
            "Notas de Corazón": "Dátiles, Praliné, Tuberosa",
            "Notas de Fondo": "Vainilla, Tonka, Benjuí, Oud, Ámbar",
            "Género": "Unisex",
            "Duración": "10-12 horas",
            "Estela": "Fuerte",
            "Temporada Ideal": "Otoño/Invierno",
            "Ocasión": "Noche, Eventos Formales"
        },
        freeShipping: true,
        authenticityCertificate: "LAT-2026-KH100",
        warranty: "Satisfacción garantizada"
    },
    {
        id: 5,
        name: "Moschino Toy Boy 100ml",
        brand: "Moschino",
        category: "Perfumes",
        price: 299000,
        originalPrice: 399000,
        retailPrice: 550000,
        occasion: ["Diario", "Noche"],
        stock: 20,
        badge: "NUEVO",
        badgeColor: "bg-blue-600",
        rating: 4.9,
        reviews: 234,
        stockStatus: "En stock",
        stockLimit: 0,
        viewers: 6,
        discount: 25,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Irónico y desafiante. Para el hombre moderno que no tiene miedo de destacar. Un aroma fresco-especiado con un twist juguetón que combina la elegancia de la rosa con la intensidad de la pimienta rosa.",
        features: [
            "Fresco y especiado con carácter único",
            "Diseño icónico en forma de oso",
            "8-10 horas de duración constante",
            "Perfecto para día y noche",
            "Aroma distintivo y memorable",
            "Frasco coleccionable de diseñador"
        ],
        specs: { 
            "Volumen": "100ml",
            "Concentración": "Eau de Parfum (EDP)",
            "Familia Olfativa": "Aromático Especiado",
            "Notas de Salida": "Pera, Rosa, Pimienta Rosa, Clavo",
            "Notas de Corazón": "Magnolia, Lino, Rosa",
            "Notas de Fondo": "Ámbar, Sándalo, Vetiver, Cachemira",
            "Género": "Masculino",
            "Duración": "8-10 horas",
            "Estela": "Moderada-Fuerte",
            "Temporada Ideal": "Primavera/Verano",
            "Ocasión": "Casual, Noche, Citas"
        },
        freeShipping: true,
        authenticityCertificate: "MOS-2026-TB100",
        warranty: "Satisfacción garantizada"
    },
    {
        id: 7,
        name: "Perfume Luxury Gold 50ml",
        brand: "JoMat Exclusive",
        category: "Perfumes",
        price: 399000,
        originalPrice: 499000,
        retailPrice: 750000,
        occasion: ["Gala", "Exclusivo"],
        stock: 7,
        badge: "EDICIÓN LIMITADA",
        badgeColor: "bg-yellow-600",
        rating: 5.0,
        reviews: 89,
        stockStatus: "Solo 7 disponibles",
        stockLimit: 7,
        viewers: 4,
        discount: 20,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Nuestra creación insignia. Oro líquido en tu piel. Una sinfonía aromática que combina las notas más lujosas del mundo: Oud del sudeste asiático, Azafrán persa y Cuero italiano. Exclusividad absoluta en cada gota.",
        features: [
            "Edición numerada limitada a 100 unidades",
            "Duración excepcional de 14+ horas",
            "Frasco artesanal con detalles en oro 24k",
            "Estuche de madera lacada incluido",
            "Certificado de autenticidad firmado",
            "Aroma de poder y distinción absoluta",
            "Ingredientes de origen sostenible"
        ],
        specs: { 
            "Volumen": "50ml",
            "Concentración": "Extrait de Parfum (20%)",
            "Familia Olfativa": "Oriental Amaderado",
            "Notas de Salida": "Azafrán, Bergamota, Cardamomo Verde",
            "Notas de Corazón": "Oud Camboyano, Rosa Damascena, Iris",
            "Notas de Fondo": "Cuero, Ámbar Gris, Sándalo Mysore, Almizcle",
            "Género": "Unisex Premium",
            "Duración": "14+ horas",
            "Estela": "Muy Fuerte",
            "Temporada Ideal": "Todo el Año",
            "Ocasión": "Eventos VIP, Galas, Ejecutivo",
            "Edición": "Limitada - Solo 100 unidades"
        },
        freeShipping: true,
        authenticityCertificate: "JMX-2026-LG050",
        warranty: "Garantía de por vida"
    }
];

const BRANDS_LIST = ["Invicta", "Technomarine", "Casio", "G-Shock", "Lattafa", "Moschino", "Amouage"];

// --- MODERACIÓN DE CONTENIDO ---
const FORBIDDEN_WORDS = [
    "gonorrea", "malparido", "hijueputa", "pirobo", "carechimba", "guevon", "marica", "perra", "puta", "mierda",
    "estupido", "idiota", "imbecil", "basura", "asco", "fuck", "shit", "bitch", "nazi", "racista"
];

// --- CONSTANTES DE CONFIGURACIÓN ---
const MAX_CART_QUANTITY = 10;
const MAX_NOTIFICATIONS = 3;
const NOTIFICATION_DURATION = 3000;
const SESSION_DURATION = 60 * 60 * 1000; // 1 hora
const NOTIFICATION_INTERVAL = 180000; // 3 minutos
const VIEW_TRANSITION_DURATION = 250; // Reducido para transiciones más rápidas
const LOADING_SCREEN_DURATION = 200; // Reducido para feedback más inmediato

// Función para validar contenido
const validateContent = (text: string): { isValid: boolean; message?: string } => {
    const lowerText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const foundWord = FORBIDDEN_WORDS.find(word => lowerText.includes(word));
    if (foundWord) {
        return { isValid: false, message: "Tu mensaje contiene lenguaje inapropiado. Por favor, mantén un tono respetuoso." };
    }
    return { isValid: true };
};

export default function App() {
    const [view, setView] = useState<string>('home');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [cart, setCart] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [shopFilter, setShopFilter] = useState<{ category: string | null, offersOnly: boolean }>({ category: null, offersOnly: false });
    const [isLoadingView, setIsLoadingView] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [currency, setCurrency] = useState<'COP' | 'USD' | 'EUR'>('COP');
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [stockNotifications, setStockNotifications] = useState<{productId: number, email: string}[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [onlineVisitors, setOnlineVisitors] = useState(287);

    // --- PERSISTENCIA DE FAVORITOS Y SESIÓN ---
    useEffect(() => {
        const savedFavorites = localStorage.getItem('jomat_favorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

        const savedCurrency = localStorage.getItem('jomat_currency');
        if (savedCurrency) setCurrency(savedCurrency as any);

        const savedSearchHistory = localStorage.getItem('jomat_search_history');
        if (savedSearchHistory) setSearchHistory(JSON.parse(savedSearchHistory));

        const savedStockNotifications = localStorage.getItem('jomat_stock_notifications');
        if (savedStockNotifications) setStockNotifications(JSON.parse(savedStockNotifications));

        const savedSession = localStorage.getItem('jomat_session');
        if (savedSession) {
            try {
                const { user, timestamp } = JSON.parse(savedSession);
                const isExpired = Date.now() - timestamp > SESSION_DURATION;

                if (!isExpired) {
                    setIsLoggedIn(true);
                    setUserData(user);
                } else {
                    localStorage.removeItem('jomat_session');
                }
            } catch (e) {
                console.error("Error al restaurar sesión", e);
            }
        }
    }, []);

    // --- GUARDAR MONEDA EN LOCALSTORAGE ---
    useEffect(() => {
        localStorage.setItem('jomat_currency', currency);
    }, [currency]);

    // --- GUARDAR HISTORIAL DE BÚSQUEDA ---
    useEffect(() => {
        localStorage.setItem('jomat_search_history', JSON.stringify(searchHistory));
    }, [searchHistory]);

    // --- GUARDAR NOTIFICACIONES DE STOCK ---
    useEffect(() => {
        localStorage.setItem('jomat_stock_notifications', JSON.stringify(stockNotifications));
    }, [stockNotifications]);

    const addSearchToHistory = (query: string) => {
        if (query.trim().length < 2) return;
        const normalized = query.trim().toLowerCase();
        setSearchHistory(prev => {
            const filtered = prev.filter(q => q.toLowerCase() !== normalized);
            return [query.trim(), ...filtered].slice(0, 10); // Máximo 10 búsquedas
        });
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('jomat_search_history');
    };

    const notifyWhenAvailable = (productId: number, email: string) => {
        setStockNotifications(prev => {
            const exists = prev.find(n => n.productId === productId && n.email === email);
            if (exists) return prev;
            return [...prev, { productId, email }];
        });
        showNotification('✓ Te notificaremos cuando esté disponible');
    };

    const handleLoginSuccess = (user: any) => {
        setIsLoggedIn(true);
        setUserData(user);
        setNotifications(prev => [...prev, `Bienvenido, ${user.name}`]);

        // Guardar en localStorage con timestamp
        localStorage.setItem('jomat_session', JSON.stringify({
            user,
            timestamp: Date.now()
        }));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem('jomat_session');
        setNotifications(prev => [...prev, "Sesión cerrada correctamente"]);
    };

    // --- LÓGICA DE DIVISAS ---
    const exchangeRates = { COP: 1, USD: 1 / 4000, EUR: 1 / 4300 };
    const formatPrice = (priceCOP: number) => {
        const converted = priceCOP * exchangeRates[currency];
        return new Intl.NumberFormat(currency === 'COP' ? 'es-CO' : 'en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: currency === 'COP' ? 0 : 2
        }).format(converted);
    };

    useEffect(() => {
        localStorage.setItem('jomat_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.qty), 0), [cart]);
    const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);

    useEffect(() => {
        const handleHashChange = () => {
            // Robust parsing: handles both '#/view' and '#view'
            const hash = window.location.hash.replace(/^#\/?/, '');
            if (!hash || hash === 'home') {
                setView('home');
                setSelectedProduct(null);
            } else if (hash === 'shop') {
                setView('shop');
                setShopFilter({ category: null, offersOnly: false });
                setSelectedProduct(null);
            } else if (hash === 'relojes') {
                setView('shop');
                setShopFilter({ category: 'Relojes', offersOnly: false });
                setSelectedProduct(null);
            } else if (hash === 'perfumes') {
                setView('shop');
                setShopFilter({ category: 'Perfumes', offersOnly: false });
                setSelectedProduct(null);
            } else if (hash === 'ofertas') {
                setView('shop');
                setShopFilter({ category: null, offersOnly: true });
                setSelectedProduct(null);
            } else if (hash.startsWith('product/')) {
                const id = parseInt(hash.split('/')[1]);
                const prod = PRODUCTS.find(p => p.id === id);
                if (prod) {
                    setSelectedProduct(prod);
                    setView('product');
                } else {
                    setView('home');
                }
            } else if (hash === 'checkout') {
                setView('checkout');
            } else if (hash === 'history') {
                setView('history');
            } else if (hash === 'about') {
                setView('about');
            } else if (hash === 'tracking') {
                setView('tracking');
            } else if (hash === 'favorites') {
                setView('favorites');
            } else if (['faq', 'shipping', 'returns', 'contact', 'terms', 'privacy', 'warranty'].includes(hash)) {
                setView(hash);
            }
        };

        window.addEventListener('popstate', handleHashChange);
        window.addEventListener('hashchange', handleHashChange); // FIX: Listen for hash changes
        handleHashChange(); // Handle initial load

        return () => {
            window.removeEventListener('popstate', handleHashChange);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Actualizar título de página según la vista
    useEffect(() => {
        let title = 'JoMat Luxury';
        
        if (view === 'home') {
            title = 'JoMat Luxury - Relojes y Perfumes de Alta Gama';
        } else if (view === 'shop') {
            if (shopFilter.category === 'Relojes') {
                title = 'Relojes de Lujo - JoMat Luxury';
            } else if (shopFilter.category === 'Perfumes') {
                title = 'Perfumes de Alta Gama - JoMat Luxury';
            } else if (shopFilter.offersOnly) {
                title = 'Ofertas Especiales - JoMat Luxury';
            } else {
                title = 'Catálogo Completo - JoMat Luxury';
            }
        } else if (view === 'product' && selectedProduct) {
            title = `${selectedProduct.name} - JoMat Luxury`;
        } else if (view === 'checkout') {
            title = 'Finalizar Pedido - JoMat Luxury';
        } else if (view === 'favorites') {
            title = 'Mis Favoritos - JoMat Luxury';
        } else if (view === 'history') {
            title = 'Historial de Compras - JoMat Luxury';
        } else if (view === 'about') {
            title = 'Nosotros - JoMat Luxury';
        } else if (view === 'tracking') {
            title = 'Rastrear Pedido - JoMat Luxury';
        } else if (view === 'faq') {
            title = 'Preguntas Frecuentes - JoMat Luxury';
        } else if (view === 'shipping') {
            title = 'Envíos y Entregas - JoMat Luxury';
        } else if (view === 'returns') {
            title = 'Cambios y Devoluciones - JoMat Luxury';
        } else if (view === 'contact') {
            title = 'Contacto - JoMat Luxury';
        } else if (view === 'terms') {
            title = 'Términos y Condiciones - JoMat Luxury';
        } else if (view === 'privacy') {
            title = 'Política de Privacidad - JoMat Luxury';
        } else if (view === 'warranty') {
            title = 'Garantía - JoMat Luxury';
        }
        
        document.title = title;
    }, [view, selectedProduct, shopFilter]);

    const navigateTo = (newView: string, product: any = null) => {
        // Cerrar todos los modals y sidebars al navegar
        setIsCartOpen(false);
        setIsMenuOpen(false);
        setIsAuthModalOpen(false);
        
        setIsLoadingView(true);
        // Step 1: Wait for screen to go black
        setTimeout(() => {
            let hash = `#/${newView}`;

            // Custom handling for category filters
            if (newView === 'relojes') hash = '#/relojes';
            if (newView === 'perfumes') hash = '#/perfumes';
            if (newView === 'ofertas') hash = '#/ofertas';
            if (newView === 'shop') hash = '#/shop';

            if (newView === 'product' && product) {
                hash = `#/${newView}/${product.id}`;
            }

            if (window.location.hash !== hash) {
                window.history.pushState(null, '', hash);
            }

            // Set local state while black screen is visible
            if (['relojes', 'perfumes', 'ofertas', 'shop'].includes(newView)) {
                setView('shop');
                if (newView === 'relojes') setShopFilter({ category: 'Relojes', offersOnly: false });
                else if (newView === 'perfumes') setShopFilter({ category: 'Perfumes', offersOnly: false });
                else if (newView === 'ofertas') setShopFilter({ category: null, offersOnly: true });
                else setShopFilter({ category: null, offersOnly: false });
            } else {
                setView(newView);
            }

            if (product) setSelectedProduct(product);
            else if (newView !== 'product') setSelectedProduct(null);

            // Scroll instantáneo al inicio (no smooth para que sea inmediato)
            window.scrollTo({ 
                top: 0, 
                behavior: 'instant' as ScrollBehavior
            });
            
            // También asegurar scroll inmediato en el contenedor principal
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.scrollTop = 0;
            }
            
            // Forzar scroll en body por si acaso
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            // Step 2: Remove black screen after view is ready
            setTimeout(() => {
                setIsLoadingView(false);
            }, LOADING_SCREEN_DURATION);
        }, VIEW_TRANSITION_DURATION); // VIEW_TRANSITION_DURATION ms is enough to cover the screen
    };

    const navigateToProduct = (product: any) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            return [product, ...filtered].slice(0, 10);
        });
        navigateTo('product', product);
    };

    useEffect(() => {
        const notificationInterval = setInterval(() => {
            const names = ["Andrés", "Camila", "Juan", "Sofía", "Diego", "Valentina"];
            const cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena de Indias"];
            const products = PRODUCTS.map(p => p.name);
            const newNotif = `${names[Math.floor(Math.random() * names.length)]} de ${cities[Math.floor(Math.random() * cities.length)]} compró ${products[Math.floor(Math.random() * products.length)]}`;
            showNotification(newNotif);
        }, NOTIFICATION_INTERVAL);
        return () => clearInterval(notificationInterval);
    }, []);

    const showNotification = (msg: string) => {
        setNotifications(prev => {
            const newNotifications = [...prev, msg];
            // Mantener máximo MAX_NOTIFICATIONS notificaciones visibles
            return newNotifications.slice(-MAX_NOTIFICATIONS);
        });
        setTimeout(() => setNotifications(prev => prev.slice(1)), NOTIFICATION_DURATION);
    };

    const addToCart = (product: any) => {
        // Verificar si el producto tiene stock
        if (product.stock <= 0) {
            showNotification(`${product.name} está agotado`);
            return;
        }

        // Verificar si ya está en el carrito y validar límites
        const existingItem = cart.find(p => p.id === product.id);
        if (existingItem) {
            // Validar límite máximo por producto
            if (existingItem.qty >= MAX_CART_QUANTITY) {
                showNotification(`Máximo ${MAX_CART_QUANTITY} unidades por producto`);
                return;
            }
            // Validar stock disponible
            if (existingItem.qty >= product.stock) {
                showNotification(`Solo hay ${product.stock} unidades disponibles`);
                return;
            }
        }

        setCart(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        showNotification(`Añadido al carrito: ${product.name}`);
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        const product = cart.find(p => p.id === id);
        if (product && window.confirm(`¿Eliminar ${product.name} del carrito?`)) {
            setCart(prev => prev.filter(p => p.id !== id));
            showNotification(`${product.name} eliminado del carrito`);
        }
    };

    const updateQty = (id: number, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p.id === id) {
                const newQty = p.qty + delta;
                
                // No permitir cantidad menor a 1
                if (newQty < 1) {
                    return p;
                }
                
                // Validar límite máximo por producto
                if (newQty > MAX_CART_QUANTITY) {
                    showNotification(`Máximo ${MAX_CART_QUANTITY} unidades por producto`);
                    return p;
                }
                
                // Validar stock disponible
                const product = PRODUCTS.find(prod => prod.id === id);
                if (product && newQty > product.stock) {
                    showNotification(`Solo hay ${product.stock} unidades disponibles`);
                    return p;
                }
                
                return { ...p, qty: newQty };
            }
            return p;
        }));
    };

    const toggleFavorite = (product: any) => {
        if (favorites.some(f => f.id === product.id)) {
            setFavorites(prev => prev.filter(f => f.id !== product.id));
            showNotification(`Eliminado de favoritos: ${product.name}`);
        } else {
            setFavorites(prev => [...prev, product]);
            showNotification(`Añadido a favoritos: ${product.name}`);
        }
    };

    const handleWhatsAppCheckout = (customerData?: any) => {
        if (cart.length === 0) {
            showNotification('El carrito está vacío');
            return;
        }
        
        const itemsText = cart.map(item => {
            const itemTotal = item.price * item.qty;
            return `• ${item.name} (x${item.qty}) - ${formatPrice(itemTotal)}`;
        }).join('%0A');
        
        // Calcular subtotal y descuento si aplica
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discount = customerData?.discountInfo;
        const discountAmount = discount ? (subtotal * discount.percentage) / 100 : 0;
        const finalTotal = subtotal - discountAmount;
        
        const totalFormatted = formatPrice(finalTotal);
        
        // Incluir datos del cliente si están disponibles
        let customerInfo = '';
        if (customerData) {
            customerInfo = `%0A━━━━━━━━━━━━━━━━━━━━━%0A` +
                `*📋 DATOS DEL CLIENTE*%0A` +
                `━━━━━━━━━━━━━━━━━━━━━%0A` +
                `👤 Nombre: ${customerData.nombre} ${customerData.apellidos}%0A` +
                `🆔 Cédula: ${customerData.cedula}%0A` +
                `📱 WhatsApp: ${customerData.tel}%0A%0A` +
                `*📍 DIRECCIÓN DE ENVÍO*%0A` +
                `━━━━━━━━━━━━━━━━━━━━━%0A` +
                `🌎 País: ${customerData.pais}%0A` +
                `🏛️ Departamento: ${customerData.departamento}%0A` +
                `🏙️ Ciudad: ${customerData.ciudad}%0A` +
                (customerData.codigoPostal ? `📮 Código Postal: ${customerData.codigoPostal}%0A` : '') +
                `🏠 Dirección: ${customerData.direccion}%0A` +
                (customerData.apartamento ? `🚪 Apto/Casa: ${customerData.apartamento}%0A` : '') +
                `%0A*💳 MÉTODO DE PAGO*%0A` +
                `━━━━━━━━━━━━━━━━━━━━━%0A` +
                `${customerData.metodoPago}%0A`;
            
            // Agregar información de regalo si aplica
            if (customerData.esRegalo) {
                customerInfo += `%0A*🎁 ES UN REGALO*%0A` +
                    `━━━━━━━━━━━━━━━━━━━━━%0A` +
                    `👥 Destinatario: ${customerData.nombreDestinatario}%0A` +
                    (customerData.mensajeRegalo ? `💌 Mensaje: "${customerData.mensajeRegalo}"%0A` : '');
            }
            
            // Agregar nota especial si existe
            if (customerData.notaEspecial) {
                customerInfo += `%0A*📝 INSTRUCCIONES ESPECIALES*%0A` +
                    `━━━━━━━━━━━━━━━━━━━━━%0A` +
                    `${customerData.notaEspecial}%0A`;
            }
            
            customerInfo += `%0A━━━━━━━━━━━━━━━━━━━━━%0A%0A`;
        }
        
        // Construir desglose de precios
        let priceBreakdown = `%0A━━━━━━━━━━━━━━━━━━━━━%0A*💰 DESGLOSE DE PRECIOS*%0A━━━━━━━━━━━━━━━━━━━━━%0A`;
        priceBreakdown += `Subtotal: ${formatPrice(subtotal)}%0A`;
        
        // Agregar información de descuento si aplica
        if (discount) {
            priceBreakdown += `%0A*🎉 DESCUENTO APLICADO*%0A`;
            priceBreakdown += `Código: ${discount.code}%0A`;
            priceBreakdown += `Descuento: -${discount.percentage}%%0A`;
            priceBreakdown += `Ahorro: -${formatPrice(discountAmount)}%0A%0A`;
        }
        
        priceBreakdown += `Envío: GRATIS 🚚%0A`;
        priceBreakdown += `━━━━━━━━━━━━━━━━━━━━━%0A`;
        priceBreakdown += `*TOTAL: ${totalFormatted}*%0A`;
        priceBreakdown += `━━━━━━━━━━━━━━━━━━━━━%0A`;
        
        const message = `🌟 *NUEVO PEDIDO JOMAT LUXURY* 🌟%0A%0A${itemsText}${priceBreakdown}${customerInfo}`;
        window.open(`https://wa.me/573046661245?text=${message}`, '_blank');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#FFFFFF] text-[#111111]'} font-montserrat selection:bg-[#D4AF37] selection:text-black transition-colors duration-500`}>
            {/* Skip to Content Link para accesibilidad */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#D4AF37] focus:text-black focus:px-6 focus:py-3 focus:rounded-xl focus:font-black focus:uppercase focus:tracking-widest focus:text-xs focus:shadow-2xl">Saltar al contenido principal</a>
            
            <AuthModals
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                isDarkMode={isDarkMode}
                onSuccess={handleLoginSuccess}
            />
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-[#D4AF37] z-[2000] origin-left"
                style={{ scaleX }}
            />

            {/* Luxury View Loader */}
            <AnimatePresence mode="wait">
                {isLoadingView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[3000] bg-black flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.1, opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-8 text-center"
                        >
                            <h2 className="text-6xl md:text-7xl font-playfair font-black tracking-widest text-[#D4AF37] mb-2 leading-none">JOMAT <span className="text-white">LUXURY</span></h2>
                            <p className="text-[10px] md:text-xs font-black tracking-[0.4em] text-white/50 uppercase">Tu estilo, tu tiempo, tu aroma.</p>
                        </motion.div>

                        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Navbar
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                favorites={favorites}
                cartCount={cartCount}
                setIsCartOpen={setIsCartOpen}
                setIsMenuOpen={setIsMenuOpen}
                navigateTo={navigateTo}
                onAuthClick={() => setIsAuthModalOpen(true)}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                currency={currency}
                setCurrency={setCurrency}
                formatPrice={formatPrice}
                products={PRODUCTS}
                searchHistory={searchHistory}
                addSearchToHistory={addSearchToHistory}
                clearSearchHistory={clearSearchHistory}
            />
            
            {/* Banner de Garantías Sticky */}
            <GuaranteesBanner isDarkMode={isDarkMode} />
            
            <main className="pt-16 md:pt-20 pb-20 md:pb-0" id="main-content">
                {view === 'home' && (
                    <>
                        <HeroSection navigateTo={navigateTo} isDarkMode={isDarkMode} />
                        <BrandsBar isDarkMode={isDarkMode} />
                        <StatsSection isDarkMode={isDarkMode} />
                        <ProblemSection isDarkMode={isDarkMode} />
                        <SolutionSection isDarkMode={isDarkMode} />
                        <GlobeMapSection isDarkMode={isDarkMode} />
                        <ExclusiveOffersSection isDarkMode={isDarkMode} addToCart={addToCart} formatPrice={formatPrice} />
                        <CatalogSection products={PRODUCTS} addToCart={addToCart} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} favorites={favorites} isDarkMode={isDarkMode} navigateTo={navigateTo} formatPrice={formatPrice} />
                        <TestimonialsSection isDarkMode={isDarkMode} />
                        <VipSection isDarkMode={isDarkMode} onAuthClick={() => setIsAuthModalOpen(true)} />
                        <FAQSection isDarkMode={isDarkMode} />
                    </>
                )}
                {view === 'shop' && (
                    <ShopPage products={PRODUCTS} addToCart={addToCart} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} favorites={favorites} isDarkMode={isDarkMode} initialFilter={shopFilter} formatPrice={formatPrice} />
                )}
                {view === 'product' && selectedProduct && (
                    <ProductDetails
                        product={selectedProduct}
                        addToCart={addToCart}
                        navigateToProduct={navigateToProduct}
                        relatedProducts={PRODUCTS.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
                        isDarkMode={isDarkMode}
                        navigateTo={navigateTo}
                        isLoggedIn={isLoggedIn}
                        onAuthClick={() => setIsAuthModalOpen(true)}
                        showNotification={(msg: string) => setNotifications(prev => [...prev, msg])}
                        formatPrice={formatPrice}
                        currency={currency}
                        setCurrency={setCurrency}
                        notifyWhenAvailable={notifyWhenAvailable}
                    />
                )}
                {view === 'checkout' && (
                    <CheckoutPage cart={cart} total={cartTotal} handleWhatsAppCheckout={handleWhatsAppCheckout} isDarkMode={isDarkMode} formatPrice={formatPrice} />
                )}
                {view === 'history' && (
                    <HistoryPage products={recentlyViewed} isDarkMode={isDarkMode} navigateToProduct={navigateToProduct} formatPrice={formatPrice} />
                )}
                {view === 'tracking' && (
                    <TrackingPage isDarkMode={isDarkMode} />
                )}
                {view === 'favorites' && (
                    <FavoritesPage products={favorites} isDarkMode={isDarkMode} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} addToCart={addToCart} formatPrice={formatPrice} navigateTo={navigateTo} />
                )}
                {view === 'about' && (
                    <AboutPage isDarkMode={isDarkMode} navigateTo={navigateTo} />
                )}
                {view === 'faq' && (
                    <FAQPage isDarkMode={isDarkMode} />
                )}
                {view === 'shipping' && (
                    <ShippingPage isDarkMode={isDarkMode} />
                )}
                {view === 'returns' && (
                    <ReturnsPage isDarkMode={isDarkMode} />
                )}
                {view === 'contact' && (
                    <ContactPage isDarkMode={isDarkMode} />
                )}
                {['terms', 'privacy', 'warranty'].includes(view) && (
                    <PolicyPage type={view as any} isDarkMode={isDarkMode} />
                )}
            </main>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} total={cartTotal} updateQty={updateQty} removeFromCart={removeFromCart} navigateTo={navigateTo} isDarkMode={isDarkMode} formatPrice={formatPrice} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigateTo={navigateTo} isDarkMode={isDarkMode} />
            <AnimatePresence>{notifications.map((n, i) => <Notification key={i} message={n} isDarkMode={isDarkMode} />)}</AnimatePresence>
            <AccessibilityMenu isGlobalDarkMode={isDarkMode} toggleGlobalDarkMode={() => setIsDarkMode(!isDarkMode)} />
            
            {/* Botón Flotante de WhatsApp */}
            <motion.a
                href="https://wa.me/573046661245?text=Hola%20JoMat%20Luxury!%20Necesito%20asesoría"
                target="_blank"
                rel="noopener noreferrer"
                initial={isMobile ? {} : { scale: 0, rotate: -180 }}
                animate={isMobile ? {} : { scale: 1, rotate: 0 }}
                whileHover={isMobile ? {} : { scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[60] group"
                aria-label="Contactar por WhatsApp"
            >
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-2xl shadow-2xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <h3 className="text-gray-900 font-semibold text-base mb-1">¿Necesitas ayuda?</h3>
                    <p className="text-gray-600 text-sm mb-3">Chatea con nosotros por WhatsApp y te atenderemos al instante.</p>
                    <div className="bg-[#25D366] text-white text-center py-2 px-4 rounded-lg font-medium text-sm">
                        Iniciar Chat
                    </div>
                    <span className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white"></span>
                </div>
                
                <div className="relative w-12 h-12 md:w-14 md:h-14">
                    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-2xl">
                        {/* Círculo verde de fondo */}
                        <circle cx="24" cy="24" r="24" fill="#25D366"/>
                        {/* Logo de WhatsApp */}
                        <path d="M24.0015 11.9996C17.3735 11.9996 12.0015 17.3716 12.0015 23.9996C12.0015 26.1396 12.5775 28.1436 13.5855 29.8776L12.0015 35.9996L18.3255 34.4496C19.9995 35.3556 21.9375 35.8776 24.0015 35.8776C30.6295 35.8776 36.0015 30.5056 36.0015 23.8776C36.0015 17.2496 30.6295 11.8776 24.0015 11.8776V11.9996ZM29.6055 28.5036C29.3535 29.2116 28.1895 29.7996 27.2835 29.9796C26.7135 30.0996 25.9575 30.1856 23.0415 28.9656C19.2975 27.3756 16.9575 23.5056 16.7775 23.2536C16.5975 23.0016 15.2655 21.2316 15.2655 19.3956C15.2655 17.5596 16.1895 16.6656 16.5015 16.3416C16.7535 16.0776 17.1255 15.9816 17.4735 15.9816C17.6055 15.9816 17.7255 15.9876 17.8335 15.9936C18.1455 16.0056 18.3015 16.0236 18.5055 16.4916C18.7575 17.0736 19.3575 18.9096 19.4295 19.0536C19.5015 19.1976 19.5615 19.3836 19.4535 19.6356C19.3575 19.8876 19.2855 20.0016 19.1055 20.2056C18.9255 20.4096 18.7575 20.5596 18.5775 20.7756C18.4095 20.9616 18.2295 21.1596 18.4335 21.4956C18.6375 21.8196 19.3515 22.9596 20.3895 23.8776C21.7335 24.9996 22.8015 25.3776 23.1735 25.5216C23.4255 25.6296 23.7375 25.6056 23.9535 25.3716C24.2295 25.0776 24.5175 24.6096 24.8175 24.1536C25.0215 23.8536 25.2855 23.8176 25.5735 23.9256C25.8615 24.0216 27.6855 24.9216 28.0095 25.0776C28.3215 25.2216 28.5375 25.2936 28.6095 25.4256C28.6815 25.5576 28.6815 26.1396 28.4295 26.8116L29.6055 28.5036Z" fill="white"/>
                    </svg>
                    {/* Efecto de pulso */}
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
                </div>
            </motion.a>

            <BottomNavBar 
                view={view}
                navigateTo={navigateTo}
                cartCount={cart.length}
                favoritesCount={favorites.length}
                setIsCartOpen={setIsCartOpen}
                setIsMenuOpen={setIsMenuOpen}
                isDarkMode={isDarkMode}
            />
        </div >
    );
}

function RecentlyViewedBar({ products, navigateToProduct, isDarkMode, formatPrice }: any) {
    if (products.length === 0) return null;
    return (
        <section className={`py-12 border-b transition-colors ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Continuar Viendo</h3>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {products.map((p: any) => (
                        <motion.div
                            key={p.id}
                            whileHover={{ y: -5 }}
                            onClick={() => navigateToProduct(p)}
                            className="flex-shrink-0 w-48 group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5">
                                <img src={p.image} loading="lazy" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                            </div>
                            <h4 className="text-[9px] font-black uppercase tracking-wider mb-1 line-clamp-1">{p.name}</h4>
                            <p className="text-[#D4AF37] text-[10px] font-black">{formatPrice(p.price)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// Helper Components placed OUTSIDE App
const Tooltip = React.memo(({ text, children }: { text: string, children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative flex flex-col items-center" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        className="absolute -bottom-10 z-50 px-3 py-1.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-wider rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
                    >
                        {text}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4AF37] rotate-45"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

function Navbar({ isDarkMode, setIsDarkMode, favorites, cartCount, setIsCartOpen, setIsMenuOpen, navigateTo, onAuthClick, isLoggedIn, onLogout, currency, setCurrency, formatPrice, products, searchHistory, addSearchToHistory, clearSearchHistory }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const searchResults = products.filter((p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim().length >= 2) {
            addSearchToHistory(query);
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} border-b border-[#D4AF37]/20`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main Header Row */}
                <div className="h-20 flex items-center justify-between">
                    {/* Logo / Brand Section */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-[#D4AF37] hover:scale-105 transition-transform"><Menu size={24} /></button>
                        <div onClick={() => navigateTo('home')} className="cursor-pointer group">
                            <div className="flex flex-col items-start">
                                <h1 className="font-playfair font-bold text-2xl md:text-[28px] tracking-[0.15em] leading-none">
                                    <span className="text-[#D4AF37]">JOMAT</span>
                                </h1>
                                <h2 className={`font-playfair font-medium text-lg md:text-xl tracking-[0.2em] -mt-0.5 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    LUXURY
                                </h2>
                                <span className={`text-[8px] md:text-[9px] tracking-[0.25em] uppercase font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}>
                                    Tu estilo, tu tiempo, tu aroma.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu - Center */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {[
                            { label: 'Inicio', view: 'home' },
                            { label: 'Catálogo', view: 'shop' },
                            { label: 'Relojes', view: 'relojes' },
                            { label: 'Perfumes', view: 'perfumes' },
                            { label: 'Ofertas', view: 'ofertas' }
                        ].map((item) => (
                            <button 
                                key={item.label} 
                                onClick={() => navigateTo(item.view)} 
                                className={`text-[13px] font-medium tracking-[0.08em] transition-all duration-300 relative group ${isDarkMode ? 'text-gray-300 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'}`}
                                style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>

                    {/* Right Section - Search & Icons */}
                    <div className="flex items-center gap-5 lg:gap-6">
                        {/* Search Bar */}
                        <div className="relative hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    placeholder="Buscar productos..."
                                    className={`w-48 lg:w-56 px-4 py-2.5 pl-10 pr-10 rounded-full text-sm outline-none transition-all duration-300 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#D4AF37]/50 focus:bg-white/10' : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:border-[#D4AF37]/50'}`}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                />
                                <Search size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                        {/* Dropdown con Resultados y Historial */}
                        {isSearchFocused && (
                            <div className={`absolute top-full mt-2 w-full rounded-xl shadow-2xl overflow-hidden z-50 ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}>
                                {searchQuery.length >= 2 ? (
                                    // Resultados de búsqueda
                                    searchResults.length > 0 ? (
                                        <div className="max-h-96 overflow-y-auto">
                                            <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Resultados</p>
                                            {searchResults.map((p: any) => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => {
                                                        navigateTo('product', p);
                                                        setSearchQuery('');
                                                        setIsSearchFocused(false);
                                                    }}
                                                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                                                >
                                                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-bold truncate">{p.name}</p>
                                                        <p className="text-[10px] text-gray-500">{p.brand}</p>
                                                    </div>
                                                    <p className="text-xs font-black text-[#D4AF37]">{formatPrice(p.price)}</p>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <p className="text-sm text-gray-500">No se encontraron productos</p>
                                        </div>
                                    )
                                ) : searchHistory.length > 0 ? (
                                    // Historial de búsquedas
                                    <div>
                                        <div className="px-4 py-2 flex items-center justify-between">
                                            <p className="text-xs font-bold text-gray-500 uppercase">Búsquedas Recientes</p>
                                            <button
                                                onClick={clearSearchHistory}
                                                className="text-xs text-[#D4AF37] hover:underline"
                                            >
                                                Limpiar
                                            </button>
                                        </div>
                                        {searchHistory.slice(0, 5).map((query: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSearchQuery(query);
                                                    handleSearch(query);
                                                }}
                                                className={`w-full px-4 py-2 flex items-center gap-3 text-left text-sm transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                                            >
                                                <Clock size={14} className="text-gray-500" />
                                                <span>{query}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-4 py-6 text-center">
                                        <p className="text-xs text-gray-500">Busca relojes, perfumes o marcas</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                        {/* Icons Row - Premium Hover Animation */}
                        <div className="flex items-center gap-1">
                            {/* Modo Oscuro/Claro */}
                            <div className="group relative flex items-center h-10 overflow-hidden">
                                <button 
                                    onClick={() => setIsDarkMode(!isDarkMode)} 
                                    className={`flex items-center gap-0 group-hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'text-gray-400 group-hover:text-white group-hover:bg-white/5' : 'text-gray-500 group-hover:text-[#1a1a1a] group-hover:bg-black/5'}`}
                                    aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                                >
                                    <Zap size={18} fill={isDarkMode ? "currentColor" : "none"} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    <span className="text-[11px] font-medium tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {isDarkMode ? 'Claro' : 'Oscuro'}
                                    </span>
                                </button>
                            </div>

                            {/* Rastrear Pedido */}
                            <div className="group relative flex items-center h-10 overflow-hidden">
                                <button 
                                    onClick={() => navigateTo('tracking')} 
                                    className={`flex items-center gap-0 group-hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'text-gray-400 group-hover:text-white group-hover:bg-white/5' : 'text-gray-500 group-hover:text-[#1a1a1a] group-hover:bg-black/5'}`}
                                    aria-label="Rastrear mi pedido"
                                >
                                    <MapPin size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    <span className="text-[11px] font-medium tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Ubicación
                                    </span>
                                </button>
                            </div>

                            {/* Historial */}
                            <div className="group relative flex items-center h-10 overflow-hidden">
                                <button 
                                    onClick={() => navigateTo('history')} 
                                    className={`flex items-center gap-0 group-hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'text-gray-400 group-hover:text-white group-hover:bg-white/5' : 'text-gray-500 group-hover:text-[#1a1a1a] group-hover:bg-black/5'}`}
                                    aria-label="Ver historial de productos"
                                >
                                    <Clock size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    <span className="text-[11px] font-medium tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Recientes
                                    </span>
                                </button>
                            </div>

                            {/* Cuenta */}
                            <div className="group relative flex items-center h-10 overflow-hidden">
                                <button 
                                    onClick={isLoggedIn ? onLogout : onAuthClick}
                                    className={`flex items-center gap-0 group-hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'text-gray-400 group-hover:text-white group-hover:bg-white/5' : 'text-gray-500 group-hover:text-[#1a1a1a] group-hover:bg-black/5'}`}
                                    aria-label={isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
                                >
                                    <User size={18} className={`transition-transform duration-300 group-hover:-translate-x-0.5 ${isLoggedIn ? 'text-[#D4AF37]' : ''}`} />
                                    <span className="text-[11px] font-medium tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {isLoggedIn ? 'Salir' : 'Cuenta'}
                                    </span>
                                </button>
                            </div>

                            {/* Favoritos */}
                            <div className="group relative flex items-center h-10 overflow-hidden">
                                <button 
                                    onClick={() => navigateTo('favorites')} 
                                    className={`relative flex items-center gap-0 group-hover:gap-2 px-2.5 py-2 rounded-full transition-all duration-300 ease-out ${isDarkMode ? 'text-gray-400 group-hover:text-white group-hover:bg-white/5' : 'text-gray-500 group-hover:text-[#1a1a1a] group-hover:bg-black/5'}`}
                                    aria-label={`Favoritos (${favorites.length} productos)`}
                                >
                                    <div className="relative">
                                        <Heart size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                        {favorites.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>}
                                    </div>
                                    <span className="text-[11px] font-medium tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Favoritos
                                    </span>
                                </button>
                            </div>

                            {/* Carrito - Destacado en dorado */}
                            <div className="group relative flex items-center h-10 ml-1">
                                <button 
                                    onClick={() => setIsCartOpen(true)} 
                                    className="hidden md:flex items-center gap-0 group-hover:gap-2 bg-[#D4AF37] hover:bg-[#c9a431] px-3 py-2 rounded-xl text-black transition-all duration-300 ease-out shadow-md shadow-[#D4AF37]/20"
                                    aria-label={`Carrito de compras (${cartCount} productos)`}
                                >
                                    <div className="relative">
                                        <ShoppingBag size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                        {cartCount > 0 && <span className={`absolute -top-2 -right-2 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{cartCount}</span>}
                                    </div>
                                    <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Carrito
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Componente: Timer de Ofertas Flash
const FlashSaleTimer = ({ endDate, isDarkMode }: { endDate: string, isDarkMode: boolean }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(endDate).getTime() - Date.now();
            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-red-950/30 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
            <Clock size={16} className="text-red-500" />
            <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Oferta termina en:</span>
            <div className="flex gap-1">
                <span className="bg-red-600 text-white font-black text-sm px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={`font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>:</span>
                <span className="bg-red-600 text-white font-black text-sm px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={`font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>:</span>
                <span className="bg-red-600 text-white font-black text-sm px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
};

// Componente: Calculadora de Cuotas
const InstallmentCalculator = ({ price, isDarkMode, formatPrice }: { price: number, isDarkMode: boolean, formatPrice?: (p: number) => string }) => {
    const [installments, setInstallments] = useState(3);
    const monthlyPayment = price / installments;
    
    // Usar formatPrice si está disponible, sino formato por defecto
    const formatAmount = formatPrice || ((p: number) => `$${p.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`);

    return (
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-lg font-black mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <DollarSign size={20} className="text-[#D4AF37]" />
                Paga en cuotas sin interés
            </h3>
            
            <div className="flex gap-2 mb-4">
                {[3, 6, 12].map(num => (
                    <button
                        key={num}
                        onClick={() => setInstallments(num)}
                        className={`flex-1 py-3 rounded-lg font-black transition-all ${
                            installments === num
                                ? 'bg-[#D4AF37] text-black'
                                : isDarkMode
                                ? 'bg-white/5 text-white hover:bg-white/10'
                                : 'bg-white text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                        {num} cuotas
                    </button>
                ))}
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-white'}`}>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pago mensual
                </p>
                <p className="text-3xl font-black text-[#D4AF37]">
                    {formatAmount(monthlyPayment)}
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {installments} pagos × {formatAmount(monthlyPayment)}
                </p>
            </div>
        </div>
    );
};

// Componente: Vista 360° Simulada (Estilo Amazon - 3 imágenes)
const ProductGallery360 = ({ images, productName, isDarkMode }: { images: string[], productName: string, isDarkMode: boolean }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Limitar a solo 3 imágenes como Amazon
    const displayImages = images.slice(0, 3);

    // Resetear el índice cuando cambian las imágenes (nuevo producto)
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);

    return (
        <div className="flex gap-4">
            {/* Thumbnails verticales a la izquierda - estilo Amazon */}
            <div className="flex flex-col gap-2">
                {displayImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            currentImageIndex === idx
                                ? 'border-[#D4AF37]'
                                : isDarkMode
                                ? 'border-white/10 opacity-60 hover:opacity-100 hover:border-[#D4AF37]/50'
                                : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-[#D4AF37]/50'
                        }`}
                    >
                        <img src={img} loading="lazy" alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            
            {/* Imagen principal con Zoom */}
            <div className="flex-1">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                    <ImageZoom 
                        src={displayImages[currentImageIndex]} 
                        alt={`${productName} - Vista ${currentImageIndex + 1}`}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>
        </div>
    );
};

// Componente: Certificado de Autenticidad
const AuthenticityBadge = ({ certificate, warranty, productName, isDarkMode }: { certificate: string, warranty: string, productName: string, isDarkMode: boolean }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-green-950/30 border-green-500/30 hover:bg-green-950/50' : 'bg-green-50 border-green-200 hover:bg-green-100'} transition-colors`}
            >
                <ShieldCheck size={18} className="text-green-500" />
                <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    100% Original · Certificado
                </span>
            </button>

            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5001] w-full max-w-md p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4">
                                <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={40} className="text-green-500" />
                                </div>
                                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Certificado de Autenticidad
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {productName}
                                </p>
                            </div>

                            <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <div className="mb-4">
                                    <p className={`text-xs uppercase font-black mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Número de Serie
                                    </p>
                                    <p className="text-xl font-black text-[#D4AF37] font-mono">
                                        {certificate}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className={`text-xs uppercase font-black mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Garantía
                                    </p>
                                    <p className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {warranty}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Award size={16} className="text-[#D4AF37]" />
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Producto 100% original con garantía oficial
                                    </p>
                                </div>
                            </div>

                            <div className={`text-xs text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                Este certificado verifica la autenticidad del producto
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// Componente: Zoom con Lupa
const ImageZoom = ({ src, alt, isDarkMode }: { src: string, alt: string, isDarkMode: boolean }) => {
    const [isZooming, setIsZooming] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showLens, setShowLens] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
    };

    return (
        <div 
            className="relative w-full h-full overflow-hidden cursor-zoom-in"
            onMouseEnter={() => { setIsZooming(true); setShowLens(true); }}
            onMouseLeave={() => { setIsZooming(false); setShowLens(false); }}
            onMouseMove={handleMouseMove}
        >
            <img 
                src={src} 
                alt={alt}
                className={`w-full h-full object-cover transition-transform duration-200 ${isZooming ? 'scale-150' : 'scale-100'}`}
                style={isZooming ? {
                    transformOrigin: `${position.x}% ${position.y}%`
                } : {}}
            />
            {showLens && (
                <div 
                    className="absolute w-24 h-24 border-2 border-[#D4AF37] rounded-full pointer-events-none"
                    style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(212, 175, 55, 0.1)'
                    }}
                />
            )}
        </div>
    );
};

// Componente: Tabla de Medidas para Relojes
const SizeGuide = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [showGuide, setShowGuide] = useState(false);

    const sizes = [
        { wrist: "14-16 cm", size: "Pequeña", recommendation: "Relojes de 36-40mm" },
        { wrist: "16-18 cm", size: "Mediana", recommendation: "Relojes de 40-44mm" },
        { wrist: "18-20 cm", size: "Grande", recommendation: "Relojes de 44-48mm" },
        { wrist: "20+ cm", size: "Extra Grande", recommendation: "Relojes de 48mm+" }
    ];

    return (
        <>
            <button
                onClick={() => setShowGuide(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-blue-950/30 border-blue-500/30 hover:bg-blue-950/50' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'} transition-colors`}
            >
                <Info size={18} className="text-blue-500" />
                <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Guía de Medidas
                </span>
            </button>

            <AnimatePresence>
                {showGuide && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowGuide(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5001] w-full max-w-2xl p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}
                        >
                            <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4">
                                <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                            </button>

                            <div className="mb-6">
                                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Guía de Medidas para Relojes
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Encuentra el tamaño perfecto para tu muñeca
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                            <th className={`text-left py-3 px-4 font-black text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Diámetro Muñeca</th>
                                            <th className={`text-left py-3 px-4 font-black text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tamaño</th>
                                            <th className={`text-left py-3 px-4 font-black text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recomendación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sizes.map((size, idx) => (
                                            <tr key={idx} className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                                                <td className={`py-4 px-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{size.wrist}</td>
                                                <td className={`py-4 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{size.size}</td>
                                                <td className={`py-4 px-4 text-[#D4AF37] font-semibold`}>{size.recommendation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-blue-950/30 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
                                <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                                    <strong>💡 Tip:</strong> Mide tu muñeca con una cinta métrica flexible para obtener el tamaño exacto.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// Componente: Guía de Tamaños para Perfumes
const PerfumeSizeGuide = ({ isDarkMode, currentSize, onSizeSelect }: { isDarkMode: boolean, currentSize: string, onSizeSelect?: (size: string, price: number) => void }) => {
    const [showGuide, setShowGuide] = useState(false);
    
    const sizes = [
        { size: "10ml", ml: 10, description: "Ideal para viajes o probar", duration: "15-20 aplicaciones", price: 0.25 },
        { size: "30ml", ml: 30, description: "Perfecto para llevar contigo", duration: "45-60 aplicaciones", price: 0.60 },
        { size: "50ml", ml: 50, description: "Tamaño estándar", duration: "75-100 aplicaciones", price: 0.85 },
        { size: "100ml", ml: 100, description: "Mejor valor (más vendido)", duration: "150-200 aplicaciones", price: 1.0, recommended: true },
        { size: "200ml", ml: 200, description: "Máximo ahorro", duration: "300-400 aplicaciones", price: 1.70 }
    ];

    return (
        <>
            <button
                onClick={() => setShowGuide(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-purple-950/30 border-purple-500/30 hover:bg-purple-950/50' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'} transition-colors`}
            >
                <Info size={18} className="text-purple-500" />
                <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Guía de Tamaños
                </span>
            </button>

            <AnimatePresence>
                {showGuide && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowGuide(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5001] w-full max-w-3xl p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'} max-h-[90vh] overflow-y-auto`}
                        >
                            <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4">
                                <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                            </button>

                            <div className="mb-6">
                                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Guía de Tamaños de Perfume
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Elige el tamaño perfecto según tu uso y presupuesto
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {sizes.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.02 }}
                                        className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                            item.size === currentSize 
                                                ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                                                : isDarkMode 
                                                    ? 'border-white/10 hover:border-[#D4AF37]/50 bg-white/5' 
                                                    : 'border-gray-200 hover:border-[#D4AF37]/50 bg-gray-50'
                                        }`}
                                    >
                                        {item.recommended && (
                                            <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-black uppercase rounded-full">
                                                Recomendado
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {item.ml}ml
                                                    </div>
                                                    <div>
                                                        <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            {item.description}
                                                        </p>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                            {item.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.size === currentSize && (
                                                <div className="flex items-center gap-2">
                                                    <Check size={20} className="text-[#D4AF37]" />
                                                    <span className="text-sm font-black text-[#D4AF37]">Seleccionado</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-purple-950/30 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'}`}>
                                <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-900'}`}>
                                    <strong>💡 Tip:</strong> Si usas perfume a diario, el tamaño de 100ml ofrece el mejor valor por ml. Para ocasiones especiales, 30ml o 50ml son ideales.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// Componente: Buscador con Autocompletado
const SearchAutocomplete = ({ products, navigateToProduct, isDarkMode }: { products: any[], navigateToProduct: (p: any) => void, isDarkMode: boolean }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setIsOpen(filtered.length > 0);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query, products]);

    const handleSelect = (product: any) => {
        navigateToProduct(product);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className={`relative flex items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'} border rounded-xl overflow-hidden`}>
                <Search size={20} className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className={`w-full px-4 py-3 bg-transparent outline-none ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
                {query && (
                    <button onClick={() => { setQuery(''); setIsOpen(false); }} className="mr-4">
                        <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full mt-2 w-full rounded-xl shadow-2xl overflow-hidden z-50 ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}
                    >
                        {suggestions.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleSelect(product)}
                                className={`w-full p-4 flex items-center gap-4 transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                            >
                                <img src={product.image} loading="lazy" alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                <div className="flex-1 text-left">
                                    <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.brand} · {product.category}</p>
                                </div>
                                <p className="text-[#D4AF37] font-black text-sm">${product.price.toLocaleString()}</p>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Componente: Wishlist Compartible
const ShareWishlist = ({ favorites, isDarkMode }: { favorites: any[], isDarkMode: boolean }) => {
    const [showModal, setShowModal] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateShareLink = () => {
        const ids = favorites.map(f => f.id).join(',');
        const link = `${window.location.origin}/#/favorites?shared=${btoa(ids)}`;
        setShareLink(link);
        setShowModal(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <button
                onClick={generateShareLink}
                disabled={favorites.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black transition-all ${
                    favorites.length === 0
                        ? 'opacity-50 cursor-not-allowed bg-gray-500'
                        : isDarkMode
                        ? 'bg-[#D4AF37] text-black hover:bg-[#F7E7CE]'
                        : 'bg-[#D4AF37] text-black hover:bg-[#F7E7CE]'
                }`}
            >
                <Gift size={18} />
                Compartir Lista de Deseos
            </button>

            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5001] w-full max-w-md p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4">
                                <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift size={40} className="text-[#D4AF37]" />
                                </div>
                                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Comparte tus Favoritos
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {favorites.length} producto{favorites.length !== 1 ? 's' : ''} en tu lista
                                </p>
                            </div>

                            <div className={`p-4 rounded-xl mb-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <p className={`text-sm break-all ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {shareLink}
                                </p>
                            </div>

                            <button
                                onClick={copyToClipboard}
                                className={`w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-colors ${
                                    copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#D4AF37] text-black hover:bg-[#F7E7CE]'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check size={20} />
                                        ¡Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Award size={20} />
                                        Copiar Link
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// Componente: Banner de Garantías Sticky
const GuaranteesBanner = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Si está en la parte superior (menos de 100px), mostrar
            if (currentScrollY < 100) {
                setIsVisible(true);
            } 
            // Si hace scroll hacia abajo, ocultar
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            }
            // Si hace scroll hacia arriba, mostrar
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div 
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`sticky top-20 z-40 py-3 ${isDarkMode ? 'bg-[#111111]' : 'bg-[#fafafa]'} border-b border-[#D4AF37]/10`}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck size={16} className="text-[#D4AF37]" />
                        <span className={`text-[11px] font-medium tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Garantía 2 años</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-[#D4AF37]/20" />
                    <div className="flex items-center gap-2.5">
                        <RotateCcw size={16} className="text-[#D4AF37]" />
                        <span className={`text-[11px] font-medium tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Devolución 30 días</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-[#D4AF37]/20" />
                    <div className="flex items-center gap-2.5">
                        <Truck size={16} className="text-[#D4AF37]" />
                        <span className={`text-[11px] font-medium tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>Envío Gratis Colombia</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-[#D4AF37]/20" />
                    <div className="flex items-center gap-2.5">
                        <Award size={16} className="text-[#D4AF37]" />
                        <span className={`text-[11px] font-medium tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>100% Original</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Componente: Quiz de Estilo
const StyleQuiz = ({ onComplete, isDarkMode }: { onComplete: (result: any) => void, isDarkMode: boolean }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const questions = [
        {
            question: "¿Para qué ocasión buscas tu pieza perfecta?",
            options: ["Uso diario", "Eventos formales", "Deportivo/Casual", "Ocasiones especiales"]
        },
        {
            question: "¿Cuál es tu estilo preferido?",
            options: ["Clásico/Elegante", "Moderno/Minimalista", "Deportivo/Robusto", "Lujo/Llamativo"]
        },
        {
            question: "¿Qué rango de precio consideras?",
            options: ["$300k - $600k", "$600k - $1M", "$1M - $1.5M", "$1.5M+"]
        },
        {
            question: "¿Qué marca te atrae más?",
            options: ["Invicta", "Casio", "Technomarine", "Perfumes de Lujo"]
        },
        {
            question: "¿Qué es más importante para ti?",
            options: ["Calidad/Durabilidad", "Diseño/Estética", "Marca/Prestigio", "Precio/Valor"]
        }
    ];

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Lógica simple de recomendación
            onComplete({
                answers: newAnswers,
                recommendation: "Basado en tus respuestas, te recomendamos explorar nuestra colección premium"
            });
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-gray-200'}`}>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Encuentra Tu Estilo Perfecto
                    </h3>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {currentQuestion + 1}/{questions.length}
                    </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div 
                        className="h-full bg-[#D4AF37] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="mb-6">
                <p className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {questions[currentQuestion].question}
                </p>
                <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                                isDarkMode
                                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#D4AF37]/50'
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 hover:border-[#D4AF37]'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Componente: Galería de Clientes
const CustomerGallery = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const customerPhotos = [
        {
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
            name: "Carlos M.",
            product: "Invicta Pro Diver",
            rating: 5,
            comment: "Excelente calidad, superó mis expectativas"
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
            name: "Ana L.",
            product: "Lattafa Khamrah",
            rating: 5,
            comment: "Aroma increíble, recibo halagos constantemente"
        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
            name: "Miguel R.",
            product: "Casio G-Shock",
            rating: 5,
            comment: "Resistente y elegante, perfecto para mi día a día"
        }
    ];

    return (
        <div className="py-16">
            <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-playfair font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Nuestros Clientes Satisfechos
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Miles de colombianos ya confían en JoMat Luxury
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {customerPhotos.map((customer, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}
                    >
                        <img 
                            src={customer.image} 
                            alt={customer.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(customer.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="#D4AF37" className="text-[#D4AF37]" />
                                ))}
                            </div>
                            <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {customer.name}
                            </p>
                            <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Compró: {customer.product}
                            </p>
                            <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                "{customer.comment}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Notification = React.memo(({ message, isDarkMode }: { message: string, isDarkMode: boolean }) => {
    return (
        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className={`fixed bottom-24 right-4 z-50 backdrop-blur-md border border-[#D4AF37]/40 p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs ${isDarkMode ? 'bg-black/90 text-white' : 'bg-white/95 text-black border-gray-200'}`}>
            <div className="bg-[#D4AF37] p-2 rounded-full"><ShoppingBag size={16} className="text-black" /></div>
            <div><p className={`text-[10px] uppercase font-black ${isDarkMode ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Reciente</p><p className="text-sm font-black leading-tight">{message}</p></div>
        </motion.div>
    );
});

function HeroSection({ navigateTo, isDarkMode }: { navigateTo: (v: string) => void, isDarkMode: boolean }) {
    return (
        <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-black">
            {/* Fondo con overlay ajustado para maximizar nitidez de la imagen pero mantener lectura */}
            <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-gradient-to-t from-black/90 via-transparent to-black/10' : 'bg-gradient-to-t from-white/90 via-transparent to-white/10'}`}></div>

            {/* Imagen de fondo full screen - Opacidad al 100% para máxima nitidez */}
            <motion.img
                initial={isMobile ? { opacity: 0 } : { scale: 1, opacity: 0 }}
                animate={isMobile ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={isMobile ? { duration: 0.3 } : undefined}
                src="/logo.png"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-center"
                alt="JoMat Luxury Background"
            />

            <div className="relative z-20 text-center px-4 max-w-4xl">
                <motion.div 
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={isMobile ? { duration: 0.3, delay: 0.2 } : { duration: 1, delay: 0.5 }}
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black mb-8 leading-tight tracking-tight drop-shadow-2xl text-white">
                        La Distinción del <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">Tiempo</span><br />
                        y el Arte de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">Esencia</span>
                    </h2>
                    <p className="text-base md:text-xl mb-12 max-w-2xl mx-auto font-bold leading-relaxed text-white drop-shadow-lg">
                        Bienvenido a la boutique líder en Colombia de relojería y
                        perfumería de alta gama. Descubre piezas auténticas que definen
                        tu carácter.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
                        <motion.button whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo('shop')} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform">
                            Ver Catálogo
                        </motion.button>
                        <motion.button whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo('history')} className={`w-full sm:w-auto px-10 py-4 border-2 font-black uppercase tracking-widest text-xs rounded-xl transition-all backdrop-blur-sm ${isDarkMode ? 'border-white/30 text-white hover:bg-white hover:text-black hover:border-white' : 'border-black/30 text-black hover:bg-black hover:text-white hover:border-black'}`}>
                            Nuestra Historia
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function BrandsBar({ isDarkMode }: { isDarkMode: boolean }) {
    const brands = ["INVICTA", "TECHNOMARINE", "CASIO", "G-SHOCK", "AMOUAGE", "LATTAFA", "MOSCHINO"];
    const duplicated = [...brands, ...brands, ...brands, ...brands];
    return (
        <div className={`py-8 overflow-hidden relative border-y group transition-colors ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-white border-gray-100'}`}>
            <motion.div className="flex gap-20 items-center whitespace-nowrap marquee-container group-hover:pause" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                {duplicated.map((brand, i) => (
                    <motion.div key={i} whileHover={{ y: -10, color: "#D4AF37" }} className={`text-xl font-black tracking-widest transition-all cursor-pointer ${isDarkMode ? 'text-white/50' : 'text-black'}`}>{brand}</motion.div>
                ))}
            </motion.div>
        </div>
    );
}

function ShopPage({ products, addToCart, navigateToProduct, toggleFavorite, favorites, isDarkMode, initialFilter, formatPrice }: { products: any[], addToCart: (p: any) => void, navigateToProduct: (p: any) => void, toggleFavorite: (p: any) => void, favorites: any[], isDarkMode: boolean, initialFilter?: { category: string | null, offersOnly: boolean }, formatPrice: (p: number) => string }) {
    const [filters, setFilters] = useState({ categories: initialFilter?.category ? [initialFilter.category] : [] as string[], brands: [] as string[], occasions: [] as string[], price: 2000000, freeShipping: false, search: '' });
    const [sort, setSort] = useState('relevant');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync with initialFilter changes (e.g. from Navbar)
    useEffect(() => {
        if (initialFilter) {
            setFilters(f => ({
                ...f,
                categories: initialFilter.category ? [initialFilter.category] : [],
                search: '',
                freeShipping: false // Reset other filters
            }));
            // If it's offersOnly, we could add a logic here, but let's just filter it in useMemo
        }
    }, [initialFilter]);

    const filteredProducts = useMemo(() => {
        let res = [...products];

        // Category Filter
        if (filters.categories.length > 0) res = res.filter(p => filters.categories.includes(p.category));

        // Offers Filter
        if (initialFilter?.offersOnly) {
            res = res.filter(p => p.originalPrice > p.price);
        }

        // Brand Filter
        if (filters.brands.length > 0) res = res.filter(p => filters.brands.includes(p.brand));

        // Search Filter
        if (filters.search) {
            const s = filters.search.toLowerCase();
            res = res.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
        }

        // Occasion Filter (New)
        if (filters.occasions && filters.occasions.length > 0) {
            res = res.filter(p => p.occasion && p.occasion.some((o: string) => filters.occasions.includes(o)));
        }

        res = res.filter(p => p.price <= filters.price);
        if (filters.freeShipping) res = res.filter(p => p.freeShipping);

        if (sort === 'low') res.sort((a, b) => a.price - b.price);
        if (sort === 'high') res.sort((a, b) => b.price - a.price);

        return res;
    }, [filters, sort, products, initialFilter]);

    const handleCategoryToggle = (cat: string) => {
        setFilters((f: any) => ({
            ...f,
            categories: f.categories.includes(cat)
                ? f.categories.filter((c: string) => c !== cat)
                : [...f.categories, cat]
        }));
    };

    const handleBrandToggle = (brand: string) => setFilters((f: any) => ({ ...f, brands: f.brands.includes(brand) ? f.brands.filter((b: string) => b !== brand) : [...f.brands, brand] }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Search Header */}
            <div className={`mb-12 p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o marca (ej. Invicta, Lattafa...)"
                            value={filters.search}
                            onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                            className={`w-full py-4 pl-12 pr-6 rounded-xl border-2 transition-all outline-none ${isDarkMode ? 'bg-black/40 border-white/10 focus:border-[#D4AF37]/50 text-white' : 'bg-white border-gray-100 focus:border-[#D4AF37]/50 text-black'}`}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Botón de Filtros - Móvil */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsFilterOpen(true)}
                            className={`lg:hidden flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${isDarkMode ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#D4AF37]/5 border-[#D4AF37]/20 text-[#D4AF37]'}`}
                        >
                            <Filter size={20} />
                            <span className="text-xs font-black uppercase">Filtros</span>
                            {(filters.categories.length + filters.occasions.length) > 0 && (
                                <span className="bg-[#D4AF37] text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                                    {filters.categories.length + filters.occasions.length}
                                </span>
                            )}
                        </motion.button>
                        
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 whitespace-nowrap hidden md:block">Ordenar por</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className={`py-4 px-6 rounded-xl border-2 outline-none font-bold text-xs ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-gray-100 text-black'}`}
                        >
                            <option value="relevant">Relevancia</option>
                            <option value="low">Precio: Bajo a Alto</option>
                            <option value="high">Precio: Alto a Bajo</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Filtros Desktop - Sidebar */}
                <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                    <div className="sticky top-28 space-y-10 text-left">
                        <div className={`p-4 rounded-xl mb-6 flex items-center justify-between border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                            <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>Envío gratis</span>
                            <button onClick={() => setFilters(f => ({ ...f, freeShipping: !f.freeShipping }))} className={`w-10 h-5 rounded-full relative transition-colors ${filters.freeShipping ? 'bg-green-500' : 'bg-gray-400'}`}>
                                <motion.div animate={{ x: filters.freeShipping ? 20 : 2 }} className="w-4 h-4 bg-white rounded-full absolute top-0.5" />
                            </button>
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Categoría</h4>
                            <div className="space-y-4">
                                {['Relojes', 'Perfumes'].map((c: string) => (
                                    <div key={c} onClick={() => handleCategoryToggle(c)} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${filters.categories.includes(c) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20 group-hover:border-[#D4AF37]/50'}`}>
                                            {filters.categories.includes(c) && <Check size={10} className="text-black font-black" />}
                                        </div>
                                        <span className={`text-xs font-bold transition-colors ${filters.categories.includes(c) ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-white'}`}>{c}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-6">Ocasión</h4>
                            <div className="space-y-4">
                                {['Gala', 'Boda', 'Negocio', 'Deportivo', 'Casual', 'Diario', 'Regalo', 'Aventura'].map((oc: string) => (
                                    <div key={oc} onClick={() => setFilters((f: any) => ({ ...f, occasions: f.occasions.includes(oc) ? f.occasions.filter((o: string) => o !== oc) : [...f.occasions, oc] }))} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${filters.occasions.includes(oc) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20 group-hover:border-[#D4AF37]/50'}`}>
                                            {filters.occasions.includes(oc) && <Check size={10} className="text-black font-black" />}
                                        </div>
                                        <span className={`text-xs font-bold transition-colors ${filters.occasions.includes(oc) ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-white'}`}>{oc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setFilters({ categories: [], brands: [], occasions: [], price: 2000000, freeShipping: false, search: '' })} className="w-full py-4 text-[9px] font-black uppercase border border-[#D4AF37]/30 text-[#D4AF37] transition-all hover:bg-[#D4AF37]/10">Limpiar filtros</motion.button>

                    </div>
                </aside>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-10 border-b-2 border-[#D4AF37]/10 pb-6">
                        <h1 className="text-2xl font-playfair font-black">
                            {initialFilter?.offersOnly ? 'Ofertas' : initialFilter?.category || 'Catálogo'} <span className="text-[#D4AF37]">Premium</span>
                        </h1>
                        <span className="text-[10px] font-black uppercase opacity-60">{filteredProducts.length} Productos</span>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {filteredProducts.map(p => (<ProductCard key={p.id} product={p} addToCart={addToCart} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} isFavorite={favorites.some(f => f.id === p.id)} isDarkMode={isDarkMode} formatPrice={formatPrice} />))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-gray-500 font-bold mb-4">No se encontraron productos que coincidan con tu búsqueda.</p>
                            <button onClick={() => setFilters(f => ({ ...f, search: '' }))} className="text-[#D4AF37] font-black uppercase text-xs underline decoration-2 underline-offset-8">Ver todo el catálogo</button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Modal de Filtros Móvil */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        
                        {/* Panel de Filtros */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed bottom-0 left-0 right-0 z-[101] max-h-[85vh] rounded-t-3xl lg:hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0a0a] to-black' : 'bg-gradient-to-b from-white to-gray-50'} shadow-2xl`}
                        >
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 bg-inherit z-10">
                                <div>
                                    <h3 className={`text-2xl font-playfair font-black text-[#D4AF37]`}>Filtros</h3>
                                    <p className={`text-[9px] tracking-[0.2em] uppercase font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                        {filteredProducts.length} Productos
                                    </p>
                                </div>
                                <motion.button
                                    onClick={() => setIsFilterOpen(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center"
                                >
                                    <X size={20} className="text-[#D4AF37]" />
                                </motion.button>
                            </div>
                            
                            {/* Contenido Scrolleable */}
                            <div className="overflow-y-auto max-h-[calc(85vh-180px)] px-8 py-6 space-y-8">
                                {/* Envío Gratis */}
                                <div className={`p-4 rounded-xl flex items-center justify-between border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                    <span className={`text-xs font-black uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>Envío gratis</span>
                                    <button onClick={() => setFilters(f => ({ ...f, freeShipping: !f.freeShipping }))} className={`w-12 h-6 rounded-full relative transition-colors ${filters.freeShipping ? 'bg-green-500' : 'bg-gray-400'}`}>
                                        <motion.div animate={{ x: filters.freeShipping ? 24 : 2 }} className="w-5 h-5 bg-white rounded-full absolute top-0.5" />
                                    </button>
                                </div>
                                
                                {/* Categoría */}
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-[#D4AF37]">Categoría</h4>
                                    <div className="space-y-3">
                                        {['Relojes', 'Perfumes'].map((c: string) => (
                                            <motion.div
                                                key={c}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleCategoryToggle(c)}
                                                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${filters.categories.includes(c) ? 'bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30' : isDarkMode ? 'bg-white/5 border-2 border-white/10' : 'bg-gray-50 border-2 border-gray-200'}`}
                                            >
                                                <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${filters.categories.includes(c) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20'}`}>
                                                    {filters.categories.includes(c) && <Check size={12} className="text-black font-black" />}
                                                </div>
                                                <span className={`text-sm font-bold transition-colors ${filters.categories.includes(c) ? 'text-[#D4AF37]' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{c}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Ocasión */}
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-[#D4AF37]">Ocasión</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Gala', 'Boda', 'Negocio', 'Deportivo', 'Casual', 'Diario', 'Regalo', 'Aventura'].map((oc: string) => (
                                            <motion.div
                                                key={oc}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFilters((f: any) => ({ ...f, occasions: f.occasions.includes(oc) ? f.occasions.filter((o: string) => o !== oc) : [...f.occasions, oc] }))}
                                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${filters.occasions.includes(oc) ? 'bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30' : isDarkMode ? 'bg-white/5 border-2 border-white/10' : 'bg-gray-50 border-2 border-gray-200'}`}
                                            >
                                                <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center flex-shrink-0 ${filters.occasions.includes(oc) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20'}`}>
                                                    {filters.occasions.includes(oc) && <Check size={10} className="text-black font-black" />}
                                                </div>
                                                <span className={`text-xs font-bold transition-colors ${filters.occasions.includes(oc) ? 'text-[#D4AF37]' : isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{oc}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer con Botones */}
                            <div className="px-8 py-6 border-t border-[#D4AF37]/20 flex gap-4 sticky bottom-0 bg-inherit">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setFilters({ categories: [], brands: [], occasions: [], price: 2000000, freeShipping: false, search: '' });
                                        setIsFilterOpen(false);
                                    }}
                                    className={`flex-1 py-4 rounded-xl border-2 border-[#D4AF37]/30 text-[#D4AF37] font-black uppercase text-xs ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}
                                >
                                    Limpiar
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-1 py-4 rounded-xl bg-[#D4AF37] text-black font-black uppercase text-xs"
                                >
                                    Ver {filteredProducts.length} Productos
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function CatalogSection({ products, addToCart, navigateToProduct, toggleFavorite, favorites, isDarkMode, navigateTo, formatPrice }: { products: any[], addToCart: (p: any) => void, navigateToProduct: (p: any) => void, toggleFavorite: (p: any) => void, favorites: any[], isDarkMode: boolean, navigateTo: (v: string) => void, formatPrice: (p: number) => string }) {
    return (
        <section className={`py-20 ${isDarkMode ? 'bg-[#050505]' : 'bg-[#FDFDFD]'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="mb-12"><h2 className="text-3xl font-playfair font-black mb-4">Obras Maestras</h2><p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">Lo mejor de nuestra boutique</p></div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">{products.slice(0, 4).map((product: any) => (<ProductCard key={product.id} product={product} addToCart={addToCart} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} isFavorite={favorites.some((f: any) => f.id === product.id)} isDarkMode={isDarkMode} formatPrice={formatPrice} />))}</div>
                <div className="mt-12"><motion.button whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo('shop')} className="px-14 py-5 font-black uppercase tracking-widest text-xs rounded-xl bg-white text-black hover:bg-[#D4AF37] transition-all shadow-lg">Ver Catálogo Completo</motion.button></div>
            </div>
        </section>
    );
}

function ProductCard({ product, addToCart, navigateToProduct, toggleFavorite, isFavorite, isDarkMode, formatPrice }: { product: any, addToCart: (p: any) => void, navigateToProduct: (p: any) => void, toggleFavorite: (p: any) => void, isFavorite: boolean, isDarkMode: boolean, formatPrice: (p: number) => string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    return (
        <motion.div 
            className="group relative" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            whileHover={isMobile ? {} : { y: -12, scale: 1.02 }} 
            transition={isMobile ? {} : { type: "spring", stiffness: 300 }}
        >
            <div className={`relative overflow-hidden rounded-[1.5rem] aspect-[4/5] border-2 transition-all duration-500 ${isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'} ${isHovered ? 'border-[#D4AF37]/40' : ''}`}>
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {product.badge && <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg text-white shadow-lg ${product.badgeColor || 'bg-[#D4AF37]'}`}>{product.badge}</span>}
                    {product.discount && <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg w-fit shadow-lg">-{product.discount}%</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} className={`absolute top-3 right-3 z-30 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors ${isFavorite ? 'text-red-500 bg-red-500/10' : 'text-white bg-black/20 hover:text-red-400'}`} aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}><Heart size={16} fill={isFavorite ? "currentColor" : "none"} /></button>
                {!imageError ? (
                    <img 
                        src={product.image} 
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform ${isMobile ? 'duration-300' : 'duration-1000'} ${isHovered ? 'scale-110 blur-[1px]' : 'scale-100'}`}
                        alt={`${product.name} - ${product.brand}`}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5">
                        <div className="text-center p-8">
                            <Award size={48} className="mx-auto mb-4 text-[#D4AF37]/40" />
                            <p className="text-xs font-black uppercase text-gray-500">Imagen no disponible</p>
                        </div>
                    </div>
                )}
                <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 px-6 text-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <Tooltip text="Ver Detalles">
                            <button onClick={() => navigateToProduct(product)} className="p-3 bg-white text-black rounded-xl hover:bg-[#D4AF37] transition-all shadow-xl"><Search size={18} /></button>
                        </Tooltip>
                        <Tooltip text={isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}>
                            <button onClick={() => toggleFavorite(product)} className="p-3 bg-white text-black rounded-xl hover:bg-[#D4AF37] transition-all shadow-xl"><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button>
                        </Tooltip>
                    </div>
                    <Tooltip text="Agregar al Carrito">
                        <button onClick={() => addToCart(product)} className="px-6 py-3 bg-[#D4AF37] text-black text-[10px] font-black uppercase rounded-xl hover:bg-white transition-all shadow-xl">Añadir</button>
                    </Tooltip>
                </div>
            </div>
            <div className="mt-5 text-left px-1">
                <p className="text-[10px] text-[#D4AF37] font-black uppercase mb-1 tracking-widest">{product.brand}</p>
                <h4 className="text-sm font-black mb-1 truncate leading-tight">{product.name}</h4>
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-[10px] font-bold opacity-30">({product.reviews || 0})</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#D4AF37] text-lg font-black">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && <span className="text-[11px] font-bold line-through opacity-30">{formatPrice(product.originalPrice)}</span>}
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase">
                    <span className={`flex items-center gap-1 ${product.stockLimit > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stockLimit > 0 ? `Solo ${product.stockLimit} disponibles` : '● En stock'}
                    </span>
                    <span className="opacity-30">👁️ {product.viewers} viendo ahora</span>
                </div>
            </div>
        </motion.div>
    );
}



// Place this Counter component outside of the main App component or at the bottom of the file
function Counter({ value, decimals = 0, suffix = "" }: { value: number, decimals?: number, suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(0, value, {
                duration: 2.5,
                ease: "circOut",
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = latest.toFixed(decimals) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, value, decimals, suffix]);

    return <span ref={ref} className="text-2xl md:text-4xl font-black mb-1">0{suffix}</span>;
}

function StatsSection({ isDarkMode }: { isDarkMode: boolean }) {
    const stats = [
        { label: "Clientes Satisfechos", value: 2847, suffix: "+", decimals: 0, icon: <Users size={24} /> },
        { label: "Calificación Promedio", value: 4.9, suffix: "/5", decimals: 1, icon: <Star size={24} /> },
        { label: "Comprando Ahora", value: 12, suffix: "", decimals: 0, icon: <ShoppingBag size={24} /> },
        { label: "Años de Experiencia", value: 5, suffix: "+", decimals: 0, icon: <TrendingUp size={24} /> }
    ];
    return (
        <section className={`py-12 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.1 }}
                            className="flex flex-col items-center text-center cursor-default p-4 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            <div className="text-[#D4AF37] mb-4 opacity-70 transform transition-transform group-hover:scale-125">{s.icon}</div>
                            <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProblemSection({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-black mb-6 leading-tight">¿Cansado de <span className="text-[#D4AF37]">Réplicas</span> y <span className="text-[#D4AF37]">Productos Falsos</span>?</h2>
                <p className="text-gray-500 font-medium mb-16 max-w-2xl mx-auto">Sabemos lo frustrante que es buscar productos de lujo auténticos a buen precio</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { t: "Miedo a Productos Falsos", d: "Comprar online y recibir réplicas de baja calidad que no duran ni se ven bien.", icon: <XCircle className="text-[#D4AF37]" size={32} /> },
                        { t: "Precios Excesivos", d: "Pagar de más en tiendas físicas por los mismos productos que puedes conseguir online.", icon: <DollarSign className="text-[#D4AF37]" size={32} /> },
                        { t: "Falta de Variedad", d: "No encontrar las marcas y modelos que realmente buscas en un solo lugar.", icon: <Search className="text-[#D4AF37]" size={32} /> }
                    ].map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -8, scale: 1.02 }} className={`p-10 rounded-3xl text-left border-2 transition-all hover:border-[#D4AF37]/30 ${isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-xl' : 'bg-white border-gray-100 shadow-lg'}`}>
                            <div className="mb-6">{item.icon}</div>
                            <h4 className="text-xl font-black mb-4">{item.t}</h4>
                            <p className="text-sm leading-relaxed opacity-60 font-medium">{item.d}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SolutionSection({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className={`py-24 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-black mb-6 leading-tight">JoMat Luxury: <span className="text-[#D4AF37]">Tu Destino de Confianza</span></h2>
                <p className="text-gray-500 font-medium mb-16 max-w-2xl mx-auto">La mejor experiencia de compra online para productos de lujo auténticos</p>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { t: "100% Productos Originales", d: "Garantía de autenticidad certificada en cada producto. Trabajamos con distribuidores autorizados.", icon: <ShieldCheck size={32} /> },
                        { t: "Precios Exclusivos Online", d: "Hasta 40% de descuento vs tiendas físicas. Sin intermediarios, directo a ti.", icon: <Tag size={32} /> },
                        { t: "Envío Gratis a Colombia", d: "Envío gratuito a cualquier ciudad. Seguimiento en tiempo real de tu pedido.", icon: <Truck size={32} /> },
                        { t: "Asesoría por WhatsApp", d: "Atención personalizada 24/7. Te ayudamos a elegir el producto perfecto.", icon: <MessageCircle size={32} /> }
                    ].map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -8, scale: 1.02 }} className={`p-10 rounded-3xl text-left border-2 transition-all hover:border-[#D4AF37]/40 ${isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-xl' : 'bg-white border-gray-100 shadow-lg'}`}>
                            <div className="mb-8 p-4 bg-[#D4AF37]/10 rounded-2xl w-fit text-[#D4AF37]">{item.icon}</div>
                            <h4 className="text-lg font-black mb-4 leading-tight">{item.t}</h4>
                            <p className="text-xs leading-relaxed opacity-60 font-black uppercase tracking-wider">{item.d}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-16">
                    {['Garantía de Autenticidad', 'Compra 100% Segura', 'Soporte 24/7', '+2,800 Clientes Satisfechos'].map((b: string) => (
                        <div key={b} className={`px-6 py-3 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-[#0a0a0a] border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                            {b === '+2,800 Clientes Satisfechos' ? <Star className="inline-block mr-2 text-[#D4AF37]" size={14} /> : (b === 'Soporte 24/7' ? <Clock className="inline-block mr-2 text-[#D4AF37]" size={14} /> : <div className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block mr-2" />)}{b}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SalesMapSection({ isDarkMode }: { isDarkMode: boolean }) {
    const cities = [
        { name: "Bogotá", x: 43, y: 55, sales: 854, trending: true },
        { name: "Cartagena de Indias", x: 35, y: 45, sales: 620, trending: true },
        { name: "Cartagena de Indias", x: 40, y: 30, sales: 380, trending: true },
        { name: "Cali", x: 32, y: 62, sales: 485, trending: false },
        { name: "Barranquilla", x: 40, y: 15, sales: 410, trending: false },
        { name: "Cartagena", x: 35, y: 20, sales: 390, trending: true },
        { name: "Bucaramanga", x: 50, y: 38, sales: 215, trending: false },
    ];

    return (
        <section className={`py-24 overflow-hidden relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            {/* Background Decoration */}
            <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${isDarkMode ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/40 via-black to-black' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-200/40 via-white to-white'}`} />

            <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative h-[600px] w-full flex items-center justify-center">
                    {/* Simplified Colombia SVG Outline */}
                    <svg viewBox="0 0 100 120" className={`w-full h-full drop-shadow-2xl ${isDarkMode ? 'fill-[#1a1a1a] stroke-[#D4AF37]/20' : 'fill-gray-100 stroke-gray-300'}`}>
                        {/* Abstract Polygon representing Colombia's rough shape */}
                        <path d="M35,20 L45,15 L50,18 L55,30 L50,45 L55,60 L60,80 L50,100 L40,110 L25,95 L20,70 L25,60 L20,50 L25,40 L35,20 Z" strokeWidth="0.5" />
                    </svg>

                    {/* City Hotspots */}
                    {cities.map((city, i) => (
                        <div key={i} className="absolute group" style={{ top: `${city.y}%`, left: `${city.x}%` }}>
                            <div className="relative cursor-pointer">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`w-3 h-3 rounded-full relative z-20 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-black'} group-hover:scale-150 transition-transform`}
                                />
                                {/* Pulsing Ring */}
                                <motion.div
                                    animate={{ scale: [1, 2, 2], opacity: [0.7, 0, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    className={`absolute inset-0 rounded-full z-10 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-black'}`}
                                />

                                {/* Tooltip Card */}
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-black/90 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 translate-x-2 group-hover:translate-x-0 transform duration-300 shadow-2xl">
                                    <h5 className="text-[#D4AF37] font-black uppercase tracking-widest text-[10px] mb-1">{city.name}</h5>
                                    <p className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                                        {city.sales} <span className="text-[10px] text-gray-400 font-normal uppercase">Envíos</span>
                                    </p>
                                    {city.trending && <div className="flex items-center gap-1 text-[9px] text-green-400 font-black uppercase"><TrendingUp size={10} /> Tendencia Alta</div>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Connection Lines (Abstract) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {cities.map((c, i) => (
                            i < cities.length - 1 && <motion.line
                                key={i}
                                x1={`${c.x}%`} y1={`${c.y}%`}
                                x2={`${cities[i + 1].x}%`} y2={`${cities[i + 1].y}%`}
                                stroke="#D4AF37"
                                strokeWidth="0.5"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 1 }}
                            />
                        ))}
                    </svg>
                </div>

                <div className="order-1 lg:order-2">
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <span className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Cobertura Nacional</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-black mb-8 leading-tight">Lujo que llega a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">Todo el País</span></h2>
                        <p className={`text-lg mb-10 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Nuestra red logística premium asegura que tu pedido llegue seguro y a tiempo, sin importar dónde te encuentres.
                            Monitoreamos cada envío desde nuestra bóveda hasta tus manos.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                <h4 className="text-3xl font-black text-[#D4AF37] mb-1">1,200+</h4>
                                <p className="text-xs font-bold uppercase opacity-60">Municipios Cubiertos</p>
                            </div>
                            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                <h4 className="text-3xl font-black text-[#D4AF37] mb-1">24-48h</h4>
                                <p className="text-xs font-bold uppercase opacity-60">Tiempo Promedio</p>
                            </div>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 text-sm font-bold"><div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]"><ShieldCheck size={16} /></div> Seguro todo riesgo incluido</li>
                            <li className="flex items-center gap-4 text-sm font-bold"><div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]"><MapPin size={16} /></div> Tracking en tiempo real</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function GlobeMapSection({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className={`py-24 overflow-hidden relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none ${isDarkMode ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/40 via-black to-black' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-200/40 via-white to-white'}`} />

            <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative h-[600px] w-full flex items-center justify-center p-8">
                    {/* 3D Globe Component */}
                    <div className="relative w-full h-full max-w-[600px] max-h-[600px] rounded-full overflow-hidden shadow-2xl border border-[#D4AF37]/20">
                        <GlobeMap isDarkMode={isDarkMode} />
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <span className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Cobertura Nacional 24/7</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-black mb-8 leading-tight">Lujo sin Fronteras: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] animate-gradient">En Toda Colombia</span></h2>
                        <p className={`text-lg mb-10 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Nuestra red logística premium asegura que tu pedido llegue seguro y a tiempo, sin importar dónde te encuentres.
                            Monitoreamos cada envío desde nuestra bóveda hasta tus manos, con un seguimiento global en tiempo real.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/30' : 'bg-gray-50 border-gray-200 hover:border-[#D4AF37]/30'}`}>
                                <h4 className="text-3xl font-black text-[#D4AF37] mb-1">1,123</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Municipios Cubiertos</p>
                            </div>
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/30' : 'bg-gray-50 border-gray-200 hover:border-[#D4AF37]/30'}`}>
                                <h4 className="text-3xl font-black text-[#D4AF37] mb-1">98%</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Entregas a Tiempo</p>
                            </div>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 text-sm font-bold group">
                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors"><ShieldCheck size={18} /></div>
                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Seguro de valor declarado al 100%</span>
                            </li>
                            <li className="flex items-center gap-4 text-sm font-bold group">
                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors"><MapPin size={18} /></div>
                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Tracking satelital en tiempo real</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}



function ExclusiveOffersSection({ isDarkMode, addToCart, formatPrice }: { isDarkMode: boolean, addToCart: (p: any) => void, formatPrice: (p: number) => string }) {
    const [timeLeft, setTimeLeft] = useState({ h: 23, m: 44, s: 13 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { ...prev, m: 59, s: 59, h: prev.m === 0 ? prev.h - 1 : prev.h };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulating "Dynamic Algorithm" for tags based on sales
    const combos = useMemo(() => {
        const rawCombos = [
            {
                id: 101,
                t: "Combo Premium",
                d: "Reloj Invicta + Perfume Lattafa",
                price: 689000,
                oldPrice: 1148000,
                discount: 40,
                sales: 1450,
                image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 102,
                t: "Combo Regalo Perfecto",
                d: "Reloj + Perfume + Estuche Gratis",
                price: 649000,
                oldPrice: 998000,
                discount: 35,
                sales: 890,
                image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 103,
                t: "Obsequio Especial",
                d: "Compra reloj >$500K = Perfume GRATIS",
                price: 899000,
                sales: 320,
                badgeColor: "bg-green-500",
                image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800"
            }
        ];

        return rawCombos.sort((a, b) => b.sales - a.sales).map((c, i) => ({
            ...c,
            // Dynamic badging logic
            badge: i === 0 ? "MÁS VENDIDO" : (c.discount ? `-${c.discount}% OFF` : "NUEVO"),
            badgeColor: i === 0 ? "bg-[#D4AF37]" : (c.discount ? "bg-red-600" : "bg-blue-500")
        }));
    }, []);

    return (
        <section className={`py-24 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Ofertas por Tiempo Limitado</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-black leading-tight">Combos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">Exclusivos</span></h2>
                    </div>
                    <div className="flex gap-4 items-center bg-[#D4AF37]/10 px-6 py-4 rounded-2xl border border-[#D4AF37]/30">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-1">Termina en</p>
                            <div className="text-2xl font-black font-mono tracking-wider tabular-nums">
                                {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
                            </div>
                        </div>
                        <AlertTriangle className="text-[#D4AF37] animate-pulse" size={24} />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {combos.map((combo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                y: { type: "spring", stiffness: 450, damping: 20, delay: i * 0.05 },
                                opacity: { duration: 0.2, delay: i * 0.05 }
                            }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className={`group relative rounded-3xl overflow-hidden border transition-all duration-200 ${isDarkMode ? 'bg-[#111] border-white/10 hover:border-[#D4AF37]/50 shadow-2xl shadow-black/50' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50 hover:border-[#D4AF37]/50'}`}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <span className={`absolute top-4 left-4 ${combo.badgeColor} text-white text-[10px] font-black px-3 py-1.5 rounded-full z-10 tracking-widest uppercase shadow-lg`}>
                                    {combo.badge}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0 opacity-60 group-hover:opacity-40 transition-opacity" />
                                <img
                                    src={combo.image}
                                    alt={combo.t}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 relative">
                                <h3 className="text-2xl font-black mb-2">{combo.t}</h3>
                                <p className="text-sm font-medium opacity-60 mb-6 min-h-[40px]">{combo.d}</p>

                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        {combo.oldPrice && <span className="text-sm opacity-50 line-through font-bold block mb-1">{formatPrice(combo.oldPrice)}</span>}
                                        <span className="text-3xl font-black text-[#D4AF37]">{formatPrice(combo.price)}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 opacity-60 text-[10px] font-black uppercase tracking-widest mb-1">
                                            <TrendingUp size={12} />
                                            <span>{combo.sales} Vendidos</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 8 }}
                                    onClick={() => addToCart({ id: combo.id, name: combo.t, price: combo.price, image: combo.image })}
                                    className="w-full py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                >
                                    <ShoppingBag size={16} />
                                    Agregar al Carrito
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-8 rounded-2xl bg-[#D4AF37]/5 border-2 border-[#D4AF37]/20 flex flex-col items-center justify-center gap-2 text-center">
                    <span className="text-[#D4AF37] text-sm font-black flex items-center gap-2 uppercase tracking-widest"><Award size={18} /> Obsequio Especial</span>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>En la compra de cualquier reloj mayor a <span className="text-[#D4AF37] font-black">$500.000</span>, recibe un <span className="text-[#D4AF37] font-black">perfume de regalo</span></p>
                </div>
            </div>
        </section>
    );
}

function ProblemSolution({ isDarkMode }: { isDarkMode: boolean }) {
    const data = [
        { icon: <ShieldCheck size={28} />, t: "Autenticidad Forense", d: "Cada pieza pasa por 15 puntos de control de autenticidad antes de salir de nuestra bóveda." },
        { icon: <Zap size={28} />, t: "Precio de Almacén", d: "Eliminamos intermediarios físicos para ofrecerte el lujo a una fracción del costo de centro comercial." },
        { icon: <Truck size={28} />, t: "Logística Blindada", d: "Tus piezas viajan con seguro total y monitoreo satelital hasta la puerta de tu hogar u oficina." },
        { icon: <MessageCircle size={28} />, t: "Ecosistema de Soporte", d: "Expertos relojeros y asesores de fragancias disponibles 24/7 para resolver cualquier duda por WhatsApp." }
    ];
    return (
        <section className={`py-24 ${isDarkMode ? 'bg-[#030303]' : 'bg-[#F9FAFB]'}`}>
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h3 className="text-3xl md:text-4xl font-playfair font-black mb-8 leading-tight">¿Cansado de la Incertidumbre en el <span className="text-[#D4AF37]">Mercado de Lujo</span>?</h3>
                    <p className={`text-lg mb-10 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>En JoMat Luxury sabemos que comprar un reloj o perfume de alta gama en línea genera dudas. Por eso, hemos blindado nuestro proceso para ofrecerte la misma paz mental que una boutique física, pero con la comodidad del siglo XXI.</p>
                    <ul className="space-y-6">
                        <li className="flex items-center gap-4 font-bold uppercase text-[11px] tracking-widest text-[#D4AF37]"><Check size={18} /> Garantía de devolución de dinero</li>
                        <li className="flex items-center gap-4 font-bold uppercase text-[11px] tracking-widest text-[#D4AF37]"><Check size={18} /> Certificados de importación legal</li>
                        <li className="flex items-center gap-4 font-bold uppercase text-[11px] tracking-widest text-[#D4AF37]"><Check size={18} /> Empaque original sellado de fábrica</li>
                    </ul>
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`p-10 md:p-14 rounded-[3rem] border-2 shadow-3xl ${isDarkMode ? 'bg-[#0a0a0a] border-[#D4AF37]/30 shadow-black' : 'bg-white border-gray-100 shadow-gray-200/40'}`}>
                    <h3 className="text-2xl font-black mb-12 flex items-center gap-4">💎 <span className="underline decoration-[#D4AF37] underline-offset-8">El Estándar JoMat</span></h3>
                    <div className="grid sm:grid-cols-2 gap-10">
                        {data.map((item: any, i: number) => (
                            <motion.div key={i} whileHover={{ y: -8 }} className="group">
                                <div className="text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                                <h5 className="font-black text-lg mb-2 leading-tight tracking-tight">{item.t}</h5>
                                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function QuizSection({ navigateToProduct, isDarkMode }: { navigateToProduct: (p: any) => void, isDarkMode: boolean }) {
    const [step, setStep] = useState(0);
    const questions = [{ q: "¿Qué estilo buscas?", o: ["Deportivo", "Elegante", "Casual", "Moderno"] }, { q: "¿Qué ocasión?", o: ["Uso diario", "Evento formal", "Regalo", "Colección"] }];
    const nextStep = () => setStep(step + 1);
    return (
        <section className={`py-20 ${isDarkMode ? 'bg-[#050505]' : 'bg-white'}`}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-playfair font-black mb-2">Quiz: Tu match de lujo</h2>
                <div className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-[#0a0a0a] border-[#D4AF37]/20 text-white' : 'bg-gray-50 border-gray-100 text-black'}`}>
                    {step < questions.length ? (<motion.div key={step}><h4>{questions[step].q}</h4><div className="grid grid-cols-2 gap-3 mt-8">{questions[step].o.map((opt: string) => (<button key={opt} onClick={nextStep} className="py-4 border border-white/10 rounded-xl font-black text-[10px] uppercase hover:bg-[#D4AF37]/10">{opt}</button>))}</div></motion.div>) : (<div>¡Listo!</div>)}
                </div>
            </div>
        </section>
    );
}

function ProductDetails({ product, addToCart, navigateToProduct, relatedProducts, isDarkMode, navigateTo, isLoggedIn, onAuthClick, showNotification, formatPrice, currency, setCurrency, notifyWhenAvailable }: { product: any, addToCart: (p: any) => void, navigateToProduct: (p: any) => void, relatedProducts: any[], isDarkMode: boolean, navigateTo: (v: string) => void, isLoggedIn: boolean, onAuthClick: () => void, showNotification: (m: string) => void, formatPrice: (p: number) => string, currency: string, setCurrency: (c: any) => void, notifyWhenAvailable: (id: number, email: string) => void }) {
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('descripcion');
    const [reviewText, setReviewText] = useState('');
    const [userRating, setUserRating] = useState(5);
    const [showAuthWarning, setShowAuthWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalStage, setModalStage] = useState<'loading' | 'success' | 'rejected'>('loading');
    const [reviewComments, setReviewComments] = useState<{[key: number]: string}>({});
    const [showCommentForm, setShowCommentForm] = useState<number | null>(null);
    const [reviewMediaFiles, setReviewMediaFiles] = useState<File[]>([]);
    const [reviewMediaPreviews, setReviewMediaPreviews] = useState<string[]>([]);
    const [selectedMediaModal, setSelectedMediaModal] = useState<{url: string, type: string} | null>(null);
    const discount = product.originalPrice - product.price;

    // Resetear todos los estados cuando cambia el producto
    useEffect(() => {
        setQty(1);
        setActiveTab('descripcion');
        setReviewText('');
        setUserRating(5);
        setShowAuthWarning(false);
        setIsSubmitting(false);
        setShowSuccessModal(false);
        setModalStage('loading');
        setReviewComments({});
        setShowCommentForm(null);
        setReviewMediaFiles([]);
        setReviewMediaPreviews([]);
        setSelectedMediaModal(null);
    }, [product.id]);

    // Manejar archivos de media para reseñas
    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxFiles = 5;
        const maxSize = 10 * 1024 * 1024; // 10MB por archivo
        
        // Validar número de archivos
        if (reviewMediaFiles.length + files.length > maxFiles) {
            showNotification(`Máximo ${maxFiles} archivos permitidos`);
            return;
        }
        
        // Validar tamaño y tipo
        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                showNotification(`${file.name} supera el tamaño máximo de 10MB`);
                return false;
            }
            const isValid = file.type.startsWith('image/') || file.type.startsWith('video/');
            if (!isValid) {
                showNotification(`${file.name} no es un formato válido (solo imágenes o videos)`);
            }
            return isValid;
        });
        
        if (validFiles.length === 0) return;
        
        // Crear previews
        const newPreviews: string[] = [];
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === validFiles.length) {
                    setReviewMediaPreviews([...reviewMediaPreviews, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
        
        setReviewMediaFiles([...reviewMediaFiles, ...validFiles]);
    };
    
    const removeMediaFile = (index: number) => {
        setReviewMediaFiles(reviewMediaFiles.filter((_, i) => i !== index));
        setReviewMediaPreviews(reviewMediaPreviews.filter((_, i) => i !== index));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-12 max-w-6xl mx-auto px-4">
            {/* Breadcrumbs */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-xs uppercase font-black mb-10 opacity-60 overflow-x-auto whitespace-nowrap">
                <button onClick={() => navigateTo('home')} className="hover:text-[#D4AF37] transition-colors">Inicio</button>
                <ChevronRight size={10} />
                <button 
                    onClick={() => navigateTo(product.category.toLowerCase())} 
                    className="hover:text-[#D4AF37] transition-colors"
                >
                    {product.category}
                </button>
                <ChevronRight size={10} />
                <span className="text-[#D4AF37]">{product.name}</span>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
                {/* Gallery with 360° View & Zoom */}
                <motion.div variants={itemVariants}>
                    {product.images && product.images.length > 1 ? (
                        <ProductGallery360 images={product.images} productName={product.name} isDarkMode={isDarkMode} />
                    ) : (
                        <div className={`aspect-square rounded-[2rem] overflow-hidden border-2 p-4 ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-100'}`}>
                            <ImageZoom 
                                src={product.image} 
                                alt={product.name}
                                isDarkMode={isDarkMode}
                            />
                        </div>
                    )}
                    
                    {/* SECCIÓN 1: Destacados del Producto */}
                    <motion.div 
                        variants={itemVariants}
                        className={`mt-6 p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-[#D4AF37]">Destacados</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                                    <ShieldCheck size={20} className="text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">Garantía {product.warranty || '2 años'}</p>
                                    <p className="text-[10px] text-gray-500">Protección total</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Truck size={20} className="text-green-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">Envío Gratis</p>
                                    <p className="text-[10px] text-gray-500">A toda Colombia</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Package size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">Devolución 30 días</p>
                                    <p className="text-[10px] text-gray-500">Sin preguntas</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                                    <Star size={20} className="text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">100% Original</p>
                                    <p className="text-[10px] text-gray-500">Certificado</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECCIÓN 2: Detalles Técnicos Rápidos (Estilo Amazon) */}
                    <motion.div 
                        variants={itemVariants}
                        className={`mt-4 p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <h4 className="text-sm font-black uppercase tracking-widest mb-4">Detalles del Producto</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Marca</span>
                                <span className="text-xs font-bold">{product.brand}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Categoría</span>
                                <span className="text-xs font-bold">{product.category}</span>
                            </div>
                            {product.authenticityCertificate && (
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">SKU/Modelo</span>
                                    <span className="text-xs font-bold font-mono">{product.authenticityCertificate}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Importado desde</span>
                                <span className="text-xs font-bold">USA 🇺🇸</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Disponibilidad</span>
                                <span className={`text-xs font-bold ${product.stock > 10 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {product.stock > 10 ? 'En stock' : `Solo ${product.stock} disponibles`}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECCIÓN 3: Comprados Juntos Frecuentemente */}
                    <motion.div 
                        variants={itemVariants}
                        className={`mt-4 p-6 rounded-2xl border ${isDarkMode ? 'bg-gradient-to-br from-[#1a1510] to-[#0a0a0a] border-[#D4AF37]/30' : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'}`}
                    >
                        <h4 className="text-sm font-black uppercase tracking-widest mb-3 text-[#D4AF37]">
                            Comprados Juntos Frecuentemente
                        </h4>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`flex-1 p-3 rounded-lg border ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
                                <p className="text-[10px] text-gray-500 mb-1">Este producto</p>
                                <p className="text-xs font-black line-clamp-1">{product.name}</p>
                            </div>
                            <Plus size={16} className="text-[#D4AF37] flex-shrink-0" />
                            <div className={`flex-1 p-3 rounded-lg border ${isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}`}>
                                <p className="text-[10px] text-gray-500 mb-1">Complemento</p>
                                <p className="text-xs font-black line-clamp-1">
                                    {product.category === 'Relojes' ? 'Perfume Luxury' : 'Reloj Premium'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 line-through">{formatPrice(product.price * 1.8)}</p>
                                <p className="text-lg font-black text-[#D4AF37]">{formatPrice(product.price * 1.65)}</p>
                                <p className="text-[10px] font-bold text-green-500">Ahorra {formatPrice(product.price * 0.15)}</p>
                            </div>
                            <button className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-black uppercase rounded-lg hover:bg-white transition-all">
                                Ver Combo
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Info */}
                <motion.div variants={itemVariants} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="bg-[#D4AF37] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-[#D4AF37]/20">{product.badge}</span>
                        {product.flashSale && product.flashSaleEndsAt && (
                            <FlashSaleTimer endDate={product.flashSaleEndsAt} isDarkMode={isDarkMode} />
                        )}
                    </div>
                    <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-[11px] mb-2">{product.brand}</span>
                    <h1 className="text-3xl md:text-5xl font-playfair font-black mb-4 leading-tight">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-6 text-[#D4AF37]">
                        {[...Array(5)].map((_: undefined, i: number) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
                        <span className="text-xs font-bold text-gray-500 ml-2">{product.rating} ({product.reviews} reseñas)</span>
                    </div>

                    {/* Certificado de Autenticidad y Guía de Medidas */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        {product.authenticityCertificate && product.warranty && (
                            <AuthenticityBadge 
                                certificate={product.authenticityCertificate} 
                                warranty={product.warranty} 
                                productName={product.name}
                                isDarkMode={isDarkMode}
                            />
                        )}
                        {product.category === 'Relojes' && (
                            <SizeGuide isDarkMode={isDarkMode} />
                        )}
                        {product.category === 'Perfumes' && (
                            <PerfumeSizeGuide 
                                isDarkMode={isDarkMode} 
                                currentSize={product.specs.Volumen || '100ml'}
                            />
                        )}
                    </div>

                    <div className="mb-8 p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden group">
                        {/* Brillo de lujo en el fondo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <p className="text-gray-500 line-through text-xs font-bold">Precio Retail: {formatPrice(product.retailPrice)}</p>
                            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                                {(['COP', 'USD', 'EUR'] as const).map((cur) => (
                                    <button
                                        key={cur}
                                        type="button"
                                        onClick={() => {
                                            console.log('Changing currency to:', cur);
                                            setCurrency(cur);
                                        }}
                                        className={`px-3 py-1 rounded text-[9px] font-black transition-all cursor-pointer ${currency === cur ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {cur}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-[#D4AF37] tracking-tighter">{formatPrice(product.price)}</span>
                            <div className="flex flex-col">
                                <span className="bg-red-500/10 text-red-500 text-[9px] font-black px-2 py-0.5 rounded-md">AHORRO: {formatPrice(product.retailPrice - product.price)}</span>
                                <span className="text-[8px] font-bold text-gray-500 uppercase mt-1 tracking-widest text-center">Garantía VIP JoMat</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 text-[10px] font-black uppercase">
                            <span className={`flex items-center gap-1.5 ${product.stock < 5 ? 'text-orange-500' : 'text-green-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${product.stock < 5 ? 'bg-orange-500 animate-ping' : 'bg-green-500'}`} />
                                {product.stock < 10 ? `SOLO QUEDAN ${product.stock} UNIDADES` : 'STOCK ASEGURADO'}
                            </span>
                            <span className="text-gray-500 opacity-60">👁️ {product.viewers} socios viendo esta pieza</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mb-10">
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-black uppercase opacity-60 tracking-widest">Cantidad:</span>
                            <div className="flex items-center bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => setQty(Math.max(1, qty - 1))} 
                                    disabled={qty <= 1}
                                    className="p-3 hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-12 text-center font-black text-sm">{qty}</span>
                                <button 
                                    onClick={() => {
                                        const maxQty = Math.min(product.stock, MAX_CART_QUANTITY);
                                        if (qty < maxQty) {
                                            setQty(qty + 1);
                                        } else {
                                            showNotification(`Máximo ${maxQty} unidades disponibles`);
                                        }
                                    }} 
                                    disabled={qty >= Math.min(product.stock, MAX_CART_QUANTITY)}
                                    className="p-3 hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    // Validar stock antes de agregar
                                    if (product.stock <= 0) {
                                        showNotification('Producto agotado');
                                        return;
                                    }
                                    if (qty > product.stock) {
                                        showNotification(`Solo hay ${product.stock} unidades disponibles`);
                                        return;
                                    }
                                    
                                    // Añadir cada unidad individualmente respetando la cantidad seleccionada
                                    for (let i = 0; i < qty; i++) {
                                        addToCart(product);
                                    }
                                }}
                                disabled={product.stock <= 0}
                                className="flex-1 h-14 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 text-sm hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag size={20} /> {product.stock <= 0 ? 'Agotado' : 'Añadir al Carrito'}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    // Validar stock antes de comprar
                                    if (product.stock <= 0) {
                                        showNotification('Producto agotado');
                                        return;
                                    }
                                    if (qty > product.stock) {
                                        showNotification(`Solo hay ${product.stock} unidades disponibles`);
                                        return;
                                    }
                                    
                                    // Express Checkout: Añadir productos y navegar sin abrir sidebar
                                    for (let i = 0; i < qty; i++) {
                                        addToCart(product);
                                    }
                                    // Dar tiempo para que se agreguen los productos
                                    setTimeout(() => {
                                        navigateTo('checkout');
                                    }, 100);
                                }}
                                disabled={product.stock <= 0}
                                className="flex-1 h-14 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 text-sm shadow-xl shadow-[#D4AF37]/30 hover:bg-white transition-all border-2 border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Zap size={20} fill="currentColor" /> {product.stock <= 0 ? 'No Disponible' : '¡Comprar Ahora!'}
                            </motion.button>
                        </div>

                        {/* Notificación de Stock para productos agotados */}
                        {product.stock <= 0 && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    const email = prompt('Ingresa tu email para notificarte cuando esté disponible:');
                                    if (email && email.includes('@')) {
                                        notifyWhenAvailable(product.id, email);
                                    } else if (email) {
                                        showNotification('Email inválido');
                                    }
                                }}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-xs hover:bg-green-500/30 transition-all"
                            >
                                <Bell size={16} /> Avísame cuando llegue
                            </motion.button>
                        )}

                        <motion.a
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            href={`https://wa.me/573046661245?text=Hola JoMat! Quiero consultar sobre: ${product.name}`}
                            target="_blank"
                            className="h-14 bg-[#21C55D] text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 text-sm shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all"
                        >
                            <MessageCircle size={20} /> Consultar por WhatsApp
                        </motion.a>
                    </div>

                    {/* Calculadora de Cuotas */}
                    <div className="mb-8">
                        <InstallmentCalculator price={product.price} isDarkMode={isDarkMode} formatPrice={formatPrice} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[{ icon: <Truck size={20} />, t: "Envío Gratis", d: "A toda Colombia" }, { icon: <ShieldCheck size={20} />, t: "100% Original", d: "Garantizado" }, { icon: <Clock size={20} />, t: "Devolución", d: "30 días de plazo" }, { icon: <MessageCircle size={20} />, t: "Soporte 24/7", d: "Vía WhatsApp" }].map((b, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10 shadow-xl shadow-black/20' : 'bg-gray-50 border-gray-200'} flex items-center gap-4`}>
                                <div className="text-[#D4AF37]">{b.icon}</div>
                                <div><p className="text-[11px] font-black uppercase tracking-tight">{b.t}</p><p className="text-[10px] opacity-60 font-medium">{b.d}</p></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Tabs Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-white/10 pt-10">
                <div className="flex gap-10 border-b border-white/10 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    {['Descripción', 'Especificaciones', 'Cuidado VIP', 'Envío', 'Reseñas'].map((tab: string) => (
                        <button key={tab} onClick={() => setActiveTab(tab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))} className={`text-[11px] uppercase font-black tracking-[0.2em] relative pb-4 transition-all whitespace-nowrap ${activeTab === tab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}>
                            {tab}
                            {activeTab === tab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />}
                        </button>
                    ))}
                </div>

                <div className="min-h-[250px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'descripcion' && (
                            <motion.div key="desc" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-4xl space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-black italic">{product.category === 'Perfumes' ? 'Experiencia Olfativa' : 'Elegancia Definida'}</h4>
                                    <p className={`text-base leading-relaxed font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {product.description}
                                    </p>
                                </div>
                                
                                {/* Pirámide Olfativa para Perfumes */}
                                {product.category === 'Perfumes' && product.specs['Notas de Salida'] && (
                                    <div className="p-8 rounded-[2rem] bg-gradient-to-b from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/20">
                                        <h6 className="font-black text-xs uppercase mb-6 tracking-[0.4em] text-[#D4AF37]">Pirámide Olfativa</h6>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-black text-[#D4AF37]">TOP</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase tracking-widest mb-2 text-[#D4AF37]">Notas de Salida</p>
                                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {product.specs['Notas de Salida']}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Primeros 15-30 minutos</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-black text-[#D4AF37]">❤️</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase tracking-widest mb-2 text-[#D4AF37]">Notas de Corazón</p>
                                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {product.specs['Notas de Corazón']}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">2-4 horas después</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-black text-[#D4AF37]">BASE</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase tracking-widest mb-2 text-[#D4AF37]">Notas de Fondo</p>
                                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        {product.specs['Notas de Fondo']}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Duración total: {product.specs.Duración}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="p-8 rounded-[2rem] bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                                    <h6 className="font-black text-xs uppercase mb-6 tracking-[0.4em] text-[#D4AF37]">
                                        {product.category === 'Perfumes' ? 'Características Premium' : 'Propuesta de Valor'}
                                    </h6>
                                    <ul className="grid sm:grid-cols-2 gap-6">
                                        {product.features?.map((f: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-400">
                                                <div className="bg-[#D4AF37] p-1 rounded-full mt-1"><Check size={10} className="text-black" /></div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'especificaciones' && (
                            <motion.div key="specs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-x-20 gap-y-4">
                                {Object.entries(product.specs).map(([k, v]: [string, any]) => (
                                    <div key={k} className="flex justify-between items-center py-5 border-b border-white/5 group hover:border-[#D4AF37]/30 transition-colors">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{k}</span>
                                        <span className="text-sm font-bold tracking-tight">{v}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {activeTab === 'cuidadovip' && (
                            <motion.div key="care" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-10 rounded-[2rem] bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-[#D4AF37] rounded-xl text-black"><ShieldCheck size={24} /></div>
                                    <div>
                                        <h4 className="text-xl font-black uppercase tracking-widest">
                                            {product.category === 'Perfumes' ? 'Cuidado Premium de tu Fragancia' : 'Protocolo de Limpieza JoMat'}
                                        </h4>
                                        <p className="text-[10px] opacity-60 font-medium">
                                            {product.category === 'Perfumes' 
                                                ? `Guía para preservar tu ${product.specs.Concentración || 'fragancia'}` 
                                                : `Guía oficial según el material: ${product.specs.Material}`
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {product.category === 'Perfumes' ? [
                                        { t: "Conservación", d: "Mantener en lugar fresco (15-20°C), lejos de luz solar directa y fuentes de calor. El baño NO es ideal por humedad." },
                                        { t: "Aplicación Correcta", d: "Rociar en puntos de pulso: muñecas, cuello, detrás de orejas. Nunca frotar, dejar secar naturalmente." },
                                        { t: "Vida Útil", d: "Duración de 3-5 años si se almacena correctamente. Una vez abierto, consumir en 2-3 años para máxima calidad." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-[#D4AF37]/5 transition-all">
                                            <h5 className="text-[11px] font-black text-[#D4AF37] uppercase mb-2">0{i + 1}. {item.t}</h5>
                                            <p className="text-[10px] leading-relaxed opacity-80">{item.d}</p>
                                        </div>
                                    )) : [
                                        { t: "Limpieza", d: `Usar paño de microfibra JoMat para la parte de ${product.specs.Material}.` },
                                        { t: "Almacenaje", d: "Guardar siempre en su caja original acolchada para evitar humedad." },
                                        { t: "Mantenimiento", d: "Revisión de sellos cada 2 años para mantener hermeticidad." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-[#D4AF37]/5 transition-all">
                                            <h5 className="text-[11px] font-black text-[#D4AF37] uppercase mb-2">0{i + 1}. {item.t}</h5>
                                            <p className="text-[10px] leading-relaxed opacity-80">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'envio' && (
                            <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl space-y-6">
                                <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <Truck className="text-[#D4AF37]" size={32} />
                                    <div>
                                        <h5 className="font-black text-sm uppercase mb-2">Envíos Nacionales (Colombia)</h5>
                                        <p className="text-xs text-gray-400 font-bold">Despachamos desde Bogotá. Entrega en 24-48h.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'resenas' && (
                            <motion.div key="reviews" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="text-5xl font-black text-[#D4AF37]">{product.rating}</div>
                                    <div className="flex text-[#D4AF37]">{[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {product.reviews} reseñas verificadas
                                    </div>
                                </div>

                                {/* Formulario de Reseñas - Requiere Login (Estilo Amazon) */}
                                <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                    <h5 className="text-lg font-black mb-4">Comparte tu Experiencia VIP</h5>
                                    {!isLoggedIn ? (
                                        <div className="text-center py-8">
                                            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Debes iniciar sesión para publicar una reseña
                                            </p>
                                            <button
                                                onClick={onAuthClick}
                                                className="px-8 py-3 bg-[#D4AF37] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-all"
                                            >
                                                Iniciar Sesión
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const form = e.target as HTMLFormElement;
                                            const rating = (form.elements.namedItem('rating') as HTMLInputElement).value;
                                            const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
                                            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                                            
                                            // Validar contenido ofensivo
                                            const validation = validateContent(comment);
                                            if (!validation.isValid) {
                                                showNotification(validation.message || 'Contenido inapropiado');
                                                return;
                                            }

                                            // Simular envío de reseña con archivos
                                            const mediaCount = reviewMediaFiles.length;
                                            const message = mediaCount > 0 
                                                ? `¡Reseña con ${mediaCount} archivo(s) enviada! Está en validación VIP.`
                                                : '¡Reseña enviada! Está en validación VIP.';
                                            showNotification(message);
                                            setShowSuccessModal(true);
                                            
                                            // Limpiar formulario y archivos
                                            form.reset();
                                            setReviewMediaFiles([]);
                                            setReviewMediaPreviews([]);
                                        }} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black uppercase mb-2">Tu Calificación</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <label key={star} className="cursor-pointer">
                                                            <input type="radio" name="rating" value={star} required className="sr-only peer" />
                                                            <Star size={28} className="text-gray-400 peer-checked:text-[#D4AF37] peer-checked:fill-[#D4AF37] hover:text-[#D4AF37] transition-colors" />
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="block text-xs font-black uppercase mb-2">Tu Nombre</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    maxLength={50}
                                                    className={`w-full p-3 rounded-xl border outline-none focus:border-[#D4AF37] transition-colors ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}
                                                    placeholder="Ej: María González"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="comment" className="block text-xs font-black uppercase mb-2">Tu Opinión</label>
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    required
                                                    rows={4}
                                                    maxLength={500}
                                                    className={`w-full p-3 rounded-xl border outline-none focus:border-[#D4AF37] transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}
                                                    placeholder="Cuéntanos sobre tu experiencia con este producto..."
                                                />
                                                <p className="text-xs text-gray-500 mt-2">Máximo 500 caracteres</p>
                                            </div>
                                            
                                            {/* Upload de Fotos/Videos */}
                                            <div>
                                                <label className="block text-xs font-black uppercase mb-2">Fotos o Video (Opcional)</label>
                                                <div className={`border-2 border-dashed rounded-xl p-6 transition-all ${isDarkMode ? 'border-white/10 hover:border-[#D4AF37]/50' : 'border-gray-200 hover:border-[#D4AF37]/50'}`}>
                                                    <input
                                                        type="file"
                                                        id="media-upload"
                                                        accept="image/*,video/*"
                                                        multiple
                                                        onChange={handleMediaUpload}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="media-upload"
                                                        className="cursor-pointer flex flex-col items-center gap-3"
                                                    >
                                                        <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                                                            <Smartphone size={24} className="text-[#D4AF37]" />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm font-bold mb-1">Sube fotos o video de tu experiencia</p>
                                                            <p className="text-xs text-gray-500">Máximo 5 archivos - 10MB c/u</p>
                                                        </div>
                                                    </label>
                                                </div>
                                                
                                                {/* Previews de archivos subidos - Estilo Amazon */}
                                                {reviewMediaPreviews.length > 0 && (
                                                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-4">
                                                        {reviewMediaPreviews.map((preview, idx) => (
                                                            <div key={idx} className="relative group aspect-square">
                                                                <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-[#D4AF37] transition-all">
                                                                    {reviewMediaFiles[idx]?.type.startsWith('video/') ? (
                                                                        <div className="relative w-full h-full">
                                                                            <video
                                                                                src={preview}
                                                                                className="w-full h-full object-cover"
                                                                                controls={false}
                                                                            />
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                                                                                <div className="p-2 bg-black/70 rounded-full">
                                                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <img
                                                                            src={preview}
                                                                            alt={`Preview ${idx + 1}`}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeMediaFile(idx)}
                                                                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                                                                >
                                                                    <X size={16} className="text-white" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                className="w-full py-3 bg-[#D4AF37] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-all"
                                            >
                                                Publicar Reseña
                                            </button>
                                        </form>
                                    )}
                                </div>

                                {/* Lista de Reseñas Existentes (Amazon Style) */}
                                <div className="space-y-6 mt-12">
                                    <h5 className="text-lg font-black">Reseñas de Clientes</h5>
                                    {[
                                        { 
                                            id: 1, 
                                            name: 'Carlos Mendoza', 
                                            rating: 5, 
                                            date: 'Hace 3 días', 
                                            comment: 'Excelente calidad, el reloj superó mis expectativas. El acabado es impecable.', 
                                            verified: true, 
                                            comments: [],
                                            media: [
                                                { type: 'image', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
                                                { type: 'image', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400' }
                                            ]
                                        },
                                        { 
                                            id: 2, 
                                            name: 'Ana Rodríguez', 
                                            rating: 5, 
                                            date: 'Hace 1 semana', 
                                            comment: 'Envío rápido y producto tal como se describe. Muy satisfecha con la compra.', 
                                            verified: true, 
                                            comments: [],
                                            media: [
                                                { type: 'image', url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=400' }
                                            ]
                                        },
                                        { 
                                            id: 3, 
                                            name: 'Luis Torres', 
                                            rating: 4, 
                                            date: 'Hace 2 semanas', 
                                            comment: 'Buen producto, aunque el empaque podría mejorar. El reloj es hermoso.', 
                                            verified: true, 
                                            comments: [],
                                            media: []
                                        }
                                    ].map((review) => (
                                        <div key={review.id} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-black text-sm">{review.name}</span>
                                                        {review.verified && (
                                                            <span className="text-xs px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full font-bold">
                                                                Compra Verificada
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex text-[#D4AF37]">
                                                            {[...Array(review.rating)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                                                        </div>
                                                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {review.comment}
                                            </p>
                                            
                                            {/* Media Gallery (Fotos/Videos del cliente) - Estilo Amazon */}
                                            {review.media && review.media.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Smartphone size={14} className="text-[#D4AF37]" />
                                                        <span className="text-xs font-bold text-[#D4AF37]">Fotos de clientes</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                                        {review.media.map((item: any, idx: number) => (
                                                            <div 
                                                                key={idx} 
                                                                className="relative group cursor-pointer aspect-square"
                                                                onClick={() => setSelectedMediaModal({url: item.url, type: item.type})}
                                                            >
                                                                <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all shadow-sm hover:shadow-lg">
                                                                    {item.type === 'video' ? (
                                                                        <div className="relative w-full h-full">
                                                                            <video
                                                                                src={item.url}
                                                                                className="w-full h-full object-cover"
                                                                                controls={false}
                                                                            />
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                                                                                <div className="p-2 bg-black/70 rounded-full group-hover:scale-110 transition-transform">
                                                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="relative w-full h-full">
                                                                            <img
                                                                                src={item.url}
                                                                                alt={`Foto ${idx + 1} de ${review.name}`}
                                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                            />
                                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Botón de Comentar */}
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                {showCommentForm === review.id ? (
                                                    // Formulario de comentario visible
                                                    <div className="space-y-3">
                                                        {!isLoggedIn ? (
                                                            // Usuario NO logueado
                                                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <AlertTriangle size={18} className="text-red-500" />
                                                                    <p className="text-sm font-bold text-red-500">Debes iniciar sesión para comentar</p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={onAuthClick}
                                                                        className="px-4 py-2 bg-[#D4AF37] text-black font-black uppercase text-xs tracking-widest rounded-lg hover:bg-white transition-all"
                                                                    >
                                                                        Iniciar Sesión
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setShowCommentForm(null)}
                                                                        className={`px-4 py-2 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            // Usuario logueado - Mostrar formulario
                                                            <form onSubmit={(e) => {
                                                                e.preventDefault();
                                                                const commentText = reviewComments[review.id] || '';
                                                                
                                                                // Validar que no esté vacío
                                                                if (!commentText.trim()) {
                                                                    showNotification('El comentario no puede estar vacío');
                                                                    return;
                                                                }
                                                                
                                                                // Validar contenido ofensivo
                                                                const validation = validateContent(commentText);
                                                                if (!validation.isValid) {
                                                                    showNotification(validation.message || 'Tu comentario contiene lenguaje inapropiado');
                                                                    return;
                                                                }
                                                                
                                                                // Comentario válido - Enviar
                                                                showNotification('¡Comentario publicado exitosamente!');
                                                                setReviewComments({...reviewComments, [review.id]: ''});
                                                                setShowCommentForm(null);
                                                            }} className="space-y-3">
                                                                <textarea
                                                                    value={reviewComments[review.id] || ''}
                                                                    onChange={(e) => setReviewComments({...reviewComments, [review.id]: e.target.value})}
                                                                    placeholder="Escribe tu comentario..."
                                                                    rows={3}
                                                                    maxLength={300}
                                                                    className={`w-full p-3 rounded-xl border outline-none focus:border-[#D4AF37] transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}
                                                                />
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs text-gray-500">
                                                                        {(reviewComments[review.id] || '').length}/300 caracteres
                                                                    </span>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setShowCommentForm(null);
                                                                                setReviewComments({...reviewComments, [review.id]: ''});
                                                                            }}
                                                                            className={`px-4 py-2 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                                        >
                                                                            Cancelar
                                                                        </button>
                                                                        <button
                                                                            type="submit"
                                                                            className="px-4 py-2 bg-[#D4AF37] text-black font-black uppercase text-xs tracking-widest rounded-lg hover:bg-white transition-all"
                                                                        >
                                                                            Publicar
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </div>
                                                ) : (
                                                    // Botón para mostrar formulario
                                                    <button
                                                        onClick={() => setShowCommentForm(review.id)}
                                                        className={`flex items-center gap-2 text-xs font-bold transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#D4AF37]' : 'text-gray-600 hover:text-[#D4AF37]'}`}
                                                    >
                                                        <MessageCircle size={14} />
                                                        Comentar esta reseña
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Upselling: Completar el Set */}
                {product.category === 'Relojes' && (
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[#D4AF37]/10 rotate-12"><Sparkles size={120} /></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Maridaje de Lujo</span>
                                <h3 className="text-3xl font-playfair font-black mb-4">Completa tu Set Signature</h3>
                                <p className={`text-sm leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Complementa tu reloj con una fragancia que proyecte autoridad.</p>
                                <motion.button onClick={() => navigateTo('shop')} className="px-8 py-4 bg-[#D4AF37] text-black font-black uppercase text-[10px] tracking-widest rounded-xl">Ver Perfumes</motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Modal de Media Ampliada - Estilo Amazon */}
            <AnimatePresence>
                {selectedMediaModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[6500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedMediaModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMediaModal(null)}
                                className="absolute -top-14 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all group"
                            >
                                <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                {selectedMediaModal.type === 'video' ? (
                                    <video
                                        src={selectedMediaModal.url}
                                        className="w-full h-auto max-h-[85vh]"
                                        controls
                                        autoPlay
                                    />
                                ) : (
                                    <img
                                        src={selectedMediaModal.url}
                                        alt="Vista ampliada"
                                        className="w-full h-auto max-h-[85vh] object-contain"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className={`relative w-full max-w-sm p-12 rounded-[3rem] border-2 text-center ${isDarkMode ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-white border-gray-100'}`}>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                                    <Check className="text-black" size={40} />
                                </div>
                                <h4 className="text-2xl font-black mb-4">¡RECIBIDO!</h4>
                                <p className="text-sm opacity-60 mb-8">Tu reseña está en validación elite.</p>
                                <button onClick={() => setShowSuccessModal(false)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase">Cerrar</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CheckoutPage({ cart, total, handleWhatsAppCheckout, isDarkMode, formatPrice }: { cart: any[], total: number, handleWhatsAppCheckout: (d: any) => void, isDarkMode: boolean, formatPrice: (p: number) => string }) {
    const [formData, setFormData] = useState({ 
        pais: 'Colombia',
        nombre: '', 
        apellidos: '',
        cedula: '', 
        tel: '', 
        ciudad: '', 
        departamento: '',
        codigoPostal: '',
        direccion: '',
        apartamento: '',
        metodoPago: 'Efectivo contra entrega',
        notaEspecial: '',
        esRegalo: false,
        nombreDestinatario: '',
        mensajeRegalo: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saveInfo, setSaveInfo] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState<{code: string, percentage: number} | null>(null);
    const [discountError, setDiscountError] = useState('');
    
    // Códigos de descuento disponibles
    const discountCodes = {
        'JOMAT10': 10,
        'JOMAT15': 15,
        'JOMAT20': 20,
        'VIP25': 25,
        'PRIMERA30': 30,
        'LUXURY50': 50
    };
    
    const applyDiscountCode = () => {
        const code = discountCode.toUpperCase().trim();
        if (!code) {
            setDiscountError('Ingresa un código');
            return;
        }
        if (discountCodes[code as keyof typeof discountCodes]) {
            setAppliedDiscount({
                code: code,
                percentage: discountCodes[code as keyof typeof discountCodes]
            });
            setDiscountError('');
        } else {
            setDiscountError('Código inválido');
            setAppliedDiscount(null);
        }
    };
    
    const removeDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode('');
        setDiscountError('');
    };
    
    // Calcular totales con descuento
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountAmount = appliedDiscount ? (subtotalAmount * appliedDiscount.percentage) / 100 : 0;
    const finalTotal = subtotalAmount - discountAmount;
    
    // Resetear formulario cuando entras a checkout
    useEffect(() => {
        setFormData({ 
            pais: 'Colombia',
            nombre: '', 
            apellidos: '',
            cedula: '', 
            tel: '', 
            ciudad: '', 
            departamento: '',
            codigoPostal: '',
            direccion: '',
            apartamento: '',
            metodoPago: 'Efectivo contra entrega',
            notaEspecial: '',
            esRegalo: false,
            nombreDestinatario: '',
            mensajeRegalo: ''
        });
        setErrors({});
        setIsSubmitting(false);
        setSaveInfo(false);
        setDiscountCode('');
        setAppliedDiscount(null);
        setDiscountError('');
    }, []); // Solo al montar el componente
    
    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if (!formData.nombre || formData.nombre.length < 2) newErrors.nombre = 'Requerido';
        if (!formData.apellidos || formData.apellidos.length < 2) newErrors.apellidos = 'Requerido';
        if (!formData.cedula || formData.cedula.length < 6) newErrors.cedula = 'Inválida';
        if (!formData.tel || formData.tel.length < 10) newErrors.tel = 'Inválido';
        if (!formData.ciudad) newErrors.ciudad = 'Requerida';
        if (!formData.departamento) newErrors.departamento = 'Requerido';
        if (!formData.direccion || formData.direccion.length < 10) newErrors.direccion = 'Muy corta';
        if (formData.esRegalo && !formData.nombreDestinatario) newErrors.nombreDestinatario = 'Requerido para regalo';
        return newErrors;
    };
    
    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault(); 
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            handleWhatsAppCheckout({
                ...formData,
                discountInfo: appliedDiscount
            });
            setIsSubmitting(false);
        }, 500);
    };
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 0; // Envío gratis
    const relojes = cart.filter(item => item.category === 'Relojes');
    const perfumes = cart.filter(item => item.category === 'Perfumes');
    
    return (
        <div className="py-12 max-w-7xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-playfair font-black mb-3 text-center">Finalizar Pedido</h1>
                <p className={`text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Estás a un paso de recibir tu pedido VIP
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                {/* Columna Izquierda - Formulario */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Información de Envío */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg">
                                <User size={16} className="text-[#D4AF37]" />
                            </div>
                            <h4 className="text-base font-black">Información Personal</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* País/Región */}
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">País / Región</label>
                                <select 
                                    value={formData.pais}
                                    onChange={(e) => setFormData({...formData, pais: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm text-black"
                                >
                                    <option value="Colombia">🇨🇴 Colombia</option>
                                    <option value="Argentina">🇦🇷 Argentina</option>
                                    <option value="Bolivia">🇧🇴 Bolivia</option>
                                    <option value="Brasil">🇧🇷 Brasil</option>
                                    <option value="Chile">🇨🇱 Chile</option>
                                    <option value="Costa Rica">🇨🇷 Costa Rica</option>
                                    <option value="Cuba">🇨🇺 Cuba</option>
                                    <option value="Ecuador">🇪🇨 Ecuador</option>
                                    <option value="El Salvador">🇸🇻 El Salvador</option>
                                    <option value="España">🇪🇸 España</option>
                                    <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
                                    <option value="Guatemala">🇬🇹 Guatemala</option>
                                    <option value="Honduras">🇭🇳 Honduras</option>
                                    <option value="México">🇲🇽 México</option>
                                    <option value="Nicaragua">🇳🇮 Nicaragua</option>
                                    <option value="Panamá">🇵🇦 Panamá</option>
                                    <option value="Paraguay">🇵🇾 Paraguay</option>
                                    <option value="Perú">🇵🇪 Perú</option>
                                    <option value="Puerto Rico">🇵🇷 Puerto Rico</option>
                                    <option value="República Dominicana">🇩🇴 República Dominicana</option>
                                    <option value="Uruguay">🇺🇾 Uruguay</option>
                                    <option value="Venezuela">🇻🇪 Venezuela</option>
                                    <option disabled>──────────</option>
                                    <option value="Alemania">🇩🇪 Alemania</option>
                                    <option value="Canadá">🇨🇦 Canadá</option>
                                    <option value="Francia">🇫🇷 Francia</option>
                                    <option value="Italia">🇮🇹 Italia</option>
                                    <option value="Portugal">🇵🇹 Portugal</option>
                                    <option value="Reino Unido">🇬🇧 Reino Unido</option>
                                    <option value="Otro">🌎 Otro país</option>
                                </select>
                            </div>

                            {/* Nombre */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Nombre</label>
                                <input 
                                    required 
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.nombre ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Juan"
                                    value={formData.nombre}
                                    onChange={(e) => {
                                        setFormData({...formData, nombre: e.target.value});
                                        if (errors.nombre) setErrors({...errors, nombre: ''});
                                    }}
                                />
                                {errors.nombre && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.nombre}</p>}
                            </div>

                            {/* Apellidos */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Apellidos</label>
                                <input 
                                    required 
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.apellidos ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Pérez García"
                                    value={formData.apellidos}
                                    onChange={(e) => {
                                        setFormData({...formData, apellidos: e.target.value});
                                        if (errors.apellidos) setErrors({...errors, apellidos: ''});
                                    }}
                                />
                                {errors.apellidos && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.apellidos}</p>}
                            </div>

                            {/* Cédula */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Cédula o NIT</label>
                                <input 
                                    required 
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.cedula ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="1234567890"
                                    value={formData.cedula}
                                    onChange={(e) => {
                                        setFormData({...formData, cedula: e.target.value});
                                        if (errors.cedula) setErrors({...errors, cedula: ''});
                                    }}
                                />
                                {errors.cedula && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.cedula}</p>}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Teléfono / WhatsApp</label>
                                <input 
                                    required 
                                    type="tel"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.tel ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="3001234567"
                                    value={formData.tel}
                                    onChange={(e) => {
                                        setFormData({...formData, tel: e.target.value});
                                        if (errors.tel) setErrors({...errors, tel: ''});
                                    }}
                                />
                                {errors.tel && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.tel}</p>}
                            </div>
                        </div>
                    </motion.div>

                    {/* Dirección de Envío */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg">
                                <Truck size={16} className="text-[#D4AF37]" />
                            </div>
                            <h4 className="text-base font-black">Dirección de Envío</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Dirección Principal */}
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Dirección</label>
                                <input 
                                    required
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.direccion ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Calle 123 # 45-67"
                                    value={formData.direccion}
                                    onChange={(e) => {
                                        setFormData({...formData, direccion: e.target.value});
                                        if (errors.direccion) setErrors({...errors, direccion: ''});
                                    }}
                                />
                                {errors.direccion && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.direccion}</p>}
                            </div>

                            {/* Apartamento/Casa (Opcional) */}
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Casa, apartamento, etc. (opcional)</label>
                                <input 
                                    type="text"
                                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm"
                                    placeholder="Apto 301, Torre A"
                                    value={formData.apartamento}
                                    onChange={(e) => setFormData({...formData, apartamento: e.target.value})}
                                />
                            </div>

                            {/* Ciudad */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Ciudad</label>
                                <input 
                                    required
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.ciudad ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Bogotá"
                                    value={formData.ciudad}
                                    onChange={(e) => {
                                        setFormData({...formData, ciudad: e.target.value});
                                        if (errors.ciudad) setErrors({...errors, ciudad: ''});
                                    }}
                                />
                                {errors.ciudad && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.ciudad}</p>}
                            </div>

                            {/* Departamento/Estado */}
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Provincia / Estado</label>
                                <input 
                                    required
                                    type="text"
                                    className={`w-full p-2.5 bg-white/5 border rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm ${errors.departamento ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Cundinamarca"
                                    value={formData.departamento}
                                    onChange={(e) => {
                                        setFormData({...formData, departamento: e.target.value});
                                        if (errors.departamento) setErrors({...errors, departamento: ''});
                                    }}
                                />
                                {errors.departamento && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.departamento}</p>}
                            </div>

                            {/* Código Postal (Opcional) */}
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-gray-500 mb-1.5 block">Código postal (opcional)</label>
                                <input 
                                    type="text"
                                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#D4AF37] transition-colors text-sm"
                                    placeholder="110111"
                                    value={formData.codigoPostal}
                                    onChange={(e) => setFormData({...formData, codigoPostal: e.target.value})}
                                />
                            </div>

                            {/* Checkbox Guardar Info */}
                            <div className="md:col-span-2 flex items-center gap-2 pt-2">
                                <input 
                                    type="checkbox" 
                                    id="saveInfo"
                                    checked={saveInfo}
                                    onChange={(e) => setSaveInfo(e.target.checked)}
                                    className="w-4 h-4 accent-[#D4AF37]"
                                />
                                <label htmlFor="saveInfo" className="text-xs text-gray-500 cursor-pointer">
                                    Guardar mi información y consultar más rápidamente la próxima vez
                                </label>
                            </div>
                        </div>
                    </motion.div>

                    {/* Método de Pago */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg">
                                <CreditCard size={16} className="text-[#D4AF37]" />
                            </div>
                            <h4 className="text-base font-black">Método de Pago</h4>
                        </div>
                        
                        <div className="space-y-3">
                            {/* Efectivo Contra Entrega */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'Efectivo contra entrega' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="Efectivo contra entrega"
                                    checked={formData.metodoPago === 'Efectivo contra entrega'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Banknote size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">Efectivo Contra Entrega</p>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Paga en efectivo cuando recibas tu pedido.
                                    </p>
                                </div>
                            </label>

                            {/* Transferencia Bancaria */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'Transferencia bancaria' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="Transferencia bancaria"
                                    checked={formData.metodoPago === 'Transferencia bancaria'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Building2 size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">Transferencia o Consignación Bancaria</p>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Te enviaremos los datos bancarios por WhatsApp
                                    </p>
                                </div>
                            </label>

                            {/* Tarjeta de Crédito/Débito */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'Tarjeta crédito/débito' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="Tarjeta crédito/débito"
                                    checked={formData.metodoPago === 'Tarjeta crédito/débito'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CreditCard size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">Tarjeta de Crédito o Débito</p>
                                        <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold">SEGURO</span>
                                    </div>
                                    <p className={`text-[11px] mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Visa, Mastercard, American Express
                                    </p>
                                    <div className="flex gap-1.5 mt-2">
                                        <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[7px] font-bold">VISA</div>
                                        <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center text-white text-[7px] font-bold">MC</div>
                                        <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-[7px] font-bold">AMEX</div>
                                    </div>
                                </div>
                            </label>

                            {/* Addi - Compra ahora, paga después */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'Addi (Crédito)' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="Addi (Crédito)"
                                    checked={formData.metodoPago === 'Addi (Crédito)'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Wallet size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">Addi - Compra Ahora, Paga Después</p>
                                        <span className="text-[9px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full font-bold">0% INTERÉS</span>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Financia en 3, 6 o 12 cuotas sin tarjeta de crédito
                                    </p>
                                </div>
                            </label>

                            {/* Nequi / Daviplata */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'Nequi/Daviplata' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="Nequi/Daviplata"
                                    checked={formData.metodoPago === 'Nequi/Daviplata'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Smartphone size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">Nequi / Daviplata / Bancolombia</p>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Te enviaremos los datos por WhatsApp
                                    </p>
                                </div>
                            </label>

                            {/* PSE */}
                            <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.metodoPago === 'PSE' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input 
                                    type="radio" 
                                    name="metodoPago" 
                                    value="PSE"
                                    checked={formData.metodoPago === 'PSE'}
                                    onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                                    className="mt-0.5 accent-[#D4AF37]"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shield size={14} className="text-[#D4AF37]" />
                                        <p className="font-bold text-sm">PSE (Débito a Cuenta)</p>
                                        <span className="text-[9px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full font-bold">INMEDIATO</span>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Todos los bancos de Colombia
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* Nota de seguridad */}
                        <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
                            <ShieldCheck size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-blue-500 mb-1">🔒 Tu información está 100% protegida</p>
                                <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Utilizamos encriptación SSL de grado bancario. Nunca almacenamos datos de tarjetas.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Opciones Adicionales */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 }}
                        className={`p-6 rounded-3xl border-2 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                <Gift size={20} className="text-pink-400" />
                            </div>
                            <h4 className="text-lg font-black">Opciones Adicionales</h4>
                        </div>

                        {/* Es un regalo? */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="esRegalo"
                                    checked={formData.esRegalo}
                                    onChange={(e) => setFormData({...formData, esRegalo: e.target.checked})}
                                    className="w-4 h-4 accent-pink-500"
                                />
                                <label htmlFor="esRegalo" className="text-sm font-black cursor-pointer">
                                    🎁 ¿Es un regalo?
                                </label>
                            </div>

                            <AnimatePresence>
                                {formData.esRegalo && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: 'auto', opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }}
                                        className="space-y-3 overflow-hidden"
                                    >
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block">Nombre del destinatario</label>
                                            <input 
                                                type="text"
                                                placeholder="María Fernanda"
                                                value={formData.nombreDestinatario}
                                                onChange={(e) => {
                                                    setFormData({...formData, nombreDestinatario: e.target.value});
                                                    if (errors.nombreDestinatario) setErrors({...errors, nombreDestinatario: ''});
                                                }}
                                                className={`w-full p-3 bg-white/5 border rounded-xl text-sm outline-none focus:border-pink-500 transition-colors ${errors.nombreDestinatario ? 'border-red-500' : 'border-white/10'}`}
                                            />
                                            {errors.nombreDestinatario && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.nombreDestinatario}</p>}
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-2 block">Mensaje de regalo (opcional)</label>
                                            <textarea 
                                                placeholder="¡Feliz cumpleaños amor! Espero que te guste..."
                                                value={formData.mensajeRegalo}
                                                onChange={(e) => setFormData({...formData, mensajeRegalo: e.target.value})}
                                                rows={3}
                                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-pink-500 transition-colors resize-none"
                                            />
                                        </div>
                                        <p className="text-[10px] text-pink-400 font-bold flex items-center gap-2">
                                            <Info size={12} />
                                            Incluiremos una tarjeta premium con tu mensaje
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Instrucciones Especiales */}
                            <div className="pt-4 border-t border-white/10">
                                <label className="text-xs font-bold text-gray-500 mb-2 block flex items-center gap-2">
                                    <MessageCircle size={14} className="text-blue-400" />
                                    Instrucciones especiales (opcional)
                                </label>
                                <textarea 
                                    placeholder="Ej: Tocar el timbre antes de llamar, dejar en portería, horario preferido..."
                                    value={formData.notaEspecial}
                                    onChange={(e) => setFormData({...formData, notaEspecial: e.target.value})}
                                    rows={3}
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Botón de Compra */}
                    <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={isSubmitting || cart.length === 0}
                        className={`w-full py-4 bg-[#25D366] text-white font-bold uppercase rounded-xl text-sm flex items-center justify-center gap-3 hover:bg-[#1ebd5b] transition-all shadow-lg shadow-green-500/20 ${isSubmitting || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.982-.363-1.747-.756-2.871-2.506-2.958-2.62-.087-.114-.708-.941-.708-1.797 0-.856.448-1.274.607-1.445.159-.171.347-.214.463-.214l.332.006c.106.005.249-.04.391.299l.542 1.312c.046.111.077.241.004.388-.073.148-.11.239-.217.363-.109.124-.228.277-.326.37l-.216.223c.11.201.243.402.403.593.585.696 1.242 1.157 1.961 1.439l.216-.271c.125-.156.259-.328.423-.328l.352.004c.142.006.285.011.411.066l1.205.592c.126.062.21.093.257.176.047.082.047.477-.097.882zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                        </svg>
                        {isSubmitting ? 'Procesando...' : 'Comprar vía WhatsApp'}
                    </motion.button>
                </div>

                {/* Columna Derecha - Resumen del Pedido */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1 space-y-6"
                >
                    {/* Resumen */}
                    <div className={`p-6 rounded-3xl border-2 sticky top-24 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'}`}>
                        <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                            <ShoppingBag size={20} className="text-[#D4AF37]" />
                            Resumen del Pedido
                        </h4>

                        {/* Lista de Productos */}
                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                            {cart.map((item, idx) => (
                                <div key={idx} className={`flex gap-4 p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        <img src={item.image} loading="lazy" alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-1 right-1 bg-[#D4AF37] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                            {item.qty}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold line-clamp-2 mb-1">{item.name}</p>
                                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                        <p className="text-sm font-black text-[#D4AF37]">{formatPrice(item.price * item.qty)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lo que incluye tu pedido */}
                        <div className={`p-4 rounded-xl mb-6 ${isDarkMode ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'bg-amber-50 border border-amber-200'}`}>
                            <p className="text-xs font-black uppercase tracking-wider text-[#D4AF37] mb-3">Tu pedido incluye:</p>
                            <div className="space-y-2">
                                {relojes.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <Check size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                        <p className="text-xs font-semibold">
                                            <strong>{relojes.length} Reloj(es):</strong> Caja original, manual, certificado de autenticidad, garantía de {relojes[0].warranty || '2 años'}
                                        </p>
                                    </div>
                                )}
                                {perfumes.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <Check size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                        <p className="text-xs font-semibold">
                                            <strong>{perfumes.length} Perfume(s):</strong> Caja original, frasco sellado, certificado de autenticidad
                                        </p>
                                    </div>
                                )}
                                <div className="flex items-start gap-2">
                                    <Check size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                    <p className="text-xs font-semibold">Empaque premium JoMat Luxury</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                    <p className="text-xs font-semibold">Tarjeta de agradecimiento personalizada</p>
                                </div>
                            </div>
                        </div>

                        {/* Desglose de Precios */}
                        <div className="space-y-3 border-t border-white/10 pt-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} productos)</span>
                                <span className="font-bold">{formatPrice(subtotalAmount)}</span>
                            </div>
                            
                            {/* Código de Descuento */}
                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag size={14} className="text-green-500" />
                                    <span className="text-xs font-black text-green-500">Código de Descuento</span>
                                </div>
                                {!appliedDiscount ? (
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                placeholder="Ej: JOMAT20"
                                                value={discountCode}
                                                onChange={(e) => {
                                                    setDiscountCode(e.target.value.toUpperCase());
                                                    setDiscountError('');
                                                }}
                                                className="flex-1 p-2 bg-white/5 border border-white/10 rounded-lg text-xs outline-none focus:border-green-500 transition-colors uppercase"
                                            />
                                            <button 
                                                onClick={applyDiscountCode}
                                                className="px-3 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                        {discountError && <p className="text-red-500 text-[10px] font-bold">{discountError}</p>}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-green-600">✓ {appliedDiscount.code} aplicado</p>
                                            <p className="text-[10px] text-green-500">Ahorro: {appliedDiscount.percentage}%</p>
                                        </div>
                                        <button 
                                            onClick={removeDiscount}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            <XCircle size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {appliedDiscount && (
                                <div className="flex justify-between text-sm text-green-500">
                                    <span className="font-bold">Descuento (-{appliedDiscount.percentage}%)</span>
                                    <span className="font-bold">-{formatPrice(discountAmount)}</span>
                                </div>
                            )}
                            
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Envío</span>
                                <span className="font-bold text-green-500">GRATIS</span>
                            </div>
                            <div className="flex justify-between text-lg font-black pt-3 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-[#D4AF37]">{formatPrice(finalTotal)}</span>
                            </div>
                        </div>

                        {/* Garantías */}
                        <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck size={16} className="text-[#D4AF37]" />
                                <p className="text-xs font-black uppercase">Garantías JoMat</p>
                            </div>
                            <div className="space-y-2 text-xs text-gray-500">
                                <p>✓ Envío asegurado y rastreado</p>
                                <p>✓ Devolución 30 días sin preguntas</p>
                                <p>✓ Soporte VIP 24/7 por WhatsApp</p>
                                <p>✓ 100% productos originales</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </form>
        </div>
    );
}

function CartSidebar({ isOpen, onClose, cart, total, updateQty, removeFromCart, navigateTo, isDarkMode, formatPrice }: { isOpen: boolean, onClose: () => void, cart: any[], total: number, updateQty: (id: any, d: number) => void, removeFromCart: (id: any) => void, navigateTo: (v: string) => void, isDarkMode: boolean, formatPrice: (p: number) => string }) {
    const [giftMessage, setGiftMessage] = useState('');
    const [isGift, setIsGift] = useState(false);
    const [recipientName, setRecipientName] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingEstimate, setShippingEstimate] = useState('');
    const [specialNote, setSpecialNote] = useState('');
    const [showShippingCalc, setShowShippingCalc] = useState(false);
    
    // Productos recomendados basados en lo que hay en el carrito
    const hasWatches = cart.some(item => item.category === 'Relojes');
    const hasPerfumes = cart.some(item => item.category === 'Perfumes');
    
    const recommendations = PRODUCTS.filter(p => {
        // No recomendar productos que ya están en el carrito
        if (cart.some(c => c.id === p.id)) return false;
        // Si tiene relojes, recomendar perfumes y viceversa
        if (hasWatches && p.category === 'Perfumes') return true;
        if (hasPerfumes && p.category === 'Relojes') return true;
        return false;
    }).slice(0, 3);
    
    const calculateShipping = () => {
        if (!shippingCity) return;
        const mainCities = ['bogota', 'medellin', 'cali', 'barranquilla', 'cartagena'];
        const isMainCity = mainCities.some(city => shippingCity.toLowerCase().includes(city));
        setShippingEstimate(isMainCity ? '24 horas hábiles' : '2-4 días hábiles');
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#050505] z-[101] flex flex-col overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-[#050505] z-10 flex justify-between items-center p-8 border-b border-white/10">
                            <div>
                                <h3 className="text-2xl font-black">Tu Bolsa</h3>
                                <p className="text-xs text-gray-500 font-bold mt-1">{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        {/* Productos en el carrito */}
                        <div className="flex-1 p-8 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-20">
                                    <ShoppingBag size={64} className="mx-auto mb-6 text-gray-600" />
                                    <p className="text-gray-500 font-bold">Tu bolsa está vacía</p>
                                    <button onClick={() => { onClose(); navigateTo('shop'); }} className="mt-6 px-8 py-3 bg-[#D4AF37] text-black font-black uppercase rounded-xl text-sm">
                                        Ver Catálogo
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {cart.map((item: any) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                                            <img src={item.image} loading="lazy" className="w-20 h-24 object-cover rounded-lg" alt={item.name} />
                                            <div className="flex-1 min-w-0">
                                                <h5 className="text-xs font-black uppercase tracking-wider mb-2 line-clamp-2">{item.name}</h5>
                                                <p className="text-[#D4AF37] text-sm font-black mb-3">{formatPrice(item.price)}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                                                        <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white/10 rounded transition-colors">
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="text-xs font-black w-6 text-center">{item.qty}</span>
                                                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white/10 rounded transition-colors">
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Calculadora de Envío */}
                                    <div className="mt-8 p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/30">
                                        <button onClick={() => setShowShippingCalc(!showShippingCalc)} className="w-full flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Truck size={18} className="text-[#D4AF37]" />
                                                <span className="text-sm font-black">Calcular Envío</span>
                                            </div>
                                            <ChevronDown size={18} className={`text-[#D4AF37] transition-transform ${showShippingCalc ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {showShippingCalc && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 space-y-3">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Tu ciudad"
                                                        value={shippingCity}
                                                        onChange={(e) => setShippingCity(e.target.value)}
                                                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-sm outline-none focus:border-[#D4AF37] transition-colors"
                                                    />
                                                    <button onClick={calculateShipping} className="w-full py-2 bg-[#D4AF37] text-black font-black uppercase text-xs rounded-lg hover:bg-white transition-colors">
                                                        Calcular
                                                    </button>
                                                    {shippingEstimate && (
                                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                                                            <p className="text-xs font-bold text-green-400">
                                                                <Check size={14} className="inline mr-2" />
                                                                Entrega estimada: {shippingEstimate}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Opciones de Regalo */}
                                    <div className="mt-6 p-6 bg-pink-500/10 rounded-2xl border border-pink-500/30">
                                        <div className="flex items-center gap-2 mb-4">
                                            <input 
                                                type="checkbox" 
                                                id="isGift"
                                                checked={isGift}
                                                onChange={(e) => setIsGift(e.target.checked)}
                                                className="w-4 h-4 accent-pink-500"
                                            />
                                            <label htmlFor="isGift" className="text-sm font-black cursor-pointer flex items-center gap-2">
                                                <Gift size={16} className="text-pink-400" />
                                                ¿Es un regalo?
                                            </label>
                                        </div>
                                        <AnimatePresence>
                                            {isGift && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Nombre del destinatario"
                                                        value={recipientName}
                                                        onChange={(e) => setRecipientName(e.target.value)}
                                                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-sm outline-none focus:border-pink-500 transition-colors"
                                                    />
                                                    <textarea 
                                                        placeholder="Mensaje para tu ser querido (ej: ¡Feliz cumpleaños amor!)"
                                                        value={giftMessage}
                                                        onChange={(e) => setGiftMessage(e.target.value)}
                                                        rows={3}
                                                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-sm outline-none focus:border-pink-500 transition-colors resize-none"
                                                    />
                                                    <p className="text-[10px] text-pink-400 font-bold flex items-center gap-2">
                                                        <Info size={12} />
                                                        Incluiremos una tarjeta premium con tu mensaje
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Instrucciones Especiales */}
                                    <div className="mt-6 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/30">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MessageCircle size={16} className="text-blue-400" />
                                            <span className="text-sm font-black">Instrucciones Especiales</span>
                                        </div>
                                        <textarea 
                                            placeholder="¿Alguna petición especial? (ej: Tocar el timbre antes de llamar, dejar en portería, etc.)"
                                            value={specialNote}
                                            onChange={(e) => setSpecialNote(e.target.value)}
                                            rows={3}
                                            className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Productos Recomendados */}
                                    {recommendations.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-white/10">
                                            <h4 className="text-sm font-black mb-4 flex items-center gap-2">
                                                <Sparkles size={16} className="text-[#D4AF37]" />
                                                Completa tu look
                                            </h4>
                                            <div className="space-y-3">
                                                {recommendations.map((product) => (
                                                    <motion.div 
                                                        key={product.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        className="flex gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-white/5"
                                                        onClick={() => { onClose(); navigateTo(`product-${product.id}`); }}
                                                    >
                                                        <img src={product.image} className="w-16 h-16 object-cover rounded-lg" alt={product.name} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] font-black uppercase tracking-wider line-clamp-1 mb-1">{product.name}</p>
                                                            <p className="text-xs text-[#D4AF37] font-black">{formatPrice(product.price)}</p>
                                                            {product.discount && (
                                                                <span className="text-[8px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full font-bold mt-1 inline-block">
                                                                    -{product.discount}%
                                                                </span>
                                                            )}
                                                        </div>
                                                        <Plus size={20} className="text-[#D4AF37] flex-shrink-0" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer con total y botón */}
                        {cart.length > 0 && (
                            <div className="sticky bottom-0 bg-[#050505] p-8 border-t border-white/10">
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs text-gray-500 font-bold">Subtotal</span>
                                        <span className="text-sm font-black">{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs text-gray-500 font-bold">Envío</span>
                                        <span className="text-sm font-black text-green-500">GRATIS</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-white/10">
                                        <span className="text-xs uppercase font-black">Total</span>
                                        <span className="text-2xl text-[#D4AF37] font-black">{formatPrice(total)}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => { 
                                        onClose(); 
                                        navigateTo('checkout'); 
                                    }} 
                                    className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase rounded-2xl shadow-xl shadow-[#D4AF37]/20 hover:bg-white transition-all flex items-center justify-center gap-2"
                                >
                                    Finalizar Compra
                                    <ArrowRight size={20} />
                                </button>
                                <p className="text-center text-[9px] text-gray-600 font-bold mt-4 flex items-center justify-center gap-1">
                                    <ShieldCheck size={12} className="text-green-500" />
                                    Compra 100% segura y protegida
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function MobileMenu({ isOpen, onClose, navigateTo, isDarkMode }: { isOpen: boolean, onClose: () => void, navigateTo: (v: string) => void, isDarkMode: boolean }) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    
    const menuStructure = [
        { label: 'Inicio', view: 'home' },
        { label: 'Catálogo', view: 'shop' },
        { 
            label: 'RELOJES', 
            view: 'relojes',
            submenu: [
                { label: 'Hombre', view: 'relojes' },
                { label: 'Mujer', view: 'relojes' },
                { label: 'Automáticos', view: 'relojes' },
                { label: 'Swiss Made', view: 'relojes' },
                { label: 'Digitales', view: 'relojes' },
                { label: 'Mini Ring', view: 'relojes' },
                { label: 'Colecciones', view: 'relojes' },
                { label: 'Nuevos', view: 'relojes' },
                { label: 'Marcas Invitadas', view: 'relojes' },
                { label: 'Ver Todos', view: 'relojes' }
            ]
        },
        { label: 'Edición Especial', view: 'shop' },
        { label: 'Accesorios', view: 'shop' },
        { label: 'Destacados', view: 'shop' },
        { 
            label: 'PERFUMES', 
            view: 'perfumes',
            submenu: [
                { label: 'Hombre', view: 'perfumes' },
                { label: 'Mujer', view: 'perfumes' },
                { label: 'Unisex', view: 'perfumes' },
                { label: 'Nuevos', view: 'perfumes' },
                { label: 'Ver Todos', view: 'perfumes' }
            ]
        },
        { label: 'SUPER OFERTA', view: 'ofertas', isHighlight: true }
    ];
    
    const toggleCategory = (label: string) => {
        setExpandedCategory(expandedCategory === label ? null : label);
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop con blur */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />
                    
                    {/* Menu Panel */}
                    <motion.div 
                        initial={{ x: '-100%' }} 
                        animate={{ x: 0 }} 
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className={`fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm flex flex-col ${isDarkMode ? 'bg-gradient-to-b from-black via-[#0a0a0a] to-black' : 'bg-gradient-to-b from-white via-gray-50 to-white'} shadow-2xl`}
                    >
                        {/* Header */}
                        <div className="px-6 py-8 border-b border-[#D4AF37]/20">
                            <div className="flex justify-between items-center">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05, duration: 0.2 }}
                                >
                                    <h2 className="text-2xl font-playfair font-black text-[#D4AF37] tracking-wider">JOMAT</h2>
                                    <p className={`text-[8px] tracking-[0.2em] uppercase font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Luxury Collection</p>
                                </motion.div>
                                <motion.button 
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
                                >
                                    <X size={20} className="text-[#D4AF37]" />
                                </motion.button>
                            </div>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="flex-1 py-2 overflow-y-auto">
                            <nav className="flex flex-col">
                                {menuStructure.map((item, index) => (
                                    <div key={item.label}>
                                        <motion.button
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + index * 0.02, duration: 0.15 }}
                                            onClick={() => {
                                                if (item.submenu) {
                                                    toggleCategory(item.label);
                                                } else {
                                                    navigateTo(item.view);
                                                    onClose();
                                                }
                                            }}
                                            className={`w-full flex items-center justify-between px-6 py-4 border-b transition-all ${
                                                item.isHighlight 
                                                    ? 'bg-red-600 text-white border-red-700 hover:bg-red-700' 
                                                    : isDarkMode 
                                                        ? 'border-[#D4AF37]/10 hover:bg-[#D4AF37]/5' 
                                                        : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className={`font-black tracking-wide ${
                                                item.isHighlight 
                                                    ? 'text-white' 
                                                    : isDarkMode 
                                                        ? 'text-white' 
                                                        : 'text-black'
                                            }`}>
                                                {item.label}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: item.submenu && expandedCategory === item.label ? 90 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronRight size={20} className={item.isHighlight ? 'text-white' : ''} />
                                            </motion.div>
                                        </motion.button>
                                        
                                        {/* Submenu expandible */}
                                        <AnimatePresence>
                                            {item.submenu && expandedCategory === item.label && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`overflow-hidden ${isDarkMode ? 'bg-black/40' : 'bg-gray-50'}`}
                                                >
                                                    <div className="py-2">
                                                        {item.submenu.map((subitem, subindex) => (
                                                            <motion.button
                                                                key={`${subitem.label}-${subindex}`}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: subindex * 0.02 }}
                                                                onClick={() => { navigateTo(subitem.view); onClose(); }}
                                                                className={`w-full text-left px-12 py-3 border-b transition-all ${
                                                                    isDarkMode 
                                                                        ? 'text-gray-400 hover:text-white hover:bg-[#D4AF37]/5 border-[#D4AF37]/10' 
                                                                        : 'text-gray-600 hover:text-black hover:bg-white border-gray-100'
                                                                }`}
                                                            >
                                                                <span className="text-sm font-semibold">{subitem.label}</span>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </nav>
                        </div>
                        
                        {/* Footer con Redes Sociales */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                            className="px-8 py-8 border-t border-[#D4AF37]/20"
                        >
                            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                Síguenos
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={24} />, label: 'Instagram' },
                                    { icon: <Facebook size={24} />, label: 'Facebook' },
                                    { icon: <Twitter size={24} />, label: 'Twitter' }
                                ].map((social, index) => (
                                    <motion.button
                                        key={social.label}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black transition-all flex items-center justify-center shadow-lg"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function TestimonialsSection({ isDarkMode }: { isDarkMode: boolean }) {
    const testimonials = [
        { name: "Carlos Rodríguez", city: "Bogotá", text: "Increíble experiencia de compra. Mi Invicta llegó perfectamente empacado en solo 2 días. La calidad es excepcional y el servicio al cliente por WhatsApp fue muy atento. ¡100% recomendado!", product: "Invicta Pro Diver Gold" },
        { name: "María Fernanda López", city: "Cartagena de Indias", text: "El Lattafa Khamrah es simplemente espectacular. Recibo cumplidos todo el tiempo. JoMat Luxury es mi tienda de confianza ahora. Envío rápido y productos originales garantizados.", product: "Lattafa Khamrah 100ml" },
        { name: "Andrés Martínez", city: "Cali", text: "Compré el combo de reloj + perfume y ahorré más de $200.000. La atención personalizada por WhatsApp hizo toda la diferencia. Productos auténticos y de primera calidad.", product: "Combo Premium" },
        { name: "Laura Sánchez", city: "Barranquilla", text: "Mi G-Shock llegó antes de lo esperado. El empaque de lujo me sorprendió gratamente. Es exactamente como en las fotos. Definitivamente volveré a comprar aquí.", product: "Casio G-Shock Black" },
        { name: "Juan David Pérez", city: "Cartagena", text: "El Moschino Toy Boy es auténtico y llegó sellado de fábrica. Precios increíbles comparados con tiendas físicas. JoMat Luxury es la mejor opción para comprar en Colombia.", product: "Moschino Toy Boy 100ml" },
        { name: "Valentina Gómez", city: "Bucaramanga", text: "Regalo perfecto para mi esposo. El Technomarine es impresionante y llegó en una caja de presentación hermosa. El servicio de JoMat es excepcional.", product: "Technomarine Cruise Blue" }
    ];
    return (
        <section className={`py-32 transition-colors ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-playfair font-black mb-6">Lo Que Dicen <span className="text-[#D4AF37]">Nuestros Clientes</span></h2>
                    <p className="text-gray-500 font-medium tracking-widest uppercase text-[10px]">Más de 2,800 clientes satisfechos avalan nuestra calidad</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((t: { name: string; city: string; text: string; product: string; }, i: number) => (
                        <motion.div key={i} whileHover={{ y: -8, scale: 1.02 }} className={`p-10 rounded-3xl border-2 transition-all ${isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-2xl shadow-black' : 'bg-white border-gray-100 shadow-xl'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-[#D4AF37] opacity-20"><Quote size={40} /></div>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_: undefined, j: number) => <Star key={j} size={14} fill="currentColor" />)}
                                </div>
                            </div>
                            <p className="text-gray-300 font-medium italic text-lg mb-8 leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] font-black text-xl">{t.name[0]}</div>
                                    <div>
                                        <h6 className="font-black text-white">{t.name}</h6>
                                        <p className="text-[10px] text-gray-500 font-bold">{t.city}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-green-500 text-[9px] font-black uppercase">
                                    <ShieldCheck size={14} /> Verificado
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                <span className="text-[9px] font-black text-gray-600 uppercase">Compró:</span>
                                <span className="text-[9px] font-black text-[#D4AF37] uppercase">{t.product}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function VipSection({ isDarkMode, onAuthClick }: { isDarkMode: boolean, onAuthClick: () => void }) {
    const benefits = [
        { t: "Pre-Lanzamientos Exclusivos", d: "Accede a las últimas colecciones de Invicta y fragancias nicho 48 horas antes del lanzamiento oficial." },
        { t: "Descuento Permanente", d: "Disfruta de un 5% de descuento fijo en cada compra, acumulable con ofertas de temporada." },
        { t: "Concierge de Lujo", d: "Asesoría personal para encontrar esa pieza única que buscas, incluso si no está en catálogo." }
    ];
    return (
        <section className={`py-28 relative overflow-hidden transition-colors ${isDarkMode ? 'bg-gradient-to-b from-black to-[#050505]' : 'bg-gradient-to-b from-white to-gray-50'}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[150px] opacity-40"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <h2 className={`text-4xl md:text-6xl font-playfair font-black mb-8 leading-none ${isDarkMode ? 'text-white' : 'text-[#111]'}`}>JoMat <span className="text-[#D4AF37]">Club VIP</span></h2>
                <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-20 font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Únete al exclusivo círculo de coleccionistas JoMat. No solo compras productos; adquieres un estatus de privilegio y atención personalizada.</p>
                <div className="grid sm:grid-cols-3 gap-10 max-w-6xl mx-auto mb-24">
                    {benefits.map((benefit, i) => (
                        <motion.div key={i} whileHover={{ y: -15, scale: 1.03 }} className={`p-10 border-2 rounded-[2.5rem] shadow-2xl backdrop-blur-md transition-all ${isDarkMode ? 'bg-white/5 border-[#D4AF37]/30 text-white shadow-black' : 'bg-white border-black/5 text-[#111] shadow-gray-200'}`}>
                            <div className="text-[#D4AF37] mb-8 flex justify-center"><Award size={48} className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" /></div>
                            <h5 className="font-black text-xl mb-5 leading-tight tracking-tight">{benefit.t}</h5>
                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-60 leading-relaxed">{benefit.d}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.button 
                    onClick={onAuthClick}
                    whileHover={{ y: -5, scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="px-16 py-6 bg-black text-white border-2 border-[#D4AF37] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black transition-all text-[11px]"
                >
                    Unirme a la Élite JoMat
                </motion.button>
            </div>
        </section>
    );
}

function FAQSection({ isDarkMode }: { isDarkMode: boolean }) {
    const [open, setOpen] = useState(0);
    const faqs = [{ q: "¿Son productos 100% originales?", a: "Absolutamente. Cada pieza es verificada por expertos gemólogos y relojeros, enviada con sus cajas originales, manuales de usuario y certificados de autenticidad de fábrica." }, { q: "¿Cuánto tarda el envío a mi ciudad?", a: "Para Cartagena de Indias y ciudades principales, el envío tarda 24 horas hábiles. Para el resto del país, entre 2 y 4 días hábiles mediante transporte blindado." }, { q: "¿Qué garantía tienen los relojes?", a: "Ofrecemos garantía extendida certificada de hasta 3 años por defectos en maquinaria, respaldando la integridad mecánica de cada marca que comercializamos." }, { q: "¿Puedo pagar al recibir mi pedido?", a: "Sí, tenemos habilitado el servicio de pago contra entrega en la mayor parte de Colombia para garantizar una transacción 100% segura para ti." }];
    return (
        <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} text-white transition-colors`}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-playfair font-black mb-12 text-center leading-tight">Preguntas <span className="text-[#D4AF37]">Frecuentes</span></h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className={`border rounded-[1.5rem] overflow-hidden transition-all ${isDarkMode ? 'border-white/10 bg-[#0a0a0a]' : 'border-gray-200 bg-white shadow-sm'}`}>
                            <button onClick={() => setOpen(open === i ? -1 : i)} className={`w-full p-6 text-left flex justify-between items-center transition-colors font-black text-sm ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}><span className="max-w-[90%] uppercase tracking-widest">{faq.q}</span><ChevronDown size={18} className={`text-[#D4AF37] transition-transform duration-500 ${open === i ? 'rotate-180' : ''}`} /></button>
                            <AnimatePresence>{open === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className={`overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}><p className={`p-6 pt-0 text-sm leading-relaxed font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p></motion.div>)}</AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



function AboutPage({ isDarkMode, navigateTo }: { isDarkMode: boolean, navigateTo: (v: string) => void }) {
    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
            <div className="max-w-6xl mx-auto px-6 py-24">
                {/* Hero Section Historia */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Nuestro Legado</span>
                    <h1 className="text-5xl md:text-7xl font-playfair font-black mb-8 leading-tight">Dos Amigos, Una Visión,<br /><span className="text-[#D4AF37]">Un Estilo de Vida</span></h1>
                    <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
                </motion.div>

                {/* Grid de la Historia */}
                <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-black italic tracking-tighter">Todo comenzó frente al Mar Caribe...</h3>
                        <p className="text-lg opacity-70 leading-relaxed font-medium">
                            JoMat Luxury no nació en una oficina fría, sino bajo la luz dorada de un atardecer en <span className="text-[#D4AF37] font-bold">Cartagena de Indias</span>. Fue allí donde dos amigos, movidos por la visión de emprender y la pasión compartida por las piezas que cuentan historias, decidieron unir fuerzas.
                        </p>
                        <p className="text-lg opacity-70 leading-relaxed font-medium">
                            Como socios, se propusieron un reto ambicioso: democratizar el acceso al lujo auténtico en Colombia, eliminando las barreras de la pretensión y enfocándose en la autenticidad y el trato humano.
                        </p>
                        <div className="flex items-center gap-6 pt-6">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#D4AF37]">2+</span>
                                <span className="text-[10px] uppercase font-black opacity-40">Fundadores</span>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#D4AF37]">2022</span>
                                <span className="text-[10px] uppercase font-black opacity-40">Origen Cartagena</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-[3rem] -z-10 rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
                            className="rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] object-cover"
                            alt="Luxury Atmosphere"
                        />
                        <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl hidden lg:block">
                            <p className="text-black text-sm font-black italic">"El lujo no es tener cosas, es coleccionar momentos impecables."</p>
                        </div>
                    </motion.div>
                </div>

                {/* El Propósito */}
                <div className="grid md:grid-cols-3 gap-12 mb-32">
                    {[
                        { t: "Nuestra Misión", d: "Elevar el estándar de sofisticación personal en Colombia mediante curaduría experta." },
                        { t: "Nuestra Visión", d: "Convertirnos en la boutique digital de lujo más confiable de Latinoamérica." },
                        { t: "Nuestros Valores", d: "Autenticidad radical, excelencia en el servicio y pasión por el detalle." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={`p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-black/5'} transition-all`}
                        >
                            <h4 className="text-[#D4AF37] font-black uppercase text-xs tracking-widest mb-4">{item.t}</h4>
                            <p className="text-sm opacity-60 font-bold leading-relaxed">{item.d}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Cierre */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-[#D4AF37]/5 py-20 rounded-[4rem] border border-[#D4AF37]/20"
                >
                    <h2 className="text-3xl font-playfair font-black mb-6">Tu estilo, tu tiempo,<br />tu aroma hablando por ti.</h2>
                    <p className="text-gray-500 max-w-xl mx-auto mb-12 font-medium italic">
                        Lo que comenzó como una idea en "La Heroica" se ha convertido hoy en el estándar de JoMat Luxury.
                    </p>
                    <motion.button
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigateTo('home')}
                        className="px-14 py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-white transition-all shadow-2xl shadow-[#D4AF37]/20"
                    >
                        Regresar a la Boutique
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

function FavoritesPage({ products, isDarkMode, navigateToProduct, toggleFavorite, addToCart, formatPrice, navigateTo }: { products: any[], isDarkMode: boolean, navigateToProduct: (product: any) => void, toggleFavorite: (p: any) => void, addToCart: (p: any) => void, formatPrice: (p: number) => string, navigateTo: (v: string) => void }) {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4 min-h-[60vh]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <h1 className="text-4xl font-playfair font-black">Mis <span className="text-[#D4AF37]">Favoritos</span></h1>
                {products.length > 0 && (
                    <ShareWishlist favorites={products} isDarkMode={isDarkMode} />
                )}
            </div>
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <Heart size={64} className="mx-auto mb-6 opacity-20" />
                    <p className="text-xl font-black uppercase tracking-widest opacity-40">No tienes favoritos aún</p>
                    <button onClick={() => navigateTo('shop')} className="mt-8 px-8 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-lg shadow-[#D4AF37]/20">Explorar Catálogo</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} addToCart={addToCart} navigateToProduct={navigateToProduct} toggleFavorite={toggleFavorite} isFavorite={true} isDarkMode={isDarkMode} formatPrice={formatPrice} />
                    ))}
                </div>
            )}
        </div>
    );
}

function HistoryPage({ products, isDarkMode, navigateToProduct, formatPrice }: { products: any[], isDarkMode: boolean, navigateToProduct: (product: any) => void, formatPrice: (p: number) => string }) {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-playfair font-black mb-12">Recientemente <span className="text-[#D4AF37]">Visto</span></h1>
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <Clock size={64} className="mx-auto mb-6 opacity-20" />
                    <p className="text-xl font-black uppercase tracking-widest opacity-40">No has visto productos aún</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} addToCart={() => { }} navigateToProduct={navigateToProduct} toggleFavorite={() => { }} isFavorite={false} isDarkMode={isDarkMode} formatPrice={formatPrice} />
                    ))}
                </div>
            )}
        </div>
    );
}

function TrackingPage({ isDarkMode }: { isDarkMode: boolean }) {
    const [orderNumber, setOrderNumber] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [step, setStep] = useState(2);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderNumber.trim()) setIsTracking(true);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-32">
            {!isTracking ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`p-12 rounded-[3.5rem] border-2 text-center ${isDarkMode ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-white border-gray-100 shadow-2xl'}`}>
                    <Truck size={48} className="mx-auto mb-8 text-[#D4AF37]" />
                    <h2 className="text-3xl font-playfair font-black mb-4 uppercase tracking-tighter">Rastreo VIP</h2>
                    <p className="text-sm opacity-60 mb-10 max-w-sm mx-auto font-bold">Ingresa tu número de pedido para conocer el estado de tu envío blindado.</p>
                    <form onSubmit={handleTrack} className="flex flex-col gap-4 max-w-xs mx-auto">
                        <input required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="Ej: JM-8829" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-center font-black tracking-widest outline-none focus:border-[#D4AF37] transition-all" />
                        <button type="submit" className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#D4AF37]/20 hover:bg-white transition-all">Rastrear Pedido</button>
                    </form>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-10 rounded-[3rem] border-2 ${isDarkMode ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-white border-gray-100 shadow-2xl'}`}>
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Pedido #{orderNumber.toUpperCase()}</h2>
                            <p className="text-[10px] font-black uppercase opacity-40">Estado: En Camino</p>
                        </div>
                        <div className="text-right">
                            <Truck size={32} className="text-[#D4AF37]" />
                        </div>
                    </div>

                    <div className="relative mb-20 px-4">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} className="absolute top-1/2 left-0 h-[2px] bg-[#D4AF37] -translate-y-1/2" />
                        <div className="relative z-10 flex justify-between">
                            {['Confirmado', 'Empacado', 'Enviado', 'Entregado'].map((s, i) => (
                                <div key={s} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${i <= step ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30' : 'bg-black border-white/10 text-white/20'}`}>
                                        {i < step ? <Check size={16} strokeWidth={4} /> : i === step ? <div className="w-2 h-2 bg-black rounded-full animate-ping" /> : null}
                                    </div>
                                    <span className={`absolute mt-14 text-[9px] font-black uppercase tracking-widest ${i <= step ? 'text-white' : 'text-white/20'}`}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex gap-4">
                            <MapPin size={20} className="text-[#D4AF37] shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase font-black opacity-40 mb-1">Última Ubicación</p>
                                <p className="text-sm font-bold">Centro de Distribución Norte - Bogotá, D.C.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function FAQPage({ isDarkMode }: { isDarkMode: boolean }) {
    const [search, setSearch] = useState('');
    const faqs = [
        { c: "Pagos", q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito (Visa, Mastercard, Amex), transferencias bancarias, PSE y el servicio de pago contra entrega en ciudades principales." },
        { c: "Pagos", q: "¿Es seguro pagar con tarjeta?", a: "Totalmente. Usamos pasarelas de pago con cifrado SSL de 256 bits y certificación PCI-DSS Nivel 1." },
        { c: "Envío", q: "¿Tienen tienda física?", a: "Somos una boutique 100% digital con centro de distribución en Cartagena de Indias. Esto nos permite eliminar intermediarios y ofrecerte mejores precios." },
        { c: "Envío", q: "¿Hacen envíos internacionales?", a: "Actualmente operamos exclusivamente en Colombia para garantizar la logística blindada y segura de nuestras piezas." },
        { c: "Garantía", q: "¿Los productos son originales?", a: "Garantizamos la originalidad de cada pieza. Todos los productos se entregan con sus empaques originales, manuales y certificados de fábrica." }
    ];
    const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl font-playfair font-black mb-12 text-center pt-10">Centro de <span className="text-[#D4AF37]">Ayuda</span></h1>
            <div className="mb-12 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
                <input
                    type="text"
                    placeholder="Buscador de soluciones..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full p-5 pl-14 rounded-2xl border-2 outline-none focus:border-[#D4AF37] transition-all font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-100 text-black'}`}
                />
            </div>
            <div className="space-y-6">
                {filtered.map((f, i) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest mb-3 block">{f.c}</span>
                        <h3 className="text-xl font-black mb-4">{f.q}</h3>
                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.a}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function ShippingPage({ isDarkMode }: { isDarkMode: boolean }) {
    const steps = [
        { icon: <ShieldCheck size={32} />, t: "Verificación de Calidad", d: "Antes del despacho, expertos revisan que la pieza esté en estado inmaculado." },
        { icon: <Lock size={32} />, t: "Empaque Blindado", d: "Usamos cajas discretas y reforzadas para que el contenido no sea visible externamente." },
        { icon: <Truck size={32} />, t: "Logística Élite", d: "Tus piezas viajan con seguro total y seguimiento satelital mediante transportadoras premium." }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl font-playfair font-black mb-16 text-center pt-10 px-4">Envíos y <span className="text-[#D4AF37]">Logística Blindada</span></h1>
            <div className="grid md:grid-cols-3 gap-8 mb-20 px-4">
                {steps.map((s, i) => (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} key={i} className={`p-10 rounded-[3rem] border-2 text-center ${isDarkMode ? 'bg-white/5 border-[#D4AF37]/20 shadow-2xl shadow-black' : 'bg-white border-gray-100 shadow-xl'}`}>
                        <div className="text-[#D4AF37] flex justify-center mb-8">{s.icon}</div>
                        <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">{s.t}</h4>
                        <p className={`text-sm leading-relaxed opacity-70 ${isDarkMode ? 'text-white' : 'text-black'}`}>{s.d}</p>
                    </motion.div>
                ))}
            </div>
            <div className={`p-12 rounded-[3.5rem] border mx-4 ${isDarkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className="text-2xl font-black mb-8 flex items-center gap-4">📍 Tiempos de Entrega</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <h5 className="text-[#D4AF37] font-black uppercase tracking-widest text-xs mb-2">Principales (Cartagena, Bogotá, Cali)</h5>
                        <p className="text-2xl font-black italic">24 - 48 Horas Hábiles</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <h5 className="text-[#D4AF37] font-black uppercase tracking-widest text-xs mb-2">Resto de Colombia</h5>
                        <p className="text-2xl font-black italic">3 - 5 Días Hábiles</p>
                    </div>
                </div>
                <p className="mt-10 text-xs font-bold opacity-40 uppercase tracking-widest italic text-center text-[#D4AF37]">Todos nuestros envíos son gratuitos y cuentan con seguro total incluido.</p>
            </div>
        </div>
    );
}

function ReturnsPage({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl font-playfair font-black mb-12 text-center pt-10">Política de <span className="text-[#D4AF37]">Satisfacción</span></h1>
            <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-6 mb-8 text-[#D4AF37]">
                    <RotateCcw size={48} />
                    <h2 className="text-3xl font-black italic">30 Días de Garantía Local</h2>
                </div>
                <div className="space-y-8 text-lg leading-relaxed opacity-80">
                    <p>En JoMat Luxury, entendemos que la excelencia no admite dudas. Si tu pieza no cumple con tus expectativas, tienes 30 días para solicitar un cambio o devolución total.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h4 className="font-black text-[#D4AF37] mb-2">Condición Inmaculada</h4>
                            <p className="text-sm">El producto debe estar sin signos de uso, con plásticos protectores y etiquetas originales.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h4 className="font-black text-[#D4AF37] mb-2">Empaque Original</h4>
                            <p className="text-sm">Debe incluir caja, manuales y certificados de autenticidad completos.</p>
                        </div>
                    </div>
                    <p className="pt-6 font-bold text-[#D4AF37]">El proceso de retorno es gratuito para todos nuestros socios VIP.</p>
                </div>
            </div>
        </div>
    );
}

function ContactPage({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl font-playfair font-black mb-16 text-center pt-10">Atención <span className="text-[#D4AF37]">VIP</span></h1>
            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                    <div>
                        <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">¿Cómo podemos ayudarte?</h3>
                        <p className="text-lg opacity-60 leading-relaxed">Nuestros asesores expertos están disponibles para guiarte en tu próxima gran elección o resolver cualquier duda logística.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-[#25D366]">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.982-.363-1.747-.756-2.871-2.506-2.958-2.62-.087-.114-.708-.941-.708-1.797 0-.856.448-1.274.607-1.445.159-.171.347-.214.463-.214l.332.006c.106.005.249-.04.391.299l.542 1.312c.046.111.077.241.004.388-.073.148-.11.239-.217.363-.109.124-.228.277-.326.37l-.216.223c.11.201.243.402.403.593.585.696 1.242 1.157 1.961 1.439l.216-.271c.125-.156.259-.328.423-.328l.352.004c.142.006.285.011.411.066l1.205.592c.126.062.21.093.257.176.047.082.047.477-.097.882zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                            <div>
                                <h4 className="font-black">WhatsApp Concierge</h4>
                                <p className="text-sm opacity-60">Respuesta inmediata</p>
                                <a href="https://wa.me/573046661245" className="text-[#25D366] font-black underline">+57 304 666 1245</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                            <Mail size={32} className="text-[#D4AF37]" />
                            <div>
                                <h4 className="font-black">Email Corporativo</h4>
                                <p className="text-sm opacity-60">Consultas formales o alianzas</p>
                                <p className="text-[#D4AF37] font-black">contacto@jomatluxury.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'}`}>
                    <form className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Nombre Completo</label>
                            <input type="text" className={`w-full p-4 rounded-xl border outline-none focus:border-[#D4AF37] ${isDarkMode ? 'bg-black border-white/10' : 'bg-gray-50 border-gray-200'}`} placeholder="Ej. Juan Pérez" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">WhatsApp de Contacto</label>
                            <input type="tel" className={`w-full p-4 rounded-xl border outline-none focus:border-[#D4AF37] ${isDarkMode ? 'bg-black border-white/10' : 'bg-gray-50 border-gray-200'}`} placeholder="+57 ..." />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Mensaje</label>
                            <textarea rows={4} className={`w-full p-4 rounded-xl border outline-none focus:border-[#D4AF37] ${isDarkMode ? 'bg-black border-white/10' : 'bg-gray-50 border-gray-200'}`} placeholder="Cuéntanos qué necesitas..."></textarea>
                        </div>
                        <button className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-[#D4AF37]/20">Enviar Solicitud VIP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function PolicyPage({ type, isDarkMode }: { type: 'terms' | 'privacy' | 'warranty', isDarkMode: boolean }) {
    const getContent = () => {
        switch (type) {
            case 'terms':
                return {
                    t: "Términos y Condiciones de Uso",
                    sections: [
                        { h: "1. Marco Legal", p: "Al acceder a JoMat Luxury, usted acepta sujetarse a los presentes términos y condiciones, los cuales se rigen bajo la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 527 de 1999 sobre comercio electrónico en Colombia." },
                        { h: "2. Veracidad de la Información", p: "JoMat Luxury se esfuerza por mantener la precisión en precios y stock. No obstante, nos reservamos el derecho de cancelar pedidos en caso de errores tipográficos evidentes o falta de disponibilidad, notificando de inmediato al cliente." },
                        { h: "3. Propiedad Intelectual", p: "Todo el contenido, marcas (Invicta, Technomarine, etc.) y material visual en este sitio son propiedad de sus respectivos dueños o de JoMat Luxury. El uso no autorizado será reportado a las autoridades competentes." },
                        { h: "4. Seguridad y Pagos", p: "Garantizamos la seguridad de sus transacciones mediante protocolos SSL de última generación y alianzas con procesadores de pago certificados en Colombia." }
                    ]
                };
            case 'privacy':
                return {
                    t: "Política de Tratamiento de Datos",
                    sections: [
                        { h: "1. Ley 1581 de 2012", p: "En cumplimiento de la Ley de Habeas Data, JoMat Luxury actúa como responsable del tratamiento de sus datos personales, garantizando su confidencialidad y seguridad." },
                        { h: "2. Finalidad del Tratamiento", p: "Sus datos (Nombre, Teléfono, Correo) se recolectan exclusivamente para la gestión de envíos, soporte post-venta personalizado y envío de ofertas de nuestra Lista de Élite, previo consentimiento." },
                        { h: "3. Derechos del Titular", p: "Usted tiene derecho a conocer, actualizar, rectificar y suprimir su información en cualquier momento mediante comunicación directa a nuestros canales de soporte VIP." },
                        { h: "4. No Divulgación", p: "JoMat Luxury no vende, alquila ni comparte su base de datos con terceros con fines comerciales ajenos al cumplimiento de su pedido." }
                    ]
                };
            case 'warranty':
                return {
                    t: "Políticas de Garantía y Autenticidad",
                    sections: [
                        { h: "1. Garantía de Autenticidad", p: "Certificamos que cada pieza comercializada es 100% auténtica y nueva. Se entrega con empaques originales, manuales y certificados de fábrica, cumpliendo con la Ley 1480 de 2011." },
                        { h: "2. Cobertura Técnica", p: "Los relojes cuentan con una garantía de 1 a 3 años (según marca) por defectos exclusivamente en la maquinaria interna. No cubre daños por uso indebido, golpes o contacto con agua en modelos no aptos." },
                        { h: "3. Perfumería", p: "Al ser productos de uso personal, la garantía en perfumes se limita a defectos en el atomizador o integridad del envase comprobados al momento de la entrega inicial." },
                        { h: "4. Proceso de Reclamación", p: "Cualquier solicitud de garantía debe gestionarse a través de nuestro WhatsApp Concierge, presentando su número de pedido o factura digital." }
                    ]
                };
        }
    };

    const content = getContent();

    return (
        <section className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
            <div className="max-w-4xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-playfair font-black mb-6 leading-tight">{content.t}</h1>
                    <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`p-10 md:p-16 rounded-[3.5rem] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                    <div className="space-y-12">
                        {content.sections.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <h3 className="text-[#D4AF37] font-black uppercase tracking-[0.2em] text-xs mb-4">{section.h}</h3>
                                <p className="text-lg leading-relaxed opacity-70 font-medium">{section.p}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 pt-12 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
                            <div className="text-[10px] font-black uppercase tracking-widest">Compromiso JoMat Luxury &copy; 2026</div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-[#D4AF37]" /> Seguridad Jurídica Procesada
                            </div>
                        </div>
                    </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function BottomNavBar({ view, navigateTo, cartCount, favoritesCount, setIsCartOpen, setIsMenuOpen, isDarkMode }: any) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Inicio' },
        { id: 'shop', icon: Search, label: 'Buscar' },
        { id: 'cart', icon: ShoppingCart, label: 'Carrito', badge: cartCount },
        { id: 'favorites', icon: Heart, label: 'Favoritos', badge: favoritesCount },
        { id: 'menu', icon: Menu, label: 'Menú' },
    ];

    const handleNavClick = (item: any) => {
        if (item.id === 'cart') {
            setIsCartOpen(true);
        } else if (item.id === 'menu') {
            setIsMenuOpen(true);
        } else {
            navigateTo(item.id);
        }
    };

    return (
        <motion.nav 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t transition-all backdrop-blur-xl ${
                isDarkMode 
                    ? 'bg-black/95 border-white/10' 
                    : 'bg-white/95 border-gray-200'
            }`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = view === item.id;
                    
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item)}
                            className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px]"
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="relative">
                                <Icon 
                                    size={22} 
                                    className={`transition-all ${
                                        isActive 
                                            ? 'text-[#D4AF37]' 
                                            : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                    fill={isActive && (item.id === 'favorites' || item.id === 'cart') ? '#D4AF37' : 'none'}
                                />
                                {item.badge > 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                                    >
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </motion.div>
                                )}
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${
                                isActive 
                                    ? 'text-[#D4AF37]' 
                                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.nav>
    );
}




