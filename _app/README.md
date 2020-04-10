The app loads at the index of the server.

The data is retrieved from the `GET /data` endpoint

## Roadmap

There are plans to represent the following data visually:

- Armed status
- Fleeing status
- States
- Date representation

## Data

### Updating the data

To update the data, you'll need to add a local reference to the original repo, which we'll call `upstream`.

Run the following commands:

```sh
git remote add upstream git@github.com:washingtonpost/data-police-shootings.git
git fetch upstream
git checkout master # or your branch
git merge upstream/master
git checkout --ours README.md # Ignore the updated README.md which has conflicts
```

### Transforming the data for the app

We need to transform the data to JSON so that the app can use it. Run the following command:

    npm run data


## Development

To run the development server:

    npm install
    npm run dev

The application is served on the port mentioned in the console.
