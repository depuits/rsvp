# RSVP

RSVP website for wedding.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To start working you will need to install the following:
* [NodeJs](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/) (Usually installed with NodeJs)
* [MongoDb](https://www.mongodb.com/).

### Installing

First clone repository and start the mongo database.

#### Server

1. Go to server directory `cd server`
2. Install dependencies `npm i`
3. Update config
4. Run the server `npm start`

You can now acces the server on http://localhost:8083.

#### Client

1. Go to client directory `cd client`
2. Install dependencies `npm i`
3. Update enviroment variables (.env file)
4. Start dev server for client `npm start`

You can now acces the client on http://localhost:8080/rsvp.

## Deployment

Start by updating the configs for the production enviroment.

For the deployment you should go inside the client folder and then run `npm run build`. This will create a production build from the client under the folder `client/dist`. This folder can then be served to the client using the server by moving these files to the `server/client` folder.

Then in your production setup you only need to run the server to go live.

## Built With

* [NodeJs](https://nodejs.org/en/)

* [Vue](https://vuejs.org/)
* [buefy](https://buefy.org/)
* [axios](https://github.com/axios/axios)

* [express](https://expressjs.com/)
* [mongodb](https://www.mongodb.com/)
* [Node-config](https://lorenwest.github.io/node-config/)
* [svg-to-pdfkit](https://github.com/alafr/SVG-to-PDFKit)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.
