import { db } from './index';
import { productsTable } from './schema';
import { sql } from 'drizzle-orm';
import { toCents } from '../utils/price';

async function seed() {
  try {
    const products = [
      {
        name: "iPhone 15 Pro",
        description: "Latest Apple flagship smartphone with A17 Pro chip",
        price: toCents(1199.99),
        stock: 50,
        image: "https://example.com/iphone15pro.jpg",
      },
      {
        name: "Samsung Galaxy S24",
        description: "Premium Android smartphone with AI features",
        price: toCents(999.99),
        stock: 75,
        image: "https://example.com/galaxys24.jpg",
      },
      {
        name: "MacBook Pro M3",
        description: "Powerful laptop with Apple Silicon",
        price: toCents(1999.99),
        stock: 30,
        image: "https://example.com/macbookpro.jpg",
      },
      {
        name: "AirPods Pro",
        description: "Wireless earbuds with active noise cancellation",
        price: toCents(249.99),
        stock: 100,
        image: "https://example.com/airpodspro.jpg",
      },
      {
        name: "iPad Air",
        description: "Versatile tablet for work and entertainment",
        price: toCents(599.99),
        stock: 45,
        image: "https://example.com/ipadair.jpg",
      }
    ];

    console.log('🌱 Seeding products...');
    await db.insert(productsTable).values(products);
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
}

seed(); 