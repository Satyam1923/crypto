# VeriDoc

## Team Members:<br>

1.Satyam Rathor(22bec042)<br>

2.Aditya Roushan(22bec003)<br>

3.Pratush Rai(22bec035)<br>

4.Ansh Goyal(22bcs014)<br>


## Introduction

**VeriDoc** is a secure, scalable document verification system designed to verify the integrity of files using advanced cryptographic algorithms. It employs digital signatures, SHA-256, and RSA algorithms to ensure data authenticity and integrity. 

- **Backend**: Built with Python for cryptographic operations and API management.  
- **Frontend**: Developed using Next.js with Tailwind CSS and Redux Toolkit for state management.  
- **Storage and Authentication**: Utilizes Firebase for file storage and user authentication.  
- **Deployment**: Docker ensures seamless scalability and deployment.

---

## Tech Stack

- **Frontend**:  
  - Next.js  
  - Tailwind CSS  
  - Redux Toolkit  
  - Firebase Authentication  

- **Backend**:  
  - Python  

- **Cryptography**:  
  - SHA-256 (Hashing)  
  - RSA (Key Generation & Digital Signatures)  

- **Storage**:  
  - Firebase  

- **Containerization**:  
  - Docker  

---

## Features

### **Core Features**
- **Secure File Upload**: Users can upload files securely to Firebase.  
- **Cryptographic Verification**: Ensures document integrity using SHA-256 hashing and RSA-based digital signatures.  
- **File Integrity Check**: Compares uploaded files to detect any alterations.  
- **File Reference and Comparison**: Allows users to upload a new file and compare it against previously stored versions.  
- **User Authentication**: Secure login and registration via Firebase Authentication.  

### **Cryptographic Operations**
- **Signing**: Creates a digital signature for the provided message.  
- **Hashing**: Generates a SHA-256 hash of the data.  
- **Verification**: Validates data integrity using the hash and digital signature.  

### **Deployment**  
- **Dockerized Deployment**: Streamlined deployment and enhanced scalability using Docker.

---

## API Endpoints

- **POST `/api/extract-text-from-pdf`**  
  Extracts text from a PDF file.

- **POST `/api/sign`**  
  Signs a message. Takes an input message and returns:  
  - Message  
  - Message Hash  
  - Public Key  
  - Digital Signature  

- **POST `/api/verify`**  
  Verifies the integrity of a message by comparing its hash with the digital signature.  
  - Returns: `true` if valid, otherwise `false`.  

- **POST `/api/hash`**  
  Hashes the provided data using SHA-256 and returns the hash value.

---

## Source Code

Access the source code on GitHub:  
[VeriDoc Repository](https://github.com/dotdot0/crypto)

## Live Demo

Try it live:  
[VeriDoc Live Application](https://crypto-zeta-dun.vercel.app/)

---

## License

This project is licensed under the [MIT License](LICENSE).
