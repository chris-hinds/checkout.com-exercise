# 16/01/2024 - DoJo Updates

I pushed a few commits recently that were left locally after implementing a new feature during a previous interview (hence the new commits).

**Note: This repo was first create over a year ago when NextJs 13 was launching and had the new app directory and server components in beta, so please bare this in mind.**

The task was to build a basic form that allowed users to submit a review, there were some basic form validation rules to apply as well as not allowing more than 1 review from a single email address.

After the from was filled the user is directed to a page which shows the other reviews as well as a breakdown of the scores given in a chart.

## Improvements

If I were writing this project again now these are some of the various improvements I would make;

- Better TypeScript support, improved and more reusable types (better sharing of types between the FE and BE)
- Refactor and further breakdown the FeedbackForm component, this component currently handles lot of logic and it could be simplified further.
  - This would include the user of new server/form actions in NextJS, this would reduce the need for a dedicated API endpoint and also allow the form to be submitted and the page revalidated in a single action. This would also allow me to hook into the form loading state for UI updates instead of managing custom state to show and hide loading indicators.
  - Move the actual form components into their own separate component which is built up of the various input fields and would handle the form layout.
  - if this were a more complex form I would also look to power the form rendering by JSON schema, this way the form inputs and its validation can be managed without even touching the JSX.
- The API endpoints that do exist would be moved to the app directory and use the newer route handlers.
- If this project were to be worked on by larger team of engineers I would suggest having the core UI components and any theming logic be extracted to a separately managed UI library, likely structured as a monorepo that would supply various shared packages from UI to utils for all teams to consume in their web projects, allowing a tribe to better focus on their product offering.
- Where possible I would make use of NextJS newer nested routes helping with page structure and performance by reducing the amount of JS needing to be delivered over the wire.
- I would also switch the project to using something like ReactQuery (Apollo client if using GraphQl) which would simplify the network requesting strategy and also enable caching of data requests.
- Testing would also be improved. On a larger project I would expect to see a healthy mix of unit, integration and also end to end testing.

Below this section you will find the original readme.

Please note the project will not run locally without a secret key for the database. because of this I have a deployed the application here for testing. https://checkout-com-exercise-fchv8x4ct-chris-hinds.vercel.app

# Checkout.com Coding Exercise

This application is built using the following technologies;

- NextJS 13 [Using the appDirectory beta](https://nextjs.org/blog/next-13#new-app-directory-beta)
- Tailwind CSS
- FaunaDB (Serverless Database)

I wanted to experiment with NextJS 13 use of react server components and its new App Directory which introduces layouts and nested routes. These pages are mostly server side rendered using server components however some elements are using client side components as they rely on either browser API's or react hooks like `useEffect`

## Local Setup

You will need to create a local env file as you need the FaunaDB secret (this should have been included in the email, please reach out to me if not)

1. Create a .env.local file in the root of this repository with the following values

```
FAUNA_SECRET=<DB secret provided via email>
HOST_URL=http://localhost:3000
```

2. NextJS 13 requires NodeJS 16 and above, Please ensure you are running at least Node 16.

3. This application uses yarn, install the NPM dependencies via yarn.

```
yarn
```

3. Launch the development server (The application should be available at http://localhost:3000)

```
yarn dev
```

Please note I have only tested this application in the latest version of chrome, cross browser testing would normally be carried out but given time constraints I opted to omit this.

I also found some issues where next hydration had failed due to my dashlane password manager chrome extension. It would be better to test this using chromes incognito mode.

## Application Structure

NextJS 13 introduces a new file/folder structure which allows us to make use of reacts server components as well as component based data fetching etc.

Inside the `/app` directory you will see root level `page.tsx` and `layout.tsx` files.

The root level `layout.tsx` file is essentially replacing the old `_document.ts` file. This creates a global layout for the route of the application and then renders the root `page.tsx` component as children.

I have co-located components and tests within the `/app` directory. `/app/components` contains either globally shared components of components that are used just on the main root page of the application.

Anything that is remote re-useable has been abstracted to a component, such as input fields and a button.

The `/results` directory creates a new route at `http://localhost:3000/results`. This page is server side rendered and fetches data from two different API endpoints, this reduces the amount of JS delivered to the client browser, thus improving both real world and perceived performance.

Inside this directory is a `loading.tsx` file. This is rendered via React suspense when the page is fetching data. Ideally this would be a generic components that can be used for all loading states throughout the application.

## Home Page

The Home page is simple and just renders the feedback response form, this form is just using standard HTML input elements and mostly relies on the browser based validation methods, such as `required`, `email`, `min length` etc.

In the future I would opt to use a form library such as react-hook forms. it didn't matter so much is this simple use case, however it would prove very useful in a larger application. This would also enable far superior validation as well better controlled react elements.

Ideally validations/types would be shared from the api to the client. Validation should be present of both the client and the API, in theory the client would never send invalid data to the API, however for robustness both client and api should validate the data sent.

I added some basic validation using YUP before sending the data to the API, this enforces the browser based validation and adds some new validation like min and max length for characters etc, this is really just an example of how validation could be used on both the client and the API. YUP does also `trim` the comment text before sending it to the API.

If you submit a response using the same email address an error notification will appear telling you so.

Responses that fail the YUP validation will also render an error message.

In future iterations I would prefer to make a single notification component that has the ability to be dismissed and is simply passed an object details the message and the error level to be show i.e. warning or error. This would ideally also use React Portal so not affect the may DOM tree.

## Results Page

The results page is broken down into two main sections, the ratings spread chart and the review comments list.

#### Ratings Spread Chart

The chart is rendered using chart.js and react-charts-2. The data os fetched from an API endpoint found at `/api/getRatingsSpread`. This endpoint fetches the feedback responses and constructs the data required for the bar chart to render, doing this data manipulation on the API reduces the complexities within the front-end code whilst also allowing us to deliver less JS to the browser.

#### Feedback Responses List

The Feedback response list is broken down into multiple components, the results card and the star rating.

The API data is looped through and each response renders a result card. The result card then composes multiple components to construct the layout of each review item on the page. This is to improve both readability and reusability.

## Testing

The approach to testing here has been relatively simple, most tests render the page of component they are testing and expect an element to be rendered in the main document.

The tests are located alongside each page/component.

Please note I have not tested anything on the results page as I had some trouble testing the new component level data fetching as part of reacts server components and didnt want to waste too much time on this. However I would test the main page render, mock the data fetches, ensure the main components render i.e. the bar chart and the results list.

Tach individual component that would be unit tested and any atoms i.e. star rating, button etc would include a snapshot test for rapid UI testing.

The page would be tested at different data states, failed to fetch data, incorrect data, no data, correct data etc, however this would likely call for improvements around this pages error handling.

#### Homepage and Form Testing.

I included a number of unit tests for this home page and the form. The header components is tested to ensure the correct navigation links render as well as the SVG logo.

The home page has a test to ensure that the forms title heading is rendered.

The form is what has been tested the most. A test to ensure each input field is rendered testing the submit button is rendered and then testing the form in different submission states i.e. ensuring the correct error message is displayed based n on the form validation.

I would improve this area by abstracting things like error messages out to constants, these can then be imported and used across the UI and the tests, ensuring an error message text only needs to be updated in a single location.

The successful submission state is also tested and ensures that the next/router is called with the correct page to redirect to once a response has been saved in the database. The various error state tests also ensure that the next router is not called when an error is detected.
