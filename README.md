<div align="center">
<p>
  <img src="images/logo.png" alt="Logo FaktaIklim">
</p>
</div>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
- [Development](#development)
- [Production](#production)

## About The Project

<b>FaktaIklim</b> is a web application to verify information and trace hoax news related to climate.<br>
This is the front-end part of FaktaIklim application.<br>
It requires the back-end part to work properly.

### Built With

- [Node.js 20](https://nodejs.org)
- [Quasar 2.16.0](https://quasar.dev)

## Installation

1. Clone the repository
   ```sh
   $ git clone https://github.com/prosa-ai-id/faktaiklim-web-app.git
   ```
2. Change active directory to the project folder
   ```sh
   $ cd faktaiklim-web-app
   $ cd quasar-project
   ```
3. Install required dependencies
   ```sh
   $ npm install
   ```
4. Create a new file named `.env` and set required environment variables inside.
   ```sh
   $ cp .env.example .env
   ```
   Edit BACKEND_HOST and TELEGRAM_CHATBOT_URL

## Development

To run the application in development mode:

```sh
$ quasar dev
```

To run the application in development mode on specific port (ex. 8000):

```sh
$ quasar dev -p 8000
```

To run the application in development mode without installing Quasar globally:

```sh
$ npm run dev
```

## Production

1. Build instruction
   ```sh
   $ quasar build
   ```
   or
   ```sh
   $ npm run build
   ```
   This command will output the production ready bundle to a newly created folder `/dist/spa`<br>
2. To serve the production files it is required to use a web server such as `nginx`.<br>
3. The web server must be able to serve static files from a directory.<br>
4. Configure the web server so it can handle the application in history mode. Please refer to this [example](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).<br>

