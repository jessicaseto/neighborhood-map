# Neighborhood Map Project

The Neighborhood Map Project is a Google Maps React App that is part of the Udacity Front End Nanodegree Program. The purpose of the project is to create a dynamic and responsive web application with the use of React and Google Maps API, as well as an additional third party API. In this case, Foursquare API is used.

In this particular project, a list of nine dog friendly hikes near Seattle are shown on a Google Map.

## Installation

To access the application:
* In a bash terminal, run `git clone https://github.com/jessicaseto/neighborhood-map.git`
* install all project dependencies with `npm install`
* to view the app in developer mode:
    * start the development server with `npm start` to view the app in developer mode
* to run the project in production mode with offline functionality:
    * run `npm run build`
    * run `serve -s build`
    * open app in a browser at http://localhost:5000/

## Usage

Once the app is running on the local server, you should be able to see the app running. The app on a large screen is shown below.

![Large Screen](/public/images/large-screen.png?raw=true "App On Large Screen")

When the app is viewed on a smaller screen, a hamburger menu appears to toggle the navigation.

![Small Screen](/public/images/small-screen.png?raw=true "App On Small Screen")

Click on a marker to view additional details of a particular hike in a pop-up info window. A photo from Foursquare and a link to the Foursquare venue will appear. Alternatively, click on the hike on the navigation sidebar to display the same information. Click on the 'x' on the info window to close the pop-up.

![Marker Clicked](/public/images/marker-clicked.png?raw=true "Marker Clicked")

You may also filter through the nine locations by name by typing into the input box on the sidebar. Names of hikes matching the search query will appear on the sidebar along with their corresponding markers on the Google Map.

![Filter Hikes](/public/images/filter-hikes.png?raw=true "Filter Hikes")

## Source File Directory Guide
```bash
├── README.md - This file.
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing. Provided with Create React App. (Unused for now)
    ├── index.css # Global styles.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── MapContainer.js # MapContainer component, used to render the Google Map with markers and an info window.
    ├── serviceWorker.js # serviceWorker provided by create-react-app.
    └── Sidebar.js # Sidebar component, used to render the navigation sidebar with the filter input box and list of hikes.
```

## Attribution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The photo and link for each hike was fetched using the [Foursquare API] (https://developer.foursquare.com/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
