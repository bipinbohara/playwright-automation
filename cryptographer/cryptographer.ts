import * as fs from 'fs';
import * as CryptoJS from 'crypto-js';

// Function to encrypt data
function encryptData(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
}

// Function to decrypt data
function decryptData(encryptedData: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Encrypt XML file
function encryptXML(filePath: string, encryptedXMLFilePath: string, key: string): void {
    fs.readFile(filePath, 'utf-8', function(err, xmlData) {
        if (err) {
            console.error('Error reading the file: ' + err);
            return;
        }
        console.log("Original Data: " + xmlData);
        const encryptedData = encryptData(xmlData, key);
        console.log("Encrypted Data: " + encryptedData);
        fs.writeFile(encryptedXMLFilePath, encryptedData, 'utf-8', function(err) {
            if (err) {
                console.error('Error writing the encrypted data: ' + err);
                return;
            }
            console.log('File encrypted successfully.');
        });
    });
}

// Decrypt XML file
function decryptXML(encryptedFilePath: string, decryptedXMLFilePath: string, key: string): void {
    fs.readFile(encryptedFilePath, 'utf-8', function(err, encryptedData) {
        if (err) {
            console.error('Error reading the file: ' + err);
            return;
        }
        
        const decryptedData = decryptData(encryptedData, key);
        console.log("Decrypted Data: " + decryptedData);
        fs.writeFile(decryptedXMLFilePath, decryptedData, 'utf-8', function(err) {
            if (err) {
                console.error('Error writing the decrypted data: ' + err);
                return;
            }
            console.log('Decrypted data written to ' + decryptedXMLFilePath);
        });
    });
}

// Example usage
const xmlFilePath = './txtData.txt';
const encryptedXMLFilePath = './txtDataEncrypted.txt';
const decryptedXMLFilePath = './txtDataDecrypted.txt';
const encryptionKey = 'secret_key';

// Encrypt XML file
//encryptXML(xmlFilePath, encryptedXMLFilePath, encryptionKey);

// Decrypt XML file
decryptXML(encryptedXMLFilePath, decryptedXMLFilePath, encryptionKey);