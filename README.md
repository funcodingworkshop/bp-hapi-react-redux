# Hapi React Redux Boilerplate

Boilerplate Project for fast start with React, Redux, Hapi and Material UI

## TODO

### Server

1. Babel config for Backend (**DONE**)
1. Hapi Server (**DONE**)
1. MongoDB (**DONE**)
1. [Joi](https://github.com/hapijs/joi) schema validation
1. Testing with [hapijs/lab](https://github.com/hapijs/lab)
1. API documentation with [hapi-swagger](https://github.com/glennjones/hapi-swagger)

### Client

1. Webpack + Babel config for Frontend (**DONE**)
1. React (**DONE**)
1. Redux (**DONE**)
1. Loaders for images, css, postCSS (**DONE**)
1. React Router (**DONE**)
1. [Material UI](https://www.material-ui.com/) components (**DONE**)
1. Saga middleware (**DONE**)
1. Server Side Rendering (SSR)
1. Formik or Redux Form - for form creation
1. Async data loading and validation
1. [CSS Modules](https://github.com/css-modules/css-modules)
1. Testing with [Jest](https://facebook.github.io/jest/docs/en/tutorial-react.html) (**DONE**)
1. Hot Reload

### Functionality

1. JWT Authentication (**DONE**)
1. Login Page (**DONE**)
1. Main menu, Header, Footer (**DONE**)
1. CRUD with REST API and MongoDB (**DONE**)
1. List page, Create/Edit page (**DONE**)
1. Loaders
1. Error notifications
1. Sign In / Sign Up validations

### DevOps

1. CircleCI (**DONE**)
1. Servers (**DONE**)
1. Docker Swarm (**DONE**)

### Ways to start project
1. Start Dev Mode
    - `npm start`
2. Start Build
    - `npm run build`
    - `npm run start-build`
3. Start Build in Docker (for MacOS)
    - `npm run build`
    - `npm run docker-build`
    - `docker run -e MONGODB_HOST=host.docker.internal -e SERVICE_HOST=host.docker.internal:3001 -p 8080:8080 -d 972e05ca5a29`
4. Start Build in Docker Swarm (for MacOS)
    - `npm run docker-build`
    - clone project https://github.com/codingbootcampru/bp-devops
    - Stop local mongoDB (for MacOS: `brew services stop mongodb`)
    - create local folder, for example: /Users/{$user}/data
    - edit docker-compose.yml set services->mongo->volumes your local folder path, for example: " volumes: - "/Users/{$user}/data/mongo:/data/db" "
    - `docker swarm init`
    - `docker stack deploy -c docker-compose.yml mystack`
    - `docker node ls`
    - `docker service ls`
