## MaaS

## Versions
* Vue version
  - 2.6.11
* Node Version
    - node 14.17.0 (recommended)

    
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

## To keep in mind

* The .env is versioned on git so any person can start to play with the project
  without any extra requirement

## Project structure

### Folders

* Views
  - Contain all the application views
* Utils
  - Contain all the necessary utils to format and parse all the application data
  using functions
    - The service utils is the main util, it helps the application to assemble the calendar for
  the selected service and week, it also helps to assemble the resume data.
* Style
  - Contain the application style, the applications uses tailwind and buefy and is fully
  build with both tools
* Store
  - Contain the vuex store files, the application is segmented in a principal store with
  two importants modules (User and Service)
    - The service module is also segmented in work shifts and week modules, this combination
  helps the Service view to show the service calendar, handle the work shift assigment and 
      show the resume of a service
* Router
  - Contain the router configuration
* Locales
  - Contain the translations files, by default the application uses all the messages on English
  so if the translator fallback it will show a coherent message
* Components
  - Contain the shared components between views or the components that are not Views, like 
  presentational components
* Assets
  - Contain all the application assets
* Api
  - Contain all the api config, requests structure, and a doRequest method that it handle an Axios request and return
  the data of the response

