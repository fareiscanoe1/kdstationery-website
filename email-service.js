// EmailJS Integration for Automatic Email Receipts
// Professional email service for Knowledge Development Stationery

class EmailService {
    constructor(config) {
        this.serviceId = config.serviceId;
        this.templateId = config.templateId;
        this.publicKey = config.publicKey;
        this.initialized = false;
        this.loadEmailJS();
    }
    
    // Load EmailJS SDK
    loadEmailJS() {
        if (window.emailjs) {
            this.initialized = true;
            emailjs.init(this.publicKey);
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                this.initialized = true;
                emailjs.init(this.publicKey);
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Send order confirmation email
    async sendOrderConfirmation(orderData) {
        await this.loadEmailJS();
        
        try {
            const templateParams = {
                to_email: orderData.customerEmail,
                to_name: orderData.customerName,
                order_id: orderData.orderId,
                order_date: new Date().toLocaleDateString('en-GB'),
                order_time: new Date().toLocaleTimeString('en-GB'),
                
                // Customer details
                customer_name: orderData.customerName,
                customer_email: orderData.customerEmail,
                customer_phone: orderData.customerPhone,
                
                // Order items
                items_list: this.formatItemsList(orderData.items),
                items_count: orderData.items.length,
                
                // Pricing
                subtotal: orderData.subtotal.toFixed(2),
                vat_amount: orderData.vat.toFixed(2),
                total_amount: orderData.total.toFixed(2),
                
                // Payment
                payment_method: this.formatPaymentMethod(orderData.paymentMethod),
                
                // Store details
                store_name: 'Knowledge Development Stationery',
                store_name_ar: 'قرطاسية تنمية المعرفة',
                store_email: 'info@kdstationery.com',
                store_phone: '+966 XX XXX XXXX',
                store_address: 'Jeddah, Saudi Arabia',
                
                // Receipt URL (if available)
                receipt_url: orderData.receiptUrl || '',
                
                // Current year for footer
                current_year: new Date().getFullYear()
            };
            
            const result = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', result);
            return { success: true, result };
            
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error.text || error.message };
        }
    }
    
    // Send admin notification email
    async sendAdminNotification(orderData) {
        await this.loadEmailJS();
        
        try {
            const templateParams = {
                to_email: 'admin@kdstationery.com', // Admin email
                to_name: 'Admin',
                subject: `New Order Received - #${orderData.orderId}`,
                
                order_id: orderData.orderId,
                order_date: new Date().toLocaleDateString('en-GB'),
                order_time: new Date().toLocaleTimeString('en-GB'),
                
                customer_name: orderData.customerName,
                customer_email: orderData.customerEmail,
                customer_phone: orderData.customerPhone,
                
                items_list: this.formatItemsList(orderData.items),
                total_amount: orderData.total.toFixed(2),
                payment_method: this.formatPaymentMethod(orderData.paymentMethod),
                
                admin_panel_url: `${window.location.origin}/admin-dynamic.html`
            };
            
            const result = await emailjs.send(
                this.serviceId,
                'admin_notification_template', // Different template for admin
                templateParams
            );
            
            console.log('Admin notification sent:', result);
            return { success: true, result };
            
        } catch (error) {
            console.error('Admin notification failed:', error);
            return { success: false, error: error.text || error.message };
        }
    }
    
    // Send low stock alert
    async sendLowStockAlert(products) {
        await this.loadEmailJS();
        
        try {
            const templateParams = {
                to_email: 'admin@kdstationery.com',
                to_name: 'Admin',
                subject: 'Low Stock Alert - Immediate Action Required',
                
                alert_date: new Date().toLocaleDateString('en-GB'),
                alert_time: new Date().toLocaleTimeString('en-GB'),
                
                low_stock_products: products.map(product => 
                    `${product.name} - ${product.stock} units remaining`
                ).join('\n'),
                
                products_count: products.length,
                admin_panel_url: `${window.location.origin}/admin-dynamic.html`
            };
            
            const result = await emailjs.send(
                this.serviceId,
                'low_stock_template',
                templateParams
            );
            
            console.log('Low stock alert sent:', result);
            return { success: true, result };
            
        } catch (error) {
            console.error('Low stock alert failed:', error);
            return { success: false, error: error.text || error.message };
        }
    }
    
    // Send customer welcome email
    async sendWelcomeEmail(customerData) {
        await this.loadEmailJS();
        
        try {
            const templateParams = {
                to_email: customerData.email,
                to_name: customerData.firstName || customerData.fullName,
                
                customer_name: customerData.firstName || customerData.fullName,
                store_name: 'Knowledge Development Stationery',
                store_name_ar: 'قرطاسية تنمية المعرفة',
                
                website_url: window.location.origin,
                support_email: 'support@kdstationery.com',
                
                current_year: new Date().getFullYear()
            };
            
            const result = await emailjs.send(
                this.serviceId,
                'welcome_template',
                templateParams
            );
            
            console.log('Welcome email sent:', result);
            return { success: true, result };
            
        } catch (error) {
            console.error('Welcome email failed:', error);
            return { success: false, error: error.text || error.message };
        }
    }
    
    // Format items list for email
    formatItemsList(items) {
        return items.map(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            return `${item.name} x${item.quantity} - ${itemTotal} SAR`;
        }).join('\n');
    }
    
    // Format payment method for display
    formatPaymentMethod(method) {
        const methods = {
            'moyasar': 'Credit/Debit Card (Moyasar)',
            'tamara': 'Tamara - Buy Now, Pay Later',
            'mada': 'Mada Card',
            'stcpay': 'STC Pay',
            'applepay': 'Apple Pay'
        };
        
        return methods[method] || method;
    }
    
    // Test email configuration
    async testEmailService() {
        await this.loadEmailJS();
        
        try {
            const testParams = {
                to_email: 'test@kdstationery.com',
                to_name: 'Test User',
                subject: 'Email Service Test',
                message: 'This is a test email to verify EmailJS configuration.',
                test_date: new Date().toLocaleString()
            };
            
            const result = await emailjs.send(
                this.serviceId,
                'test_template',
                testParams
            );
            
            console.log('Test email sent successfully:', result);
            return { success: true, result };
            
        } catch (error) {
            console.error('Test email failed:', error);
            return { success: false, error: error.text || error.message };
        }
    }
}

// WhatsApp Integration for Saudi Arabia
class WhatsAppService {
    constructor(config) {
        this.businessNumber = config.businessNumber; // Your WhatsApp Business number
        this.apiKey = config.apiKey; // WhatsApp Business API key (optional)
    }
    
    // Send order confirmation via WhatsApp
    sendOrderConfirmation(orderData) {
        const message = this.formatOrderMessage(orderData);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${orderData.customerPhone}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        return { success: true, url: whatsappUrl };
    }
    
    // Format order message for WhatsApp
    formatOrderMessage(orderData) {
        return `
🛍️ *Order Confirmation - Knowledge Development Stationery*

📋 Order ID: #${orderData.orderId}
📅 Date: ${new Date().toLocaleDateString('en-GB')}

👤 *Customer Details:*
Name: ${orderData.customerName}
Phone: ${orderData.customerPhone}

🛒 *Order Items:*
${orderData.items.map(item => 
    `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} SAR`
).join('\n')}

💰 *Order Summary:*
Subtotal: ${orderData.subtotal.toFixed(2)} SAR
VAT (15%): ${orderData.vat.toFixed(2)} SAR
*Total: ${orderData.total.toFixed(2)} SAR*

💳 Payment Method: ${this.formatPaymentMethod(orderData.paymentMethod)}

Thank you for your order! 🙏

📍 Knowledge Development Stationery
📧 info@kdstationery.com
🌐 ${window.location.origin}
        `.trim();
    }
    
    // Format payment method
    formatPaymentMethod(method) {
        const methods = {
            'moyasar': 'Credit/Debit Card',
            'tamara': 'Tamara (Buy Now, Pay Later)',
            'mada': 'Mada Card',
            'stcpay': 'STC Pay',
            'applepay': 'Apple Pay'
        };
        
        return methods[method] || method;
    }
    
    // Send to business WhatsApp for admin notification
    sendAdminNotification(orderData) {
        const message = `
🔔 *New Order Alert*

📋 Order: #${orderData.orderId}
👤 Customer: ${orderData.customerName}
💰 Total: ${orderData.total.toFixed(2)} SAR
📱 Phone: ${orderData.customerPhone}

View in admin panel: ${window.location.origin}/admin-dynamic.html
        `.trim();
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.businessNumber}?text=${encodedMessage}`;
        
        // Auto-send to business number
        window.open(whatsappUrl, '_blank');
        
        return { success: true, url: whatsappUrl };
    }
}

// SMS Service for Saudi Arabia
class SMSService {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.senderId = config.senderId;
        this.baseUrl = config.baseUrl || 'https://api.sms.sa'; // Saudi SMS provider
    }
    
    // Send order confirmation SMS
    async sendOrderConfirmation(orderData) {
        const message = `Order #${orderData.orderId} confirmed! Total: ${orderData.total.toFixed(2)} SAR. Thank you for shopping with Knowledge Development Stationery. Track: ${window.location.origin}/order/${orderData.orderId}`;
        
        return await this.sendSMS(orderData.customerPhone, message);
    }
    
    // Send SMS
    async sendSMS(phoneNumber, message) {
        try {
            const response = await fetch(`${this.baseUrl}/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: phoneNumber,
                    from: this.senderId,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                return { success: true, result };
            } else {
                return { success: false, error: result.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Notification Manager - Handles all notification methods
class NotificationManager {
    constructor(config) {
        this.email = new EmailService(config.email);
        this.whatsapp = new WhatsAppService(config.whatsapp);
        this.sms = new SMSService(config.sms);
        this.config = config;
    }
    
    // Send all order notifications
    async sendOrderNotifications(orderData) {
        const results = {
            email: { success: false },
            whatsapp: { success: false },
            sms: { success: false },
            adminEmail: { success: false }
        };
        
        try {
            // Send customer email receipt
            results.email = await this.email.sendOrderConfirmation(orderData);
            
            // Send admin email notification
            results.adminEmail = await this.email.sendAdminNotification(orderData);
            
            // Send WhatsApp confirmation (optional)
            if (this.config.enableWhatsApp) {
                results.whatsapp = this.whatsapp.sendOrderConfirmation(orderData);
            }
            
            // Send SMS confirmation (optional)
            if (this.config.enableSMS) {
                results.sms = await this.sms.sendOrderConfirmation(orderData);
            }
            
            console.log('Notification results:', results);
            return results;
            
        } catch (error) {
            console.error('Error sending notifications:', error);
            return results;
        }
    }
    
    // Send welcome notifications for new customers
    async sendWelcomeNotifications(customerData) {
        const results = {};
        
        try {
            // Send welcome email
            results.email = await this.email.sendWelcomeEmail(customerData);
            
            console.log('Welcome notification results:', results);
            return results;
            
        } catch (error) {
            console.error('Error sending welcome notifications:', error);
            return results;
        }
    }
    
    // Send low stock alerts
    async sendLowStockAlerts(products) {
        const results = {};
        
        try {
            // Send email alert
            results.email = await this.email.sendLowStockAlert(products);
            
            // Send WhatsApp alert to admin
            if (this.config.enableWhatsApp) {
                const alertData = {
                    orderId: 'STOCK_ALERT',
                    customerName: 'System Alert',
                    customerPhone: this.config.whatsapp.businessNumber,
                    total: 0,
                    items: products.map(p => ({ name: `${p.name} (${p.stock} left)`, quantity: 1, price: 0 })),
                    subtotal: 0,
                    vat: 0,
                    paymentMethod: 'alert'
                };
                
                results.whatsapp = this.whatsapp.sendAdminNotification(alertData);
            }
            
            console.log('Low stock alert results:', results);
            return results;
            
        } catch (error) {
            console.error('Error sending low stock alerts:', error);
            return results;
        }
    }
}

// Export classes
window.EmailService = EmailService;
window.WhatsAppService = WhatsAppService;
window.SMSService = SMSService;
window.NotificationManager = NotificationManager;

// Configuration example
window.NOTIFICATION_CONFIG = {
    email: {
        serviceId: 'your_emailjs_service_id',
        templateId: 'your_emailjs_template_id',
        publicKey: 'your_emailjs_public_key'
    },
    whatsapp: {
        businessNumber: '966XXXXXXXXX' // Your WhatsApp Business number
    },
    sms: {
        apiKey: 'your_sms_api_key',
        senderId: 'KDStationery',
        baseUrl: 'https://api.sms.sa'
    },
    enableWhatsApp: true,
    enableSMS: false // Enable when you have SMS service
};
