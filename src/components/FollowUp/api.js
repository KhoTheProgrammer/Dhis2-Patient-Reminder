const programStageId = "djfuWTIR5zc";
export const appointmentQuery = {
    events: {
        resource: "events.json",
        params: {
            fields: "trackedEntityInstance, status, enrollment, dataValues[dataElement, value]",
            paging: false,
            programStage: programStageId
        }
    }
}