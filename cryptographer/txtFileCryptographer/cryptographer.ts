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

// Function to encrypt each line in a file
function encryptFileLines(filePath: string, encryptedFilePath: string, key: string): void {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const writeStream = fs.createWriteStream(encryptedFilePath);

    let buffer = ''; // Buffer to hold incomplete lines

    readStream.on('data', (chunk) => {
        buffer += chunk; // Append incoming chunk to buffer

        // Split the buffer into lines
        var lines = buffer.split('\n');
        // Process all complete lines except the last one (which might be incomplete)
        for (let i = 0; i <= lines.length - 1; i++) {
            const line = lines[i];
            const parts = line.split(': ');
            if (parts.length === 2) {
                console.log("Lines before decrypting: "+ line);
                const labelNotToEncrypt = parts[0];
                const valueToEncrypt = parts[1];
                const encryptedValue = encryptData(valueToEncrypt, key);
                console.log("After Encrypting line: "+ labelNotToEncrypt + ': ' + encryptedValue + '\n');
                writeStream.write(labelNotToEncrypt + ': ' + encryptedValue); // Write encrypted line to output file
                if(i < lines.length-1)
                    writeStream.write('\n');
            }
        }

        // Update buffer with the last incomplete line (if any)
        buffer = lines[lines.length - 1];
        console.log("Buffer: " + buffer);
    });

    readStream.on('end', () => {
        console.log('File encrypted successfully.');
        writeStream.end();
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file: ' + err);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing the encrypted data: ' + err);
    });
}

// Function to decrypt each line in a file
function decryptFileLines(encryptedFilePath: string, decryptedFilePath: string, key: string): void {
    const readStream = fs.createReadStream(encryptedFilePath, { encoding: 'utf-8' });
    const writeStream = fs.createWriteStream(decryptedFilePath);

    let buffer = ''; // Buffer to hold incomplete lines

    readStream.on('data', (chunk) => {
        buffer += chunk; // Append incoming chunk to buffer

        // Split the buffer into lines
        const lines = buffer.split('\n');

        // Process all complete lines except the last one (which might be incomplete)
        for (let i = 0; i <= lines.length - 1; i++) {
            const line = lines[i];
            const parts = line.split(': ');
            if (parts.length === 2) {
                console.log("Lines before decrypting: "+ line);
                const labelNotToDecrypt = parts[0];
                const valuetoDecrypt = parts[1];
                const decryptedValue = decryptData(valuetoDecrypt, key);
                console.log("After Decrypting line: "+ labelNotToDecrypt + ': ' + decryptedValue + '\n');
                writeStream.write(labelNotToDecrypt + ': ' + decryptedValue); // Write decrypted line to output file 
                if(i < lines.length-1)
                    writeStream.write('\n');
            }
        }

        // Update buffer with the last incomplete line (if any)
        buffer = lines[lines.length - 1];
    });

    readStream.on('end', () => {
        console.log('File decrypted successfully.');
        writeStream.end();
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file: ' + err);
    });

    writeStream.on('error', (err) => {
        console.error('Error writing the decrypted data: ' + err);
    });
}

// Example usage
const inputFile = './txtData.txt';
const encryptedFile = './txtDataEncrypted.txt';
const decryptedFile = './txtDataDecrypted.txt';
const encryptionKey = 'secret_key';

// Encrypt each line of the input file
//encryptFileLines(inputFile, encryptedFile, encryptionKey);

// Decrypt each line of the encrypted file back to original format
decryptFileLines(encryptedFile, decryptedFile, encryptionKey);

// // Encrypt XML file
// function encryptXML(filePath: string, encryptedXMLFilePath: string, key: string): void {
//     fs.readFile(filePath, 'utf-8', function(err, xmlData) {
//         if (err) {
//             console.error('Error reading the file: ' + err);
//             return;
//         }
//         console.log("Original Data: " + xmlData);
//         const encryptedData = encryptData(xmlData, key);
//         console.log("Encrypted Data: " + encryptedData);
//         fs.writeFile(encryptedXMLFilePath, encryptedData, 'utf-8', function(err) {
//             if (err) {
//                 console.error('Error writing the encrypted data: ' + err);
//                 return;
//             }
//             console.log('File encrypted successfully.');
//         });
//     });
// }

// // Decrypt XML file
// function decryptXML(encryptedFilePath: string, decryptedXMLFilePath: string, key: string): void {
//     fs.readFile(encryptedFilePath, 'utf-8', function(err, encryptedData) {
//         if (err) {
//             console.error('Error reading the file: ' + err);
//             return;
//         }
        
//         const decryptedData = decryptData(encryptedData, key);
//         console.log("Decrypted Data: " + decryptedData);
//         fs.writeFile(decryptedXMLFilePath, decryptedData, 'utf-8', function(err) {
//             if (err) {
//                 console.error('Error writing the decrypted data: ' + err);
//                 return;
//             }
//             console.log('Decrypted data written to ' + decryptedXMLFilePath);
//         });
//     });
// }

// // Example usage
// const xmlFilePath = './txtData.txt';
// const encryptedXMLFilePath = './txtDataEncrypted.txt';
// const decryptedXMLFilePath = './txtDataDecrypted.txt';
// const encryptionKey = 'secret_key';

// // Encrypt XML file
// encryptXML(xmlFilePath, encryptedXMLFilePath, encryptionKey);

// // Decrypt XML file
// decryptXML(encryptedXMLFilePath, decryptedXMLFilePath, encryptionKey);