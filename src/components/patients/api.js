import { useDataQuery } from "@dhis2/app-runtime";

const trackedEntityType = "nEenWmSyUEp";
const orgUnit = "DiszpKrYNg8";


export const patientsQuery = {
    trackedEntityInstances: {
        resource: "trackedEntityInstances",
        params: {
            ou: orgUnit,
            trackedEntityType: trackedEntityType,
            fields:[
                'attributes[displayName, value]'
            ]
        }
    }
}