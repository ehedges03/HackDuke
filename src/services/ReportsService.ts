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
    const nodes: { [key: string]: {
      lat: number,
      lng: number,
      count: number,
    } } = {};

    const fullRad = getDistance(topLeft, bottomRight);

    for (const report of reports) {
      if (filters.length > 0 && !report.symptoms.some((symptom) => {
        return filters.includes(parseInt(symptom as unknown as string));
      })) {
        continue;
      }
      // eslint-disable-next-line max-len
      const lat = (Math.round((report.lat - topLeft.lat) / fullRad) * fullRad) 
        + topLeft.lat;
      const lng = (Math.round((report.lng - topLeft.lng) / fullRad) * fullRad)
        + topLeft.lng;
      const key = String(Math.floor(lng * 100) + Math.floor(lat * 100));
      if (nodes[key] == null) {
        nodes[key] = {
          lat: lat,
          lng: lng,
          count: 1,
        };
      } else {
        nodes[key].count = nodes[key].count + 1;
      }
      if (nodes[key].count > mostNodes) {
        mostNodes = nodes[key].count;
      }
    }

    return ({
      fullRad,
      points: Object.keys(nodes).map((nodeKey) => {
        return {
          lat: nodes[nodeKey].lat,
          lng: nodes[nodeKey].lng,
          size: nodes[nodeKey].count / mostNodes,
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