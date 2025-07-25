const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Match = require('../models/Match');
const InterestRequest = require('../models/InterestRequest');
const { generateToken } = require('../config/auth');

// Test database
const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/matrimony_test';

describe('Match Tests', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI);
    server = app.listen(0);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Match.deleteMany({});
    await InterestRequest.deleteMany({});
  });

  describe('GET /api/matches/find', () => {
    let users, tokens, profiles;

    beforeEach(async () => {
      users = [];
      tokens = [];
      profiles = [];

      // Create multiple users with profiles
      for (let i = 0; i < 4; i++) {
        const user = await User.create({
          firstName: `User${i}`,
          lastName: 'Test',
          email: `user${i}@example.com`,
          phone: `987654321${i}`,
          password: 'Password123',
          gender: i % 2 === 0 ? 'male' : 'female'
        });

        const token = generateToken({ userId: user._id });

        const profile = await Profile.create({
          userId: user._id,
          personalDetails: {
            firstName: `User${i}`,
            lastName: 'Test',
            dateOfBirth: `199${i % 2 === 0 ? '0' : '2'}-01-01`,
            height: '5\'8"'
          },
          religiousDetails: {
            religion: 'hindu'
          },
          preferences: {
            ageRange: { min: 25, max: 35 },
            religion: 'hindu'
          }
        });

        users.push(user);
        tokens.push(token);
        profiles.push(profile);
      }
    });

    test('should find potential matches', async () => {
      const response = await request(app)
        .get('/api/matches/find')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.matches).toBeDefined();
      expect(Array.isArray(response.body.data.matches)).toBe(true);
    });

    test('should not find matches without authentication', async () => {
      const response = await request(app)
        .get('/api/matches/find')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should return paginated match results', async () => {
      const response = await request(app)
        .get('/api/matches/find')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .query({ page: 1, limit: 2 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.pagination.currentPage).toBe(1);
    });
  });

  describe('POST /api/matches/interest', () => {
    let user1, user2, token1, profile1, profile2;

    beforeEach(async () => {
      user1 = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });

      user2 = await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543211',
        password: 'Password123',
        gender: 'female'
      });

      token1 = generateToken({ userId: user1._id });

      profile1 = await Profile.create({
        userId: user1._id,
        personalDetails: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01'
        }
      });

      profile2 = await Profile.create({
        userId: user2._id,
        personalDetails: {
          firstName: 'Jane',
          lastName: 'Smith',
          dateOfBirth: '1992-01-01'
        }
      });
    });

    test('should send interest request', async () => {
      const interestData = {
        receiverId: user2._id,
        message: 'Hi, I would like to connect with you'
      };

      const response = await request(app)
        .post('/api/matches/interest')
        .set('Authorization', `Bearer ${token1}`)
        .send(interestData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Interest request sent successfully');
      expect(response.body.data.interestRequest.receiverId.toString()).toBe(user2._id.toString());
    });

    test('should not send interest to self', async () => {
      const interestData = {
        receiverId: user1._id,
        message: 'Self interest'
      };

      const response = await request(app)
        .post('/api/matches/interest')
        .set('Authorization', `Bearer ${token1}`)
        .send(interestData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('yourself');
    });

    test('should not send duplicate interest request', async () => {
      // Create existing interest request
      await InterestRequest.create({
        senderId: user1._id,
        receiverId: user2._id,
        message: 'First request',
        status: 'pending'
      });

      const interestData = {
        receiverId: user2._id,
        message: 'Second request'
      };

      const response = await request(app)
        .post('/api/matches/interest')
        .set('Authorization', `Bearer ${token1}`)
        .send(interestData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already sent');
    });

    test('should not send interest without authentication', async () => {
      const interestData = {
        receiverId: user2._id,
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/matches/interest')
        .send(interestData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/matches/interest/:requestId', () => {
    let user1, user2, token2, interestRequest;

    beforeEach(async () => {
      user1 = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });

      user2 = await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543211',
        password: 'Password123',
        gender: 'female'
      });

      token2 = generateToken({ userId: user2._id });

      interestRequest = await InterestRequest.create({
        senderId: user1._id,
        receiverId: user2._id,
        message: 'Interest message',
        status: 'pending'
      });
    });

    test('should accept interest request', async () => {
      const response = await request(app)
        .put(`/api/matches/interest/${interestRequest._id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ status: 'accepted' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.interestRequest.status).toBe('accepted');
    });

    test('should decline interest request', async () => {
      const response = await request(app)
        .put(`/api/matches/interest/${interestRequest._id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ status: 'declined' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.interestRequest.status).toBe('declined');
    });

    test('should not respond to non-existent interest request', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/api/matches/interest/${fakeId}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ status: 'accepted' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    test('should not respond without authentication', async () => {
      const response = await request(app)
        .put(`/api/matches/interest/${interestRequest._id}`)
        .send({ status: 'accepted' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/matches/interests', () => {
    let user1, user2, token1, token2, interestRequest;

    beforeEach(async () => {
      user1 = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });

      user2 = await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543211',
        password: 'Password123',
        gender: 'female'
      });

      token1 = generateToken({ userId: user1._id });
      token2 = generateToken({ userId: user2._id });

      interestRequest = await InterestRequest.create({
        senderId: user1._id,
        receiverId: user2._id,
        message: 'Interest message',
        status: 'pending'
      });
    });

    test('should get received interest requests', async () => {
      const response = await request(app)
        .get('/api/matches/interests')
        .set('Authorization', `Bearer ${token2}`)
        .query({ type: 'received' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.interests).toHaveLength(1);
      expect(response.body.data.interests[0].senderId.toString()).toBe(user1._id.toString());
    });

    test('should get sent interest requests', async () => {
      const response = await request(app)
        .get('/api/matches/interests')
        .set('Authorization', `Bearer ${token1}`)
        .query({ type: 'sent' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.interests).toHaveLength(1);
      expect(response.body.data.interests[0].receiverId.toString()).toBe(user2._id.toString());
    });

    test('should not get interests without authentication', async () => {
      const response = await request(app)
        .get('/api/matches/interests')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/matches', () => {
    let user1, user2, token1, match;

    beforeEach(async () => {
      user1 = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        password: 'Password123',
        gender: 'male'
      });

      user2 = await User.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543211',
        password: 'Password123',
        gender: 'female'
      });

      token1 = generateToken({ userId: user1._id });

      match = await Match.create({
        user1Id: user1._id,
        user2Id: user2._id,
        matchScore: 85,
        status: 'active'
      });
    });

    test('should get user matches', async () => {
      const response = await request(app)
        .get('/api/matches')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.matches).toBeDefined();
      expect(Array.isArray(response.body.data.matches)).toBe(true);
    });

    test('should not get matches without authentication', async () => {
      const response = await request(app)
        .get('/api/matches')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
