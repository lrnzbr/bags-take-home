# Fresh Threads Textiles
<img width="1262" alt="image" src="https://github.com/lrnzbr/bags-take-home/assets/2145274/a06a5686-b3f9-49f4-9f4b-49303d042707">

A Small Business Health Dashboard 

## Overview
This project was created to show a compact dashboard of a small business' performance utilizing mock data resembling that of a Plaid connection.

Instead of using a static .json file to read chart data. This app dynamically produces randomized chart data that the user can manipulate.

The visuial data is on multiline + Bar chart that is zoomable on the x axis. Positive plain transactions are on a green line chart, negative transactions on a red line chart, with net profit/loss in blue bars.  All the data is aggregated into monthly buckets. 

The stying is very minimal. I decided to use big text and light gradients to create a component that could be easily adapted to the design language of a larger project. 

I decided to use traditional statistical models (mean, median, variance and standard deviation) and apply them to profit margins. I try to present them in a way that makes sense to a user and produces actionabale outcomes.  If a business owner knows what healthy, steady state metrics look like, taking risks can be done in a much more controlable manner. 

Also more advanced machine learning and AI models depend on these traditional statistical models so this seemed like an interesting starting place for creating more insights in the future. 



## Seeing the Project

A deployed version of this project can be seen [here](https://fresh-threads-textiles.web.app/).


## Data Modeling
This app centers around a Transaction object represents an individual Plaid transaction. In the `Models.js` file you can see its structure.

In the `Functions.js` file we generate Transactions as well as perform several aggregator and mathematical functions that are used in our app. 



## Running Locally
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
