import { Router, Request, Response } from 'express';
import ReportsService from 'services/ReportsService';
import Report from '../entities/Report';
const route = Router();

export default (app: Router) => {
  app.use('/map', route);

  route.use("/test", async (req, res) => {
    console.log("huh");
    res.send("Hello World From test!");
  });

  route.get("/diseases", async (req: Request, res: Response) => {
    console.log("HELLO");
    res.send(await ReportsService.getDiseases());
  });

  route.get("/symptoms", async (req: Request, res: Response) => {
    res.send(await ReportsService.getSymptoms());
  });

  route.post("/report", async (req: Request, res: Response) => {
    console.log(req.body);
    
    if (req.body === undefined) {
      res.status(400).send("No report data provided");
      return;
    }
    const { symptoms, username, lng, lat } = req.body;

    const report = new Report();

    report.symptoms = symptoms;
    report.user = username;
    report.lng = lng;
    report.lat = lat;
    
    if (await ReportsService.addReport(report)) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
      res.statusCode = 400;
    }
    
  });

  route.get("/reports", async (req: Request, res: Response) => {
    const { topLeft, bottomRight, filters } = req.body;

    res.send(await ReportsService.getReports(topLeft, bottomRight, filters));
  });

  route.get("/all", async (req: Request, res: Response) => {
    res.send(await Report.find());
  });
};