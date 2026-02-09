# SubDUB - Subscription Tracker API

A comprehensive subscription management API built with Node.js and Express that helps users track, manage, and organize their subscriptions efficiently.

## Features

- **User Authentication** - Secure JWT-based authentication
- **Subscription Management** - Create, read, update, and delete subscriptions
- **Email Notifications** - Automated email alerts for subscription renewals
- **Workflow Automation** - Automated workflows using QStash
- **Security** - Rate limiting and DDoS protection with Arcjet
- **Database** - MongoDB integration for data persistence

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer (Gmail)
- **Rate Limiting**: Arcjet
- **Task Queue**: Upstash QStash
- **Environment Management**: dotenv

## Project Structure

```
subscription-tracker/
├── app.js                      # Main application entry point
├── package.json               # Project dependencies
├── eslint.config.js          # ESLint configuration
├── .env.development.local    # Environment variables
│
├── config/                    # Configuration files
│   ├── env.js                # Environment variables loader
│   ├── nodemailer.js         # Email service configuration
│   ├── arcjet.js             # Security middleware configuration
│   └── upstash.js            # Upstash QStash configuration
│
├── Database/
│   └── mongodb.js            # MongoDB connection setup
│
├── models/                     # Database models
│   ├── user.model.js         # User schema
│   └── suscription.model.js  # Subscription schema
│
├── controller/                 # Business logic controllers
│   ├── auth.controller.js    # Authentication logic
│   ├── user.controller.js    # User management logic
│   ├── subscription.controller.js  # Subscription logic
│   └── workflow.controller.js # Workflow automation logic
│
├── routes/                     # API routes
│   ├── auth.routes.js        # Authentication endpoints
│   ├── user.routes.js        # User endpoints
│   ├── subscription.routes.js # Subscription endpoints
│   └── workflow.rotues.js    # Workflow endpoints
│
├── middleware/                 # Custom middleware
│   ├── auth.middleware.js    # Authentication verification
│   ├── error.middleware.js   # Error handling
│   └── arcjet.middleware.js  # Security checks
│
└── utils/                      # Utility functions
    ├── email-template.js     # Email template generator
    └── send-email.js         # Email service function
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Gmail account for email service

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd subscription-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.development.local` file in the root directory:

```env
# Server
PORT=3000
SERVER_URL=http://localhost:3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app>

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Email (Gmail)
EMAIL_PASSWORD=your_gmail_app_password

# Security
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Task Queue (QStash)
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_current_key
QSTASH_NEXT_SIGNING_KEY=your_next_key
```

4. **Start the server**
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### User Routes (`/api/v1/users`)
- `GET /` - Get user profile
- `PUT /` - Update user profile
- `DELETE /` - Delete user account

### Subscription Routes (`/api/v1/subscriptions`)
- `GET /` - Get all subscriptions
- `POST /` - Create new subscription
- `GET /:id` - Get specific subscription
- `PUT /:id` - Update subscription
- `DELETE /:id` - Delete subscription

### Workflow Routes (`/api/v1/workflows`)
- Automated workflow triggers for subscription renewals

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `MONGO_URI` | MongoDB connection string | mongodb+srv://... |
| `JWT_SECRET` | Secret key for JWT tokens | your_secret_key |
| `JWT_EXPIRES_IN` | JWT expiration time | 1d |
| `EMAIL_PASSWORD` | Gmail app password | xxxx xxxx xxxx xxxx |
| `ARCJET_KEY` | Arcjet API key | ajkey_... |
| `ARCJET_ENV` | Arcjet environment | development |
| `QSTASH_URL` | QStash endpoint | http://127.0.0.1:8080 |
| `QSTASH_TOKEN` | QStash authentication token | ... |

## Development

### Running with Nodemon (Auto-reload)
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

## Key Features Explained

### JWT Authentication
Users receive a JWT token upon login that must be included in the Authorization header for protected routes:
```
Authorization: Bearer <token>
```

### Email Notifications
Automated emails are sent for:
- Subscription renewal reminders
- Account notifications
- Workflow triggers

### Workflow Automation
Uses Upstash QStash for scheduled tasks like:
- Sending renewal reminders
- Auto-renewal workflows
- Notification scheduling

### Security
- Arcjet middleware protects against rate limiting and DDoS attacks
- Environment variables keep sensitive data secure
- JWT tokens for session management

## Error Handling

All errors are caught by the centralized error middleware and return JSON responses with appropriate HTTP status codes.

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to branch (`git push -u origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, contact: anandanaidupeyala@gmail.com

## Notes

- Make sure `NODE_ENV` is set correctly before running the application
- Remove quotes from environment variables in `.env` files (dotenv doesn't parse them automatically)
- Gmail requires an [App Password](https://support.google.com/accounts/answer/185833) for the EMAIL_PASSWORD
