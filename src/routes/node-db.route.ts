import { Request, Response, Router } from 'express';
import nodeDBService from '../services/data.service';

export default class SampleRoute {
    // private readonly PATH = '/data';
    private readonly sampleService = new nodeDBService();
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post('/addProductData', async (req: any, res: any) => {
            try {
                const addProductData: any = await this.sampleService.addProductData(req.body)
                if (!addProductData.status) return res.status(400).send(addProductData);
                console.log(addProductData)
                return res.status(201).send(addProductData.data);
            } catch (err) {
                return console.log(err);
            }
        });

        this.router.get('/getProductData', async (req: Request, res: Response) => {
            try {
                const getProductData: any = await this.sampleService.getProductData();
                if (!getProductData.status) return res.status(400).send(getProductData);
                return res.status(201).send(getProductData.data);

            } catch (err) {
                return console.log(err);
            }

        });

        this.router.get('/getProductByID/:id', async (req: Request, res: Response) => {
            try {
                const getProductByID: any = await this.sampleService.getProductByID(req.params.id);
                if (!getProductByID.status) return res.status(400).send(getProductByID);
                return res.status(201).send(getProductByID.data);

            } catch (err) {
                return console.log(err);
            }
        });

        this.router.put('/updateProductData/:id', async (req: Request, res: Response) => {
            try {
                const updateProductData: any = await this.sampleService.updateProductData(req);
                if (!updateProductData.status) return res.status(400).send(updateProductData);
                return res.status(201).send(updateProductData)
            } catch (err) {
                return console.log(err);
            }
        });

        this.router.delete('/deleteProductData/:id', async (req: Request, res: Response) => {
            try {
                const deleteProductData: any = await this.sampleService.deleteProductData(req.params.id);
                if (!deleteProductData.status) return res.status(400).send(deleteProductData);
                return res.status(201).send(deleteProductData);
            } catch (err) {
                return console.log(err)
            }
        });

        this.router.get('/unionProductData', async (req: Request, res: Response) => {
            try {
                const unionProductData: any = await this.sampleService.unionProductData();
                if (!unionProductData.status) return res.status(400).send(unionProductData);
                return res.status(201).send(unionProductData);
            } catch (err) {
                return console.log(err)
            }
        });

    }

}