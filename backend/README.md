# Uber Backend Routes

Below is an overview of the backend routes, request/response data, and typical status codes.

## User Routes

### POST /user/register

• Request Body:

```
{
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "password": "string"
}
```

• Description: Registers a new user.  
• Possible Responses:

- 201 Created: Returns a JSON with a JWT token.
- 400 Bad Request: Validation errors or user already exists.
- 500 Internal Server Error: Internal server issues.

### POST /user/login

• Request Body:

```
{
  "email": "string",
  "password": "string"
}
```

• Description: Logs in a user. Returns a JWT token and sets a cookie.  
• Possible Responses:

- 200 OK: Returns user object and token.
- 400/401: Invalid credentials.
- 500: Internal server error.

### GET /user/profile

• Description: Retrieves user’s profile. Requires user authentication.  
• Possible Responses:

- 200 OK: Returns user data.
- 401 Unauthorized: Invalid or missing token.

### GET /user/logout

• Description: Logs out the user by blacklisting the token.  
• Possible Responses:

- 200 OK: Success message.

## Captain Routes

### POST /captain/register

• Request Body:

```
{
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "car|motorcycle|auto"
  }
}
```

• Description: Registers a new captain.  
• Possible Responses:

- 201 Created: Returns a JWT token.
- 400 Bad Request: Validation errors or captain already exists.

### POST /captain/login

• Request Body:

```
{
  "email": "string",
  "password": "string"
}
```

• Description: Captains log in. Returns a JWT token.  
• Possible Responses:

- 200 OK: Returns captain data and token.
- 400/404: Invalid credentials or captain not found.

### GET /captain/profile

• Description: Retrieves captain’s profile. Requires captain authentication.  
• Possible Responses:

- 200 OK: Returns captain data.

### GET /captain/logout

• Description: Logs out the captain by blacklisting token.  
• Possible Responses:

- 200 OK: Success message.

## Ride Routes

### POST /ride/create

• Request Body:

```
{
  "pickup": "string",
  "destination": "string",
  "vehicle": "auto|car|moto"
}
```

• Description: User creates a ride request.  
• Possible Responses:

- 201 Created: Returns ride info.
- 400: Invalid input data.
- 500: Server error.

### POST /ride/confirm

• Request Body:

```
{
  "rideId": "MongoId"
}
```

• Description: Captain confirms ride.  
• Possible Responses:

- 200 OK: Returns ride data with assigned captain.
- 400: Validation errors.

### GET /ride/start-ride

• Query Params: rideId, otp  
• Description: Captain starts the ride using OTP.  
• Possible Responses:

- 200 OK: Returns updated ride data.
- 400: Invalid or missing query parameters.

### POST /ride/end-ride

• Request Body:

```
{
  "rideId": "MongoId"
}
```

• Description: Captain ends the ride.  
• Possible Responses:

- 200 OK: Returns final ride data.

## Maps Routes

### GET /maps/get-coordinates

• Query Params: address  
• Description: Gets latitude/longitude for an address.  
• Possible Responses:

- 200 OK: Returns coordinate data as JSON.
- 400: Invalid address parameter.

### GET /maps/get-distance

• Query Params: origin, destination  
• Description: Calculates distance between two points.  
• Possible Responses:

- 200 OK: Returns distance info.

### GET /maps/get-suggestions

• Query Params: address  
• Description: Returns address suggestions.  
• Possible Responses:

- 200 OK: Returns array of suggestions.

### GET /maps/get-prices

• Query Params: origin, destination  
• Description: Gets estimated fare.  
• Possible Responses:

- 200 OK: Returns fare data.

## Common HTTP Status Codes

• 200 OK: Standard success.  
• 201 Created: Resource successfully created.  
• 400 Bad Request: Input validation errors.  
• 401 Unauthorized: Invalid authentication token.  
• 404 Not Found: Resource does not exist.  
• 500 Internal Server Error: Unexpected issues.
