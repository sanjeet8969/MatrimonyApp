const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { generateToken } = require('../config/auth');

// Test database
const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/matrimony_test';

describe('Profile Tests', () => {
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
  });

  describe('POST /api/profiles', () => {
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

    const validProfileData = {
      personalDetails: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        height: '5\'8"',
        bodyType: 'average',
        complexion: 'fair'
      },
      contactDetails: {
        email: 'john.doe@example.com',
        phone: '9876543210',
        address: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          pincode: '400001'
        }
      },
      religiousDetails: {
        religion: 'hindu',
        caste: 'brahmin',
        mothertongue: 'hindi'
      }
    };

    test('should create profile with valid data', async () => {
      const response = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(validProfileData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Profile created successfully');
      expect(response.body.data.profile.personalDetails.firstName).toBe('John');
    });

    test('should not create profile without authentication', async () => {
      const response = await request(app)
        .post('/api/profiles')
        .send(validProfileData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should not create duplicate profile for same user', async () => {
      // Create profile first
      await Profile.create({ ...validProfileData, userId: user._id });

      const response = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(validProfileData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('GET /api/profiles/me', () => {
    let user, token, profile;

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

      profile = await Profile.create({
        userId: user._id,
        personalDetails: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          height: '5\'8"'
        },
        contactDetails: {
          email: 'john.doe@example.com',
          phone: '9876543210'
        }
      });
    });

    test('should get own profile', async () => {
      const response = await request(app)
        .get('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.personalDetails.firstName).toBe('John');
    });

    test('should not get profile without authentication', async () => {
      const response = await request(app)
        .get('/api/profiles/me')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('should return 404 if profile does not exist', async () => {
      await Profile.deleteOne({ userId: user._id });

      const response = await request(app)
        .get('/api/profiles/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/profiles', () => {
    let user, token, profile;

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

      profile = await Profile.create({
        userId: user._id,
        personalDetails: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          height: '5\'8"'
        }
      });
    });

    test('should update profile with valid data', async () => {
      const updateData = {
        personalDetails: {
          firstName: 'John',
          lastName: 'Smith',
          dateOfBirth: '1990-01-01',
          height: '5\'9"'
        }
      };

      const response = await request(app)
        .put('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.personalDetails.lastName).toBe('Smith');
      expect(response.body.data.profile.personalDetails.height).toBe('5\'9"');
    });

    test('should not update profile without authentication', async () => {
      const response = await request(app)
        .put('/api/profiles')
        .send({ personalDetails: { firstName: 'Updated' } })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/profiles/search', () => {
    let users, tokens, profiles;

    beforeEach(async () => {
      // Create multiple users and profiles for search testing
      users = [];
      tokens = [];
      profiles = [];

      for (let i = 0; i < 3; i++) {
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
            dateOfBirth: `199${i}-01-01`,
            height: '5\'8"'
          },
          contactDetails: {
            email: `user${i}@example.com`,
            phone: `987654321${i}`,
            address: {
              city: i === 0 ? 'Mumbai' : 'Delhi',
              state: i === 0 ? 'Maharashtra' : 'Delhi'
            }
          },
          religiousDetails: {
            religion: 'hindu'
          }
        });

        users.push(user);
        tokens.push(token);
        profiles.push(profile);
      }
    });

    test('should search profiles with valid filters', async () => {
      const response = await request(app)
        .get('/api/profiles/search')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .query({ city: 'Mumbai' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profiles).toHaveLength(1);
      expect(response.body.data.profiles[0].contactDetails.address.city).toBe('Mumbai');
    });

    test('should return paginated results', async () => {
      const response = await request(app)
        .get('/api/profiles/search')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .query({ page: 1, limit: 2 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profiles.length).toBeLessThanOrEqual(2);
      expect(response.body.data.pagination).toBeDefined();
    });

    test('should not search without authentication', async () => {
      const response = await request(app)
        .get('/api/profiles/search')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/profiles/:id', () => {
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

    test('should get profile by ID', async () => {
      const response = await request(app)
        .get(`/api/profiles/${profile2._id}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.personalDetails.firstName).toBe('Jane');
    });

    test('should return 404 for non-existent profile', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .get(`/api/profiles/${fakeId}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    test('should not get profile without authentication', async () => {
      const response = await request(app)
        .get(`/api/profiles/${profile2._id}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
