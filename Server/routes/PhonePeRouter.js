import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';
import rateLimit from 'express-rate-limit';

const phonePeRoute = express.Router();

// Define the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limiter to all requests
phonePeRoute.use(limiter);

phonePeRoute.post('/payment', async (req, res) => {
    const { amount, currency, orderId, merchantId, saltKey } = req.body;

    const hmac = crypto.createHmac('sha256', saltKey);
    hmac.update(`${amount}|${currency}|${orderId}|${merchantId}`);
    const hmacHash = hmac.digest('hex');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-verify': `${hmacHash}###1` // Ensure you append the key index here
        },
        body: JSON.stringify({
            amount,
            currency,
            orderId,
            merchantId
        })
    };

    const fetchWithRetry = async (url, options, retries = 5) => {
        let backoff = 1000; // Initial backoff time
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Failed to process payment: ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                if (i < retries - 1) {
                    console.log(`Retrying due to error: ${error.message} 'Attempt No:' ${i}`);
                    await new Promise(resolve => setTimeout(resolve, backoff));
                    backoff *= 2; // Exponential backoff
                } else {
                    throw error;
                }
            }
        }
    };

    try {
        const data = await fetchWithRetry('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', options);
        console.log("Payment Response:", data);
        res.json(data);
    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});

export default phonePeRoute;
