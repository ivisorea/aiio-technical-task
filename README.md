# Technical Test

This project have two parts. The first one is a backend application that will be used to store and retrieve data from a database. The second part is a frontend application that will be used to display the data from the backend.

The backend is developed using the [Django Rest Framework](https://www.django-rest-framework.org/) and the frontend application use [ReactJS](https://reactjs.org/).

Both applications are running in a Docker environment.

## To Getting Started
Locate the docker-compose file and start the containers

```shell
cd api
$ docker-compose up
```
This command will start the Docker environment and will run the backend and the frontend applications.

Backend application can be accessed using the following URL:

```shell
http://localhost:8000/
```
You can see here the available API endpoints, but if you try to open any of them you will get an error because we still need to make some extra steps for the Django app. 

Open a new tab in you shell and execute the following command. Be sure you are in the same level as the docker-compose file (api folder).

```shell
docker-compose run api python manage.py migrate
```
After the previous command you should be able to access to all the API endpoints without error.

As you can see, we don't have any data in the database yet. Run the following commands to add some demo data. Be sure you are in the same level as the docker-compose file (api folder).


```shell
docker-compose run api python manage.py loaddata products/fixtures/products.json
```
```shell
docker-compose run api python manage.py loaddata products/fixtures/subcategories.json
```
```shell
docker-compose run api python manage.py loaddata products/fixtures/subproducts.json
```

## You are ready to go
Access to frontend application using the following URL. All the required features for this test were implemented.

```shell
http://localhost:3000/
```
