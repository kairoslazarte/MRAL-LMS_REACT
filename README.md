## Install dependencies
* npm install
* cd frontend npm install

## Create .env file in root dir and add keys
* NODE_ENV 
* PORT
* MONGO_URI
* JWT_SECRET
* APP_BASE_URL

## NPM commands
* npm run dev - runs the backend and the frontend
* npm run start - runs the backend/server only
* npm run server - runs the backend/server only and watches everytime there's a change
* npm run client - runs the frontend client only
* npm run data:import - imports the data and store it into the database
* npm run data:destroy - destroys/deletes all of the data in the database

## Introduction
- This is Outsource Insights Web Application. To get started, please make sure to run/do the steps above. To run it initially, i recommend doing "npm run dev" to run the backend and the frontend client. Backend is MongoDB, Node and express JS. While the frontend is React JS. 
- The backend and the frontend is combined in this project.
- The backend is located at the "backend" folder
- The frontend is located at the "frontend" folder

## User manual
https://docs.google.com/document/d/1bAf14sr0ot338VgFgXLP7QBTs7HTM1ENQjQZ3K6aoVE/

## Documentation
https://docs.google.com/document/d/1nbZ1wUzAOLT_jM-w34-5nrgBx4g36KJrd_XiFGMXfJM

## Libraries
* tailwindcss (https://tailwindcss.com/)
* heroicons (https://heroicons.com/)
* tailwindui components (https://tailwindui.com/components)
* zoomweb meeting sdk (https://marketplace.zoom.us/docs/sdk/native-sdks/web/)

## API Routes
* /api/users 
  - /login - for logging in as host
* /api/sessions
  - / - get all sessions from latest
  - /ongoing - get ongoing session
  - /create - post, for creating a session
  - /end - post, for ending a active session
  - /update - post, for updating a session
  - delete - post, for deleting a session
* /api/past-sessions
  - / - get all past sessions
* /api/popup-video
  - / - get popup video detail
  - /enable - post, enable popup video
  - /disable - post, disable popup video

## BACKEND
- Backend is developed using Express JS, Node JS and the Database is Non-SQL. It's MongoDB atlas. Web socket is also used to listen to changes in the backend and do something in the frontend. The main file of the backend is the "server.js". It's the heart of the backend, everything follows from there. The API routes are given above.

## FRONTEND
- Frontend is developed using plain React JS and tailwind CSS. The main file is in the "App.js" and everything follows from there. Most components are dynamic and the backend is already integrated. We use inline tailwind CSS for styling. This is component based, so everything that can be reusable is put into a component for cleaner and much efficient system.

## Zoom Meeting SDK
- Zoom meeting SDK is integrated in this web application. You can locate it at "frontend/public/zoom" for the main Zoom meeting web SDK functionality. And to locate where the Zoom meeting SDK is integrated inside the web application, it's in the "Tour.js" in client side.


## BRANCHES FOR DEPLOYMENT (IMPORTANT)
- feature/bpo-live-tour (for testing) - https://urchin-app-dnvyv.ondigitalocean.app/
- main (for deployment/production) - https://urchin-app-dnvyv.ondigitalocean.app/

## THINGS TO DO BEFORE PUSHING TO THESE SPECIFIC BRANCH (IMPORTANT)
* feature/bpo-live-tour
  - make sure that the drip, google analytics, and popups are commented in "frontend/public/index.html"
  - search and replace all of the "http://localhost:3000/" or "https://urchin-app-dnvyv.ondigitalocean.app/" into "https://urchin-app-dnvyv.ondigitalocean.app/"

* main
  - make sure that the drip, google analytics, and popups are uncommented in "frontend/public/index.html"
  - search and replace all of the "http://localhost:3000/" or "https://urchin-app-dnvyv.ondigitalocean.app/" into "https://urchin-app-dnvyv.ondigitalocean.app/"