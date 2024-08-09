# Variables
PROJECT_NAME = cryptoquest-arbitrage-bot
START_SCRIPT = npx next start
BUILD_SCRIPT = npx next build
INSTALL_SCRIPT = npm install --legacy-peer-deps
DEV_SCRIPT = npx next dev

# Phony targets are not actual files
.PHONY: help install postinstall start dev build lint format test clean

# Default help message
help:
	@echo "Makefile for $(PROJECT_NAME)"
	@echo ""
	@echo "Usage:"
	@echo "  make install        Install project dependencies"
	@echo "  make postinstall    Run post-install scripts"
	@echo "  make start          Start the project"
	@echo "  make dev            Start the development server"
	@echo "  make build          Build the project"
	@echo "  make lint           Lint the project"
	@echo "  make format         Format the project"
	@echo "  make test           Run tests"
	@echo "  make clean          Clean up the project"
	@echo ""

# Install dependencies
install:
	@echo "Installing project dependencies..."
	$(INSTALL_SCRIPT)
	@echo "Dependencies installed successfully."

# Post-install scripts
postinstall:
	@echo "Running post-install scripts..."
	# Add any post-install scripts here if needed
	@echo "Post-install scripts executed."

# Start the project
start:
	@echo "Starting the project..."
	$(START_SCRIPT)

# Start the development server
dev:
	@echo "Starting the development server..."
	$(DEV_SCRIPT)

# Build the project
build:
	@echo "Building the project..."
	$(BUILD_SCRIPT)
	@echo "Build completed successfully."

# Lint the project
lint:
	@echo "Linting the project..."
	npx eslint .
	@echo "Linting completed."

# Format the project
format:
	@echo "Formatting the project..."
	npx prettier --write .
	@echo "Formatting completed."

# Run tests
test:
	@echo "Running tests..."
	npx jest
	@echo "Tests completed."

# Clean up the project
clean:
	@echo "Cleaning up the project..."
	rm -rf node_modules
	rm -rf .next
	rm -rf out
	@echo "Cleanup completed."
