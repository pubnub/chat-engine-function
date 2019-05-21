# ChatEngine Framework Server

This repository contains the REST API running as a PubNub function that is required for
the [ChatEngine Framework](https://github.com/pubnub/chat-engine/) to operate.

Documentation
You can find the full docs on the [documentation website](https://pubnub.github.io/chat-engine-server/).

## Provisioning the ChatEngine Framework Application and Key

To set up PubNub to host the ChatEngine Framework REST API on a PubNub Function, you must first set up a new PubNub App.
The following outlines how to manually set up a PubNub ChatEngine Framework Application and Key.

1. Navigate to [PubNub's Portal](https://dashboard.pubnub.com/), sign in, and select _Create New App_.
1. Enter an App name (e.g. `ChatEngine Application`) and click _Create_.
1. Select the newly made App icon and navigate to the _Demo Keyset_.
1. Update the following setting on the keyset:

| **Presence**                     |                                                 `on`                                                  |
| :------------------------------- | :---------------------------------------------------------------------------------------------------: |
| Announce Max                     |                                                 `20`                                                  |
| Interval                         |                                                 `10`                                                  |
| Presence Deltas                  |                                              `Disabled`                                               |
| Generate Leave on TCP FIN or FIN |                                              `Disabled`                                               |
| Global Here Now                  |                                               `Enabled`                                               |
| Debounce                         |                                                  `2`                                                  |
| Callback State Change            | `https://pubsub.pubnub.com/v1/blocks/sub-key/` <br> `__SUB_KEY__/chat-engine-server?route=user_state` |

| **Storage & Playback** |   `on`   |
| :--------------------- | :------: |
| Retention              | `7 days` |

| **Stream Controllers**    |   `on`    |
| :------------------------ | :-------: |
| Enable Wildcard Subscribe | `Enabled` |

| **PubNub Functions** | `Enabled` |
| :------------------- | :-------: |


| **Access Manager** | `Enabled` |
| :----------------- | :-------: |


## Provisioning the ChatEngine Framework Function

### Bundle the server Server Code

The REST API is composed of several files to improve understandability. The files
must be bundled into a single function to upload to PubNub.

1. Clone the `chat-engine-server` repo and run `npm install`.
1. Run `npm run build` to create a bundled function at `build/server.js`.
1. Run `npm test` to verify that the bundle is correct.
1. Copy the code to your clipboard for later use.

### Create a PubNub REST Function

1. On your [PubNub Admin Dashboard](https://dashboard.pubnub.com/), go the ChatEngine app key you set up in the previous section to upload your Function.
1. Select the _Functions_ tab on the top left side of the page.
1. Fill out the following text fields and click _Create New Module_:

   | Field                 |                     Value                     |
   | :-------------------- | :-------------------------------------------: |
   | _Module Name_:        |              `ChatEngine Server`              |
   | _Module Description_: | `REST Function that powers PubNub ChatEngine` |

1. Within the ChatEngine Module, click _create_ and fill in the following text fields:

   | Field               |        Value         |
   | :------------------ | :------------------: |
   | _Function Name_     | `ChatEngine Server`  |
   | _Select Event Type_ |     `On Request`     |
   | _URI path_          | `chat-engine-server` |

1. Click _Create_ Function to navigate to the PubNub Functions Console.
1. With the console open, copy and paste the server code from `build/server.js` into the console editor and click _Save_.
1. Click _Save_ at the top left side of the console editor.
1. Click _My Secrets_, and enter the following, (get the `secretKey` from the App and Key [page](admin.pubnub.com)):

   | Field         |                 Value                  |
   | :------------ | :------------------------------------: |
   | _Enter Key_   |              `secretKey`               |
   | _Enter Value_ | `__COPY_AND_PASTE_PUBNUB_SECRET_KEY__` |

1. Click _Save_.
1. Returning to the console, click _Start_ Function and you are done.

## Building Chat Applications with PubNub

For more information on build chat applications with PubNub, see our
[Chat Resource Center](https://www.pubnub.com/developers/chat-resource-center/).
