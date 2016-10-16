
let express = require('express')
let serveStatic = require('serve-static')
let app = express()

let pollStatements = [
  {
    id: 10000,
    statement: 'I am satisfied with my roles and responsibilities.',
    commentPlaceholder: 'I\'d like to have more trust to do more difficult tasks. I really think that I\'m underestimated.',
  },
  {
    id: 10001,
    statement: 'I feel like I have a healthy work/life balance.',
  },
  {
    id: 10002,
    statement: 'I feel comfortable working and interacting with colleagues on my team.',
  },
  {
    id: 10003,
    statement: 'I like my work environment, and I believe it helps me perform at my best.',
  },
  {
    id: 10004,
    statement: 'My direct manager gives me necessary support and clear objectives.',
  },
];

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let v = parseInt(req.query.v) || 0

  res.render('poll', {
    v: v,
    statements: pollStatements.sort(s => Math.random()),
  })
})

app.post('/', (req, res) => {
  res.render('poll-answer')
})

app.use(serveStatic(__dirname + '/public'))

app.listen(3000, () => {
  console.log('Running Butterfly poll example on port 3000')
})
