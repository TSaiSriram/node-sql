import App from './app';
import DataRoute from './routes/node-db.route';

const app = new App(
    [
        new DataRoute(),
    ],
    8080,
);

app.listen();