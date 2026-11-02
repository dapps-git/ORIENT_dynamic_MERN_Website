import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error('FATAL: MONGODB_URI environment variable is required.');
}

async function seedAdminPassword() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const adminCol = mongoose.connection.db!.collection('adminusers');
    const adminPassword = process.env.ADMIN_SEED_PASSWORD;
    const adminEmail = process.env.ADMIN_SEED_EMAIL ? process.env.ADMIN_SEED_EMAIL.toLowerCase() : undefined;

    if (!adminPassword || !adminEmail) {
      throw new Error('FATAL: ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD environment variables are required.');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const result = await adminCol.updateOne(
      { email: adminEmail },
      {
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
      },
      { upsert: true }
    );

    const updated = await adminCol.findOne({ email: adminEmail });
    const isMatch = await bcrypt.compare(adminPassword, updated!.password);

    console.log('✅ Admin user successfully seeded in MongoDB:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('   Bcrypt verification test:', isMatch ? 'PASSED ✅' : 'FAILED ❌');
    console.log('   MongoDB Upserted/Modified:', result.upsertedCount ? 'Created' : 'Updated');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin password:', err);
    process.exit(1);
  }
}

seedAdminPassword();
