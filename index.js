
import express from 'express';
import { appRouter } from './modules/index.router.js';


const app = express();
const port = process.env.PORT || 3000;

appRouter(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});