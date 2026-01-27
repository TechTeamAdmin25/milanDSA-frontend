import fs from 'fs';
import path from 'path';

type OtpEntry = {
    otp: string;
    expiresAt: number;
};

// File path for storing OTPs (in the project root)
const OTP_FILE_PATH = path.join(process.cwd(), '.otps.json');

// Helper to read OTPs from file
const readOtps = (): Record<string, OtpEntry> => {
    try {
        if (!fs.existsSync(OTP_FILE_PATH)) {
            return {};
        }
        const data = fs.readFileSync(OTP_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading OTP file:', error);
        return {};
    }
};

// Helper to write OTPs to file
const writeOtps = (otps: Record<string, OtpEntry>) => {
    try {
        fs.writeFileSync(OTP_FILE_PATH, JSON.stringify(otps, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing OTP file:', error);
    }
};

export const storeOtp = (email: string, otp: string) => {
    const otps = readOtps();
    
    // Expires in 10 minutes
    const expiresAt = Date.now() + 10 * 60 * 1000;
    
    otps[email] = { otp, expiresAt };
    
    // Cleanup expired OTPs while we're at it
    const now = Date.now();
    Object.keys(otps).forEach(key => {
        if (otps[key].expiresAt < now) {
            delete otps[key];
        }
    });

    writeOtps(otps);
};

export const verifyOtpInStore = (email: string, otp: string): boolean => {
    const otps = readOtps();
    const entry = otps[email];

    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
        delete otps[email];
        writeOtps(otps);
        return false;
    }

    if (entry.otp === otp) {
        delete otps[email]; // One-time use
        writeOtps(otps);
        return true;
    }

    return false;
};
