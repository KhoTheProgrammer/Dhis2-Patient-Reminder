import { ids } from "../../assets/Ids";
const trackedEntityType = ids.trackedEntityType;
const orgUnit = ids.orgUnit;
export const patientsQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances.json",
    params: {
      ou: orgUnit,
      trackedEntityType: trackedEntityType,
      fields: ["attributes[displayName, value, created], trackedEntityInstance"],
      paging: false
    }
  }
};