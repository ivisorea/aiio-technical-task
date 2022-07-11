# base image  
FROM python:3.8   

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# set workdir
WORKDIR /code

# install dependencies  
RUN pip install --upgrade pip  
COPY requirements.txt /code/
RUN pip install -r requirements.txt  

# port where the Django app runs  
EXPOSE 8000  
