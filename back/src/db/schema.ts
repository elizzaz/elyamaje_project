import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

/**
 * Products table schema
 * - id: Auto-incrementing primary key
 * - name: Product name (2-255 characters)
 * - description: Optional product description
 * - price: Price in cents (integer)
 * - stock: Available quantity (integer, defaults to 0)
 * - image: Optional URL to product image
 */
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // Stored in cents
  stock: integer("stock").notNull().default(0),
  image: varchar("image", { length: 500 }),
});
