# API Configuration

This directory contains the API configuration for the web-jobsmato application.

## Files

### `api.js`
The main API configuration file that handles environment-specific backend server URLs.

## Environment Configuration

The API configuration automatically switches between development and production environments based on the `NODE_ENV` environment variable.

### Development Environment
- **Base URL**: `http://localhost:8000`
- **Triggered when**: `NODE_ENV` is not set or set to `development`

### Production Environment  
- **Base URL**: `http://20.57.16.254:8000`
- **Triggered when**: `NODE_ENV` is set to `production`

## Usage

### Import the configuration
```javascript
import { buildApiUrl, API_ENDPOINTS, API_BASE_URL } from '../config/api';
```

### Build API URLs
```javascript
// Build a full API URL
const url = buildApiUrl(API_ENDPOINTS.AUTH.LOGIN);
// Result: http://localhost:8000/api/v1/auth/login (dev) or http://20.57.16.254:8000/api/v1/auth/login (prod)
```

### Use predefined endpoints
```javascript
// Auth endpoints
API_ENDPOINTS.AUTH.LOGIN                    // /api/v1/auth/login
API_ENDPOINTS.AUTH.SIGNUP                   // /api/v1/auth/signup
API_ENDPOINTS.AUTH.ME                       // /api/v1/auth/me
API_ENDPOINTS.AUTH.CREATE_USER              // /api/v1/auth/create-user
API_ENDPOINTS.AUTH.GOOGLE_OAUTH             // /api/v1/auth/google
API_ENDPOINTS.AUTH.RECRUITER_LOGIN          // /api/v1/auth/login/recruiter
API_ENDPOINTS.AUTH.RECRUITER_SIGNUP         // /api/v1/auth/register/recruiter
API_ENDPOINTS.AUTH.USER_SIGNUP              // /api/v1/auth/register/user

// Candidate endpoints
API_ENDPOINTS.CANDIDATES.ONBOARDING         // /api/v1/candidates/onboarding
API_ENDPOINTS.CANDIDATES.LIST               // /api/v1/candidates/
API_ENDPOINTS.CANDIDATES.GET_BY_ID(id)      // /api/v1/candidates/{id}/onboarding

// Lead endpoints
API_ENDPOINTS.LEADS.LIST                    // /api/v1/leads/
API_ENDPOINTS.LEADS.CREATE                  // /api/v1/leads/
API_ENDPOINTS.LEADS.CHECK_EMAIL(email)      // /api/v1/leads/check-email/{email}
```

## GitHub Actions Integration

For production deployment, set the `NODE_ENV` environment variable in your GitHub Actions workflow:

```yaml
- name: Build and Deploy
  env:
    NODE_ENV: production
  run: npm run build
```

## Benefits

1. **Environment Isolation**: Automatically switches between dev and prod URLs
2. **Centralized Configuration**: All API endpoints defined in one place
3. **Type Safety**: Predefined endpoint constants prevent typos
4. **Easy Maintenance**: Change backend URLs without touching multiple files
5. **GitHub Actions Ready**: Works seamlessly with CI/CD pipelines 