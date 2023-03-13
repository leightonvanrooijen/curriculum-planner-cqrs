import { isSubjectCreatedEvent } from "./subjectCreated/subjectCreatedEvent"
import { ApplySubjectCreatedEvent } from "./subjectCreated/subjectCreatedEvent.apply"
import { isSubjectNameUpdatedEvent } from "./subjectUpdated/subjectNameUpdatedEvent"
import { ApplySubjectNameUpdatedEvent } from "./subjectUpdated/subjectNameUpdatedEvent.apply"
import { SubjectEvents } from "./subjectCreated/subjectEvent.types"
import { Subject } from "../subject"

type BuildEventApplierProps = {
  applySubjectCreatedEvent: ApplySubjectCreatedEvent
  applySubjectUpdatedEvent: ApplySubjectNameUpdatedEvent
}

export type EventApplier = ReturnType<typeof buildEventApplier>

export const buildEventApplier = ({ applySubjectCreatedEvent, applySubjectUpdatedEvent }: BuildEventApplierProps) => {
  return function eventApplier(events: SubjectEvents[], snapShot?: Subject) {
    return events.reduce((snapShot: Subject, event) => {
      if (isSubjectCreatedEvent(event)) return applySubjectCreatedEvent(event)
      if (isSubjectNameUpdatedEvent(event)) return applySubjectUpdatedEvent(event, snapShot)

      throw new Error(`Subject event type does not exist`)
    }, snapShot)
  }
}
