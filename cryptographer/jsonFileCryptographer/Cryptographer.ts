import * as fs from 'fs';
import * as CryptoJS from 'crypto-js';

interface Credential {
    Username: string;
    Password: string;
}

// Read the existing JSON file
const readFile = (filePath: string): Record<string, Credential> => {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};

// Function to Encrypt Data
function encryptData(value: string, encryption_key: string): string{
    return CryptoJS.AES.encrypt(value, encryption_key).toString();
}

// Function to Decrypt Data
function decryptData(value: string, encryption_key: string): string {
    const bytes = CryptoJS.AES.decrypt(value, encryption_key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Encrypt passwords and write to a new JSON file
const encryptCredentials = (filePath: string, encryption_key: string): void => {
    const credentials = readFile(filePath);

    // Retrieve all credential keys from the JSON file
    const allCredentialKeys = Object.keys(readFile(filePath));

    // Update passwords by encrypting them
    allCredentialKeys.forEach(key => {
        if (credentials.hasOwnProperty(key)) {
            //Username
            const encryptedUsername = encryptData(credentials[key].Username, encryption_key);
            credentials[key].Username = encryptedUsername;
            //Password
            const encryptedPassword = encryptData(credentials[key].Password, encryption_key);
            credentials[key].Password = encryptedPassword;
        }
    });

    // Write updated credentials to a new JSON file
    fs.writeFileSync(encryptedFilepath, JSON.stringify(credentials, null, 4));
    console.log(`Encrypted credentials written to ${encryptedFilepath}`);
};

// Decrypt passwords and write to a new JSON file
const decryptCredentials = (filePath: string, encryption_key: string): void => {
    const credentials = readFile(filePath);

    // Retrieve all credential keys from the JSON file
    const allCredentialKeys = Object.keys(readFile(filePath));

    // Update passwords by decrypting them
    allCredentialKeys.forEach(key => {
        if (credentials.hasOwnProperty(key)) {
            //Username
            const encryptedUsername = decryptData(credentials[key].Username, encryption_key);
            credentials[key].Username = encryptedUsername;
            //Password
            const decryptedPassword = decryptData(credentials[key].Password, encryption_key);
            credentials[key].Password = decryptedPassword;
        }
    });

    // Write decrypted credentials to a new JSON file
    fs.writeFileSync(decryptedFilepath, JSON.stringify(credentials, null, 4));
    console.log(`Decrypted credentials written to ${decryptedFilepath}`);
};


// Specify path to the JSON file containing credentials
const filePath = 'data.json';
const encryptedFilepath = 'encryptedData.json';
const decryptedFilepath = 'decryptedData.json';
const encryptionKey = 'secret_key';

// Encrypt credentials with new passwords and write to a new JSON file
encryptCredentials(filePath, encryptionKey);

// Decrypt credentials with new passwords and write to a new JSON file
decryptCredentials(encryptedFilepath, encryptionKey);