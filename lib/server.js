import express from 'express';
import fileUpload from 'express-fileupload';
// import serverRender from './serverRender';
import config from './config';
import productsRoute from './router/productsRoute';
import customersRoute from './router/customersRoute';
import salesRoute from './router/salesRoute';
import purchasesRoute from './router/purchasesRoute';
import db from './utils/db';

// initialize express
const app = express();

// db connection
db.connection.on('connected', () => console.log('mongoose connected'));
db.connection.on('error', () => console.log('error'));

// parser to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// express routes
app.use("/api/products/", productsRoute);
app.use("/api/customers/", customersRoute);
app.use("/api/sales/", salesRoute);
app.use("/api/purchases/", purchasesRoute);

// webpack build generated static files folder and templating engine used to serve static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// express default route or root route
app.get("/*", (req, res) => {
  // const initialContent = serverRender()
  res.render("index");
});

// express listening port
app.listen(config.port, () => {
  console.log(`now listening on ${config.port}`);
});