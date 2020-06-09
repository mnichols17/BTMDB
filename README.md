# BTMDB

Site for Lights, Camera, Barstool's Movie Review Database. Allows users to find reviews by movie title, director or genre. Reviews are sortable by filters and different score categories are able to be shown on each review in the list. Clicking on a review brings you to a page showing all the information available in the database about that review and an associated movie poster if available.

### Features

- Site uses React on the front-end and gets data from a MongoDB Atlas DB by using an Express back-end.
- Front-end uses [infinite scroll](https://www.npmjs.com/package/react-infinite-scroll-component) to limit the number of list items that render and [match-sorter](https://www.npmjs.com/package/match-sorter) to quickly search through the data.
- All data originally comes from the [review spreadsheet](https://docs.google.com/spreadsheets/d/131-Qctb-HYGmvNGmCG5pheNpeQbN2kL05UIRktmTAIc/edit?usp=sharing) and is saved in the database.
- Movie posters gotten from the [OMDB API](http://www.omdbapi.com).

### API

- Back end acts as an API and is accessible at the following routes:
  * **GET** /api/reviews: Returns all the reviews and their information in the database.
  * **GET** /api/reviews/{title}: Returns the information of the review whose title matches the title parameter.
