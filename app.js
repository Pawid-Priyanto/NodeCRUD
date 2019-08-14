const express = require('express');
const app = express();
// connect DB
 require('./db');

//  import routes file
 const index_routes = require("./routes/index")
 const user_routes = require("./routes/user")
 const product_routes = require("./routes/product")

 // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// check browser
app.get('/', (req, res) => res.send(`<h1>API\'s Works!<h1>`));

// set routes imported
app.use('/index', index_routes)
app.use('/user', user_routes)
app.use('/product', product_routes)

// konek server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in PORT ${PORT}`));