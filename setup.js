// Setup script to add sample data
console.log('Setting up sample data...');

// Sample categories
const sampleCategories = [
    { id: 1, name: 'Pens & Pencils', nameAr: 'أقلام وأقلام رصاص' },
    { id: 2, name: 'Notebooks', nameAr: 'دفاتر' },
    { id: 3, name: 'Office Supplies', nameAr: 'مستلزمات مكتبية' },
    { id: 4, name: 'Art Supplies', nameAr: 'مستلزمات فنية' },
    { id: 5, name: 'School Supplies', nameAr: 'مستلزمات مدرسية' }
];

// Sample products
const sampleProducts = [
    {
        id: 1,
        name: 'Blue Ballpoint Pen',
        nameAr: 'قلم حبر أزرق',
        price: 2.50,
        stock: 100,
        category: 'Pens & Pencils',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'A4 Notebook',
        nameAr: 'دفتر A4',
        price: 15.00,
        stock: 50,
        category: 'Notebooks',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Stapler',
        nameAr: 'دباسة',
        price: 25.00,
        stock: 30,
        category: 'Office Supplies',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Colored Pencils Set',
        nameAr: 'مجموعة أقلام ملونة',
        price: 35.00,
        stock: 25,
        category: 'Art Supplies',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Calculator',
        nameAr: 'آلة حاسبة',
        price: 45.00,
        stock: 20,
        category: 'School Supplies',
        image: 'https://images.unsplash.com/photo-1587145820266-a5955ee6f622?w=300&h=300&fit=crop'
    }
];

// Save to localStorage
localStorage.setItem('stationeryCategories', JSON.stringify(sampleCategories));
localStorage.setItem('stationeryProducts', JSON.stringify(sampleProducts));
localStorage.setItem('stationeryOrders', JSON.stringify([]));

console.log('Sample data setup complete!');
console.log('Categories:', sampleCategories.length);
console.log('Products:', sampleProducts.length);
