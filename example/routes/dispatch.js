var express = require("express");
var router = express.Router();

class User {
  data = [{ id: "abc-123", userName: "userName" }];
  getAuthById({ id }) {
    return this.data.find((item) => item.id === id);
  }
}

const user = new User();
const store = {
  user,
};

router.post("/", async (req, res, next) => {
  const { slice, action, payload, options } = req.body;
  console.log("req", req.body);
  const { ifAwait, ifInput } = options || {};

  console.log("[slice][action](payload)", slice, action, payload);
  const rsp = ifAwait
    ? await store[slice][action](payload)
    : store[slice][action](payload);
  const input = { slice, action, payload, options };
  const result = ifInput ? { input, rsp } : { rsp };
  res.json({ ...result });
});

module.exports = router;
