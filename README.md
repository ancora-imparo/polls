
# Polls

## About the project

#### Checkout the app client at https://ancora-imparo-polls-web.netlify.app/
#### Server:	https://ancora-imparo-polls-api.herokuapp.com

![polls-client](https://user-images.githubusercontent.com/36930635/120650488-77928c80-c49b-11eb-92cc-a41dbe61c555.png)

## App Stack:
-  Client:
	- NextJs
	- REST API
	
- Server: 
	- NodeJs
	- Express 
	- Firebase Realtime Database

## Endpoints

####  GET
- `/`- health check
- `/sdk`- firebase configuration
- `/polls`- all polls

####  POST
- `/polls/create`- create a new poll
- `/polls/count`- increment *count* of a poll
