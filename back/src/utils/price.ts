/**
 * Converts a euros amount to cents.
 * @param euros - The amount in euros (can include cents as decimals)
 * @returns The amount in cents as an integer
 * @example
 * toCents(10.99) // returns 1099
 */
export const toCents = (euros: number): number => Math.round(euros * 100);

/**
 * Converts a cent amount to euros.
 * @param cents - The amount in cents as an integer
 * @returns The amount in euros (with cents as decimals)
 * @example
 * toEuros(1099) // returns 10.99
 */
export const toEuros = (cents: number): number => cents / 100; 