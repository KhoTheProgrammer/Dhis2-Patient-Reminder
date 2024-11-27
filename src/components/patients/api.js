import { useDataQuery } from "@dhis2/app-runtime";

<<<<<<< HEAD

//  Group 30 clinic id = DFyu9VGpodC
// Ngelehe CHC id = DiszpKrYNg8
const trackedEntityType = "nEenWmSyUEp";
const orgUnit = "DFyu9VGpodC";

=======
const trackedEntityType = ids.trackedEntityType;
const orgUnit = ids.orgUnit;
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e

export const patientsQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances.json",
    params: {
      ou: orgUnit,
      trackedEntityType: trackedEntityType,
      fields: [
        "attributes[displayName, value, created], trackedEntityInstance",
      ],
      paging: false,
    },
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> 8d20d4ef676c76dd842111010fd07ebb8b3e246e
