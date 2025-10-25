"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product, Quote, QuoteItem, Customer } from '@/lib/database';
import { generateQuotePDF, QuotePDFData } from '@/lib/pdfGenerator';

// Types and Interfaces
interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount?: number;
  margin?: number;
  customName?: string;
  salesPrice?: number;
  manualSalesPrice?: boolean;
  isGrouped?: boolean;
  groupName?: string;
  groupItems?: CartItem[];
}

// Constants and Steps
const steps = [
  { id: 1, title: 'Müşteri', icon: '👥' },
  { id: 2, title: 'Proje', icon: '📝' },
  { id: 3, title: 'Ürünler', icon: '🛒' },
  { id: 4, title: 'Özet', icon: '✓' },
];

export default function Home() {
  // Login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // States for navigation and UI
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [kdv, setKdv] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isGrouping, setIsGrouping] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  });
  const [projectDetails, setProjectDetails] = useState({
    projectDesign: '',
    projectDescription: ''
  });
  const [schedule, setSchedule] = useState({
    startDate: '',
    endDate: ''
  });
  const [conditions, setConditions] = useState({
    validityPeriod: '30',
    deliveryTime: ''
  });
  const [loading, setLoading] = useState(true);
  const [viewingGroupId, setViewingGroupId] = useState<number | null>(null);
  
  // Tavan hesaplama için state'ler
  const [ceilingWidth, setCeilingWidth] = useState<number>(0);
  const [ceilingHeight, setCeilingHeight] = useState<number>(0);
  const [ceilingCount, setCeilingCount] = useState<number>(1);
  const [ceilingPricePerSquareMeter, setCeilingPricePerSquareMeter] = useState<number>(0);
  
  // Zemin hesaplama için state'ler
  const [floorWidth, setFloorWidth] = useState<number>(0);
  const [floorHeight, setFloorHeight] = useState<number>(0);
  const [floorCount, setFloorCount] = useState<number>(1);
  const [floorPricePerSquareMeter, setFloorPricePerSquareMeter] = useState<number>(0);
  
  // Duvar hesaplama için state'ler
  const [wallWidth, setWallWidth] = useState<number>(0);
  const [wallHeight, setWallHeight] = useState<number>(0);
  const [wallCount, setWallCount] = useState<number>(1);
  const [wallPricePerSquareMeter, setWallPricePerSquareMeter] = useState<number>(0);
  
  // Kapı için state'ler (hesaplama değil, direkt giriş)
  const [doorWidth, setDoorWidth] = useState<number>(0);
  const [doorHeight, setDoorHeight] = useState<number>(0);
  const [doorPrice, setDoorPrice] = useState<number>(0);
  
  // Tedarikçi bazlı ürün seçimi için state'ler
  interface Supplier {
    id: number;
    name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
  }
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [supplierCategories, setSupplierCategories] = useState<string[]>([]);
  const [supplierSelectedCategory, setSupplierSelectedCategory] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  // Sarf Malzeme (Bakır Boru ve Kablo) için state'ler
  const [copperPipeLength, setCopperPipeLength] = useState<number>(0);
  const [copperPipePricePerMeter, setCopperPipePricePerMeter] = useState<number>(0);
  const [cableLength, setCableLength] = useState<number>(0);
  const [cablePricePerMeter, setCablePricePerMeter] = useState<number>(0);
  
  // Aksesuar Hesaplama için state'ler
  const [interiorAccessoryLength, setInteriorAccessoryLength] = useState<number>(0);
  const [interiorAccessoryCount, setInteriorAccessoryCount] = useState<number>(1);
  const [interiorAccessoryUnitPrice, setInteriorAccessoryUnitPrice] = useState<number>(0);
  
  const [exteriorAccessoryLength, setExteriorAccessoryLength] = useState<number>(0);
  const [exteriorAccessoryCount, setExteriorAccessoryCount] = useState<number>(1);
  const [exteriorAccessoryUnitPrice, setExteriorAccessoryUnitPrice] = useState<number>(0);
  
  const [floorUWaterLength, setFloorUWaterLength] = useState<number>(0);
  const [floorUWaterCount, setFloorUWaterCount] = useState<number>(1);
  const [floorUWaterUnitPrice, setFloorUWaterUnitPrice] = useState<number>(0);
  
  // Tavan, zemin ve duvar için ayrı hesaplama fonksiyonları
  const ceilingSquareMeters = ceilingWidth * ceilingHeight * ceilingCount;
  const ceilingTotalPrice = ceilingSquareMeters * ceilingPricePerSquareMeter;
  
  const floorSquareMeters = floorWidth * floorHeight * floorCount;
  const floorTotalPrice = floorSquareMeters * floorPricePerSquareMeter;
  
  const wallSquareMeters = wallWidth * wallHeight * wallCount;
  const wallTotalPrice = wallSquareMeters * wallPricePerSquareMeter;

  // Sarf Malzeme hesaplamaları
  const copperPipeTotalPrice = copperPipeLength * copperPipePricePerMeter;
  const cableTotalPrice = cableLength * cablePricePerMeter;
  
  // Aksesuar hesaplamaları (Boy × Adet × Birim Fiyat)
  const interiorAccessoryTotalPrice = interiorAccessoryLength * interiorAccessoryCount * interiorAccessoryUnitPrice;
  const exteriorAccessoryTotalPrice = exteriorAccessoryLength * exteriorAccessoryCount * exteriorAccessoryUnitPrice;
  const floorUWaterTotalPrice = floorUWaterLength * floorUWaterCount * floorUWaterUnitPrice;

  // Memoized filtered products
  const getFilteredProducts = () => products.filter((product) => {
    const matchesSearch = 
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.model && product.model.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Check localStorage for authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('ekimAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    loadSuppliers();
  }, []);

  // Supplier loading functions
  const loadSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Tedarikçiler yüklenirken hata:', error);
    }
  };

  const loadSupplierProducts = async (supplierId: number) => {
    try {
      const response = await fetch(`/api/suppliers/${supplierId}/products`);
      const data = await response.json();
      const cats = Object.keys(data.categories).sort();
      setSupplierCategories(cats);
    } catch (error) {
      console.error('Tedarikçi ürünleri yüklenirken hata:', error);
    }
  };

  const loadCategoryProducts = async (supplierId: number, category: string) => {
    try {
      const response = await fetch(`/api/suppliers/${supplierId}/products`);
      const data = await response.json();
      setCategoryProducts(data.categories[category] || []);
    } catch (error) {
      console.error('Kategori ürünleri yüklenirken hata:', error);
    }
  };

  const handleSupplierChange = (supplierId: number) => {
    setSelectedSupplierId(supplierId);
    setSupplierSelectedCategory('');
    setCategoryProducts([]);
    setSupplierCategories([]);
    if (supplierId) {
      loadSupplierProducts(supplierId);
    }
  };

  const handleSupplierCategoryChange = (category: string) => {
    setSupplierSelectedCategory(category);
    if (selectedSupplierId && category) {
      loadCategoryProducts(selectedSupplierId, category);
    }
  };

  // Data fetching functions
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Müşteriler yüklenirken hata:', error);
    }
  };

  // Group functions
  const handleGroupProducts = () => {
    if (selectedProducts.length < 1) {
      alert('En az 1 ürün seçmelisiniz');
      return;
    }
    setIsGrouping(true);
  };

  const createGroup = () => {
    if (!groupName) {
      alert('Grup adı giriniz');
      return;
    }

    const selectedItems = cart.filter(item => selectedProducts.includes(item.product.id));
    
    // Calculate total price for the group
    const totalPrice = selectedItems.reduce((sum, item) => {
      const salesPrice = item.salesPrice ?? item.unitPrice;
      return sum + (salesPrice * item.quantity);
    }, 0);

    const groupHeader: CartItem = {
      product: {
        id: Date.now(),
        name: groupName,
        price: totalPrice,
        category: 'Grup',
        stock_quantity: 1
      },
      quantity: 1,
      unitPrice: totalPrice,
      isGrouped: true,
      groupItems: selectedItems,
      salesPrice: totalPrice,
      manualSalesPrice: false
    };

    setCart(prev => [
      ...prev.filter(item => !selectedProducts.includes(item.product.id)),
      groupHeader
    ]);

    setSelectedProducts([]);
    setIsGrouping(false);
    setGroupName('');
  };

  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'Bozkurt' && loginForm.password === 'OtukendenKuzeye34!') {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('ekimAuth', 'authenticated');
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  // Logout function (reserved for future use)
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('ekimAuth');
  // };

  // Cart management functions
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([
        ...cart,
        {
          product,
          quantity: 1,
          unitPrice: product.price || 0,
          discount: 0,
          margin: 0,
          customName: '',
          salesPrice: product.price || 0,
          manualSalesPrice: false
        }
      ]);
    }
  };

  // Tavan hesaplamasını sepete ekle
  const addCeilingToCart = () => {
    if (ceilingSquareMeters <= 0) {
      alert('Lütfen geçerli tavan metrekare değerleri girin');
      return;
    }
    
    if (ceilingPricePerSquareMeter <= 0) {
      alert('Lütfen tavan metrekare başına fiyat girin');
      return;
    }
    
    const detailedDescription = `Tavan: ${ceilingSquareMeters.toFixed(2)} m²`;
    
    const ceilingProduct: Product = {
      id: Date.now() + 1, // Benzersiz ID için timestamp kullanıyoruz
      name: `Tavan (${ceilingSquareMeters.toFixed(2)} m²)`,
      price: ceilingTotalPrice,
      category: 'Metrekare Hesaplama',
      stock_quantity: 1,
      unit: 'm²',
      description: detailedDescription
    };
    
    setCart([
      ...cart,
      {
        product: ceilingProduct,
        quantity: 1,
        unitPrice: ceilingTotalPrice,
        discount: 0,
        margin: 0,
        customName: `Tavan (${ceilingSquareMeters.toFixed(2)} m²)`,
        salesPrice: ceilingTotalPrice,
        manualSalesPrice: false
      }
    ]);
    
    // Tavan alanlarını sıfırla
    setCeilingWidth(0);
    setCeilingHeight(0);
    setCeilingCount(1);
    setCeilingPricePerSquareMeter(0);
  };
  
  // Zemin hesaplamasını sepete ekle
  const addFloorToCart = () => {
    if (floorSquareMeters <= 0) {
      alert('Lütfen geçerli zemin metrekare değerleri girin');
      return;
    }
    
    if (floorPricePerSquareMeter <= 0) {
      alert('Lütfen zemin metrekare başına fiyat girin');
      return;
    }
    
    const detailedDescription = `Zemin: ${floorSquareMeters.toFixed(2)} m²`;
    
    const floorProduct: Product = {
      id: Date.now() + 2, // Benzersiz ID için timestamp kullanıyoruz
      name: `Zemin (${floorSquareMeters.toFixed(2)} m²)`,
      price: floorTotalPrice,
      category: 'Metrekare Hesaplama',
      stock_quantity: 1,
      unit: 'm²',
      description: detailedDescription
    };
    
    setCart([
      ...cart,
      {
        product: floorProduct,
        quantity: 1,
        unitPrice: floorTotalPrice,
        discount: 0,
        margin: 0,
        customName: `Zemin (${floorSquareMeters.toFixed(2)} m²)`,
        salesPrice: floorTotalPrice,
        manualSalesPrice: false
      }
    ]);
    
    // Zemin alanlarını sıfırla
    setFloorWidth(0);
    setFloorHeight(0);
    setFloorCount(1);
    setFloorPricePerSquareMeter(0);
  };
  
  // Duvar hesaplamasını sepete ekle
  const addWallToCart = () => {
    if (wallSquareMeters <= 0) {
      alert('Lütfen geçerli duvar metrekare değerleri girin');
      return;
    }
    
    if (wallPricePerSquareMeter <= 0) {
      alert('Lütfen duvar metrekare başına fiyat girin');
      return;
    }
    
    const detailedDescription = `Duvar: ${wallSquareMeters.toFixed(2)} m²`;
    
    const wallProduct: Product = {
      id: Date.now() + 3, // Benzersiz ID için timestamp kullanıyoruz
      name: `Duvar (${wallSquareMeters.toFixed(2)} m²)`,
      price: wallTotalPrice,
      category: 'Metrekare Hesaplama',
      stock_quantity: 1,
      unit: 'm²',
      description: detailedDescription
    };
    
    setCart([
      ...cart,
      {
        product: wallProduct,
        quantity: 1,
        unitPrice: wallTotalPrice,
        discount: 0,
        margin: 0,
        customName: `Duvar (${wallSquareMeters.toFixed(2)} m²)`,
        salesPrice: wallTotalPrice,
        manualSalesPrice: false
      }
    ]);
    
    // Duvar alanlarını sıfırla
    setWallWidth(0);
    setWallHeight(0);
    setWallCount(1);
    setWallPricePerSquareMeter(0);
  };
  
  // Kapı sepete ekleme (direkt en, boy, fiyat girişi)
  const addDoorToCart = () => {
    if (doorWidth <= 0 || doorHeight <= 0) {
      alert('Lütfen geçerli kapı en ve boy değerleri girin');
      return;
    }
    
    if (doorPrice <= 0) {
      alert('Lütfen kapı fiyatı girin');
      return;
    }
    
    const detailedDescription = `Kapı: ${doorWidth.toFixed(2)}m × ${doorHeight.toFixed(2)}m`;
    
    const doorProduct: Product = {
      id: Date.now() + 4,
      name: `Kapı (${doorWidth.toFixed(2)}m × ${doorHeight.toFixed(2)}m)`,
      price: doorPrice,
      category: 'Panel Hesaplama',
      stock_quantity: 1,
      unit: 'adet',
      description: detailedDescription
    };
    
    setCart([
      ...cart,
      {
        product: doorProduct,
        quantity: 1,
        unitPrice: doorPrice,
        discount: 0,
        margin: 0,
        customName: `Kapı (${doorWidth.toFixed(2)}m × ${doorHeight.toFixed(2)}m)`,
        salesPrice: doorPrice,
        manualSalesPrice: false
      }
    ]);
    
    // Kapı alanlarını sıfırla
    setDoorWidth(0);
    setDoorHeight(0);
    setDoorPrice(0);
  };
  
  // Bakır Boru sepete ekleme
  const addCopperPipeToCart = () => {
    if (copperPipeLength <= 0) {
      alert('Lütfen geçerli bakır boru uzunluğu girin');
      return;
    }
    if (copperPipePricePerMeter <= 0) {
      alert('Lütfen bakır boru metre fiyatı girin');
      return;
    }
    
    const copperPipeProduct: Product = {
      id: Date.now() + 10,
      name: `Bakır Boru (${copperPipeLength.toFixed(2)} m)`,
      price: copperPipeTotalPrice,
      category: 'Sarf Malzeme',
      stock_quantity: 1,
      unit: 'm',
      description: `Bakır Boru: ${copperPipeLength.toFixed(2)} m × €${copperPipePricePerMeter.toFixed(2)}/m`
    };
    
    setCart([...cart, {
      product: copperPipeProduct,
      quantity: 1,
      unitPrice: copperPipeTotalPrice,
      discount: 0,
      margin: 0,
      salesPrice: copperPipeTotalPrice,
      manualSalesPrice: false
    }]);
    
    setCopperPipeLength(0);
    setCopperPipePricePerMeter(0);
  };
  
  // Kablo sepete ekleme
  const addCableToCart = () => {
    if (cableLength <= 0) {
      alert('Lütfen geçerli kablo uzunluğu girin');
      return;
    }
    if (cablePricePerMeter <= 0) {
      alert('Lütfen kablo metre fiyatı girin');
      return;
    }
    
    const cableProduct: Product = {
      id: Date.now() + 11,
      name: `Kablo (${cableLength.toFixed(2)} m)`,
      price: cableTotalPrice,
      category: 'Sarf Malzeme',
      stock_quantity: 1,
      unit: 'm',
      description: `Kablo: ${cableLength.toFixed(2)} m × €${cablePricePerMeter.toFixed(2)}/m`
    };
    
    setCart([...cart, {
      product: cableProduct,
      quantity: 1,
      unitPrice: cableTotalPrice,
      discount: 0,
      margin: 0,
      salesPrice: cableTotalPrice,
      manualSalesPrice: false
    }]);
    
    setCableLength(0);
    setCablePricePerMeter(0);
  };
  
  // İç Aksesuar sepete ekleme
  const addInteriorAccessoryToCart = () => {
    if (interiorAccessoryLength <= 0 || interiorAccessoryCount <= 0) {
      alert('Lütfen geçerli boy ve adet değerleri girin');
      return;
    }
    if (interiorAccessoryUnitPrice <= 0) {
      alert('Lütfen birim fiyat girin');
      return;
    }
    
    const accessoryProduct: Product = {
      id: Date.now() + 20,
      name: `İç Aksesuar`,
      price: interiorAccessoryTotalPrice,
      category: 'Aksesuar',
      stock_quantity: 1,
      unit: 'adet',
      description: `İç Aksesuar: ${interiorAccessoryLength.toFixed(2)} × ${interiorAccessoryCount} × €${interiorAccessoryUnitPrice.toFixed(2)}`
    };
    
    setCart([...cart, {
      product: accessoryProduct,
      quantity: 1,
      unitPrice: interiorAccessoryTotalPrice,
      discount: 0,
      margin: 0,
      salesPrice: interiorAccessoryTotalPrice,
      manualSalesPrice: false
    }]);
    
    setInteriorAccessoryLength(0);
    setInteriorAccessoryCount(1);
    setInteriorAccessoryUnitPrice(0);
  };
  
  // Dış Aksesuar sepete ekleme
  const addExteriorAccessoryToCart = () => {
    if (exteriorAccessoryLength <= 0 || exteriorAccessoryCount <= 0) {
      alert('Lütfen geçerli boy ve adet değerleri girin');
      return;
    }
    if (exteriorAccessoryUnitPrice <= 0) {
      alert('Lütfen birim fiyat girin');
      return;
    }
    
    const accessoryProduct: Product = {
      id: Date.now() + 21,
      name: `Dış Aksesuar`,
      price: exteriorAccessoryTotalPrice,
      category: 'Aksesuar',
      stock_quantity: 1,
      unit: 'adet',
      description: `Dış Aksesuar: ${exteriorAccessoryLength.toFixed(2)} × ${exteriorAccessoryCount} × €${exteriorAccessoryUnitPrice.toFixed(2)}`
    };
    
    setCart([...cart, {
      product: accessoryProduct,
      quantity: 1,
      unitPrice: exteriorAccessoryTotalPrice,
      discount: 0,
      margin: 0,
      salesPrice: exteriorAccessoryTotalPrice,
      manualSalesPrice: false
    }]);
    
    setExteriorAccessoryLength(0);
    setExteriorAccessoryCount(1);
    setExteriorAccessoryUnitPrice(0);
  };
  
  // Zemin U Su sepete ekleme
  const addFloorUWaterToCart = () => {
    if (floorUWaterLength <= 0 || floorUWaterCount <= 0) {
      alert('Lütfen geçerli boy ve adet değerleri girin');
      return;
    }
    if (floorUWaterUnitPrice <= 0) {
      alert('Lütfen birim fiyat girin');
      return;
    }
    
    const accessoryProduct: Product = {
      id: Date.now() + 22,
      name: `Zemin U Su`,
      price: floorUWaterTotalPrice,
      category: 'Aksesuar',
      stock_quantity: 1,
      unit: 'adet',
      description: `Zemin U Su: ${floorUWaterLength.toFixed(2)} × ${floorUWaterCount} × €${floorUWaterUnitPrice.toFixed(2)}`
    };
    
    setCart([...cart, {
      product: accessoryProduct,
      quantity: 1,
      unitPrice: floorUWaterTotalPrice,
      discount: 0,
      margin: 0,
      salesPrice: floorUWaterTotalPrice,
      manualSalesPrice: false
    }]);
    
    setFloorUWaterLength(0);
    setFloorUWaterCount(1);
    setFloorUWaterUnitPrice(0);
  };
  
  // Cart item update functions
  const updateProductName = (productId: number, customName: string) => {
    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, customName }
        : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity }
        : item
    ));
  };

  const updateUnitPrice = (productId: number, unitPrice: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newSalesPrice = item.manualSalesPrice
          ? item.salesPrice
          : calculateSalesPrice(unitPrice, item.discount || 0, item.margin || 0);
        return { ...item, unitPrice, salesPrice: newSalesPrice };
      }
      return item;
    }));
  };

  const updateDiscount = (productId: number, discount: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newSalesPrice = item.manualSalesPrice
          ? item.salesPrice
          : calculateSalesPrice(item.unitPrice, discount, item.margin || 0);
        return { ...item, discount, salesPrice: newSalesPrice };
      }
      return item;
    }));
  };

  const updateMargin = (productId: number, margin: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newSalesPrice = item.manualSalesPrice
          ? item.salesPrice
          : calculateSalesPrice(item.unitPrice, item.discount || 0, margin);
        return { ...item, margin, salesPrice: newSalesPrice };
      }
      return item;
    }));
  };

  const updateSalesPrice = (productId: number, salesPrice: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, salesPrice, manualSalesPrice: true };
      }
      return item;
    }));
  };

  // Cart item update functions for grouped items (reserved for future use)
  // const updateGroupedItem = (groupId: number, updates: Partial<CartItem>) => {
  //   setCart(cart.map(item => {
  //     if (item.product.id === groupId && item.isGrouped) {
  //       const { product, ...otherUpdates } = updates;
  //       const updatedItem = { ...item, ...otherUpdates };
  //       
  //       if (updates.unitPrice !== undefined || updates.discount !== undefined || updates.margin !== undefined) {
  //         const newUnitPrice = updates.unitPrice !== undefined ? updates.unitPrice : (item.unitPrice || 0);
  //         const newDiscount = updates.discount !== undefined ? updates.discount : (item.discount || 0);
  //         const newMargin = updates.margin !== undefined ? updates.margin : (item.margin || 0);
  //         
  //         const discounted = newUnitPrice * (1 - (newDiscount || 0) / 100);
  //         const withMargin = discounted * (1 + (newMargin || 0) / 100);
  //         const newSalesPrice = parseFloat(withMargin.toFixed(2));
  //         
  //         updatedItem.unitPrice = newUnitPrice;
  //         updatedItem.salesPrice = newSalesPrice;
  //         updatedItem.discount = newDiscount;
  //         updatedItem.margin = newMargin;
  //       }
  //       
  //       return updatedItem;
  //     }
  //     return item;
  //   }));
  // };

  // const removeGroupedItem = (groupId: number) => {
  //   setCart(cart.filter(item => item.product.id !== groupId));
  // };

  // Helper functions
  const calculateSalesPrice = (unitPrice: number, discount: number, margin: number) => {
    const discounted = unitPrice * (1 - (discount || 0) / 100);
    const withMargin = discounted * (1 + (margin || 0) / 100);
    return parseFloat(withMargin.toFixed(2));
  };

  // Quote management functions
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId);
    if (customerId) {
      const customer = customers.find(c => c.id?.toString() === customerId);
      if (customer) {
        setCustomerInfo({
          name: customer.name,
          email: customer.email || '',
          phone: customer.phone || '',
          company: customer.company || '',
          address: customer.address || ''
        });
      }
    } else {
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: ''
      });
    }
  };

  // Load quote for editing (reserved for future use)
  // const loadQuoteForEditing = async (quoteData: Quote) => {
  //   try {
  //     setCustomerInfo({
  //       name: quoteData.customer_name || '',
  //       email: quoteData.customer_email || '',
  //       phone: quoteData.customer_phone || '',
  //       company: quoteData.company || '',
  //       address: ''
  //     });
  //     
  //     const notes = quoteData.notes || '';
  //     const projectDesign = notes.match(/Proje Tasarım: ([^\n]*)/)?.[1] || '';
  //     const projectDescription = notes.match(/Proje Açıklama: ([^\n]*)/)?.[1] || '';
  //     const startDate = notes.match(/Başlangıç: ([^\n]*)/)?.[1] || '';
  //     const endDate = notes.match(/Bitiş: ([^\n]*)/)?.[1] || '';
  //     const validityPeriod = notes.match(/Geçerlilik: ([^\n]*)/)?.[1] || '30';
  //     const deliveryTime = notes.match(/Teslim: ([^\n]*)/)?.[1] || '';
  //     
  //     setProjectDetails({ projectDesign, projectDescription });
  //     setSchedule({ startDate, endDate });
  //     setConditions({ validityPeriod: validityPeriod.replace(' gün', ''), deliveryTime });
  //     
  //     const response = await fetch(`/api/quotes/${quoteData.id}`);
  //     if (response.ok) {
  //       const details = await response.json();
  //       const cartItems: CartItem[] = details.items?.map((item: QuoteItem) => ({
  //         product: {
  //           id: item.product_id,
  //           name: item.product_name || 'Unknown Product',
  //           brand: item.brand || '',
  //           model: item.model || '',
  //           code: item.code || '',
  //           category: '',
  //           price: item.unit_price,
  //           description: '',
  //           specifications: '',
  //           stock_quantity: 0,
  //           unit: 'adet'
  //         },
  //         quantity: item.quantity,
  //         unitPrice: item.unit_price
  //       })) || [];
  //       
  //       setCart(cartItems);
  //     }
  //     
  //     setActiveStep(1);
  //   } catch (error) {
  //     console.error('Quote loading error:', error);
  //     alert('Teklif yüklenirken hata oluştu!');
  //   }
  // };

  const createQuote = async () => {
    if (!customerInfo.name.trim()) {
      alert('Müşteri adı zorunludur!');
      return;
    }

    if (cart.length === 0) {
      alert('Sepette ürün bulunmuyor!');
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => 
        sum + item.unitPrice * item.quantity, 0
      );

      const quote: Quote = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email || undefined,
        customer_phone: customerInfo.phone || undefined,
        company: customerInfo.company || undefined,
        total_amount: totalAmount,
        status: 'draft',
        notes: `Proje Tasarım: ${projectDetails.projectDesign}
Proje Açıklama: ${projectDetails.projectDescription}
Başlangıç: ${schedule.startDate}
Bitiş: ${schedule.endDate}
Geçerlilik: ${conditions.validityPeriod} gün
Teslim: ${conditions.deliveryTime}`
      };

      const items: QuoteItem[] = cart
        .filter(item => !item.isGrouped) // Gruplanmış ürünleri veritabanına kaydetme
        .map(item => ({
          product_id: item.product.id!,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          total_price: item.unitPrice * item.quantity,
          quote_id: 0
        }));
      
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote, items }),
      });

      if (response.ok) {
        const result = await response.json();
        const quoteId = result.quoteId;

        const pdfData: QuotePDFData = {
          quoteId: quoteId,
          customerInfo: {
            name: customerInfo.name,
            company: customerInfo.company,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address
          },
          projectDetails: {
            projectDesign: projectDetails.projectDesign,
            projectDescription: projectDetails.projectDescription
          },
          schedule: {
            startDate: schedule.startDate,
            endDate: schedule.endDate
          },
          conditions: {
            validityPeriod: conditions.validityPeriod,
            deliveryTime: conditions.deliveryTime
          },
          items: cart.map(item => ({
            product: {
              name: item.customName || item.product.name,
              brand: item.isGrouped ? '' : item.product.brand,
              model: item.isGrouped ? '' : item.product.model,
              code: item.isGrouped ? '' : item.product.code,
              description: item.isGrouped ? 'Grup' : item.product.description,
            },
            quantity: item.quantity,
            unitPrice: item.salesPrice ?? item.unitPrice,
            total: (item.salesPrice ?? item.unitPrice) * item.quantity,
          })),
          subtotal: cart.reduce((sum, item) => sum + (item.salesPrice ?? item.unitPrice) * item.quantity, 0),
          kdv: cart.reduce((sum, item) => sum + (item.salesPrice ?? item.unitPrice) * item.quantity, 0) * 0.20,
          total: cart.reduce((sum, item) => sum + (item.salesPrice ?? item.unitPrice) * item.quantity, 0) * 1.20,
          createdAt: new Date().toISOString()
        };

        await generateQuotePDF(pdfData);

        alert('Teklif başarıyla oluşturuldu ve PDF indirildi!');

        setCart([]);
        setCustomerInfo({
          name: '',
          email: '',
          phone: '',
          company: '',
          address: ''
        });
        setProjectDetails({
          projectDesign: '',
          projectDescription: ''
        });
        setSchedule({
          startDate: '',
          endDate: ''
        });
        setConditions({
          validityPeriod: '30',
          deliveryTime: ''
        });
        setSelectedCustomer('');
        setActiveStep(1);
      } else {
        alert('Teklif oluşturulurken hata oluştu!');
      }
    } catch (error) {
      console.error('Teklif oluşturma hatası:', error);
      alert('Teklif oluşturulurken hata oluştu!');
    }
  };

  // Get computed values
  useEffect(() => {
    // Update categories
    setCategories([...new Set(products.map(p => p.category).filter((cat): cat is string => cat !== undefined && cat !== null))]);
    
    // Update financial calculations
    const calculatedSubtotal = cart.reduce((sum, item) => 
      sum + (item.salesPrice ?? item.unitPrice) * item.quantity, 0);
    setSubtotal(calculatedSubtotal);
    
    const calculatedKdv = calculatedSubtotal * 0.20;
    setKdv(calculatedKdv);
    
    setTotal(calculatedSubtotal + calculatedKdv);
  }, [products, cart]);
  // const calculatedTotal = subtotal + kdv; // Unused variable

  const totalCost = cart.reduce((sum, item) => {
    const discount = item.discount ?? 0;
    const discountedUnit = item.unitPrice * (1 - discount / 100);
    return sum + discountedUnit * item.quantity;
  }, 0);

  const totalProfit = cart.reduce((sum, item) => {
    const discount = item.discount ?? 0;
    const margin = item.margin ?? 0;
    const discountedUnit = item.unitPrice * (1 - discount / 100);
    const profitPerUnit = discountedUnit * (margin / 100);
    return sum + profitPerUnit * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🔐 Giriş Yap</h1>
            <p className="text-gray-600">Ekim Soğutma Teklif Sistemi</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-black bg-black text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
                placeholder="Şifrenizi girin"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold">
                ❌ {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Giriş Yap →
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            © 2024 Ekim Soğutma
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Steps Progress */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center group">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                      activeStep === step.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-gray-800 shadow-xl scale-105'
                        : activeStep > step.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-gray-800 shadow-lg'
                        : 'bg-white text-gray-600 shadow-md hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-2xl ${activeStep === step.id ? 'animate-bounce' : ''}`}>
                      {step.icon}
                    </span>
                    <span className="font-semibold hidden sm:inline text-sm">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 mx-4 rounded-full transition-all duration-500 ${
                      activeStep > step.id 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                        : activeStep === step.id
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8">
          {/* Step 1: Müşteri Bilgileri */}
          {activeStep === 1 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Müşteri Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">Müşteri Seçimi</label>
                  <select
                    value={selectedCustomer}
                    onChange={(e) => handleCustomerSelect(e.target.value)}
                    className="w-full p-2 border rounded-lg select-text bg-blue-50 border-blue-200"
                  >
                    <option value="">Yeni Müşteri</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id} className="text-gray-800">
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">Müşteri Adı</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-blue-50 border-blue-200"
                    placeholder="Müşteri adını girin"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">E-posta</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-blue-50 border-blue-200"
                    placeholder="ornek@firma.com"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">Telefon</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-blue-50 border-blue-200"
                    placeholder="+90"
                  />
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">Firma Adı</label>
                  <input
                    type="text"
                    value={customerInfo.company}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-blue-50 border-blue-200"
                    placeholder="Firma adını girin"
                  />
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-blue-700">Adres</label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-blue-50 border-blue-200"
                    rows={3}
                    placeholder="Firma adresini girin"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Proje Detayları */}
          {activeStep === 2 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-100">
              <h2 className="text-2xl font-bold mb-6 text-green-800">Proje Detayları</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Proje Tasarımı</label>
                  <textarea
                    value={projectDetails.projectDesign}
                    onChange={(e) =>
                      setProjectDetails({ ...projectDetails, projectDesign: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                    rows={4}
                    placeholder="Proje tasarımını açıklayın"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Proje Açıklaması</label>
                  <textarea
                    value={projectDetails.projectDescription}
                    onChange={(e) =>
                      setProjectDetails({ ...projectDetails, projectDescription: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                    rows={4}
                    placeholder="Proje detaylarını açıklayın"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Başlangıç Tarihi</label>
                  <input
                    type="date"
                    value={schedule.startDate}
                    onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Bitiş Tarihi</label>
                  <input
                    type="date"
                    value={schedule.endDate}
                    onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Geçerlilik Süresi (Gün)</label>
                  <input
                    type="number"
                    value={conditions.validityPeriod}
                    onChange={(e) => setConditions({ ...conditions, validityPeriod: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                    min="1"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium mb-2 text-green-700">Teslimat Süresi</label>
                  <input
                    type="text"
                    value={conditions.deliveryTime}
                    onChange={(e) => setConditions({ ...conditions, deliveryTime: e.target.value })}
                    className="w-full p-2 border rounded-lg form-input bg-green-50 border-green-200"
                    placeholder="Örn: 15 iş günü"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ürün Seçimi */}
          {activeStep === 3 && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-100">
              <h2 className="text-2xl font-bold mb-6 text-amber-800">Ürün Seçimi</h2>
              <div className="mb-6">
                {/* Panel Hesaplama - Accordion */}
                <details open className="bg-white rounded-lg shadow-sm mb-4 border border-amber-200">
                  <summary className="cursor-pointer p-4 font-semibold text-amber-700 hover:bg-amber-50 rounded-lg flex items-center justify-between">
                    <span>📐 Panel Hesaplama</span>
                    <span className="text-xl">▼</span>
                  </summary>
                  <div className="p-4 pt-0">
                  
                  {/* Tavan hesaplama */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Tavan En (m)</label>
                      <input
                        type="number"
                        value={ceilingWidth || ''}
                        onChange={(e) => setCeilingWidth(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Tavan Boy (m)</label>
                      <input
                        type="number"
                        value={ceilingHeight || ''}
                        onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Tavan Adet</label>
                      <input
                        type="number"
                        value={ceilingCount || ''}
                        onChange={(e) => setCeilingCount(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Tavan m² Fiyatı (€)</label>
                      <input
                        type="number"
                        value={ceilingPricePerSquareMeter || ''}
                        onChange={(e) => setCeilingPricePerSquareMeter(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="bg-amber-100 p-2 rounded-lg w-full text-center">
                        <p className="text-sm font-semibold text-amber-800">
                          Tavan: {(ceilingWidth * ceilingHeight * ceilingCount).toFixed(2)} m²
                        </p>
                        <p className="text-xs text-amber-700">
                          Fiyat: €{((ceilingWidth * ceilingHeight * ceilingCount) * ceilingPricePerSquareMeter).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Zemin hesaplama */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Zemin En (m)</label>
                      <input
                        type="number"
                        value={floorWidth || ''}
                        onChange={(e) => setFloorWidth(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Zemin Boy (m)</label>
                      <input
                        type="number"
                        value={floorHeight || ''}
                        onChange={(e) => setFloorHeight(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Zemin Adet</label>
                      <input
                        type="number"
                        value={floorCount || ''}
                        onChange={(e) => setFloorCount(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Zemin m² Fiyatı (€)</label>
                      <input
                        type="number"
                        value={floorPricePerSquareMeter || ''}
                        onChange={(e) => setFloorPricePerSquareMeter(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="bg-amber-100 p-2 rounded-lg w-full text-center">
                        <p className="text-sm font-semibold text-amber-800">
                          Zemin: {(floorWidth * floorHeight * floorCount).toFixed(2)} m²
                        </p>
                        <p className="text-xs text-amber-700">
                          Fiyat: €{((floorWidth * floorHeight * floorCount) * floorPricePerSquareMeter).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Duvar hesaplama */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Duvar En (m)</label>
                      <input
                        type="number"
                        value={wallWidth || ''}
                        onChange={(e) => setWallWidth(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Duvar Boy (m)</label>
                      <input
                        type="number"
                        value={wallHeight || ''}
                        onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Duvar Adet</label>
                      <input
                        type="number"
                        value={wallCount || ''}
                        onChange={(e) => setWallCount(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Duvar m² Fiyatı (€)</label>
                      <input
                        type="number"
                        value={wallPricePerSquareMeter || ''}
                        onChange={(e) => setWallPricePerSquareMeter(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="bg-amber-100 p-2 rounded-lg w-full text-center">
                        <p className="text-sm font-semibold text-amber-800">
                          Duvar: {(wallWidth * wallHeight * wallCount).toFixed(2)} m²
                        </p>
                        <p className="text-xs text-amber-700">
                          Fiyat: €{((wallWidth * wallHeight * wallCount) * wallPricePerSquareMeter).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Kapı girişi */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Kapı En (m)</label>
                      <input
                        type="number"
                        value={doorWidth || ''}
                        onChange={(e) => setDoorWidth(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Kapı Boy (m)</label>
                      <input
                        type="number"
                        value={doorHeight || ''}
                        onChange={(e) => setDoorHeight(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-amber-700">Fiyat (€)</label>
                      <input
                        type="number"
                        value={doorPrice || ''}
                        onChange={(e) => setDoorPrice(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border rounded-lg form-input bg-amber-50 border-amber-200"
                        placeholder="0"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="bg-amber-100 p-2 rounded-lg w-full text-center">
                        <p className="text-sm font-semibold text-amber-800">
                          Kapı: {doorWidth > 0 ? doorWidth.toFixed(2) : '0'}m × {doorHeight > 0 ? doorHeight.toFixed(2) : '0'}m
                        </p>
                        <p className="text-xs text-amber-700">
                          Fiyat: €{doorPrice > 0 ? doorPrice.toFixed(2) : '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sepete ekle butonları */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                    <button
                      onClick={() => addCeilingToCart()}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Tavanı Sepete Ekle
                    </button>
                    <button
                      onClick={() => addFloorToCart()}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Zemini Sepete Ekle
                    </button>
                    <button
                      onClick={() => addWallToCart()}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Duvarı Sepete Ekle
                    </button>
                    <button
                      onClick={() => addDoorToCart()}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Kapıyı Sepete Ekle
                    </button>
                  </div>
                  </div>
                </details>
                
                {/* Sarf Malzeme Hesaplama - Accordion */}
                <details className="bg-white rounded-lg shadow-sm mb-4 border border-blue-200">
                  <summary className="cursor-pointer p-4 font-semibold text-blue-700 hover:bg-blue-50 rounded-lg flex items-center justify-between">
                    <span>🔧 Sarf Malzeme Hesaplama</span>
                    <span className="text-xl">▼</span>
                  </summary>
                  <div className="p-4 pt-0">
                  
                  {/* Bakır Boru Hesaplama */}
                  <div className="mb-4 pb-4 border-b border-blue-100">
                    <h4 className="text-sm font-semibold mb-3 text-blue-600">Bakır Boru</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-blue-700">Uzunluk (m)</label>
                        <input
                          type="number"
                          value={copperPipeLength || ''}
                          onChange={(e) => setCopperPipeLength(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-blue-700">Metre Fiyatı (€)</label>
                        <input
                          type="number"
                          value={copperPipePricePerMeter || ''}
                          onChange={(e) => setCopperPipePricePerMeter(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addCopperPipeToCart}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Bakır Boru Ekle
                        </button>
                      </div>
                    </div>
                    {copperPipeTotalPrice > 0 && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                        <p className="font-semibold text-blue-800">
                          Toplam: €{copperPipeTotalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Kablo Hesaplama */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-blue-600">Kablo</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-blue-700">Uzunluk (m)</label>
                        <input
                          type="number"
                          value={cableLength || ''}
                          onChange={(e) => setCableLength(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-blue-700">Metre Fiyatı (€)</label>
                        <input
                          type="number"
                          value={cablePricePerMeter || ''}
                          onChange={(e) => setCablePricePerMeter(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addCableToCart}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Kablo Ekle
                        </button>
                      </div>
                    </div>
                    {cableTotalPrice > 0 && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                        <p className="font-semibold text-blue-800">
                          Toplam: €{cableTotalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  </div>
                </details>
                
                {/* Aksesuar Hesaplama - Accordion */}
                <details className="bg-white rounded-lg shadow-sm mb-4 border border-green-200">
                  <summary className="cursor-pointer p-4 font-semibold text-green-700 hover:bg-green-50 rounded-lg flex items-center justify-between">
                    <span>🔩 Aksesuar Hesaplama</span>
                    <span className="text-xl">▼</span>
                  </summary>
                  <div className="p-4 pt-0">
                  
                  {/* İç Aksesuar */}
                  <div className="mb-4 pb-4 border-b border-green-100">
                    <h4 className="text-sm font-semibold mb-3 text-green-600">İç Aksesuar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Boy</label>
                        <input
                          type="number"
                          value={interiorAccessoryLength || ''}
                          onChange={(e) => setInteriorAccessoryLength(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Adet</label>
                        <input
                          type="number"
                          value={interiorAccessoryCount || ''}
                          onChange={(e) => setInteriorAccessoryCount(e.target.value === '' ? 1 : parseInt(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="1"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Birim Fiyat (€)</label>
                        <input
                          type="number"
                          value={interiorAccessoryUnitPrice || ''}
                          onChange={(e) => setInteriorAccessoryUnitPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addInteriorAccessoryToCart}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          İç Aks. Ekle
                        </button>
                      </div>
                    </div>
                    {interiorAccessoryTotalPrice > 0 && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                        <p className="font-semibold text-green-800">
                          Toplam: €{interiorAccessoryTotalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Dış Aksesuar */}
                  <div className="mb-4 pb-4 border-b border-green-100">
                    <h4 className="text-sm font-semibold mb-3 text-green-600">Dış Aksesuar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Boy</label>
                        <input
                          type="number"
                          value={exteriorAccessoryLength || ''}
                          onChange={(e) => setExteriorAccessoryLength(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Adet</label>
                        <input
                          type="number"
                          value={exteriorAccessoryCount || ''}
                          onChange={(e) => setExteriorAccessoryCount(e.target.value === '' ? 1 : parseInt(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="1"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Birim Fiyat (€)</label>
                        <input
                          type="number"
                          value={exteriorAccessoryUnitPrice || ''}
                          onChange={(e) => setExteriorAccessoryUnitPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addExteriorAccessoryToCart}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Dış Aks. Ekle
                        </button>
                      </div>
                    </div>
                    {exteriorAccessoryTotalPrice > 0 && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                        <p className="font-semibold text-green-800">
                          Toplam: €{exteriorAccessoryTotalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Zemin U Su */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-green-600">Zemin U Su</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Boy</label>
                        <input
                          type="number"
                          value={floorUWaterLength || ''}
                          onChange={(e) => setFloorUWaterLength(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Adet</label>
                        <input
                          type="number"
                          value={floorUWaterCount || ''}
                          onChange={(e) => setFloorUWaterCount(e.target.value === '' ? 1 : parseInt(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="1"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-green-700">Birim Fiyat (€)</label>
                        <input
                          type="number"
                          value={floorUWaterUnitPrice || ''}
                          onChange={(e) => setFloorUWaterUnitPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))}
                          className="w-full p-2 border-2 border-black rounded-lg bg-black text-white"
                          placeholder="0"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={addFloorUWaterToCart}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Zemin U Su Ekle
                        </button>
                      </div>
                    </div>
                    {floorUWaterTotalPrice > 0 && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                        <p className="font-semibold text-green-800">
                          Toplam: €{floorUWaterTotalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  </div>
                </details>
                
                {/* Supplier-based Product Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium mb-2 text-amber-700">1️⃣ Tedarikçi Seç</label>
                    <select
                      className="w-full p-2 border rounded-lg bg-amber-50 border-amber-200 text-gray-800"
                      value={selectedSupplierId || ''}
                      onChange={(e) => handleSupplierChange(parseInt(e.target.value))}
                    >
                      <option value="">Tedarikçi seçin...</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium mb-2 text-amber-700">2️⃣ Kategori Seç</label>
                    <select
                      className="w-full p-2 border rounded-lg bg-amber-50 border-amber-200 text-gray-800"
                      value={supplierSelectedCategory}
                      onChange={(e) => handleSupplierCategoryChange(e.target.value)}
                      disabled={!selectedSupplierId}
                    >
                      <option value="">Kategori seçin...</option>
                      {supplierCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-sm font-medium mb-2 text-amber-700">3️⃣ Ürün Seç</label>
                    <select
                      className="w-full p-2 border rounded-lg bg-amber-50 border-amber-200 text-gray-800"
                      onChange={(e) => {
                        const productId = parseInt(e.target.value);
                        const product = categoryProducts.find(p => p.id === productId);
                        if (product) {
                          addToCart(product);
                          e.target.value = '';
                        }
                      }}
                      disabled={!supplierSelectedCategory || categoryProducts.length === 0}
                    >
                      <option value="">Ürün seçin...</option>
                      {categoryProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} {product.price && product.price > 0 ? `- €${product.price.toFixed(2)}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {selectedSupplierId && !supplierSelectedCategory && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-700">
                    💡 Lütfen bir kategori seçin
                  </div>
                )}
                
                {supplierSelectedCategory && categoryProducts.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-sm text-yellow-700">
                    ⚠️ Bu kategoride ürün bulunmuyor
                  </div>
                )}

                {/* Manuel Ürün Arama */}
                <div className="bg-white p-4 rounded-lg shadow-sm mt-6 relative">
                  <label className="block text-sm font-medium mb-2 text-amber-700">
                    🔍 Manuel Ürün Ara
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg form-input bg-amber-50 border-amber-200 text-gray-800"
                    placeholder="Ürün adı, marka veya model yazın..."
                  />
                  {/* Arama sonuçları dropdown */}
                  {searchTerm && (
                    <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-amber-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                      {getFilteredProducts().length === 0 ? (
                        <div className="p-4 text-center text-amber-600">
                          Ürün bulunamadı
                        </div>
                      ) : (
                        <div className="py-2">
                          {getFilteredProducts().map((product) => (
                            <button
                              key={product.id}
                              onClick={() => {
                                addToCart(product);
                                setSearchTerm(''); // Aramayı temizle
                              }}
                              className="w-full px-4 py-3 hover:bg-amber-50 transition-colors text-left border-b border-amber-100 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold text-amber-800">{product.name}</div>
                                  <div className="text-sm text-amber-600 mt-1">
                                    {product.brand} {product.model}
                                    {product.category && <span className="text-amber-500"> • {product.category}</span>}
                                  </div>
                                </div>
                                <div className="text-right ml-4">
                                  <div className="text-lg font-bold text-amber-700">€{product.price?.toFixed(2)}</div>
                                  <div className="text-xs text-amber-600">Stok: {product.stock_quantity}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 mt-6">
                <div className="p-4 border-b border-amber-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-amber-800">Sepet ({cart.length} Ürün)</h3>
                  {selectedProducts.length > 0 && (
                    <button
                      onClick={handleGroupProducts}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <span>📦</span>
                      <span>Seçilenleri Grupla ({selectedProducts.length})</span>
                    </button>
                  )}
                </div>
                <div className="p-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-amber-700 py-4">Sepetiniz boş</p>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-amber-200">
                              <th className="text-center p-2 text-amber-800 w-10">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedProducts(cart.map(item => item.product.id!));
                                    } else {
                                      setSelectedProducts([]);
                                    }
                                  }}
                                  checked={selectedProducts.length === cart.length && cart.length > 0}
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </th>
                              <th className="text-left p-2 text-amber-800">Ürün</th>
                              <th className="text-center p-2 text-amber-800">Adet</th>
                              <th className="text-right p-2 text-amber-800">Ürün Fiyatı</th>
                              <th className="text-right p-2 text-amber-800">İskonto (%)</th>
                              <th className="text-right p-2 text-amber-800">İsk. Sonrası</th>
                              <th className="text-right p-2 text-amber-800">Kar Marjı (%)</th>
                              <th className="text-right p-2 text-amber-800">Satış Fiyatı</th>
                              <th className="text-right p-2 text-amber-800">Toplam</th>
                              <th className="text-center p-2 text-amber-800">İşlem</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item) => {
                              const discountedPrice = item.unitPrice * (1 - (item.discount || 0) / 100);
                              const calculatedSalesPrice = item.manualSalesPrice 
                                ? item.salesPrice || item.unitPrice
                                : discountedPrice * (1 + (item.margin || 0) / 100);
                              const lineTotal = calculatedSalesPrice * item.quantity;
                              
                              return (
                                <tr key={item.product.id} className="border-b border-amber-100 hover:bg-amber-50">
                                  <td className="p-2 text-center">
                                    <input
                                      type="checkbox"
                                      checked={selectedProducts.includes(item.product.id!)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedProducts([...selectedProducts, item.product.id!]);
                                        } else {
                                          setSelectedProducts(selectedProducts.filter(id => id !== item.product.id));
                                        }
                                      }}
                                      className="w-4 h-4 cursor-pointer"
                                    />
                                  </td>
                                  <td className="p-2">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={item.customName || item.product.name}
                                        onChange={(e) => updateProductName(item.product.id!, e.target.value)}
                                        className="flex-1 p-1 border rounded font-medium text-amber-800 form-input bg-white border-amber-200"
                                        placeholder="Ürün adı"
                                      />
                                      {item.isGrouped && item.groupItems && (
                                        <button
                                          onClick={() => setViewingGroupId(item.product.id!)}
                                          className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded transition-colors"
                                          title="Grup içeriğini görüntüle"
                                        >
                                          👁️
                                        </button>
                                      )}
                                    </div>
                                    <div className="text-xs text-amber-600 mt-1">
                                      {item.isGrouped ? `${item.groupItems?.length || 0} ürün içerir` : `${item.product.brand} ${item.product.model}`}
                                    </div>
                                  </td>
                                  <td className="p-2 text-center">
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.quantity}
                                      onChange={(e) => updateQuantity(item.product.id!, parseInt(e.target.value) || 1)}
                                      className="w-16 p-1 border rounded text-center form-input bg-white border-amber-200"
                                    />
                                  </td>
                                  <td className="p-2 text-right">
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={item.unitPrice}
                                      onChange={(e) => updateUnitPrice(item.product.id!, parseFloat(e.target.value) || 0)}
                                      className="w-24 p-1 border rounded text-right form-input bg-white border-amber-200"
                                    />
                                  </td>
                                  <td className="p-2 text-right">
                                    <input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      max="100"
                                      value={item.discount || 0}
                                      onChange={(e) => updateDiscount(item.product.id!, parseFloat(e.target.value) || 0)}
                                      className="w-20 p-1 border rounded text-right form-input bg-white border-amber-200"
                                    />
                                  </td>
                                  <td className="p-2 text-right font-medium text-amber-700">
                                    €{discountedPrice.toFixed(2)}
                                  </td>
                                  <td className="p-2 text-right">
                                    <input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      value={item.margin || 0}
                                      onChange={(e) => updateMargin(item.product.id!, parseFloat(e.target.value) || 0)}
                                      className="w-20 p-1 border rounded text-right form-input bg-white border-amber-200"
                                    />
                                  </td>
                                  <td className="p-2 text-right">
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={calculatedSalesPrice.toFixed(2)}
                                      onChange={(e) => updateSalesPrice(item.product.id!, parseFloat(e.target.value) || 0)}
                                      className="w-24 p-1 border rounded text-right form-input bg-amber-50 border-amber-300 font-semibold"
                                    />
                                  </td>
                                  <td className="p-2 text-right font-bold text-amber-800">
                                    €{lineTotal.toFixed(2)}
                                  </td>
                                  <td className="p-2 text-center">
                                    <button
                                      onClick={() => removeFromCart(item.product.id!)}
                                      className="text-red-500 hover:text-red-700 font-bold"
                                    >
                                      ✕
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="border-t border-amber-200 mt-4 pt-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-amber-800">Ara Toplam:</span>
                          <span className="font-medium text-amber-800">€{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-medium text-amber-800">KDV (%20):</span>
                          <span className="font-medium text-amber-800">€{kdv.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-amber-200">
                          <span className="font-bold text-lg text-amber-800">Toplam:</span>
                          <span className="font-bold text-lg text-amber-800">€{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Özet & Onay */}
          {activeStep === 4 && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Özet & Onay</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Müşteri Bilgileri</h3>
                  <p className="text-gray-600">Adı: {customerInfo.name}</p>
                  <p className="text-gray-600">E-posta: {customerInfo.email}</p>
                  <p className="text-gray-600">Telefon: {customerInfo.phone}</p>
                  <p className="text-gray-600">Firma Adı: {customerInfo.company}</p>
                  <p className="text-gray-600">Adres: {customerInfo.address}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Proje Detayları</h3>
                  <p className="text-gray-600">Proje Tasarımı: {projectDetails.projectDesign}</p>
                  <p className="text-gray-600">Proje Açıklaması: {projectDetails.projectDescription}</p>
                  <p className="text-gray-600">Başlangıç Tarihi: {schedule.startDate}</p>
                  <p className="text-gray-600">Bitiş Tarihi: {schedule.endDate}</p>
                  <p className="text-gray-600">Geçerlilik Süresi: {conditions.validityPeriod} gün</p>
                  <p className="text-gray-600">Teslimat Süresi: {conditions.deliveryTime}</p>
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Sepet</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <span className="font-medium text-gray-800">{item.customName || item.product.name}</span>
                          <span className="text-sm text-gray-600 ml-2">x {item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-800">
                          €{((item.salesPrice ?? item.unitPrice) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    {/* Maliyet ve Kar Bilgisi */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-blue-800">💰 Toplam Maliyet (İskonto Sonrası):</span>
                        <span className="font-bold text-blue-900">€{totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-green-800">📈 Toplam Kar (Marj):</span>
                        <span className="font-bold text-green-900">€{totalProfit.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-2 pt-2 border-t border-blue-200">
                        <span>Kar Oranı:</span>
                        <span className="font-semibold">
                          {totalCost > 0 ? ((totalProfit / totalCost) * 100).toFixed(2) : '0.00'}%
                        </span>
                      </div>
                    </div>

                    {/* Müşteriye Gösterilecek Tutarlar */}
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-800">Ara Toplam:</span>
                        <span className="font-medium text-gray-800">€{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="font-medium text-gray-800">KDV (%20):</span>
                        <span className="font-medium text-gray-800">€{kdv.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                        <span className="font-bold text-lg text-gray-800">Genel Toplam:</span>
                        <span className="font-bold text-lg text-gray-800">€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Geri
                </button>
                <button
                  onClick={createQuote}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Teklif Oluştur ve PDF İndir
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className={`px-6 py-2 rounded-lg ${
                activeStep === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-gray-800 hover:bg-blue-700'
              }`}
            >
              Geri
            </button>
            <button
              onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
              disabled={activeStep === 4}
              className={`px-6 py-2 rounded-lg ${
                activeStep === 4
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-gray-800 hover:bg-blue-700'
              }`}
            >
              İleri
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Gruplama Modal */}
      {isGrouping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ürünleri Grupla</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedProducts.length} ürün seçildi. Bu ürünler için bir grup adı girin:
            </p>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Örn: Soğuk Hava Deposu Ekipmanları"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              autoFocus
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800">
                💡 <strong>Not:</strong> Seçilen ürünler tek bir grup adı altında birleştirilecek. 
                Grup içindeki ürünler PDF&apos;de gizli olacak, sadece grup adı ve toplam fiyat görünecek.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsGrouping(false);
                  setGroupName('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={createGroup}
                disabled={!groupName.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  groupName.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Grupla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grup İçeriği Görüntüleme Modal */}
      {viewingGroupId !== null && (() => {
        const groupItem = cart.find(item => item.product.id === viewingGroupId);
        if (!groupItem || !groupItem.groupItems) return null;
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">📦 {groupItem.customName || groupItem.product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{groupItem.groupItems.length} ürün içerir</p>
                  </div>
                  <button
                    onClick={() => setViewingGroupId(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {/* Ürün Ekleme Bölümü */}
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">➕ Gruba Yeni Ürün Ekle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Kategori</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-gray-800"
                      >
                        <option value="">Tüm Kategoriler</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <label className="text-xs text-gray-600 block mb-1">Ürün Ara ve Ekle</label>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-gray-800"
                        placeholder="Ürün adı, marka yazın..."
                      />
                      {/* Arama sonuçları dropdown */}
                      {searchTerm && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-green-300 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                          {getFilteredProducts().length === 0 ? (
                            <div className="p-4 text-center text-gray-600">
                              Ürün bulunamadı
                            </div>
                          ) : (
                            <div className="py-2">
                              {getFilteredProducts().map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => {
                                    if (viewingGroupId !== null) {
                                      const groupItem = cart.find(item => item.product.id === viewingGroupId);
                                      if (groupItem && groupItem.groupItems) {
                                        const newItem: CartItem = {
                                          product,
                                          quantity: 1,
                                          unitPrice: product.price || 0,
                                          discount: 0,
                                          margin: 0,
                                          salesPrice: product.price || 0,
                                          manualSalesPrice: false
                                        };
                                        const updatedGroupItems = [...groupItem.groupItems, newItem];
                                        setCart(cart.map(item => 
                                          item.product.id === viewingGroupId 
                                            ? { ...item, groupItems: updatedGroupItems }
                                            : item
                                        ));
                                      }
                                      setSearchTerm(''); // Aramayı temizle
                                    }
                                  }}
                                  className="w-full px-4 py-3 hover:bg-green-50 transition-colors text-left border-b border-green-100 last:border-b-0"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-800">{product.name}</div>
                                      <div className="text-sm text-gray-600 mt-1">
                                        {product.brand} {product.model}
                                        {product.category && <span className="text-gray-500"> • {product.category}</span>}
                                      </div>
                                    </div>
                                    <div className="text-right ml-4">
                                      <div className="text-lg font-bold text-green-600">€{product.price?.toFixed(2)}</div>
                                      <div className="text-xs text-gray-600">Stok: {product.stock_quantity}</div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mevcut Ürünler */}
                <div className="space-y-4">
                  {groupItem.groupItems.map((subItem, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Ürün Adı */}
                        <div className="md:col-span-3">
                          <input
                            type="text"
                            value={subItem.customName || subItem.product.name}
                            onChange={(e) => {
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { ...subItem, customName: e.target.value };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded font-medium text-gray-800 bg-white"
                            placeholder="Ürün adı"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {subItem.product.brand} {subItem.product.model}
                          </div>
                        </div>

                        {/* Adet */}
                        <div className="md:col-span-1">
                          <label className="text-xs text-gray-600 block mb-1">Adet</label>
                          <input
                            type="number"
                            min="1"
                            value={subItem.quantity}
                            onChange={(e) => {
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { ...subItem, quantity: parseInt(e.target.value) || 1 };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded text-center bg-white text-gray-800"
                          />
                        </div>

                        {/* Ürün Fiyatı */}
                        <div className="md:col-span-2">
                          <label className="text-xs text-gray-600 block mb-1">Ürün Fiyatı</label>
                          <input
                            type="number"
                            step="0.01"
                            value={subItem.unitPrice}
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value) || 0;
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { 
                                ...subItem, 
                                unitPrice: newPrice,
                                salesPrice: calculateSalesPrice(newPrice, subItem.discount || 0, subItem.margin || 0)
                              };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded text-right bg-white text-gray-800"
                          />
                        </div>

                        {/* İskonto */}
                        <div className="md:col-span-1">
                          <label className="text-xs text-gray-600 block mb-1">İsk. %</label>
                          <input
                            type="number"
                            step="0.1"
                            value={subItem.discount || 0}
                            onChange={(e) => {
                              const newDiscount = parseFloat(e.target.value) || 0;
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { 
                                ...subItem, 
                                discount: newDiscount,
                                salesPrice: calculateSalesPrice(subItem.unitPrice, newDiscount, subItem.margin || 0)
                              };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded text-right bg-white text-gray-800"
                          />
                        </div>

                        {/* Kar Marjı */}
                        <div className="md:col-span-1">
                          <label className="text-xs text-gray-600 block mb-1">Kar %</label>
                          <input
                            type="number"
                            step="0.1"
                            value={subItem.margin || 0}
                            onChange={(e) => {
                              const newMargin = parseFloat(e.target.value) || 0;
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { 
                                ...subItem, 
                                margin: newMargin,
                                salesPrice: calculateSalesPrice(subItem.unitPrice, subItem.discount || 0, newMargin)
                              };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded text-right bg-white text-gray-800"
                          />
                        </div>

                        {/* Satış Fiyatı */}
                        <div className="md:col-span-2">
                          <label className="text-xs text-gray-600 block mb-1">Satış Fiyatı</label>
                          <input
                            type="number"
                            step="0.01"
                            value={(subItem.salesPrice || subItem.unitPrice).toFixed(2)}
                            onChange={(e) => {
                              const updatedGroupItems = [...groupItem.groupItems!];
                              updatedGroupItems[index] = { 
                                ...subItem, 
                                salesPrice: parseFloat(e.target.value) || 0,
                                manualSalesPrice: true
                              };
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="w-full p-2 border rounded text-right bg-amber-50 font-semibold text-gray-800"
                          />
                        </div>

                        {/* Toplam */}
                        <div className="md:col-span-1">
                          <label className="text-xs text-gray-600 block mb-1">Toplam</label>
                          <div className="p-2 bg-gray-200 rounded text-right font-bold text-gray-800">
                            €{((subItem.salesPrice || subItem.unitPrice) * subItem.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Sil Butonu */}
                        <div className="md:col-span-1 flex items-end justify-center">
                          <button
                            onClick={() => {
                              if (groupItem.groupItems!.length <= 1) {
                                alert('Grupta en az 1 ürün olmalıdır!');
                                return;
                              }
                              const updatedGroupItems = groupItem.groupItems!.filter((_, i) => i !== index);
                              setCart(cart.map(item => 
                                item.product.id === viewingGroupId 
                                  ? { ...item, groupItems: updatedGroupItems }
                                  : item
                              ));
                            }}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors font-bold"
                            title="Üründen çıkar"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grup Toplamı */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Grup Toplamı:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      €{groupItem.groupItems.reduce((sum, item) => 
                        sum + (item.salesPrice || item.unitPrice) * item.quantity, 0
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setViewingGroupId(null)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}