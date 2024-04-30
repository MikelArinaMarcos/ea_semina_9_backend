import { Application, Request, Response } from 'express';
import { ActivityController } from '../controllers/activityController';

export class ActivityRoutes {

    private activity_controller: ActivityController = new ActivityController();

    public route(app: Application) {
        
        app.post('/activity', (req: Request, res: Response) => {
            this.activity_controller.create_activity(req, res);
        });

        app.get('/activity/', (req: Request, res: Response) => {
            this.activity_controller.getAll(req, res);
        });

        app.get('/activity/:id', (req: Request, res: Response) => {
            this.activity_controller.get_activity(req, res);
        });

        app.put('/activity/:id', (req: Request, res: Response) => {
            this.activity_controller.update_activity(req, res);
        });
    }
}