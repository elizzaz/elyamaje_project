/**
 * Converts a dollar amount to cents.
 * @param dollars - The amount in dollars (can include cents as decimals)
 * @returns The amount in cents as an integer
 * @example
 * toCents(10.99) // returns 1099
 */
export const toCents = (dollars: number): number => Math.round(dollars * 100);

/**
 * Converts a cent amount to dollars.
 * @param cents - The amount in cents as an integer
 * @returns The amount in dollars (with cents as decimals)
 * @example
 * toDollars(1099) // returns 10.99
 */
export const toDollars = (cents: number): number => cents / 100; 