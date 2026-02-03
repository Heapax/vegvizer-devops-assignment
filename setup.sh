#!/bin/bash

# DevOps Assignment Setup Script
# This script helps set up the project locally

echo "Setting up DevOps Assignment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js 14 or higher."
  exit 1
fi

echo "Node.js version: $(node -v)"
echo ""

# Install project dependencies
echo "Installing project dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "Failed to install project dependencies."
  exit 1
fi

echo "Project dependencies installed"
echo ""

# Install action depnendencies
echo "Installing GitHub Action dependencies..."
cd .github/actions/call-node-api
npm install

if [ $? -ne 0 ]; then
  echo "Failed to install action dependencies."
  exit 1
fi

cd ../../..
echo "GitHub Action dependencies installed"
echo ""

echo "Setup complete!"
echo ""
echo "To start the APU server, run:"
echo " npm start"
echo ""
echo "To test the API, run:"
echo " curl http://localhost:3000/status"
echo ""