import Disease from "entities/Disease";
import Symptom from "entities/Symptom";

const symptoms: {[key: string]: number} = {
  "Cough": 0,
  "Fever": 0,
  "Shortness of breath": 0,
  "Sore throat": 0,
  "Muscle aches": 0,
  "Headache": 0,
  "Chills": 0,
  "Fatigue": 0,
  "Nausea": 0,
  "Runny nose": 0,
  "Congestion": 0,
  "Sneezing": 0,
  "Rash":0,
  "Chest pain": 0,
  "Diarrhea": 0,
  "Loss of taste": 0,
  "Loss of smell": 0,
};

const diseases: {[key: string]: string[]} = {
  "Common cold": ["Cough", "Sore throat", "Runny nose", "Congestion", 
    "Sneezing"],
  "Influenza": ["Cough", "Fever", "Muscle aches", "Headache", "Chills", 
    "Fatigue"],
  "COVID-19": ["Cough", "Fever", "Shortness of breath", "Sore throat", 
    "Muscle aches", "Headache", "Chills", "Fatigue", "Nausea", "Runny nose", 
    "Congestion", "Sneezing", "Loss of smell", "Loss of taste", "Diarrhea"],
  "Pneumonia": ["Cough", "Fever", "Shortness of breath", "Chest pain"],
};

export default async () => {
  for (const symptomName of Object.keys(symptoms)) {
    const newSymptom = await Symptom.findOneBy({name: symptomName}) 
      ||  new Symptom();
    if (!newSymptom.name) {
      newSymptom.name = symptomName;
      await Symptom.save(newSymptom).catch(() => {
        console.log(newSymptom.name + " already exists");
      });
    }
    symptoms[symptomName] = newSymptom.id;
  }

  for (const diseaseName of Object.keys(diseases)) {
    const newDisease = await Disease.findOneBy({name: diseaseName}) 
      || new Disease();
    if (!newDisease.name) {
      newDisease.name = diseaseName;
      newDisease.symptoms = diseases[diseaseName].map((symptomName) => 
        symptoms[symptomName]);
      Disease.save(newDisease);
    }
  }
};