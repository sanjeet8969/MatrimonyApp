const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const { generateToken } = require('../config/auth');

// Test database
const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/matrimony_test';

describe('Authentication Tests', () => {
  let server;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(MONGODB_URI);
    server = app.listen(0);
  });

  afterAll(async () => {
    // Cleanup and close connections
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    const validUserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      password: 'Password123',
      gender: 'male',
      acceptTerms: true
    };

    test('should register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Registration successful');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(validUserData.email);
    });

    test('should not register user with existing email', async () => {
      // Create user first
      await User.create(validUserData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Email already exists');
    });

    test('should not register user with invalid email', async () => {
      const invalidData = { ...validUserData, email: 'invalid-email' };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('valid email');
    });

    test('should not register user with weak password', async () => {
      const invalidData = { ...validUserData, password: '123' };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Password');
    });

    test('should not register user without required fields', async () => {
      const incompleteData = { email: 'test@example.com' };

      const response = await request(app)
        .post('/api/auth/register')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      password: 'Password123',
      gender: 'male'
    };

    beforeEach(async () => {
      // Create a user for login tests
      const user = new User(userData);
      await user.save();
    });

    test('should login with valid credentials', async () => {
      const loginData = {
        email: userData.email,
        password: userData.password
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(userData.email);
    });

    test('should not login with invalid email', async () => {
      const loginData = {
        email: 'wrong@example.com',
        password: userData.password
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });

    test('should not login with invalid password', async () => {
      const loginData = {
        email: userData.email,
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });

    test('should not login without email or password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/logout', () => {
    let user, token;

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });
      token = generateToken({ userId: user._id });
    });

    test('should logout successfully with valid token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logout successful');
    });

    test('should not logout without token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    let user;

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });
    });

    test('should send reset password email for valid user', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: user.email })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('reset link sent');
    });

    test('should handle forgot password for non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/me', () => {
    let user, token;

    beforeEach(async () => {
      user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });
      token = generateToken({ userId: user._id });
    });

    test('should get current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(user.email);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should not get user without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should not get user with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
