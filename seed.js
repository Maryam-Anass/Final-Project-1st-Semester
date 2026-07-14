require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./db/connect');
const User = require('./models/userModel');
const product = require('./models/productModel');

const seedDatabase = async () => {
    try{
        await connectDB();

        await User.deleteMany();
        await product.deleteMany();
        console.log('🗑️ Existing database data cleared.');

        const salt = await bcrypt.gensalt(10);
        const hashedAdminPassword = await bcrypt.hash('admin1234', salt);

        await User.craete({
            email: 'admin@store.com',
            password: hashedAdminPassword,
            isAdmin: true
        });
        console.log('👤 Default Admin account generated (admin@store.com / admin1234)')

        const Products = [
            {
                name: 'Wireless Bluetooth Headphones',
                price: 89.99,
                description: 'High-quality sound cancellation over-ear headphones.',
                stock: 50
            },
            {
                name: 'Ergonomic Gaming Mouse',
                price: 45.50,
                description: 'RGB customizable gaming mouse with macro keys.',
                stock: 120
            },
            {
                name: 'Mechanical Keyboard',
                price: 129.00,
                description: 'Tactile blue-switch mechanical keyboard.',
            }
        ];

        await product.insertMany(Products);
        console.log('📦 Mock store inventory database loaded successfully!');

        mongoose.connection.close();
        console.log('🔌 Database connection closed. Seeding process complete.');
        process.exit(0);
    } catch (error) {
        console.error(`🚨 Seeding process failed: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();