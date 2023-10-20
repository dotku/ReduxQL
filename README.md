# ReduxQL

## Intro

Inspired by Redux and GraphQL, we use single point as query point, eg `dispatch`, 
then use `action` and `payload` to feed the request.

## Usage

```js
# client
fetch('/api/dispatch', {
  method: "post",
  body: JSON.stringify({
    slice: 'User',
    action: 'getAuthById',
    payload: {
      id: "abc-123",
    },
    options: {
      ifAwait: true,
      ifInput: true
    }
    
  })
})
```

```js
# server

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
```
