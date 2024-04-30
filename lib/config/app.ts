import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import environment from "../environment";
import { UserRoutes } from "../routes/user_routes";
import { CommonRoutes } from "../routes/common_routes";
import { ActivityRoutes } from "../routes/activity_routes";


class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

   private common_routes: CommonRoutes = new CommonRoutes();
   private user_routes: UserRoutes = new UserRoutes();
   private activity_routes: ActivityRoutes = new ActivityRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.user_routes.route(this.app);
      this.activity_routes.route(this.app);
      this.common_routes.route(this.app);
      
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      // Enable CORS for all origins
      this.app.use(cors());
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl)
          .then(() => {
              console.log("MongoDB connected successfully.");
          })
          .catch((err) => {
              console.error("MongoDB connection error:", err);
          });
  }
}
export default new App().app;