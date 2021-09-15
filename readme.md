# React Redux Webpack template

    Front end boilderplate configured with react and redux saga.

Script you can execute

1.  **START** "cross-env NODE_PATH=src/ NODE_ENV=development webpack-dev-server --open",
2.  **BUILD** "cross-env NODE_PATH=src/ NODE_ENV=production webpack"
3.  **extract** "Extract language components"
4.  **compile** Compiles .po files (languages) into .js file

## Folder structure >

Entry folder is **src** and with webpack and cross-env you can import on evry file tree directyle from src ex : import Test from 'test/index.js' . (Even if you are deep inside folder treee it searches first from **src**).

Folder Tree ( rectangular[] ->folder ) === (rhombus<> -> file with extension)

```mermaid
graph LR
A[src]  --> B[assets]
B[assets] --> B1[defaults]
B[assets] --> B2[fonts]
B[assets] --> B3[images]
B3[images] --js file where images are imported --> B3.1{index.js}
A --> C[routes]
C[routes] --routes with login --> C1[private]
C[routes] --js file where routes are imported --> C3{index.js}
C[routes] --routes without login--> C2[public]
A --> D{App.jsx}
A --> E{Root.jsx}

```

```mermaid
graph LR
A[redux-store] --Redux model files > inital state and reducers--> B[models]
B[models] --> B1{model1.js}
B[models] --> B2{model2.js}
B[models] --> B3{index.js}
A[redux-store]--generator functions ,api call, socket handler, logic handler  --> C[sagas]
C[sagas]--> C1{file_saga1.js}
C[sagas] --import all sagas here > Root Saga--> C3{index.js}
C[sagas] --> C2{file_saga2.js}
A[redux-store] --configured store file wich is import on the Root.jsx --> D{store.js}

```

```mermaid
graph LR
A[services] -- File with rest api functions > request are done here and handled on saga generator functions  --> B{service1.js}
A[services] --> C{service2.js}

```

## Root folder files

> **.linguirc** (setup all language translation used and select wich folder to include)
> **.prittierrc** (code formatting settings with prettier Extension **esbenp.prettier-vscode** )
> **babel-config.js** (babel plugin for code syntacs to work for older browsers ex:Es7 , proposals, etc)
> **manifest.config.js** (manifest of the website, title favioc descripton keywords etc)
> **paths.js** (js file imported on webpack configs for folder paths)
> **template.html** (Initial html file for the project)

> **webpack files** (webpack plugins and configs for diffrent environments, minification,chunks,import configs)

1.  **weback.common.js** (configuration used on both development and production folder)
2.  **webpack.config.js** (initial webpack config file)
3.  **webpack.dev.js** (configuration used only on development while coding)
4.  **webpack.prod.js** (configuration used only on build production)
