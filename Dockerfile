# Use the official Flutter Docker image
FROM cirrusci/flutter:stable

# Copy the project files
COPY . /app
WORKDIR /app

# Build the Flutter web app
RUN flutter build web --release
