import { IActivity } from './model';
import activities from './schema';

export default class ActivityService {
    populateUserActivities(activity_filter: { _id: string; }) {
        throw new Error('Method not implemented.');
    }
    getAll(activity_filter: any) {
        throw new Error('Method not implemented.');
    }
    
    public async createActivity(user_params: IActivity): Promise<IActivity> {
        try {
            const session = new activities(user_params);
            const result = await session.save();
            const newActivity: IActivity = { ...result.toObject(), _id: result._id.toString() };
            return newActivity;
        } catch (error) {
            throw error;
        }
    }

    public async filterActivity(query: any): Promise<IActivity | null> {
        try {
            return await activities.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async updateActivity(user_params: IActivity): Promise<void> {
        try {
            const query = { _id: user_params._id };
            await activities.findOneAndUpdate(query, user_params);
        } catch (error) {
            throw error;
        }
    }

    public async getAllA(query: any): Promise<IActivity[] | null> {
        return await activities.find(query);
}
}