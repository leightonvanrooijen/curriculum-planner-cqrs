import { ChangeEvent } from "../../../../packages/eventSourcing/changeEvent.types"
import { SubjectEvents } from "../subjectCreated/subjectEvent.types"

export const SUBJECT_NAME_UPDATED_EVENT_TYPE = "subjectNameUpdated"

export type MakeSubjectNameUpdatedEvent = typeof makeSubjectNameUpdatedEvent
export type SubjectNameUpdatedEvent = ChangeEvent<{ name: string }>

export const makeSubjectNameUpdatedEvent = ({
  name,
  aggregateId,
  version,
}: {
  aggregateId: string
  name: string
  version: number
}): SubjectNameUpdatedEvent => {
  return {
    version,
    type: SUBJECT_NAME_UPDATED_EVENT_TYPE,
    aggregateId,
    date: Date(),
    data: {
      name,
    },
  }
}

export const isSubjectNameUpdatedEvent = (event: SubjectEvents): event is SubjectNameUpdatedEvent =>
  event.type === SUBJECT_NAME_UPDATED_EVENT_TYPE
