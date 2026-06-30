import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { User, EmergencyContact, Location, EmergencyLog, Notification } from '../models/index.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('Connected to MongoDB for database seeding...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      EmergencyContact.deleteMany({}),
      Location.deleteMany({}),
      EmergencyLog.deleteMany({}),
      Notification.deleteMany({}),
    ]);
    logger.info('Cleared existing collections.');

    // 1. Seed User
    const defaultUser = await User.create({
      name: 'Ananya Sharma',
      email: 'ananya.sharma@safecircle.io',
      phone: '+91 98765 43210',
      bloodGroup: 'B+',
      medicalNotes: 'Mild asthma, carries inhaler',
      emergencyMessage: 'EMERGENCY! I feel unsafe. Please track my live coordinates immediately.',
      safetyScore: 8.8,
      activeGeofence: {
        lat: 28.6304,
        lng: 77.2177,
        radiusMeter: 1000,
        enabled: true,
      },
    });
    logger.info(`Created default user: ${defaultUser.name}`);

    // 2. Seed Emergency Contacts
    const contactsData = [
      {
        userId: defaultUser._id,
        name: 'Aarav Sharma',
        relationship: 'Father',
        phone: '+91 98765 43210',
        isEmergency: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        lastLocation: 'South Ext, New Delhi',
      },
      {
        userId: defaultUser._id,
        name: 'Priya Sharma',
        relationship: 'Mother',
        phone: '+91 98765 43211',
        isEmergency: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        lastLocation: 'Connaught Place, New Delhi',
      },
      {
        userId: defaultUser._id,
        name: 'Rohan Gupta',
        relationship: 'Friend (Local)',
        phone: '+91 99999 88888',
        isEmergency: false,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        lastLocation: 'Noida Sector 62',
      },
      {
        userId: defaultUser._id,
        name: 'National Emergency Service',
        relationship: 'Police Helpline',
        phone: '112',
        isEmergency: true,
      },
      {
        userId: defaultUser._id,
        name: 'Women Helpline',
        relationship: 'National Women Safety',
        phone: '1091',
        isEmergency: true,
      },
    ];
    await EmergencyContact.insertMany(contactsData);
    logger.info('Seeded 5 emergency contacts.');

    // 3. Seed Locations (Live Map & Safe Routes)
    const locationsData = [
      {
        userId: defaultUser._id,
        name: 'Connaught Place, New Delhi',
        lat: 28.6304,
        lng: 77.2177,
        safetyScore: 8.5,
        status: 'safe',
        crowdLevel: 'high',
      },
      {
        userId: defaultUser._id,
        name: 'Koramangala 5th Block, Bengaluru',
        lat: 12.9348,
        lng: 77.6227,
        safetyScore: 9.0,
        status: 'safe',
        crowdLevel: 'high',
      },
      {
        userId: defaultUser._id,
        name: 'Marine Drive, Mumbai',
        lat: 18.9438,
        lng: 72.8226,
        safetyScore: 8.8,
        status: 'safe',
        crowdLevel: 'high',
      },
      {
        userId: defaultUser._id,
        name: 'Noida Sector 18 Metro',
        lat: 28.5708,
        lng: 77.3261,
        safetyScore: 5.5,
        status: 'warning',
        crowdLevel: 'medium',
      },
      {
        userId: defaultUser._id,
        name: 'Old Delhi Market Alleys',
        lat: 28.6562,
        lng: 77.2309,
        safetyScore: 4.2,
        status: 'danger',
        crowdLevel: 'low',
      },
    ];
    await Location.insertMany(locationsData);
    logger.info('Seeded 5 location checkpoints.');

    // 4. Seed Emergency Logs
    const logsData = [
      {
        userId: defaultUser._id,
        contactName: 'Aarav Sharma',
        phone: '+91 98765 43210',
        time: '2026-06-28 23:45',
        type: 'Panic Detection',
        status: 'Resolved',
        coordinates: { lat: 28.6304, lng: 77.2177 },
        notes: 'Resolved after verification call.',
      },
      {
        userId: defaultUser._id,
        contactName: 'National Emergency Service (112)',
        phone: '112',
        time: '2026-06-20 18:22',
        type: 'SOS Button',
        status: 'Dispatched',
        coordinates: { lat: 28.5708, lng: 77.3261 },
        notes: 'Dispatched patrol vehicle to location.',
      },
      {
        userId: defaultUser._id,
        contactName: 'Priya Sharma',
        phone: '+91 98765 43211',
        time: '2026-06-15 01:10',
        type: 'Voice Trigger',
        status: 'Resolved',
        coordinates: { lat: 28.6562, lng: 77.2309 },
        notes: 'Voice keyword triggered SOS alert.',
      },
    ];
    await EmergencyLog.insertMany(logsData);
    logger.info('Seeded 3 emergency logs.');

    // 5. Seed Notifications
    const notificationsData = [
      {
        userId: defaultUser._id,
        title: 'SOS Emergency Alert',
        description: 'Panic trigger registered from Rohan Gupta. Auto-broadcasting coordinates.',
        timestamp: '10 mins ago',
        type: 'alert',
        isRead: false,
      },
      {
        userId: defaultUser._id,
        title: 'Safe Zone Geofence Exit',
        description: 'You have exited the designated safe perimeter around Noida Sector 62.',
        timestamp: '1 hour ago',
        type: 'info',
        isRead: false,
      },
      {
        userId: defaultUser._id,
        title: 'AI Companion Running',
        description: 'Background AI Voice Assistant is actively listening for vocal panic commands.',
        timestamp: '2 hours ago',
        type: 'success',
        isRead: true,
      },
    ];
    await Notification.insertMany(notificationsData);
    logger.info('Seeded 3 system notifications.');

    logger.info('Database seeding completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
