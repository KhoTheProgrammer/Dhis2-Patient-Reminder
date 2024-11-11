import { useDataQuery } from "@dhis2/app-runtime";

const trackedEntityType = "nEenWmSyUEp";
const orgUnit = "DiszpKrYNg8";


export const patientsQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances.json",
    params: {
      ou: orgUnit,
      trackedEntityType: trackedEntityType,
      fields: [
        "attributes[displayName, value, created], trackedEntityInstance",
      ],
    },
  },
};