# Application: **Prioritacts**: Contacts ... Prioritized

#### By Noah Horwitz

<!-- ###### _First published 2020-02-14_ -->
<!-- The fully deployed project is hosted on GH-Pages [HERE](https://nhhor.github.io/prioritacts). -->

## Description:
This project was made as part of a capstone coding project for Noah Horwitz, a student at _[Epicodus](http://www.epicodus.com)_, a vocational school for technology careers based in Portland, OR. The project is designed to take a user's Google contacts, have the user assign important contacts with a desired interaction frequency, track their last interaction with each contact, sort their contact list so contacts that have a high desired frequency but no last-interaction within that frequency are highlighted and moved to the top of the contact list..

> #### Project Proposal
> * **Name of Student:** Noah Horwitz
> * **Name of Project:** "prioritacts: Contacts ... Prioritized"
> * **Project's Purpose or Goal: (What will it do for users?)** Take a user's Google contacts, have the user assign important contacts with a desired interaction frequency, track their last interaction with each contact, sort their contact list so contacts that have a high desired frequency but no last-interaction within that frequency are highlighted and moved to the top of the contact list.
> * **List the absolute minimum features the project requires to meet this purpose or goal:**
>   * Google OAuth to read & update a user's contacts.
>   * JavaScript/React logic to sort and display with a great UI.
> * **What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.**
>   * JavaScript (backend logic)
>   * React (front end dom)
>   * Redux
>     * (potentially would need custom API if unable to push updates to Google Contacts API)
>   * Google OAuth w/ RU functionality into a custom contact field.
>   * Refactor as React Native app.
>   * Track other means of communication outside of google's 'interactions,' such as What's App interactions, etc.
> * **What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?**
>   * React Native
>   * Android Studio

## Project Log
|Start|End|Log|Notes|
|---:|:---|:---:|:---:|
|2020-02-28|`---`|`---`|`---`|
|08:00|09:00|* Initialize project with create-react-app.<BR>* Update Readme|Attempted to use create-react-native-app but caused system error: will research solution.|
|09:00|09:30|* Create component tree mock-up. (**Break the UI into a Component Hierarchy**)|[Draw.io](https://www.draw.io/)|
|09:30|10:15|* Research Google OAuth.|* [YouTube: "1. How To Authenticate Google Api Using Oauth2"](https://www.youtube.com/watch?v=yfxjGagtVeE) (-)<BR>* [YouTube: "OAuth 2.0: An Overview"](https://www.youtube.com/watch?v=CPbvxxslDTU) (+)<BR>* [YouTube Generate Google API Key and OAth Client ID](https://www.youtube.com/watch?v=l5nxzSVlxKc) (-)|
|10:15|10:30|* Create project e-mail account and fill with test contacts.|[prioritacts@gmail.com](prioritacts@gmail.com)|
|10:30|13:00|* Begin to **Build a Static Version**||
|14:00|15:00|* Continue to **Build a Static Version**||
|15:00|15:45|* Research Google OAuth.|* [YouTube: API Authentication with Node Part #11 - Google OAuth](https://www.youtube.com/watch?v=JgSLf-HS5gg) (+)|
|15:45|16:15|* Attempt to test Google OAuth.|* [Google People API documentation](https://developers.google.com/people) (-)<BR> * Negligible success with google People API docs / their in-house API tester.|




## Setup/Installation instructions:
* Click the `Clone or download` button and copy the link provided.
* Open your terminal application (assuming GIT Scripts AND node.js (with NPM) have been installed on your system) and type `git clone (link)`.
* In the terminal using the `cd`... command, navigate to the newly created repository and run `npm install`.
* Then in the terminal, run `npm run start`.
* The app should then automatically open in a browser window.

## Technologies Used:
> `React`
> `Redux`
> `WebPack`
> `JavaScript`
> `CSS`
> `HTML`

## Known Bugs:

## React Component Tree:
![React Component Tree](https://raw.githubusercontent.com/nhhor/prioritacts/master/public/prioritacts-component-tree.png "Prioritacts React Component Tree")

## References:
* Component & Route Structure designed at [Draw.io](https://www.draw.io/).

## Support and contact details
<!-- Contact [example@sample.com](mailto:example@sample.com) -->

## License
_This This repository is copyright (C) 2019 by Noah Horwitz and licensed under the GNU General Public License v3.0 [gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)_.

---


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
