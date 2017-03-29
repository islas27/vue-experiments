export function errorAlert (err, msg, type) {
  return {
    type: type,
    message: msg,
    err: err
  }
}

export function successAlert (msg, type) {
  return {
    type: type,
    message: msg
  }
}
