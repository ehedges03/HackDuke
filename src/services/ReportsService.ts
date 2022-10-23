import Report from "entities/Report";
import Symptom from "entities/Symptom";
import Disease from '../entities/Disease';

const ACCURACY = 2; // Miles

interface IReport {
  /** Size in miles of a full radius */
  fullRad: number;
  points: {
    /** Latitude of the point */
    lat: number;
    /** Longitude of the point */
    lng: number;
    /** Percentage size of full radius */
    size: number;
  }[];
}

type point = { lat: number, lng: number };

class ReportsService {
  // private symptomRepository: Repository<Symptom>;
  // private symptomMapRepository: Repository<SymptomMap>;

  constructor() {
    // this.symptomRepository = getRepository(Symptom);
    // this.symptomMapRepository = getRepository(SymptomMap);


  }

  public async getDiseases(): Promise<Disease[]> {
    return Disease.find();
  }

  public async getSymptoms(): Promise<Symptom[]> {
    return Symptom.find();
  }

  public async addReport(report: Report) {
    // TODO: Remove old user report

    if (report.symptoms?.length == 0 || report.user == null) {
      return false;
    }

    const {lng, lat} = quantizeCoord(report.lng, report.lat);
    report.lng = lng;
    report.lat = lat;

    await Report.save(report);
    return true;
  }

  public async getReports(topLeft: point, bottomRight: point, 
    filters: number[]): Promise<IReport> { 
    const reports = await Report.createQueryBuilder()
      .select("report")
      .from(Report, "report")
      // .where("report.created > NOW() - INTERVAL '1 day'")
      .where("report.lat > :topLeftLat", {topLeftLat: topLeft.lat})
      .andWhere("report.lat < :bottomRightLat", 
        {bottomRightLat: bottomRight.lat})
      .andWhere("report.lng > :topLeftLng", {topLeftLng: topLeft.lng})
      .andWhere("report.lng < :bottomRightLng", 
        {bottomRightLng: bottomRight.lng})
      .getMany();

    let mostNodes = 0;
    const nodes: { [key: string]: number } = {};

    const filteredReports = filters.length > 0 ? reports.filter((report) => {
      if (report.symptoms.some((symptom) => {
        return filters.includes(parseInt(symptom as unknown as string));
      })) {
        // eslint-disable-next-line max-len
        const key = String(Math.floor(report.lng * 100) + Math.floor(report.lat * 100));
        nodes[key] = 1 + (nodes[key] == null ? 0 : nodes[key]);
        if (nodes[key] > mostNodes) {
          mostNodes = nodes[key];
        }
        return true;
      } 
      return false;
    }) : (() => {
      reports.forEach((report) => {
        // eslint-disable-next-line max-len
        const key = String(Math.floor(report.lng * 100) + Math.floor(report.lat * 100));
        nodes[key] = 1 + (nodes[key] == null ? 0 : nodes[key]);
        if (nodes[key] > mostNodes) {
          mostNodes = nodes[key];
        }
      });
      
      return reports;
    })();

    if (filteredReports.length === 0) {
      return {
        fullRad: 0,
        points: [],
      };
    }

    const fullRad = getDistance(topLeft, bottomRight);

    return ({
      fullRad,
      points: filteredReports.map((report) => {
        return {
          lat: (Math.round((report.lat - topLeft.lat) / fullRad) * fullRad) 
            + topLeft.lat,
          lng: (Math.round((report.lng - topLeft.lng) / fullRad) * fullRad)
            + topLeft.lng,
          // eslint-disable-next-line max-len
          size: nodes[String(Math.floor(report.lng * 100) + Math.floor(report.lat * 100))] / mostNodes,
        };
      }),
    });

  }

}

const LNG_ACCURACY = ACCURACY / 54.6;
const LAT_ACCURACY = ACCURACY / 69;

function quantizeCoord(lng: number, lat: number) {
  lng = Math.floor(lng) + Math.ceil((lng % 1) / LNG_ACCURACY) * 
    LNG_ACCURACY;

  lat = Math.floor(lat) + Math.ceil((lat % 1) / LAT_ACCURACY) *
    LAT_ACCURACY;

  return { lng, lat };
}

const LONG_SIDE_NODES = 50;

function getDistance(topLeft: point, bottomRight: point): number {
  const latDiff = Math.abs(90 + topLeft.lat - bottomRight.lat) - 90;
  const lngDiff = Math.abs(180 + topLeft.lng - bottomRight.lng) - 180;

  if (latDiff > lngDiff) {
    if (latDiff / LAT_ACCURACY < LONG_SIDE_NODES) {
      return LAT_ACCURACY;
    }
  } else {
    if (lngDiff / LNG_ACCURACY < LONG_SIDE_NODES) {
      return LNG_ACCURACY;
    }
  }

  return Math.max(latDiff, lngDiff) / (LONG_SIDE_NODES + 1);
}

export default new ReportsService();