# Estirio Bus Booking Platform - Project Context

**Last Updated:** 2026-06-17  
**Project Type:** Express.js + TypeScript + Prisma + PostgreSQL  
**Current Version:** 1.0.0

---

## 📁 Project Structure

```
Estirio/
├── app.ts                          # Main Express app entry point
├── package.json                    # Dependencies (Express 5.2.1, Prisma 7.8.0)
├── tsconfig.json                   # TypeScript config (ES2023, strict mode)
├── prisma.config.ts                # Prisma configuration
├── .env                            # Environment variables (JWT_SECRET, DATABASE_URL, etc.)
├── .prettierrc                      # Code formatting rules
├── eslint.config.js                # ESLint configuration
├── dist/                           # Compiled JavaScript output
├── node_modules/                   # Dependencies
├── generated/                      # Prisma generated types
│   └── prisma/                     # Auto-generated Prisma client
│       ├── client.ts
│       ├── models.ts
│       ├── enums.ts
│       └── models/                 # Individual model files
│           ├── users.ts
│           ├── bookings.ts
│           ├── buses.ts
│           ├── roles.ts
│           └── ... (20+ models)
├── prisma/
│   ├── schema.prisma               # Database schema definition
│   ├── seed.ts                     # Seed script (not implemented yet)
│   └── migrations/
│       └── 20260611131322_init/    # Initial migration
├── src/
│   ├── router.ts                   # Main API router
│   ├── config/
│   │   ├── env.ts                  # Environment variable exports
│   │   └── prisma.ts               # Prisma client instance
│   ├── middlewares/
│   │   ├── auth.middleware.ts      # JWT authentication
│   │   └── validate.middleware.ts  # Request validation
│   ├── modules/                    # Feature modules (layered architecture)
│   │   ├── auth/
│   │   │   ├── auth.controller.ts  # Request handlers
│   │   │   ├── auth.service.ts     # Business logic (currently has try-catch)
│   │   │   ├── auth.dao.ts         # Database queries
│   │   │   ├── auth.routes.ts      # API routes
│   │   │   ├── auth.type.ts        # TypeScript types
│   │   │   └── auth.validation.ts  # Zod validation schemas
│   │   └── user/
│   │       ├── user.controller.ts  # Request handlers
│   │       ├── user.service.ts     # Business logic (currently has try-catch)
│   │       ├── user.dao.ts         # Database queries
│   │       ├── user.routes.ts      # API routes
│   │       ├── user.type.ts        # TypeScript types
│   │       └── user.validation.ts  # Zod validation schemas
│   ├── types/
│   │   └── express.d.ts            # Express type augmentation (user property)
│   └── utils/
│       ├── index.ts                # Utility exports
│       ├── jwt.ts                  # JWT helper functions
│       ├── password.ts             # Password hashing/verification
│       └── errors/
│           └── api-error.ts        # Custom ApiError class (TO BE REMOVED)
└── README.md                        # Project documentation
```

---

## 🛠️ Tech Stack

| Layer              | Technology | Version      |
| ------------------ | ---------- | ------------ |
| **Runtime**        | Node.js    | Latest (ESM) |
| **Framework**      | Express.js | 5.2.1        |
| **Language**       | TypeScript | 6.0.3        |
| **Database**       | PostgreSQL | Latest       |
| **ORM**            | Prisma     | 7.8.0        |
| **Authentication** | JWT        | 9.0.3        |
| **Validation**     | Zod        | 4.4.3        |
| **Password**       | bcryptjs   | 3.0.3        |
| **Dev Tools**      | tsx        | 4.22.4       |
| **Linting**        | ESLint     | 10.4.1       |
| **Code Format**    | Prettier   | 3.8.3        |

---

## 🗄️ Database Schema Overview

### Core Models:

**Users System:**

- `users` - User accounts (firstName, lastName, email, phoneNumber, password, isVerified)
- `roles` - Role definitions
- `permissions` - Permission list
- `role_permissions` - Role-Permission mapping

**Bus Operations:**

- `bus_operators` - Bus company details (name, gstNumber, owner)
- `buses` - Individual bus vehicles (vehicleNumber, registrationNumber, totalSeats, type)
- `seat_configs` - Seat configuration per bus
- `seat_inventory` - Seat availability tracking
- `crews` - Drivers and conductors (licenseNumber, licenseExpiry)
- `current_bus_locations` - Real-time GPS locations

**Bookings & Payments:**

- `trips` - Bus routes with schedules
- `bookings` - Passenger bookings
- `booking_passengers` - Passenger details per booking
- `booking_seats` - Seat assignment
- `tickets` - Generated tickets
- `payments` - Payment records
- `payment_modes` - Payment method types (card, cash, etc.)
- `refunds` - Refund records
- `cancellation_policies` - Operator-specific cancellation rules

**Other:**

- `routes` - Bus route definitions
- `route_stops` - Stops along a route
- `trip_fares` - Fare pricing per trip
- `reviews` - User reviews

### Key Enums:

- `crew_type` - Driver, Conductor, etc.
- `bus_type` - Bus classification
- `payment_status` - Pending, Completed, Failed, etc.

**Note:** Prisma client is generated in `generated/prisma/` (not in node_modules)

---

## 🚀 API Routes

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- (Other auth endpoints - check auth.routes.ts)

### User Routes (`/api/user`)

- `GET /api/user/me` - Get current user profile
- `PUT /api/user/me` - Update user profile
- `DELETE /api/user/me` - Delete user account

---

## ⚙️ Configuration & Environment

### Environment Variables Required:

```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/estirio
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Key Files:

- **src/config/env.ts** - Exports JWT_SECRET from .env
- **src/config/prisma.ts** - Prisma client instance (singleton)
- **.env** - Local environment variables (GITIGNORED)

---

## 🔐 Authentication & Middleware

### Auth Middleware (`src/middlewares/auth.middleware.ts`)

- `authenticate` - Verifies JWT token, extracts userId → req.user.userId
- `authorize(permission)` - Checks if user has specific permission

### Express Type Augmentation (src/types/express.d.ts)

```typescript
declare global {
   namespace Express {
      interface Request {
         user: {
            userId: string;
            // ... other properties
         };
      }
   }
}
```

---

## 📝 Current Error Handling (TO BE REFACTORED)

### ❌ Current Approach:

- Service layer has **try-catch blocks** everywhere
- Custom `ApiError` class in `src/utils/errors/api-error.ts`
- Controllers don't have error handling
- No global error middleware

### ✅ Planned Approach:

1. **Remove try-catch** from service layer
2. **Remove ApiError** class (use plain Error with statusCode)
3. **Add global error middleware** in app.ts
4. **Add asyncHandler** wrapper for controllers (Express 5.2.1 auto-catches async errors, but wrapper adds consistency)
5. **Standardized error responses** with statusCode, message, success flag

---

## 📚 Module Architecture Pattern

Each feature module follows this pattern:

```
module/
├── {name}.controller.ts      # HTTP handlers
├── {name}.service.ts         # Business logic
├── {name}.dao.ts             # Database queries
├── {name}.routes.ts          # Route definitions
├── {name}.type.ts            # TypeScript interfaces
└── {name}.validation.ts      # Zod schemas (input validation)
```

**Flow:** Route → Controller → Service → DAO → Database

---

## 🔧 NPM Scripts

```bash
npm run dev      # Start dev server with hot-reload (tsx watch)
npm run start    # Start production server
npm run build    # Compile TypeScript to JavaScript
npm run lint     # Run ESLint
npm run test     # Run tests (not implemented)
```

**Prisma Commands:**

```bash
npx prisma generate    # Generate Prisma client
npx prisma migrate dev # Create and apply migration
npx prisma studio     # Open Prisma Studio UI
```

---

## 🎯 Current Issues & TODOs

### High Priority:

1. ❌ **Error Handling** - Need global middleware + remove try-catch
2. ❌ **AsyncHandler** - Controllers need wrapper for consistency
3. ❌ **Validation** - Middleware to validate requests with Zod schemas
4. ❌ **Input Sanitization** - Not implemented

### Medium Priority:

1. ⚠️ **Seed Script** - prisma/seed.ts exists but not implemented
2. ⚠️ **Tests** - No unit/integration tests
3. ⚠️ **API Documentation** - Swagger/OpenAPI missing
4. ⚠️ **Rate Limiting** - Not implemented
5. ⚠️ **CORS** - Not configured

### Low Priority:

1. 📋 **Logging** - No structured logging
2. 📋 **Monitoring** - No error tracking (Sentry, etc.)
3. 📋 **Caching** - Redis not integrated

---

## 🔍 Key Files for AI Agent Reference

| File                                 | Purpose            | Status               |
| ------------------------------------ | ------------------ | -------------------- |
| `app.ts`                             | Express app setup  | ✅ Ready             |
| `src/router.ts`                      | Route registration | ✅ Ready             |
| `src/config/env.ts`                  | Env exports        | ✅ Ready             |
| `src/config/prisma.ts`               | DB connection      | ✅ Ready             |
| `src/middlewares/auth.middleware.ts` | JWT auth           | ✅ Ready             |
| `src/utils/errors/api-error.ts`      | Error class        | ⚠️ To be removed     |
| `prisma/schema.prisma`               | DB schema          | ✅ Ready             |
| `src/modules/*/`                     | Feature modules    | 🔄 Needs refactoring |

---

## 💡 Best Practices for Future Development

1. **Always use asyncHandler** in controllers
2. **Throw plain Error** with statusCode in services
3. **Never catch errors** in service/controller layers
4. **Use Zod** for input validation
5. **Keep modules isolated** - each module is independent
6. **Use DAO pattern** for all database operations
7. **Extend Express types** in src/types/express.d.ts if needed
8. **Use Prisma generated types** from generated/prisma/

---

## 🚨 Development Workflow

1. **Create new feature:** Create folder in `src/modules/{featureName}/`
2. **Update schema:** Edit `prisma/schema.prisma`
3. **Run migration:** `npx prisma migrate dev --name {description}`
4. **Build files:** Create .validation.ts, .type.ts, .dao.ts, .service.ts, .controller.ts, .routes.ts
5. **Register route:** Add to `src/router.ts`
6. **Test endpoint:** Use Postman or curl

---

## 📞 Contact & References

- **GitHub:** https://github.com/parthdhameliya09/Estirio
- **Author:** Parth Dhameliya
- **Database:** PostgreSQL (hosted/local)
- **API Base URL:** `http://localhost:3000/api`
