# Application: **Prioritacts**: Contacts ... Prioritized

### By Noah Horwitz
###### _First published 2020-03-12_
##### The fully deployed project is hosted on [netlify](https://prioritacts.netlify.com).
- [![Netlify Status](https://api.netlify.com/api/v1/badges/cbab0bb9-22ce-42bc-87ad-3326734d60f9/deploy-status)](https://app.netlify.com/sites/prioritacts/deploys)

## Description:
This web app was made as part of a capstone coding project for Noah Horwitz, graduating student at _[Epicodus](http://www.epicodus.com)_, a vocational school for technology careers based in Portland, OR.

*Problem:* Your Google contacts are only ever sorted alphabetically, and knowing the last time you interacted with a contact is impossible at a glance, and inconvenient at best.

**Solution:** A web-app that securely/seamlessly connects with your Google Contacts, allows a user to set a desired frequency which they wish to communicate with a contact, allows a user to log their most recent interaction, and then sort the user's contacts by priority since last interaction. *Welcome to Prioritacts, your Contacts ... Prioritized.*

## Demo:
|Prioritacts Example Gif|
|:---:|
|![Prioritacts Example](https://raw.githubusercontent.com/nhhor/prioritacts/master/public/appExample.gif "Prioritacts Example")|

## Setup/Installation instructions:
-   Click the `Clone or download` button and copy the link provided.
-   Open your terminal application (assuming GIT Scripts AND node.js (with NPM) have been installed on your system) and type `git clone (link)`.
-   In the terminal using the `cd`... command, navigate to the newly created 'Prioritacts' repository folder and run `npm install`.
-   Next, while in the terminal's 'Prioritacts' directory, type `touch .env` this will create an environmental variable file which is used for securely storing two private credentials.
  - Open the '.env' file in the editor of your chosing and add a line with `REACT_APP_API_KEY=` and than another line down with `REACT_APP_CLIENT_ID=`
  - To generate your own Google api key and client id, follow along with Google's walkthrough [here](https://console.developers.google.com/flows/enableapi?apiid=people.googleapis.com&credential=client_key).
  - Once you have your own credentials, add them to the the .env file (without quotes).
  - You will also need to go to google console's Credentials > OAuth >  and add in 'Authorized JavaScript origins': `http://localhost:3000` & add in 'Authorized redirect URIs': `http://localhost:3000`.
-   Then in the terminal, run `npm run start`.
-   The app should then automatically open in a browser window.

## Technology Used:

- This project utilizes the **JAMstack** architecture:
  - Front-end:
    - `JavaScript`
      - `React`
      - `Redux`
      - `OAuth` (see references)
  - Back-end:
    - `People API` hosted by [Google](https://developers.google.com/people/v1/getting-started).
      - All user data is *only* displayed or updated within the Google People API ("Google Contacts") and contact/user data is **not** saved, sent, stored, or tracked in any way by this App.
  - Markup:
      - `HTML`
      - `CSS`
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
  - `NPM`
  - `WebPack`
- This project is deployed via [Netlify](https://www.netlify.com/).

## Known Bugs:
- Netlify appears to have an *inconsistent* error where the contacts do not display after a successful login. Signing out of google.com, closing extra browser tabs that are logged into a Google service, and clearing the cookies and site data from Prioritacts seem to correct this.
- Google's OAuth header appears to have an *inconsistent* error where the the GoogleOAuth window fails to load. Reloading the page several times seems to temporarily correct this.
- Google apparently blocks 3rd party OAuth requests on the Firefox for Android browser.

## React Component Tree:
![React Component Tree](https://raw.githubusercontent.com/nhhor/prioritacts/master/public/prioritacts-component-tree.png "Prioritacts React Component Tree")

## Support and contact details
- Contact [prioritacts@google.com](mailto:prioritacts@google.com)

## References:
- **OAuth** component was modified from the following tutorial: [adding google sign-in to your webapp – a react example](https://www.intricatecloud.io/2019/08/adding-google-sign-in-to-your-webapp-a-react-example/).
- React component tree visual designed at [Draw.io](https://www.draw.io/).
- Demo Gif in ReadMe created using [RecordIt Fast Screencasts](https://recordit.co).
- Sample logo produced by [Tailorbrands](www.tailorbrands.com).

## License
- _This This repository is copyright (C) 2019 by Noah Horwitz and licensed under the GNU General Public License v3.0 [gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)_.

------

#### Project Log

|      Start | End   |                                       Log                                       |                                                                                                                                                          Notes                                                                                                                                                         |
| ---------: | :---- | :-----------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 2020-02-28 | `---` |                                      `---`                                      |                                                                                                                                                          `---`                                                                                                                                                         |
|      08:00 | 09:00 |          _ Initialize project with create-react-app.<BR>_ Update Readme         |                                                                                                                Attempted to use create-react-native-app but caused system error: will research solution.                                                                                                               |
|      09:00 | 09:30 | \* Create component tree mock-up. (**Break the UI into a Component Hierarchy**) |                                                                                                                                             [Draw.io](https://www.draw.io/)                                                                                                                                            |
|      09:30 | 10:15 |                            \* Research Google OAuth.                            | \* [YouTube: "1. How To Authenticate Google Api Using Oauth2"](https://www.youtube.com/watch?v=yfxjGagtVeE) (-)<BR>\* [YouTube: "OAuth 2.0: An Overview"](https://www.youtube.com/watch?v=CPbvxxslDTU) (+)<BR>\* [YouTube Generate Google API Key and OAth Client ID](https://www.youtube.com/watch?v=l5nxzSVlxKc) (-) |
|      10:15 | 10:30 |          \* Create project e-mail account and fill with test contacts.          |                                                                                                                                     [prioritacts@gmail.com](prioritacts@gmail.com)                                                                                                                                     |
|      10:30 | 13:00 |                      \* Begin to **Build a Static Version**                     |                                                                                                                                                                                                                                                                                                                        |
|      14:00 | 15:00 |                    \* Continue to **Build a Static Version**                    |                                                                                                                                                                                                                                                                                                                        |
|      15:00 | 15:45 |                            \* Research Google OAuth.                            |                                                                                                   \* [YouTube: API Authentication with Node Part #11 - Google OAuth](https://www.youtube.com/watch?v=JgSLf-HS5gg) (+)                                                                                                  |
|      15:45 | 16:15 |                         \* Attempt to test Google OAuth.                        |                                                                             _ [Google People API documentation](https://developers.google.com/people) (-)<BR> _ Negligible success with google People API docs / their in-house API tester.                                                                            |
|      16:15 | 17:00 |                       \* Fine-tune css for static display.                      |                                                                                                                                                                                                                                                                                                                        |
| 2020-03-06 | `---` |                                      `---`                                      |                                                                                                                                                          `---`                                                                                                                                                         |
|      08:00 | 08:45 |                                \* Redux research.                               |                                                                                                                [Redux For Beginners - React Redux Tutorial](https://www.youtube.com/watch?v=CVpUuw9XSjY)                                                                                                               |
|      08:45 | 10:45 |                \* Refactor OAuth & contactList into Redux store.                |                                                                  \* **Milestone!** OAuth and contacts loading perfectly.<BR>\* Still an issue with _"TypeError: window.gapi is undefined"_ error every other load, perhaps async issue on google end?                                                                  |
|      10:45 | 12:00 |                     \* Work on contact's data prop passing.                     |                                                                                                                                                                                                                                                                                                                        |
|      13:00 | 13:45 |                 \* Create birthday alert function for contacts.                 |                                                                                                                                                                                                                                                                                                                        |
|      13:45 | 15:45 |                      \* Troubleshoot birthday alert logic.                      |                                                                                                                                                           ...                                                                                                                                                          |
|      15:45 | 16:30 |                        \* Add gProfile photos to contact.                       |                                                                                                                                                                                                                                                                                                                        |
|      16:30 | 17:30 |                       \* Update contact ui with css-grid.                       |                                                                                                                                                                                                                                                                                                                        |

> #### Project Proposal
>
> -   **Name of Student:** Noah Horwitz
> -   **Name of Project:** "prioritacts: Contacts ... Prioritized"
> -   **Project's Purpose or Goal: (What will it do for users?)** Take a user's Google contacts, have the user assign important contacts with a desired interaction frequency, track their last interaction with each contact, sort their contact list so contacts that have a high desired frequency but no last-interaction within that frequency are highlighted and moved to the top of the contact list.
> -   **List the absolute minimum features the project requires to meet this purpose or goal:**
>     -   Google OAuth to read & update a user's contacts.
>     -   JavaScript/React logic to sort and display with a great UI.
> -   **What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.**
>     -   JavaScript (backend logic)
>     -   React (front end dom)
>     -   Redux
>         -   (potentially would need custom API if unable to push updates to Google Contacts API)
>     -   Google OAuth w/ RU functionality into a custom contact field.
>     -   Refactor as React Native app.
>     -   Track other means of communication outside of google's 'interactions,' such as What's App interactions, etc.
> -   **What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?**
>     -   React Native
>     -   Android Studio
