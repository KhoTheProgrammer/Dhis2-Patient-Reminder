//  Group 30 clinic id = DFyu9VGpodC
// Ngelehe CHC id = DiszpKrYNg8
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


