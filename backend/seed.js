const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');
const BorrowRequest = require('./models/BorrowRequest');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/borrowbox';

const sampleItems = [
  {
    itemName: 'Scientific Calculator',
    category: 'Study',
    description: 'Casio fx-991EX calculator, ideal for engineering mathematics and semester exams.',
    ownerName: 'Sandana',
    ownerDepartment: 'CSE',
    ownerYear: 'III',
    condition: 'Good',
    availability: 'Available'
  },
  {
    itemName: 'Engineering Mathematics Book',
    category: 'Books',
    description: 'Higher Engineering Mathematics by B.S. Grewal in great condition.',
    ownerName: 'Rahul',
    ownerDepartment: 'ECE',
    ownerYear: 'II',
    condition: 'Fair',
    availability: 'Available'
  },
  {
    itemName: 'Lab Coat',
    category: 'Study',
    description: 'White cotton laboratory coat, size medium. Clean and sanitized.',
    ownerName: 'Priya',
    ownerDepartment: 'BioTech',
    ownerYear: 'I',
    condition: 'Excellent',
    availability: 'Available'
  },
  {
    itemName: 'Laptop Charger',
    category: 'Electronics',
    description: 'Universal 65W Type-C laptop power adapter compatible with Dell, Lenovo, and HP.',
    ownerName: 'Anish',
    ownerDepartment: 'IT',
    ownerYear: 'IV',
    condition: 'Good',
    availability: 'Available'
  },
  {
    itemName: 'USB Drive',
    category: 'Electronics',
    description: 'SanDisk 32GB USB 3.0 flash drive formatted for high-speed file transfers.',
    ownerName: 'Sneha',
    ownerDepartment: 'CSE',
    ownerYear: 'II',
    condition: 'Excellent',
    availability: 'Available'
  },
  {
    itemName: 'Umbrella',
    category: 'Accessories',
    description: 'Compact foldable windproof blue umbrella for rainy campus days.',
    ownerName: 'Karthik',
    ownerDepartment: 'Mech',
    ownerYear: 'III',
    condition: 'Good',
    availability: 'Borrowed'
  },
  {
    itemName: 'Drawing Kit',
    category: 'Study',
    description: 'Engineering drawing kit including mini drafter, compass, set squares, and sheets container.',
    ownerName: 'Divya',
    ownerDepartment: 'Civil',
    ownerYear: 'I',
    condition: 'Good',
    availability: 'Available'
  },
  {
    itemName: 'Football',
    category: 'Sports',
    description: 'Nivia size 5 football, suitable for evening college turf matches.',
    ownerName: 'Vikram',
    ownerDepartment: 'EEE',
    ownerYear: 'III',
    condition: 'Fair',
    availability: 'Available'
  },
  {
    itemName: 'Bluetooth Speaker',
    category: 'Electronics',
    description: 'Compact Bluetooth speaker with 6-hour battery backup for hostel study sessions.',
    ownerName: 'Sandana',
    ownerDepartment: 'CSE',
    ownerYear: 'III',
    condition: 'Excellent',
    availability: 'Available'
  },
  {
    itemName: 'Arduino Kit',
    category: 'Electronics',
    description: 'Arduino Uno starter kit with jumper wires, breadboard, LEDs, and basic sensors for mini projects.',
    ownerName: 'Rohit',
    ownerDepartment: 'ECE',
    ownerYear: 'IV',
    condition: 'Good',
    availability: 'Available'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Item.deleteMany({});
    await BorrowRequest.deleteMany({});
    console.log('Cleared existing items and requests.');

    // Insert sample items
    const createdItems = await Item.insertMany(sampleItems);
    console.log(`Inserted ${createdItems.length} items successfully.`);

    // Find the borrowed umbrella item ID
    const umbrella = createdItems.find(i => i.itemName === 'Umbrella');
    const calculator = createdItems.find(i => i.itemName === 'Scientific Calculator');

    // Create sample borrow requests
    const sampleRequests = [
      {
        itemId: umbrella._id,
        itemName: umbrella.itemName,
        borrowerName: 'Arun',
        borrowerDepartment: 'CSE',
        borrowerYear: 'II',
        requestMessage: 'Need umbrella for lab submission rain walk.',
        status: 'Approved'
      },
      {
        itemId: calculator._id,
        itemName: calculator.itemName,
        borrowerName: 'Kavya',
        borrowerDepartment: 'ECE',
        borrowerYear: 'III',
        requestMessage: 'Require scientific calculator for DSP semester test tomorrow.',
        status: 'Pending'
      }
    ];

    await BorrowRequest.insertMany(sampleRequests);
    console.log('Inserted sample borrow requests.');

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
