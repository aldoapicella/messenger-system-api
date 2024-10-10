import { genSalt, hash, compare } from "bcryptjs";

/**
 * Utility class for handling password-related operations.
 */
export class PasswordUtil {
    /**
     * Hashes a password using bcrypt.
     * @param password - The password to hash.
     * @returns A promise that resolves to an object containing the hashed password 
     */
    static async hashPassword(password: string): Promise<string> {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    }

    /**
     * Validates a string (password or token) against a stored hash.
     * @param value - The string to validate.
     * @param storedHash - The stored hash to compare against.
     * @returns A promise that resolves to a boolean indicating whether the string is valid.
     */
    static async validateValue(value: string, storedHash: string): Promise<boolean> {
        return await compare(value, storedHash);
    }

    /**
     * Hashes a token using bcrypt.
     * @param token - The token to hash.
     * @returns A promise that resolves to the hashed token.
     */
    static async hashToken(token: string): Promise<string> {
        return await hash(token, 10);
    }
}