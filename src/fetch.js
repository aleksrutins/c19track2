const { Soup } = imports.gi;

var fetch = (url, method = 'GET') => {
  let session = Soup.Session.new();
  let msg = Soup.Message.new(method, url);
  session.send_message(msg);
  return msg.response_body.data;
}
