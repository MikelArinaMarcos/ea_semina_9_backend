import { Request, Response } from 'express';
import { IActivity } from '../modules/activities/model';
import ActivityService from '../modules/activities/service';
import e = require('express');

export class ActivityController {

    private activity_service: ActivityService = new ActivityService();

    public async create_activity(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.title && req.body.description && req.body.rate) {
                const activity_params: IActivity = {
                    title: req.body.title,
                    description: req.body.description,
                    rate: req.body.rate
                };
                const activity_data = await this.activity_service.createActivity(activity_params);
                return res.status(201).json({ message: 'Activity created successfully', user: activity_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getAll(req: Request, res: Response) {
        const activity_filter = { };
        const activity_data = await this.activity_service.getAll(activity_filter);
        return res.status(200).json(activity_data);    
    }

    public async get_activity(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const activity_filter = { _id: req.params.id };
                // Fetch activity
                const user_data = await this.activity_service.populateUserActivities(activity_filter);
                // Send success response
                return res.status(200).json({ data: user_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async update_activity(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const activity_filter = { _id: req.params.id };
                // Fetch user
                const activity_data = await this.activity_service.filterActivity(activity_filter);
                if (!activity_data) {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Activity not found'});
                }
    
                const user_params: IActivity = {
                    _id: req.params.id,
                    title: req.body.title || activity_data.title,
                    description: req.body.description || activity_data.description,
                    rate: req.body.rate || activity_data.rate
                };
                // Update user
                await this.activity_service.updateActivity(user_params);
                //get new user data
                const new_activity_data = await this.activity_service.filterActivity(activity_filter);
                // Send success response
                return res.status(200).json({ data: new_activity_data, message: 'Successful'});
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        } catch (error) {
            // Catch and handle any errors
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}