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

### Functionality

1. JWT Authentication [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
1. Login Page
1. Main menu, Header, Footer
1. CRUD with REST API and MongoDB (**DONE**)
1. List page, Create/Edit page (**DONE**)

### DevOps

1. CircleCI (**DONE**)
1. Servers (**DONE**)
1. Docker Swarm (**DONE**)

### Способы запуска проекта
1. - npm start
2. - npm run build
   - npm run start-build
3. - npm run build
   - npm run docker-build
   - docker run -e MONGODB_HOST=host.docker.internal -p 8080:8080 -d 972e05ca5a29
4. - npm run docker-build
   - клонируем проект https://github.com/codingbootcampru/bp-devops
   - Stop local mongoDB (на макбуке brew services stop mongodb)
   - создать папку на диске, например: /Users/{$user}/data
   - указать в файле docker-compose.yml по пути services -> mongo -> volumes свой путь на папку из пункта выше, например: " volumes: - "/Users/{$user}/data/mongo:/data/db" "
   - docker swarm init
   - docker stack deploy -c docker-compose.yml mystack
   - docker node ls
   - docker service ls   
