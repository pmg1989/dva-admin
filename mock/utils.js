export function getBody(req) {
  // console.log(req);
  return JSON.parse(req.body)
}
