# Variables
PROJECT_NAME = cryptoquest-arbitrage-bot
START_SCRIPT = npx next start
BUILD_SCRIPT = npx next build
INSTALL_SCRIPT = npm install --legacy-peer-deps
DEV_SCRIPT = npx next dev

# Phony targets are not actual files
.PHONY: help install start dev build lint format test clean

# Default help message
help:
	@echo "Makefile for $(PROJECT_NAME)"
	@echo ""
	@echo "Usage:"
	@echo "  make install        Install project dependencies"
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
	$(INSTALL_SCRIPT)

# Start the project
start:
	$(START_SCRIPT)

# Start the development server
dev:
	$(DEV_SCRIPT)

# Build the project
build:
	$(BUILD_SCRIPT)

# Lint the project
lint:
	npx eslint .

# Format the project
format:
	npx prettier --write .

# Run tests
test:
	npx jest

# Clean up the project
clean:
	rm -rf node_modules
	rm -rf .next
	rm -rf out
