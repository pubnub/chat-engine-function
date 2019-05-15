# ChatEngine Server

This repository contains the REST API running as a PubNub function that is required for
the [ChatEngine Framework](https://github.com/pubnub/chat-engine/) to operate.

## ChatEngine Application and Key Provisioning Guide

To setup ChatEngine on PubNub, one must first setup a new PubNub App. The following outlines how to manually setup a PubNub ChatEngine Key.

Setup an account, create a set up pubsub keys, configure these keys to 

### Basic Steps
1. Navigate to [PubNub's Portal](pubnub.com), sign in, and select the _Create New App_ button at the top-right of the logged in user's app page.
1. Enter an App name (e.g. `ChatEngine Application`) and click the _Create_ button.
1. Select the newly made App icon and navigate to the _Demo Keyset_.
1.  The following setting need to be updated on the key:

| **Presence**      | `on` |
|:--------------|:--------:|
| Announce Max | `20` | 
| Interval | `10` |
| Presence Deltas | `Disabled` |
| Generate Leave on TCP FIN or FIN | `Disabled` |
| Global Here Now | `Enabled` |
| Debounce | `2` |
| Callback State Change | `https://pubsub.pubnub.com/v1/blocks/sub-key/` <br> `__SUB_KEY__/chat-engine-server?route=user_state` |

| **Storage & Playback** | `on` |
|:--------------|:--------:|
| Retention | `7 days` |

| **Stream Controllers** | `on` |
|:--------------|:--------:|
| Enable Wildcard Subscribe | `Enabled` |

| **PubNub Functions** | `Enabled` |
|:--------------|:--------:|

| **Access Manager** | `Enabled` |
|:--------------|:--------:|

## ChatEngine Server Provisioning Guide

### Basic Steps

#### I. Bundle Server Code
1. Clone the `chat-engine-server` repo and run `npm install`
1. Created a bundled function at `app/functions/server.js` by running  `npm run build`
1. Run `npm test` to verify that the bundle is correct
1. Copy the code to your clipboard for later use.

#### II. Create a PubNub REST Function 

1. Go to the ChatEngine App and Key setup in the previous guide: [ChatEngine Application and Key Provisioning Guide]()
1. Select the _Functions_ tab on the top left-hand side of the ChatEngine Application.
1. Fill out the following text fields and click the _Create New Module_ button:

	| Field	| Value |
	|:------|:-----:|
	| _Module Name_: | `ChatEngine Server` |
	| _Module Description_: | `REST Function that powers PubNub ChatEngine` |

	
1. Within the ChatEngine Module, click the _+ create_ button and fill in the following text fields:

	| Field	| Value |
	|:------|:-----:|
	| _Function Name_ | `ChatEngine Server`|
	| _Select Event Type_ | `On Request` |
	| _URI path_ | `chat-engine-server` |

1. Press the _Create_ Function button to navigate to the PubNub Functions Console.
1. With the console open, copy & paste the server code at `app/functions/server.js` into the console editor. 
1. Click the _Save_ button at the top left-hand side of the console editor.
1. Click the _My Secrets_ button, enter the following, and click the _Save_ button (get the `secretKey` from the App and Key [page](admin.pubnub.com)):

	| Field	| Value |
	|:------|:-----:|
	| _Enter Key_ | `secretKey`|
	| _Enter Value_ | `__COPY_AND_PASTE_PUBNUB_SECRET_KEY__` |
	
1. Returning to the console, click the _Start_ Function button in the top right-hand corner of the console.
1. Done! 

## Building Chat Applications with PubNub

For more information on build chat applications with PubNub, see our
[Chat Resource Center](https://www.pubnub.com/developers/chat-resource-center/).