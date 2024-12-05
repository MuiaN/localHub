#!/bin/bash

# Install dependencies
npm install

# Create necessary directories
mkdir -p src/controllers
mkdir -p src/models
mkdir -p src/routes
mkdir -p src/middleware
mkdir -p src/utils
mkdir -p src/config
mkdir -p src/types
mkdir -p uploads

# Create gitignore
echo "node_modules/
dist/
.env
uploads/
*.log" > .gitignore

echo "Server setup completed!" 