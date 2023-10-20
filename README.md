# ReduxQL

## Intro

Inspired by Redux and GraphQL, we use single point as query point, eg `dispatch`, then use `action` and `payload` to feed the request.

## Usage

```
fetch('/api/dispatch', {
  method: "post",
  body: JSON.stringify({
    action: 'getAuthById',
    payload: {
      id: "abc-123",
    }
  })
})
```
