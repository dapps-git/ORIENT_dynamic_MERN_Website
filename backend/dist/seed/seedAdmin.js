"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('FATAL: MONGODB_URI environment variable is required.');
}
async function seedAdminPassword() {
    try {
        console.log('Connecting to MongoDB:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        const adminCol = mongoose_1.default.connection.db.collection('adminusers');
        const adminPassword = process.env.ADMIN_SEED_PASSWORD;
        const adminEmail = process.env.ADMIN_SEED_EMAIL ? process.env.ADMIN_SEED_EMAIL.toLowerCase() : undefined;
        if (!adminPassword || !adminEmail) {
            throw new Error('FATAL: ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD environment variables are required.');
        }
        const hashedPassword = await bcryptjs_1.default.hash(adminPassword, 12);
        const result = await adminCol.updateOne({ email: adminEmail }, {
            $set: {
                name: 'Orient Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                updatedAt: new Date(),
            },
            $setOnInsert: {
                createdAt: new Date(),
            },
        }, { upsert: true });
        const updated = await adminCol.findOne({ email: adminEmail });
        const isMatch = await bcryptjs_1.default.compare(adminPassword, updated.password);
        console.log('✅ Admin user successfully seeded in MongoDB:');
        console.log('   Email:', adminEmail);
        console.log('   Password:', adminPassword);
        console.log('   Bcrypt verification test:', isMatch ? 'PASSED ✅' : 'FAILED ❌');
        console.log('   MongoDB Upserted/Modified:', result.upsertedCount ? 'Created' : 'Updated');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Error seeding admin password:', err);
        process.exit(1);
    }
}
seedAdminPassword();
