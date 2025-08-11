# Use a lightweight Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . /app

# No external Python dependencies are needed, but keep the layer for future use
# RUN pip install --no-cache-dir -r requirements.txt

# Environment
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Expose the port (for local runs and documentation; Cloud Run ignores EXPOSE)
EXPOSE 8000

# Run the development server
CMD ["python", "server.py"]
