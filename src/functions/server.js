import config from "./config";

import rejectionResponse from "./responses/rejection";
import grantResponse from "./responses/grant";

import keyChatMeta from "./helpers/keyChatMeta";
import keyUserState from "./helpers/keyUserState";

import authPolicy from "./authPolicy";

import validateAuthKey from "./validate/authKey";
import validateChannel from "./validate/channel";
import validateChat from "./validate/chat";
import validateGlobal from "./validate/global";
import validateMeta from "./validate/meta";
import validateRoute from "./validate/route";
import validateUUID from "./validate/uuid";

import bootstrapPost from "./controllers/bootstrapPost";
import userReadPost from "./controllers/userReadPost";
import userWritePost from "./controllers/userWritePost";
import groupPost from "./controllers/groupPost";
import grantPost from "./controllers/grantPost";
import joinPost from "./controllers/joinPost";
import leavePost from "./controllers/leavePost";
import invitePost from "./controllers/invitePost";
import chatPost from "./controllers/chatPost";
import chatGet from "./controllers/chatGet";
import userStatePost from "./controllers/userStatePost";
import userStateGet from "./controllers/userStateGet";

export default (request, response) => {
  response.headers["Access-Control-Allow-Origin"] = "*";
  response.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";
  response.headers["Access-Control-Allow-Methods"] =
    "GET, POST, OPTIONS, PUT, DELETE";

  // Choose route based on request.params and request.method
  // Execute the controller function in the controllers object
  const route =
    request.params.route ||
    (request.path && request.path.split("/chat-engine/")[1]) ||
    false;
  const method = request.method.toLowerCase();

  // parse the request body as JSON
  request.body = JSON.parse(request.body);

  // this is a map of routes to controller functions
  let controllers = {
    bootstrap: {
      post: bootstrapPost
    },
    user_read: {
      post: userReadPost
    },
    user_write: {
      post: userWritePost
    },
    group: {
      post: groupPost
    },
    grant: {
      post: grantPost
    },
    join: {
      post: joinPost
    },
    leave: {
      post: leavePost
    },
    invite: {
      post: invitePost
    },
    chat: {
      post: chatPost,
      get: chatGet
    },
    user_state: {
      post: userStatePost,
      get: userStateGet
    }
  };

  // --------------- end url routes ---------------

  // validate the controller inputs
  function executeRoute() {
    return validateRoute(controllers, route, method)
      .then(() => authPolicy())
      .then(() => controllers[route][method](request, response));
  }

  function routeError(errData) {
    let status = 500;
    let message = "oh no, something went wrong";

    if (errData) {
      status = errData.status;
      message = errData.message;
    }

    response.status = status;
    return response.send(message);
  }

  return executeRoute().catch(routeError);
};
