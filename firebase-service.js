// Firebase Service Layer for Knowledge Development Stationery
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { db, auth } from './firebase-config.js';

// ==================== AUTHENTICATION ====================

export class AuthService {
  static async loginAdmin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async registerUser(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Add user data to Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email: email,
        ...userData,
        createdAt: serverTimestamp(),
        role: 'customer'
      });

      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
}

// ==================== PRODUCTS ====================

export class ProductService {
  static async getAllProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  static async addProduct(productData) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateProduct(productId, productData) {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteProduct(productId) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }
  }

  static onProductsChange(callback) {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    });
  }

  static async updateStock(productId, quantity) {
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        stock: increment(-quantity),
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating stock:', error);
      return { success: false, error: error.message };
    }
  }
}

// ==================== CATEGORIES ====================

export class CategoryService {
  static async getAllCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  static async addCategory(categoryData) {
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...categoryData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateCategory(categoryId, categoryData) {
    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await updateDoc(categoryRef, categoryData);
      return { success: true };
    } catch (error) {
      console.error('Error updating category:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteCategory(categoryId) {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }
  }

  static onCategoriesChange(callback) {
    const q = query(collection(db, 'categories'), orderBy('name'));
    return onSnapshot(q, (querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      callback(categories);
    });
  }
}

// ==================== ORDERS ====================

export class OrderService {
  static async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Update product stock
      for (const item of orderData.items) {
        await ProductService.updateStock(item.id, item.quantity);
      }

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }
  }

  static async getAllOrders() {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }

  static onOrdersChange(callback) {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
  }

  static async getOrdersByDateRange(startDate, endDate) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting orders by date range:', error);
      return [];
    }
  }
}

// ==================== CUSTOMERS ====================

export class CustomerService {
  static async getAllCustomers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const customers = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === 'customer') {
          customers.push({ id: doc.id, ...userData });
        }
      });
      return customers;
    } catch (error) {
      console.error('Error getting customers:', error);
      return [];
    }
  }

  static async getCustomerOrders(customerId) {
    try {
      const q = query(
        collection(db, 'orders'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting customer orders:', error);
      return [];
    }
  }
}

// ==================== ANALYTICS ====================

export class AnalyticsService {
  static async getSalesAnalytics(period = 'daily') {
    try {
      const now = new Date();
      let startDate;

      switch (period) {
        case 'daily':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'weekly':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'monthly':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'yearly':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      const orders = await OrderService.getOrdersByDateRange(startDate, now);
      
      const analytics = {
        totalSales: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
        averageOrderValue: 0,
        topProducts: {},
        salesByDate: {}
      };

      if (orders.length > 0) {
        analytics.averageOrderValue = analytics.totalRevenue / analytics.totalSales;
      }

      // Calculate top products and sales by date
      orders.forEach(order => {
        const orderDate = order.createdAt?.toDate?.()?.toDateString() || 'Unknown';
        analytics.salesByDate[orderDate] = (analytics.salesByDate[orderDate] || 0) + 1;

        if (order.items) {
          order.items.forEach(item => {
            analytics.topProducts[item.name] = (analytics.topProducts[item.name] || 0) + item.quantity;
          });
        }
      });

      return analytics;
    } catch (error) {
      console.error('Error getting sales analytics:', error);
      return {
        totalSales: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        topProducts: {},
        salesByDate: {}
      };
    }
  }
}

// ==================== NOTIFICATIONS ====================

export class NotificationService {
  static async addNotification(notificationData) {
    try {
      const docRef = await addDoc(collection(db, 'notifications'), {
        ...notificationData,
        read: false,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding notification:', error);
      return { success: false, error: error.message };
    }
  }

  static async getAllNotifications() {
    try {
      const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      return notifications;
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  }

  static async markAsRead(notificationId) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    }
  }

  static onNotificationsChange(callback) {
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      callback(notifications);
    });
  }
}
