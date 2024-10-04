# Property Management Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)

## Introduction

The project is a property management application that allows users to manage real estate listings, specifically for houses and land. Here’s a brief overview of its functionalities:

### Property Listings: Users can create and manage listings for properties, providing detailed information such as type (house or land), location (city), price, descriptions, and various property-specific attributes (e.g., square feet, number of bedrooms, etc.).

### Media Upload: The application supports uploading images and videos related to the properties, utilizing Cloudinary for storage. Each property can have multiple photos and videos, which are linked through unique identifiers (public IDs).

### CRUD Operations: Users can perform Create, Read, Update, and Delete (CRUD) operations on property listings. They can add new properties, retrieve existing listings, update details, and remove properties when necessary.

### Photo and Video Management: The application allows users to delete individual photos or videos associated with a property. This includes optional deletion from Cloudinary to free up storage.

### Validation: The application includes validation checks to ensure that required fields are filled out correctly, enhancing data integrity.

Overall, this project serves as a comprehensive platform for managing real estate listings, making it easier for users to showcase properties with rich media content and detailed information.

## Features

- Create, Read, Update, and Delete (CRUD) operations for property listings.
- Upload and manage photos and videos using Cloudinary.
- Filter properties by type (house or land).
- Validate input data for integrity.

## Technologies Used

- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Others**: [Mongoose](https://mongoosejs.com/), [Axios](https://axios-http.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (e.g., MongoDB URI, Cloudinary credentials) in a `.env` file.
5. Start the server:
   ```bash
   npm start
   ```

## Usage

Instructions on how to use the application, including how to interact with the frontend and backend.

## API Endpoints

---

| Method | Endpoint                                     | Description                             |
| ------ | -------------------------------------------- | --------------------------------------- |
| GET    | `/api/property`                              | Retrieve all properties                 |
| POST   | `/api/property`                              | Create a new property                   |
| GET    | `/api/property/:id`                          | Get property by ID                      |
| PUT    | `/api/property/:id`                          | Update property by ID                   |
| DELETE | `/api/property/remove/:id/photos/:public_id` | Delete a specific photo from a property |
| DELETE | `/api/property/remove/:id/videos/:public_id` | Delete a specific photo from a property |

---

## Database Schema

Outline the database schema for properties, including fields and their types. For example:

```javascript
const propertySchema = new mongoose.Schema({
  type: { type: String, enum: ["house", "land"], required: true },
  city: { type: String, required: true },
  title: { type: String, required: true },
  photos: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  //   .....
});
```
