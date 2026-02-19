const request = require('supertest');
const app = require('../src/app');

describe('Server API Tests', () => {
    
    describe('GET /api/health', () => {
        it('should return 200 and status ok', async () => {
            const res = await request(app).get('/api/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'ok');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('GET /', () => {
        it('should return welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('ShopSmart Backend Service');
        });
    });

    describe('GET /unknown-route', () => {
        it('should return 404', async () => {
            const res = await request(app).get('/api/unknown');
            expect(res.statusCode).toEqual(404);
        });
    });
});
