# Frontend Overview

This frontend handles the client-side of the ride-hailing application. Below is a summarized flow of the main components and pages:

## Pages

1. **Home.jsx**

   - Renders the map (`LiveTracking`) to display current location.
   - Handles ride creation logic (pickup/destination inputs).
   - Uses modals/panels like `VehiclePanel` and `ConfirmedRide` to guide user steps.
   - Receives server events for ride updates via `SocketContext`.

2. **RideStarted.jsx**

   - Accessed after a ride is initiated (`/riding`).
   - Displays ride details (e.g., driver, destination, fare).
   - Shows map tracking of user location in real time.

3. **CaptainHome.jsx**

   - For drivers to view incoming ride requests.
   - Takes advantage of the same `LiveTracking` component for location updates.
   - Listens for “new-ride” events via sockets, triggers UI pop-ups for ride acceptance.

4. **CaptainRiding.jsx**
   - Shown to the driver once a ride has started.
   - Map-based real-time tracking and final ride completion UI.

## Components

- **LiveTracking**: Displays current position on a Google Map.
- **LocationSearchPanel**: Provides location suggestions and search functionality.
- **VehiclePanel**: Allows users to pick a vehicle type and see estimated fares.
- **ConfirmedRide** / **FindingDriver** / **DriverSelected**: Manages ride confirmation workflow.
- **FinishRide**: Shown to the captain for completing a ride.

## Context

- **SocketContext** (`src/context/SocketContext.jsx`): Manages socket connections to receive real-time events for rides and location updates.
- **UserDataContext** (`src/context/UserContext.jsx`): Stores the current signed-in user data.
- **CaptainDataContext** (`src/context/CaptainContext.jsx`): Maintains captain profile and updates.

## Navigation

- Built using `react-router-dom`.
- Main routing is defined in `src/App.jsx`.
- Protected routes ensure only authenticated users/captains can access certain pages.

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Make sure `.env` variables (e.g., `VITE_BASE_URL`, `VITE_GOOGLE_MAPS_API`) are set correctly.
