# ReduxQL

## Intro

Inspired by Redux and GraphQL, we use single point as query point, eg `dispatch`, then use `action` and `payload` to feed the request.

## Usage

```
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

```
# server

class User {
  const data = [{id: "abc-123", userName: "userName"}]
  getAuthById(id) {
    return data.find((item) => item.id === id)
  }
}

const User = new User();

router.post('/api/dispatch', async (req, res) => {
  const {slice, action, payload, options} = req.body;
  const {ifAwait, ifInput} = options;
  const rsp = ifAwait ? await [slice][action](payload) : [slice][action](payload);
  const input = {slice, action, payload, options};
  const result = ifInput ? {input, rsp} : {rsp};
  res.json(rsp)
})
```
