# DevOps Assignment - Automation Engineer

This repository demonstrates a complete DevOps automation workflow using GitHub Actions, Node.js, and custom JavaScript actions.

## 📑 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Running the API Locally](#running-the-api-locally)
- [GitHub Workflow](#github-workflow)
- [Custom GitHub Action](#custom-github-action)
- [Live API Status](#live-api-status)
- [Technical Stack](#technical-stack)
- [Key Features](#key-features)
- [DevOps Best Practices](#devops-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project implements an automated system that:
- Runs a Node.js API service
- Creates a custom GitHub Action to interact with the API
- Automatically updates this README with API status information
- Uses GitHub Actions workflows to orchestrate the entire process

## Project Structure

```
.
├── src/
│   └── server.js           # Node.js API server
├── .github/
│   ├── actions/
│   │   └── call-node-api/  # Custom GitHub Action
│   │       ├── action.yml       # Action metadata
│   │       ├── index.js         # Action implementation
│   │       └── package.json     # Action dependencies (@actions/core)
│   └── workflows/
│       └── call-api.yml    # GitHub workflow
├── package.json            # API server dependencies (none needed)
└── README.md
```

**Note:** This project has **two separate package.json files**:
1. **Root `package.json`** - For the Node.js API server (no external dependencies)
2. **`.github/actions/call-node-api/package.json`** - For the GitHub Action (requires `@actions/core`)

## API Documentation

### Endpoints

#### `GET /status`
Returns the current status of the service.

**Response Format:**
```json
{
  "status": "ok",
  "service": "devops-assignment",
  "timestamp": "2025-02-03T10:00:00.000Z",
  "uptime": 42
}
```

**Fields:**
- `status` - Service health status (string)
- `service` - Service name (string)
- `timestamp` - Current ISO 8601 timestamp (string)
- `uptime` - Server uptime in seconds (number)

#### `GET /health`
Simple health check endpoint for monitoring.

**Response Format:**
```json
{
  "healthy": true
}
```

#### `GET /`
Returns API information and available endpoints.

**Response Format:**
```json
{
  "name": "DevOps Assignment API",
  "version": "1.0.0",
  "endpoints": {
    "status": "/status",
    "health": "/health"
  }
}
```

## Running the API Locally

### Prerequisites
- Node.js 20.x or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone 
cd devops-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### Testing the API

Test all available endpoints:

```bash
# Root endpoint (API info)
curl http://localhost:3000/

# Status endpoint (used by GitHub Action)
curl http://localhost:3000/status

# Health check endpoint
curl http://localhost:3000/health
```

**Expected outputs:**

**Root (`/`):**
```json
{
  "name": "DevOps Assignment API",
  "version": "1.0.0",
  "endpoints": {
    "status": "/status",
    "health": "/health"
  }
}
```

**Status (`/status`):**
```json
{
  "status": "ok",
  "service": "devops-assignment",
  "timestamp": "2025-02-03T10:30:00.000Z",
  "uptime": 42
}
```

**Health (`/health`):**
```json
{
  "healthy": true
}
```

## GitHub Workflow

### How It Works

1. **Manual Trigger**: The workflow is triggered manually via `workflow_dispatch`
2. **Repository Checkout**: Checks out the code
3. **Node.js Setup**: Installs Node.js 20
4. **Dependency Installation**: Installs both project and action dependencies
5. **API Startup**: Starts the Node.js API in the background and tracks its process ID
6. **Health Verification**: Waits for API to be ready using the `/health` endpoint with retry logic (up to 30 attempts)
7. **Status Check**: Verifies the `/status` endpoint is working correctly
8. **Custom Action Execution**: Calls our custom action which:
   - Fetches data from the API
   - Validates the response
   - Generates formatted markdown
   - Updates the README.md between marker comments
9. **Commit & Push**: Commits the updated README back to the repository (only if changes exist)
10. **Cleanup**: Stops the API server process (runs even if workflow fails)

### Running the Workflow

1. Go to the "Actions" tab in your GitHub repository
2. Select "Call API and Update README" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

The workflow will execute and automatically update the API status section below.

## Custom GitHub Action

The custom action (`call-node-api`) performs the following:

- **Input**: API URL to call
- **Process**:
  1. Makes HTTP request to the API
  2. Validates the response
  3. Generates formatted Markdown
  4. Updates README.md between marker comments
- **Output**: Status, service name, and timestamp

### Action Implementation

The action is implemented in JavaScript using:
- `@actions/core` for GitHub Actions integration
- Native `fetch` for HTTP requests
- Node.js `fs` module for file operations

## Live API Status

<!-- API_STATUS_START -->
## API Status

- **Status**: ok
- **Service**: devops-assignment
- **Timestamp**: 2026-02-04T09:01:43.345Z
- **Uptime**: 5s
<!-- API_STATUS_END -->

## Technical Stack

- **Runtime**: Node.js 20
- **Module System**: ES Modules (modern JavaScript)
- **API Framework**: Native Node.js HTTP module
- **CI/CD**: GitHub Actions
- **Custom Action**: JavaScript with ES Modules (Node.js 20)
- **Automation**: Shell scripts, Git commands

## Key Features

✅ Clean GitHub Actions implementation  
✅ Proper error handling and recovery  
✅ RESTful API design with multiple endpoints  
✅ Structured repository layout  
✅ End-to-end automation workflow  
✅ Automatic README updates  
✅ Proper use of GitHub tokens and permissions  
✅ Health check and monitoring endpoints  
✅ Graceful shutdown handling  
✅ Reliable workflow with retry logic  
✅ Process cleanup and resource management  
✅ Modern ES module syntax throughout  

## DevOps Best Practices

- **Infrastructure as Code**: All configuration in version control
- **Automation**: Zero manual steps after workflow trigger
- **Idempotency**: Workflow can be run multiple times safely
- **Security**: Uses GitHub tokens with minimal required permissions
- **Logging**: Comprehensive logging with visual indicators throughout the process
- **Error Handling**: Graceful failure handling with informative messages
- **Monitoring**: Health check endpoints for observability
- **Resource Management**: Proper process cleanup and shutdown handling
- **Retry Logic**: Robust API readiness verification
- **Modern Standards**: ES modules and current JavaScript best practices

## Troubleshooting

### API not starting
- Check if port 3000 is available
- Verify Node.js is installed correctly (version 18+)
- Review workflow logs for startup errors
- Check that both package.json files have `"type": "module"`

### Workflow failing
- Ensure `contents: write` permission is set
- Verify README contains the marker comments
- Check action dependencies are installed
- Review workflow logs for specific error messages
- Ensure health check endpoint is accessible

### README not updating
- Confirm API is responding correctly to `/status` endpoint
- Verify Git credentials are configured
- Check for merge conflicts
- Ensure marker comments exist exactly as specified

### Health check timing out
- API may need more time to start
- Check server logs for errors
- Verify port 3000 is accessible
- Consider increasing retry attempts in workflow

---

**Note**: This README is automatically updated by GitHub Actions. The API status section is refreshed each time the workflow runs.
