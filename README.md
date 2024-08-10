

# Form Builder Application

## Overview

The Form Builder Application allows users to create and edit forms with various input types, manage form fields, and save forms to a backend server. The application features drag-and-drop functionality for reordering inputs (to be implemented), form editing capabilities, and real-time preview.

## Tech Stack

- **Frontend**: ReactJS 
- **Backend**: ExpressJS
- **Database**: MongoDB
- **Styling**: Bootstrap, custom CSS

## Directory Structure

```
form-builder/
├── backend/
│   └── (Backend-related code)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateForm.jsx
│   │   │   ├── EditForm.jsx
│   │   │   └── FormInput.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── (Other frontend-related files)
│   └── (Frontend build and configuration files)
└── README.md
```

## Setup


### Backend

Note - ### Environment Variable 
 ** Please create a file .env and add your mongodbURL
MONGODB_URL="Your url"

1. **Navigate to the backend directory:**

   ```bash
   cd form-builder/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

   The backend server runs on port `5000`.

### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd form-builder/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend application:**

   ```bash
   npm start
   ```

   The frontend application will typically run on port `3000`.

## Components

### `CreateForm`

- **Purpose**: Allows users to create a new form.
- **Features**:
  - Editable title.
  - Option to add input fields (Text, Number, Email, Password, Date).
  - Input fields are displayed in a (n rows x 2 columns) manner.
  - `Save` button to save the form data.
  - Redirects to the home page upon saving.

### `EditForm`

- **Purpose**: Allows users to edit an existing form.
- **Features**:
  - Displays form title and inputs.
  - Input fields are displayed with edit and delete options.
  - Drag-and-drop support for reordering inputs (implementation in progress).
  - Editable fields for title and placeholders.
  - `Save` button to update the form data.
  - Redirects to the home page upon saving.

### `FormInput`

- **Purpose**: Represents an individual form input field.
- **Features**:
  - Displays different types of inputs (Text, Number, Email, Password, Date).
  - Read-only in the `EditForm` component.

## API Endpoints

### Fetch Form Data

- **Endpoint**: `GET /api/form/:id`
- **Description**: Fetches form data by ID.

### Update Form Data

- **Endpoint**: `PUT /api/form/:id/edit`
- **Description**: Updates form data by ID.

## Known Issues

- Drag-and-drop functionality for reordering inputs is not yet implemented.

## Future Enhancements

- Implement drag-and-drop reordering of form inputs.
- Improve UI/UX for form creation and editing.
- Add validation for form inputs.

## Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

