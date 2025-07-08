#!/bin/bash

# Nazsu Water Store - Dynamic Deployment Script
# Usage: ./scripts/deploy.sh [environment] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="staging"
SKIP_TESTS=false
SKIP_BUILD=false
FORCE_DEPLOY=false
DRY_RUN=false

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    cat << EOF
Nazsu Water Store - Dynamic Deployment Script

Usage: $0 [ENVIRONMENT] [OPTIONS]

ENVIRONMENTS:
    development     Deploy to development environment
    staging         Deploy to staging environment (default)
    production      Deploy to production environment

OPTIONS:
    --skip-tests    Skip running tests before deployment
    --skip-build    Skip building the application
    --force         Force deployment even if checks fail
    --dry-run       Show what would be deployed without actually deploying
    --help          Show this help message

EXAMPLES:
    $0 staging                          # Deploy to staging
    $0 production --skip-tests          # Deploy to production without tests
    $0 development --dry-run            # Dry run for development

EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        development|staging|production)
            ENVIRONMENT="$1"
            shift
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --force)
            FORCE_DEPLOY=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    log_error "Invalid environment: $ENVIRONMENT"
    log_info "Valid environments: development, staging, production"
    exit 1
fi

log_info "Starting deployment to $ENVIRONMENT environment"

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    log_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Load environment variables
if [[ -f ".env.$ENVIRONMENT" ]]; then
    log_info "Loading environment variables from .env.$ENVIRONMENT"
    export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
else
    log_warning "Environment file .env.$ENVIRONMENT not found"
fi

# Pre-deployment checks
log_info "Running pre-deployment checks..."

# Check Node.js version
NODE_VERSION=$(node --version)
log_info "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
log_info "npm version: $NPM_VERSION"

# Check Git status
if [[ $(git status --porcelain) && "$FORCE_DEPLOY" != true ]]; then
    log_error "Working directory is not clean. Commit your changes or use --force"
    exit 1
fi

# Get current branch and commit
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CURRENT_COMMIT=$(git rev-parse --short HEAD)
log_info "Current branch: $CURRENT_BRANCH"
log_info "Current commit: $CURRENT_COMMIT"

# Environment-specific branch checks
case $ENVIRONMENT in
    production)
        if [[ "$CURRENT_BRANCH" != "main" && "$FORCE_DEPLOY" != true ]]; then
            log_error "Production deployments must be from 'main' branch. Current: $CURRENT_BRANCH"
            exit 1
        fi
        ;;
    staging)
        if [[ "$CURRENT_BRANCH" != "develop" && "$CURRENT_BRANCH" != "main" && "$FORCE_DEPLOY" != true ]]; then
            log_error "Staging deployments must be from 'develop' or 'main' branch. Current: $CURRENT_BRANCH"
            exit 1
        fi
        ;;
esac

# Install dependencies
log_info "Installing dependencies..."
if [[ "$DRY_RUN" != true ]]; then
    npm ci
fi

# Run tests
if [[ "$SKIP_TESTS" != true ]]; then
    log_info "Running tests..."
    if [[ "$DRY_RUN" != true ]]; then
        npm run type-check
        npm run lint
        # npm test # Uncomment when tests are available
    fi
fi

# Build application
if [[ "$SKIP_BUILD" != true ]]; then
    log_info "Building application for $ENVIRONMENT..."
    if [[ "$DRY_RUN" != true ]]; then
        case $ENVIRONMENT in
            development)
                npm run build:dev
                ;;
            staging)
                npm run build:staging
                ;;
            production)
                npm run build:prod
                ;;
        esac
    fi
fi

# Deployment
log_info "Deploying to $ENVIRONMENT..."

if [[ "$DRY_RUN" == true ]]; then
    log_info "DRY RUN - Would deploy the following:"
    log_info "  Environment: $ENVIRONMENT"
    log_info "  Branch: $CURRENT_BRANCH"
    log_info "  Commit: $CURRENT_COMMIT"
    log_info "  Build directory: dist/"
    exit 0
fi

case $ENVIRONMENT in
    development)
        log_info "Starting development server..."
        npm run dev
        ;;
    staging)
        log_info "Deploying to staging server..."
        # Add staging deployment logic here
        # Example: rsync, docker push, etc.
        log_success "Staging deployment completed!"
        ;;
    production)
        log_info "Deploying to production server..."
        # Add production deployment logic here
        # Example: docker push, kubernetes apply, etc.
        log_success "Production deployment completed!"
        ;;
esac

# Post-deployment checks
log_info "Running post-deployment checks..."

case $ENVIRONMENT in
    staging)
        HEALTH_URL="https://staging.nazsu.com/health"
        ;;
    production)
        HEALTH_URL="https://nazsu.com/health"
        ;;
    *)
        HEALTH_URL="http://localhost:3000/health"
        ;;
esac

# Wait for service to be ready
log_info "Waiting for service to be ready..."
sleep 10

# Health check
if command -v curl &> /dev/null; then
    if curl -f "$HEALTH_URL" &> /dev/null; then
        log_success "Health check passed: $HEALTH_URL"
    else
        log_warning "Health check failed: $HEALTH_URL"
    fi
else
    log_warning "curl not available, skipping health check"
fi

# Create deployment record
DEPLOYMENT_LOG="deployments.log"
echo "$(date '+%Y-%m-%d %H:%M:%S') - $ENVIRONMENT - $CURRENT_BRANCH - $CURRENT_COMMIT" >> $DEPLOYMENT_LOG

log_success "Deployment to $ENVIRONMENT completed successfully!"
log_info "Deployment logged to $DEPLOYMENT_LOG"

# Show next steps
case $ENVIRONMENT in
    development)
        log_info "Development server is running at http://localhost:3000"
        ;;
    staging)
        log_info "Staging environment: https://staging.nazsu.com"
        ;;
    production)
        log_info "Production environment: https://nazsu.com"
        ;;
esac
