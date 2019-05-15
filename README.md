# ChatEngine Server

This repository contains the REST API running as a PubNub function that is required for
the ChatEngine Framework.

This requires creating a Keyset in the PubNub administration UI.

[How to Setup your Keyset](guides/ChatEngine_Application_and_Key_Provisioning.md)

Once your keyset is created, you should build the function in this repository and
upload it to your keyset.

[How to Provision your Function](guides/ChatEngine_Server_Provisioning_Guide.md)

## Working with this Repository

### Preparing your Repository

Clone the repository using git, then run:

```
npm install
```


### To build the Function

```
npm run build
```

### To run the test Suite

```
npm test
```

### To generate the API Reference documentation

```
npm run build-docs
```
