# --- Builder Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from next directory
COPY next/package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm ci --no-audit --no-fund

# Copy source code from next directory
COPY next/ .

# Build the application
RUN npm run build

# --- Runtime Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV NEXT_TELEMETRY_DISABLED=1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund && npm cache clean --force

# Switch to nextjs user
USER nextjs

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

# Start the application
CMD ["npm", "start"]