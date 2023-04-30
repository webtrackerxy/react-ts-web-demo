# React.js Web Demo

## Development

Install Node.js > 16

### A. To install and run the App:

```
git clone https://github.com/webtrackerxy/react-ts-web-demo.git
cd react-ts-web-demo
npm i
npm start
```

#### To run unit-testing

```
npm test
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

There are two pages in this app:

a. http://localhost:3000 -> Login page <br>
b. http://localhost:3000/dashboard -> Dashboard page

Responsive design is implemented in the Dashboard page. It uses media queries in the CSS files to make the layout responsive when the width of the broswer is equal or less than 500px that switches the layout of the table and chart from horizontal to vertical on small screens.

### B. To build the Docker image:

1. Install Docker on your system if you haven't already: https://docs.docker.com/get-docker/

2. Open a terminal or command prompt, and navigate to the root directory of your project.

3. Build the Docker image by running the following command.

```
docker build -t react-ts-web-demo .
```

4. Once the image has been built, you can run a Docker container based on the image.

```
docker run -p 80:80 react-ts-web-demo
```

5. Open a broswer, input http://localhost. You will see the web page. The docker container is ready to deploy to the cloud.

### C. App Structure

| File / dir    | Description                                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node_modules  | Contains all our lovely dependencies                                                                                                                                                                                                           |
| public        | Contains HTML file, which is the entry point to the React application, and other assets such as data, images, icons, and fonts.                                                                                                                |
| src/pages     | Page components. Currently, it contains Login.tsx and Dashboard.tsx                                                                                                                                                                            |
| src/store     | The redux store holds the entire state tree of the application. index.ts exports the store configuration and the reducers. appReducer.ts takes the current state and an action, and return a new state based on the action that was performed. |
| src/styles    | Contains all the style scss files                                                                                                                                                                                                              |
| src/types     | Holds the types used by this application                                                                                                                                                                                                       |
| App.tsx       | Main component of the React application. It contains a router to handle navigation between different pages within the application. currently, It supports Login and Dashboard pages.                                                           |
| index.tsx     | Entry point of the React application                                                                                                                                                                                                           |
| Dockerfile    | Docker image defination file                                                                                                                                                                                                                   |
| README.md     | This file                                                                                                                                                                                                                                      |
| package.json  | Lists NPM dependencies and build scripts                                                                                                                                                                                                       |
| tsconfig.json | Configures the TypeScript compiler                                                                                                                                                                                                             |
