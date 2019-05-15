# ChatEngine Server Provisioning Guide

## Basic Steps

### I. Bundle Server Code
1. Clone the ```chat-engine-server``` repo and run ```npm install```
2. Bundle the ChatEngine REST server by running ```gulp bundle```
	- The code outputs to ```app/functions/server.js```
3. Copy the code to clipboard for later use.

### II. Create a PubNub REST Function 

1. Go to the ChatEngine App and Key setup in the previous guide: [ChatEngine Application and Key Provisioning Guide]()
2. Select the _Functions_ tab on the top left-hand side of the ChatEngine Application.
3. Fill out the following text fields and click the _Create New Module_ button:

	| Field	| Value |
	|:------|:-----:|
	| _Module Name_: | ```ChatEngine Server``` |
	| _Module Description_: | ```REST Function that powers PubNub ChatEngine``` |

	
4. Within the ChatEngine Module, click the _+ create_ button and fill in the following text fields:

	| Field	| Value |
	|:------|:-----:|
	| _Function Name_ | ```ChatEngine Server```|
	| _Select Event Type_ | ```On Request``` |
	| _URI path_ | ```chat-engine-server``` |

5. Press the _Create_ Function button to navigate to the PubNub Functions Console.
6. With the console open, copy & paste the server code at ```app/functions/server.js``` into the console editor. 
7. Click the _Save_ button at the top left-hand side of the console editor.
8. Click the _My Secrets_ button, enter the following, and click the _Save_ button (get the ```secretKey``` from the App and Key [page](admin.pubnub.com)):

	| Field	| Value |
	|:------|:-----:|
	| _Enter Key_ | ```secretKey```|
	| _Enter Value_ | ```__COPY_AND_PASTE_PUBNUB_SECRET_KEY__``` |
	
9. Returning to the console, click the _Start_ Function button in the top right-hand corner of the console.
10. Done! 
