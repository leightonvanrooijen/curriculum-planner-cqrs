import { MakeSubject } from "../../subject"
import { SubjectCreatedEvent } from "./subjectCreatedEvent"

export type ApplySubjectCreatedEvent = ReturnType<typeof buildApplySubjectCreatedEvent>

export const buildApplySubjectCreatedEvent = ({ makeSubject }: { makeSubject: MakeSubject }) => {
  return function applySubjectCreatedEvent(event: SubjectCreatedEvent) {
    return makeSubject({ name: event.data.name, id: event.data.id })
  }
}
