This project was bootstrapped with React, Material UI, TypeScript, json-server, concurrently
## Installing Dependencies

In the project root directory

### `yarn install`

## Available Scripts To Run The Projects

In the project root directory, if you want to run both project server ( Fake API ) and client at the same time, you can run:

### `yarn run dev`

Or you can run both separately:

### `yarn start`
### `yarn run server`

## Main Functionality

* You will find the API endpoint `http://localhost:8000/data` which is depend on `db.json` file in `src/db.json` directory by using `json-server` package.<br />

* You will find an API call to fetch users and interests data.<br />

* You will find error handling is implemented.<br />

* You will find a loader is implemented based on fetching data from the API.<br />

* You will see a list of users.<br />

* Each user has following count.<br />

* Some of users have interests expandable list if you click on the user.<br />

* Each user has a delete button to delete it.<br />

* Each interest has a delete button to delete it.<br />

Thanks Trufla.