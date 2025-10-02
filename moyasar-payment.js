// Moyasar Payment Integration for Saudi Arabia
// Official Moyasar SDK for secure payments

class MoyasarPayment {
    constructor(config) {
        this.publishableKey = config.publishableKey;
        this.baseURL = 'https://api.moyasar.com/v1';
        this.initialized = false;
        this.loadMoyasarSDK();
    }
    
    // Load Moyasar SDK
    loadMoyasarSDK() {
        if (window.Moyasar) {
            this.initialized = true;
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.js';
            script.onload = () => {
                this.initialized = true;
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Create payment form
    async createPaymentForm(containerId, paymentData) {
        await this.loadMoyasarSDK();
        
        const moyasar = window.Moyasar.init({
            element: `#${containerId}`,
            amount: Math.round(paymentData.amount * 100), // Convert to halalas
            currency: 'SAR',
            description: paymentData.description,
            publishable_api_key: this.publishableKey,
            callback_url: paymentData.callbackUrl,
            methods: paymentData.methods || ['creditcard', 'stcpay', 'applepay'],
            
            // Metadata
            metadata: {
                orderId: paymentData.orderId,
                customerEmail: paymentData.customerEmail,
                customerName: paymentData.customerName
            },
            
            // Styling
            theme: {
                color: '#FFD700', // Your brand yellow
                border_radius: '8px'
            },
            
            // Callbacks
            on_completed: (payment) => {
                this.handlePaymentSuccess(payment, paymentData.onSuccess);
            },
            
            on_failed: (payment) => {
                this.handlePaymentFailure(payment, paymentData.onFailure);
            }
        });
        
        return moyasar;
    }
    
    // Handle successful payment
    handlePaymentSuccess(payment, callback) {
        console.log('Payment successful:', payment);
        
        const paymentResult = {
            success: true,
            paymentId: payment.id,
            status: payment.status,
            amount: payment.amount / 100, // Convert back from halalas
            currency: payment.currency,
            method: payment.source.type,
            transactionId: payment.source.transaction_id,
            receiptUrl: payment.receipt_url,
            createdAt: payment.created_at
        };
        
        if (callback) callback(paymentResult);
    }
    
    // Handle failed payment
    handlePaymentFailure(payment, callback) {
        console.error('Payment failed:', payment);
        
        const paymentResult = {
            success: false,
            error: payment.source?.message || 'Payment failed',
            paymentId: payment.id,
            status: payment.status
        };
        
        if (callback) callback(paymentResult);
    }
    
    // Create direct payment (for API integration)
    async createPayment(paymentData) {
        try {
            const response = await fetch(`${this.baseURL}/payments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(this.publishableKey + ':')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: Math.round(paymentData.amount * 100),
                    currency: 'SAR',
                    description: paymentData.description,
                    source: paymentData.source,
                    callback_url: paymentData.callbackUrl,
                    metadata: paymentData.metadata
                })
            });
            
            const payment = await response.json();
            
            if (response.ok) {
                return { success: true, payment };
            } else {
                return { success: false, error: payment.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    // Verify payment status
    async verifyPayment(paymentId) {
        try {
            const response = await fetch(`${this.baseURL}/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Basic ${btoa(this.publishableKey + ':')}`
                }
            });
            
            const payment = await response.json();
            
            if (response.ok) {
                return { success: true, payment };
            } else {
                return { success: false, error: payment.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    // Get supported payment methods
    getSupportedMethods() {
        return [
            {
                id: 'creditcard',
                name: 'Credit/Debit Card',
                nameAr: 'بطاقة ائتمانية/مدينة',
                icon: 'fas fa-credit-card',
                description: 'Visa, Mastercard, Mada'
            },
            {
                id: 'stcpay',
                name: 'STC Pay',
                nameAr: 'STC Pay',
                icon: 'fas fa-mobile-alt',
                description: 'Digital wallet'
            },
            {
                id: 'applepay',
                name: 'Apple Pay',
                nameAr: 'Apple Pay',
                icon: 'fab fa-apple',
                description: 'Quick and secure'
            }
        ];
    }
    
    // Format amount for display
    formatAmount(amount, currency = 'SAR') {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    }
    
    // Validate card number (basic validation)
    validateCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        const regex = /^\d{13,19}$/;
        return regex.test(cleaned);
    }
    
    // Get card type from number
    getCardType(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        if (/^3[47]/.test(cleaned)) return 'amex';
        if (/^6/.test(cleaned)) return 'discover';
        if (/^(508|606|627|628|629)/.test(cleaned)) return 'mada';
        
        return 'unknown';
    }
}

// Tamara Buy Now Pay Later Integration
class TamaraPayment {
    constructor(config) {
        this.merchantId = config.merchantId;
        this.apiKey = config.apiKey;
        this.baseURL = config.sandbox ? 'https://api-sandbox.tamara.co' : 'https://api.tamara.co';
    }
    
    // Check if order is eligible for Tamara
    async checkEligibility(orderData) {
        try {
            const response = await fetch(`${this.baseURL}/checkout/payment-options-pre-check`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total_amount: {
                        amount: orderData.amount,
                        currency: 'SAR'
                    },
                    country_code: 'SA',
                    phone_number: orderData.phoneNumber,
                    is_vip: false
                })
            });
            
            const result = await response.json();
            return { success: response.ok, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    // Create Tamara checkout session
    async createCheckoutSession(orderData) {
        try {
            const response = await fetch(`${this.baseURL}/checkout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_reference_id: orderData.orderId,
                    total_amount: {
                        amount: orderData.amount,
                        currency: 'SAR'
                    },
                    description: orderData.description,
                    country_code: 'SA',
                    payment_type: 'PAY_BY_INSTALMENTS',
                    instalments: 3,
                    consumer: {
                        first_name: orderData.customer.firstName,
                        last_name: orderData.customer.lastName,
                        phone_number: orderData.customer.phone,
                        email: orderData.customer.email
                    },
                    billing_address: orderData.billingAddress,
                    shipping_address: orderData.shippingAddress,
                    items: orderData.items.map(item => ({
                        reference_id: item.id,
                        type: 'Physical',
                        name: item.name,
                        sku: item.id,
                        quantity: item.quantity,
                        unit_price: {
                            amount: item.price,
                            currency: 'SAR'
                        },
                        total_amount: {
                            amount: item.price * item.quantity,
                            currency: 'SAR'
                        }
                    })),
                    merchant_url: {
                        success: orderData.successUrl,
                        failure: orderData.failureUrl,
                        cancel: orderData.cancelUrl,
                        notification: orderData.webhookUrl
                    }
                })
            });
            
            const result = await response.json();
            return { success: response.ok, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Payment Manager - Handles all payment methods
class PaymentManager {
    constructor(config) {
        this.moyasar = new MoyasarPayment({
            publishableKey: config.moyasar.publishableKey
        });
        
        this.tamara = new TamaraPayment({
            merchantId: config.tamara.merchantId,
            apiKey: config.tamara.apiKey,
            sandbox: config.tamara.sandbox
        });
        
        this.config = config;
    }
    
    // Process payment based on selected method
    async processPayment(paymentMethod, orderData) {
        switch (paymentMethod) {
            case 'moyasar':
                return await this.processMoyasarPayment(orderData);
            
            case 'tamara':
                return await this.processTamaraPayment(orderData);
            
            case 'mada':
                return await this.processMadaPayment(orderData);
            
            default:
                return { success: false, error: 'Unsupported payment method' };
        }
    }
    
    // Process Moyasar payment
    async processMoyasarPayment(orderData) {
        const paymentData = {
            amount: orderData.total,
            description: `Order #${orderData.orderId} - Knowledge Development Stationery`,
            orderId: orderData.orderId,
            customerEmail: orderData.customerEmail,
            customerName: orderData.customerName,
            callbackUrl: `${window.location.origin}/payment-callback`,
            methods: ['creditcard', 'stcpay', 'applepay'],
            
            onSuccess: (result) => {
                this.handlePaymentSuccess(result, orderData);
            },
            
            onFailure: (result) => {
                this.handlePaymentFailure(result, orderData);
            }
        };
        
        return await this.moyasar.createPaymentForm('payment-container', paymentData);
    }
    
    // Process Tamara payment
    async processTamaraPayment(orderData) {
        // First check eligibility
        const eligibility = await this.tamara.checkEligibility({
            amount: orderData.total,
            phoneNumber: orderData.customerPhone
        });
        
        if (!eligibility.success) {
            return { success: false, error: 'Order not eligible for Tamara' };
        }
        
        // Create checkout session
        const session = await this.tamara.createCheckoutSession({
            orderId: orderData.orderId,
            amount: orderData.total,
            description: `Order #${orderData.orderId}`,
            customer: {
                firstName: orderData.customerName.split(' ')[0],
                lastName: orderData.customerName.split(' ').slice(1).join(' '),
                phone: orderData.customerPhone,
                email: orderData.customerEmail
            },
            items: orderData.items,
            successUrl: `${window.location.origin}/payment-success`,
            failureUrl: `${window.location.origin}/payment-failure`,
            cancelUrl: `${window.location.origin}/payment-cancel`,
            webhookUrl: `${window.location.origin}/tamara-webhook`
        });
        
        if (session.success) {
            // Redirect to Tamara checkout
            window.location.href = session.data.checkout_url;
        }
        
        return session;
    }
    
    // Process Mada payment (through Moyasar)
    async processMadaPayment(orderData) {
        const paymentData = {
            ...orderData,
            methods: ['creditcard'], // Mada cards work through creditcard method
            cardTypes: ['mada']
        };
        
        return await this.processMoyasarPayment(paymentData);
    }
    
    // Handle successful payment
    handlePaymentSuccess(result, orderData) {
        console.log('Payment successful:', result);
        
        // Update order status in Firebase
        if (window.OrderService) {
            window.OrderService.updateOrderStatus(orderData.orderId, 'paid');
        }
        
        // Show success message
        this.showPaymentResult(true, result);
        
        // Send receipt email
        this.sendReceiptEmail(orderData, result);
        
        // Clear cart
        if (window.clearCart) {
            window.clearCart();
        }
    }
    
    // Handle failed payment
    handlePaymentFailure(result, orderData) {
        console.error('Payment failed:', result);
        
        // Update order status
        if (window.OrderService) {
            window.OrderService.updateOrderStatus(orderData.orderId, 'payment_failed');
        }
        
        // Show error message
        this.showPaymentResult(false, result);
    }
    
    // Show payment result
    showPaymentResult(success, result) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${success ? 'bg-green-100' : 'bg-red-100'}">
                        <i class="fas fa-${success ? 'check' : 'times'} text-2xl ${success ? 'text-green-600' : 'text-red-600'}"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 ${success ? 'text-green-800' : 'text-red-800'}">
                        ${success ? 'Payment Successful!' : 'Payment Failed'}
                    </h3>
                    <p class="text-gray-600 mb-6">
                        ${success ? 'Your order has been confirmed and you will receive a receipt shortly.' : result.error || 'Please try again or contact support.'}
                    </p>
                    ${success ? `
                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <p class="text-sm text-gray-600">Transaction ID:</p>
                            <p class="font-mono text-sm">${result.transactionId || result.paymentId}</p>
                        </div>
                    ` : ''}
                    <button onclick="this.closest('.fixed').remove()" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        ${success ? 'Continue Shopping' : 'Try Again'}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds if successful
        if (success) {
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 10000);
        }
    }
    
    // Send receipt email
    sendReceiptEmail(orderData, paymentResult) {
        // This would integrate with your email service
        console.log('Sending receipt email for order:', orderData.orderId);
        
        // For now, we'll use the existing email functionality
        if (window.sendEmailReceipt) {
            window.sendEmailReceipt(orderData, paymentResult);
        }
    }
}

// Export for use in other files
window.MoyasarPayment = MoyasarPayment;
window.TamaraPayment = TamaraPayment;
window.PaymentManager = PaymentManager;

// Configuration example
window.PAYMENT_CONFIG = {
    moyasar: {
        publishableKey: 'pk_test_your_moyasar_key_here' // Replace with your actual key
    },
    tamara: {
        merchantId: 'your_tamara_merchant_id',
        apiKey: 'your_tamara_api_key',
        sandbox: true // Set to false for production
    }
};
