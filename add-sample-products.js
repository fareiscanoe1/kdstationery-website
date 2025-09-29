// Script to add sample products to the admin panel
// Run this in the browser console on your deployed website

const sampleProducts = [
    {
        id: 1,
        name: 'Blue Ballpoint Pen',
        nameAr: 'قلم حبر أزرق',
        price: 2.88,
        originalPrice: 2.50,
        stock: 100,
        category: 'Pens & Pencils',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'A4 Notebook',
        nameAr: 'دفتر A4',
        price: 17.25,
        originalPrice: 15.00,
        stock: 50,
        category: 'Notebooks',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Stapler',
        nameAr: 'دباسة',
        price: 28.75,
        originalPrice: 25.00,
        stock: 30,
        category: 'Office Supplies',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Colored Pencils Set',
        nameAr: 'مجموعة أقلام ملونة',
        price: 40.25,
        originalPrice: 35.00,
        stock: 25,
        category: 'Art Supplies',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Calculator',
        nameAr: 'آلة حاسبة',
        price: 51.75,
        originalPrice: 45.00,
        stock: 20,
        category: 'School Supplies',
        image: 'https://images.unsplash.com/photo-1587145820266-a5955ee6f622?w=300&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Highlighter Set',
        nameAr: 'مجموعة أقلام تمييز',
        price: 13.80,
        originalPrice: 12.00,
        stock: 40,
        category: 'Pens & Pencils',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Binder Clips',
        nameAr: 'مشابك ورق',
        price: 9.78,
        originalPrice: 8.50,
        stock: 60,
        category: 'Office Supplies',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Watercolor Paint Set',
        nameAr: 'مجموعة ألوان مائية',
        price: 63.25,
        originalPrice: 55.00,
        stock: 15,
        category: 'Art Supplies',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop'
    },
    {
        id: 9,
        name: 'PlayStation 5',
        nameAr: 'بلايستيشن 5',
        price: 2185.00,
        originalPrice: 1900.00,
        stock: 10,
        category: 'Games',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop'
    }
];

// Add sample categories
const sampleCategories = [
    { id: 1, name: 'Pens & Pencils', nameAr: 'أقلام وأقلام رصاص' },
    { id: 2, name: 'Notebooks', nameAr: 'دفاتر' },
    { id: 3, name: 'Office Supplies', nameAr: 'مستلزمات مكتبية' },
    { id: 4, name: 'Art Supplies', nameAr: 'مستلزمات فنية' },
    { id: 5, name: 'School Supplies', nameAr: 'مستلزمات مدرسية' },
    { id: 6, name: 'Games', nameAr: 'ألعاب' }
];

// Save to localStorage
localStorage.setItem('stationeryProducts', JSON.stringify(sampleProducts));
localStorage.setItem('stationeryCategories', JSON.stringify(sampleCategories));

console.log('Sample products and categories added successfully!');
console.log('Products:', sampleProducts.length);
console.log('Categories:', sampleCategories.length);
