# Stage 1: Build the React frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final image with Python and FastAPI
FROM python:3.11-slim
WORKDIR /app

# Copy built frontend assets
COPY --from=frontend-builder /app/dist /app/dist

# Copy backend files
COPY backend /app/backend

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose the port FastAPI will run on
EXPOSE 8080

# Run the FastAPI server
# We use the PORT env var provided by Cloud Run
CMD ["python", "backend/main.py"]
