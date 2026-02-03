# DevOps Assignment - Automation Engineer

This repository demonstrates a complete DevOps automation workflow using GitHub Actions, Node.js, and custom JavaScript actions.

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

### Endpoint: GET /status

Returns the current status of the service.

**Response Format:**
```json
{
  "status": "ok",
  "service": "devops-assignment",
  "timestamp": "2025-01-01T10:00:00.000Z"
}
```

## Running the API Locally

### Prerequisites
- Node.js 14.x or higher
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

```bash
curl http://localhost:3000/status
```

Expected output:
```json
{
  "status": "ok",
  "service": "devops-assignment",
  "timestamp": "2025-02-03T10:30:00.000Z"
}
```

## GitHub Workflow

### How It Works

1. **Manual Trigger**: The workflow is triggered manually via `workflow_dispatch`
2. **Repository Checkout**: Checks out the code
3. **Node.js Setup**: Installs Node.js 20
4. **Dependency Installation**: Installs both project and action dependencies
5. **API Startup**: Starts the Node.js API in the background
6. **API Verification**: Verifies the API is responding
7. **Custom Action Execution**: Calls our custom action which:
   - Fetches data from the API
   - Generates markdown
   - Updates the README.md
8. **Commit & Push**: Commits the updated README back to the repository

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

- Status: ok
- Service: devops-assignment
- Timestamp: 2026-02-03T18:03:50.789Z
<!-- API_STATUS_END -->

## Technical Stack

- **Runtime**: Node.js 20
- **API Framework**: Native Node.js HTTP module
- **CI/CD**: GitHub Actions
- **Custom Action**: JavaScript (Node.js 20)
- **Automation**: Shell scripts, Git commands

## Key Features

✅ Clean GitHub Actions implementation  
✅ Proper error handling throughout  
✅ RESTful API design  
✅ Structured repository layout  
✅ End-to-end automation workflow  
✅ Automatic README updates  
✅ Proper use of GitHub tokens and permissions  

## DevOps Best Practices

- **Infrastructure as Code**: All configuration in version control
- **Automation**: Zero manual steps after workflow trigger
- **Idempotency**: Workflow can be run multiple times safely
- **Security**: Uses GitHub tokens with minimal required permissions
- **Logging**: Comprehensive logging throughout the process
- **Error Handling**: Graceful failure handling with informative messages

## Troubleshooting

### API not starting
- Check if port 3000 is available
- Verify Node.js is installed correctly
- Review workflow logs for startup errors

### Workflow failing
- Ensure `contents: write` permission is set
- Verify README contains the marker comments
- Check action dependencies are installed

### README not updating
- Confirm API is responding correctly
- Verify Git credentials are configured
- Check for merge conflicts

---

**Note**: This README is automatically updated by GitHub Actions. The API status section is refreshed each time the workflow runs.