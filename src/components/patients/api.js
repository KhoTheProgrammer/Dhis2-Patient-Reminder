import { useDataQuery } from "@dhis2/app-runtime";

const trackedEntityType = "nEenWmSyUEp";
const orgUnit = "DFyu9VGpodC";


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