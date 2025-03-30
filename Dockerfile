# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install --legacy-peer-deps

# Stage 2: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies and source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install build tools and build the project
RUN npm install ts-loader --save-dev
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80
ENV AUTH_SECRET=80e4e5b50b83c0306e96cd1834e9af413458538fdae2c31a67f687c28b7b223b
COPY .env .env


# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules


# Expose the application port
EXPOSE 80

CMD ["npm", "start"]