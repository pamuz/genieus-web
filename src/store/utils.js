export function createAttemptActionSet(actionTypeList) {
  return [
    () => {
      return {
        "type": actionTypeList[0]
      };
    },
    (payload) => {
      return {
        "type": actionTypeList[1],
        "payload": payload
      };
    },
    (error) => {
      return {
        "type": actionTypeList[2],
        "error": error
      };
    }
  ];
}
