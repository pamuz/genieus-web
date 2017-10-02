// actions/api.js

import _ from 'lodash';

const host = 'http://localhost:5000';
const basePath = '';
const apiBase = host + basePath;

const types = {};
const actions = {};

$.ajax({
  method: 'GET',
  url: 'http://localhost:5000/swagger',
}).done((data, status, xhr) => {
  parseSwagger(data);
}).fail((xhr, status, error) => {
  console.log(xhr);
  console.log(status);
  console.log(error);
});

const supportedMethods = ['get', 'post', 'patch', 'delete'];

function parseSwagger(swaggerData) {
  _.forEach(swaggerData.paths, (path, pathName) => {
    _.forEach(supportedMethods, (methodName) => {
      const method = path[methodName];
      if (method === undefined) return;

      let operationId = method.operationId;
      operationId = _.toUpper(operationId[0]) + operationId.slice(1);
      const snakeUpperOperationId = _.toUpper(_.snakeCase(operationId));
      const actionTypePostfix = snakeUpperOperationId;

      const startActionName = 'start' + operationId;
      const doneActionName = 'done' + operationId;
      const failActionName = 'fail' + operationId;
      const attemptActionName = 'attempt' + operationId;

      types[startActionName] = 'START_' + actionTypePostfix;
      types[doneActionName] = 'DONE_' + actionTypePostfix;
      types[failActionName] = 'FAIL_' + actionTypePostfix;
      types[attemptActionName] = 'ATTEMPT_' + actionTypePostfix;

      const actionStart = function(payload) {
        return {
          type: types[startActionName],
          payload,
        };
      };

      const actionDone = function(response) {
        return {
          type: types[doneActionName],
          response,
        };
      };

      const actionFail = function(error) {
        return {
          type: types[failActionName],
          error,
        }
      };

      const urlReplaceParams = _.template(pathName, {
        interpolate: /{([\s\S]+?)}/g,
      });

      /* 
       * OPTIONS is an object that can have the following properties:
       *   payload: The json payload of the request
       *   pathSubstitutions: An object of values to substitue in the path
       *   query: An object to be converted into the query string
       */
      const actionAttempt = function(options) {
        return (dispatch) => {
          dispatch(actionStart(options));

          const ajaxObject = {};

          if (options.pathSubstitutions) {
            ajaxObject.url = apiBase + urlReplaceParams(options.pathSubstitutions);
          } else {
            ajaxObject.url = apiBase + pathName;
          }

          ajaxObject.method = _.toUpper(methodName);

          if (options.payload !== undefined) {
            ajaxObject.contentType = 'application/json';
            ajaxObject.data = JSON.stringify(options.payload);
          }

          if (options.query !== undefined) {
            ajaxObject.data = options.query;
          }

          const json_web_token = _.get(
            JSON.parse(window.localStorage.getItem('sessionData')), 'json_web_token', undefined);

          if (method.security !== undefined
              && method.security.length > 0
              && json_web_token !== null) {

            ajaxObject.beforeSend = (request) => {
              if (method.security !== undefined
                  && method.security.length
                  && json_web_token !== null) {
                request.setRequestHeader(
                  'Authorization', `Bearer ${json_web_token}`);
              }
            }
          }

          $.ajax(ajaxObject)
           .done((response, status, xhr) => {
             dispatch(actionDone(response));
           }).fail((xhr, status, error) => {
             dispatch(actionFail(xhr));
           });
        }
      };

      actions[startActionName] = actionStart;
      actions[doneActionName] = actionDone;
      actions[failActionName] = actionFail;
      actions[attemptActionName] = actionAttempt;
    });
  });

  console.log(Object.keys(actions));
}

export function actionType(actionName) {
  return types[actionName];
}

export function action(actionName) {
  return actions[actionName];
}
