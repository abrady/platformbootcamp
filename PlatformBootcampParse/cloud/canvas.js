var express = require('express');
var fb_app_id = '1425432864413287';
var parseconfig = {
  app_id: 'as6j7oRSjIfY2lEtb4xbWucOtz8moXiFvih1ZqtW',
  javascript_key: 'ky2DMjqLIKgIl9o5H99nx9eZ2sa1cu373q7jpcB7'
};
// Global app configuration section
var app = express();
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


// canvas endpoint
// ============================================================

function canvas(req, res) {
  res.render('canvas', { fbconfig: { app_id: fb_app_id}, parseconfig: parseconfig });
}
app.post('/canvas', canvas);
app.get('/canvas', canvas);

app.listen();
