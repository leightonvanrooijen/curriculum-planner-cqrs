import { ChangeEvent } from "../../../../packages/eventSourcing/changeEvent.types"
import { Subject } from "../../subject"

export const SUBJECT_CREATED_EVENT_TYPE = "subjectCreated"

export type MakeSubjectCreatedEvent = typeof makeSubjectCreatedEvent
export type SubjectCreatedEvent = ChangeEvent<Subject>

export const makeSubjectCreatedEvent = ({
  aggregateId,
  name,
}: {
  aggregateId: string
  name: string
}): SubjectCreatedEvent => {
  return {
    type: SUBJECT_CREATED_EVENT_TYPE,
    version: 1,
    aggregateId,
    date: Date(),
    data: {
      id: aggregateId,
      name,
    },
  }
}

export const isSubjectCreatedEvent = (event: ChangeEvent<any>): event is SubjectCreatedEvent =>
  event.type === SUBJECT_CREATED_EVENT_TYPE
