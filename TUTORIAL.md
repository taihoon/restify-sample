### required
MongoDB와 Node.js를 설치해야 합니다.
* mongodb https://www.mongodb.org/
* nodejs https://nodejs.org/
> OSX에서는 [Homebrew](http://brew.sh/)를 사용하면 쉽게 설치 할 수 있습니다.

### directories
```
restify
  ├─ /models
  │     └─ memo.model.js
  └─ app.js

```

> 예제로 사용한 파일들은 https://github.com/kishu/restify-sample 에서 확인 할 수 있습니다.

### node modules 설치
```bash
npm install express-restify-mongoose mongoose restify
```

### app.js
``` javascript
"use strict";
const erm = require("express-restify-mongoose");
const mongoose = require("mongoose");
const restify = require("restify");

mongoose.connect("mongodb://localhost/memo");

const server = restify.createServer();
server.use(restify.bodyParser());

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
```

> see more http://restify.com/

### models/memo.model.js
``` javascript
"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user: String,
	contents: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Memo", schema);
```

> see more http://mongoosejs.com/

### app.js again It's SHOWTIME!!!
```javascript
...
const restify = require("restify");
const memoModel = require("./models/memo.model");

...
server.use(restify.bodyParser());
erm.defaults({restify: true});
erm.serve(server, memoModel, {name: "memos"});
...
```

> see more https://florianholzapfel.github.io/express-restify-mongoose

### run
```
$ node app
```

### test
```bash
$ curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/api/v1/memos -d '{"contents":"restify로 REST API 서버 만들기"}'

HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 129
Date: Thu, 07 Apr 2016 02:36:01 GMT
Connection: keep-alive

{"__v":0,"contents":"restify로 REST API 서버 만들기","_id":"5705c7918b5b12bf9f0b0f0f","created":"2016-04-07T02:36:01.391Z"}
```
```bash
$ curl http://localhost:8080/api/v1/memos

[{"_id":"5705c7918b5b12bf9f0b0f0f","contents":"restify로 REST API 서버 만들기","created":"2016-04-07T02:36:01.391Z","__v":0}]
```

### and MORE
- GET /api/v1/memos/count
- GET /api/v1/memos
- POST /api/v1/memos
- DELETE /api/v1/memos
- GET /api/v1/memos/:id
- GET /api/v1/memos/:id/shallow
- PUT /api/v1/memos/:id
- POST /api/v1/memos/:id
- PATCH /api/v1/memos/:id
- DELETE /api/v1/memos/:id
- GET /api/v1/memos?sort={"created": -1}
- GET /api/v1/memos?skip=10
- GET /api/v1/memos?limit=10
- GET /api/v1/memos?query={"contents": {"$regex": "^(Restify)"}}
- GET /api/v1/memos?select=contents

see more https://florianholzapfel.github.io/express-restify-mongoose/#querying