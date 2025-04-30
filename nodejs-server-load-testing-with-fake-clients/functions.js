function randomIp() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

module.exports = {
  generatePayload: function (userContext, events, done) {
    const now = Date.now();
    userContext.vars.payload = { clientTime: now };
    userContext.vars.ip = randomIp();
    return done();
  },
};
