<h1>UBER</h1>


<<<<<<< HEAD
<p align="center">
  <img src="./assets/ClientGif.gif" alt="Client Demo" width="250" style="margin-right: 20px;"/>
  <img src="./assets/CaptainGif.gif" alt="Captain Demo" width="250"/>
</p>
=======
This is a full-stack ride-hailing application inspired by Uber. It demonstrates real-time location tracking, live ride updates, driver assignments, and more.

<p align="center" >
  <img src="./assets/ClientGif.gif" alt="Client Demo" width="250" />
  <img src="./assets/CaptainGif.gif" alt="Captain Demo" width="250"/>
</p>

### Try for yourself https://uber-clone-app-bay.vercel.app/
>>>>>>> 5db919e83679acb7790ebf08e7f6457174c1f0ae

## Features

- User login/signup (JWT-based authentication)
- Google Maps integration for live tracking
- Real-time ride events via Socket.IO
- Driver and user dashboards with unique flows

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Quick Setup](#quick-setup)
4. [Architecture](#architecture)
5. [License](#license)

## Project Overview

1. A user can sign in, request a ride, and track the driver’s location in real time.
2. A captain/driver can log in, view ride requests, and update location for live tracking.
3. Uses a backend server (Node.js/Express) for APIs and real-time sockets.
4. Utilizes a modern frontend (React) with Google Maps for a mobile-friendly UI.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.IO client, Google Maps API
- **Backend**: Node.js, Express, Mongoose, MongoDB, Socket.IO server
- **Authentication**: JWT-based
- **Deployment**: Vite (development), Vercel and OnRender

## Quick Setup

1. Clone this repo:  
   git clone https://github.com/K-Daksh/UberClone.git

2. Install dependencies (each folder):

   - cd backend && npm install
   - cd ../frontend && npm install

3. Start the backend:
   npm run dev (or npm start)

4. Start the frontend:
   npm run dev

5. Configure environment variables in .env (e.g., MongoDB URI, Google Maps Key).

## Architecture

- **pages/** – Various routes (Home, Login, CaptainHome, etc.)
- **components/** – Reusable UI components (LocationSearchPanel, LiveTracking, etc.)
- **context/** – React Context for user, captain, and socket states

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to modify or distribute.
