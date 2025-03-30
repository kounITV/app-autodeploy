# Boilerplate-NextJS-ShadCN UI

A modern, scalable full-stack application boilerplate built with Next.js and Tailwind CSS. This project integrates key frontend and backend features, making it ideal for starting web applications that require role-based access control and user authentication.

## Features

- Backend API Integration: Easily integrate backend APIs with axios interceptors for secure API communication.
- Tailwind CSS: Responsive and customizable UI styling with Tailwind CSS.
- ShadCN UI: Components and design system powered by ShadCN UI for beautiful and accessible UI components.
- TypeScript: Strongly typed JavaScript for better development experience.
- NextAuth: Seamless authentication setup for user login and logout.
- CASL.js Role-based access control (RBAC) using CASL.js for flexible permission management.
- System Layout: Includes a layout with common system components.

## Prerequisites

    Make sure you have the following installed:

    Node.js (>=18.x or <=20.x)
    pnpm (>=9.x)

# Basic Settings

Create a .env file in the root of your project with the following content:

    NEXTAUTH_URL=http://127.0.0.1:3000
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3000
    NEXT_PUBLIC_NEXTAUTH_URL=http://127.0.0.1:3000
    AUTH_SECRET=80e4e5b50b83c0306e96cdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## Installation

1. Clone the repository:

    ```bash
    git clone [<repo_url>](https://github.com/LIT-SOULUTION/Boilerplate-NextJS-ShadCN.git)

    cd Boilerplate-NextJS-ShadCN

2. Install dependencies:

    ```bash
    pnpm install

## Running the Application

To run the application in development mode:

    ```bash
    pnpm run dev
    
    Go to http://localhost:3000/




## Docker Setup

If you want to run the application using Docker, follow these steps:

### Build for x86 Architecture

1. **Build the Docker image using the `Dockerfile.x86_64`:**

    ```bash
        docker build -f Dockerfile.x86_64 --no-cache -t kounnapha/staypermit-f:frontend-0.3.3 .
        docker build -f Dockerfile.x86_64 --no-cache -t kounnapha/staypermit-b:backend "versionxxxx" .
    ```

    Replace `stay-permit-frontend` with a name you want for your Docker image.

2. **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 stay-permit-frontend
    ```

    This will run the application on `http://127.0.1:3000/`.

---

### Build for ARM Architecture

1. **Build the Docker image using the `Dockerfile.arm`:**

    ```bash
    docker buildx build -f Dockerfile.arm --no-cache --platform=linux/amd64 -t stay-permit-frontend .
    ```

    Replace `stay-permit-frontend` with a name you want for your Docker image.

2. **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 --name stay-permit-webapp --env-file .env stay-permit-webapp
    ```

    This will run the application on `http://127.0.1:3000/`.