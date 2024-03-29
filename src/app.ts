import express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;
    public port: number;

    constructor(routes: Array<any>, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(routes);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(routers: Array<any>) {
        routers.forEach((route) => {
            this.app.use('/products/', route.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on the port ${this.port}`);
        });
    }
}

export default App;