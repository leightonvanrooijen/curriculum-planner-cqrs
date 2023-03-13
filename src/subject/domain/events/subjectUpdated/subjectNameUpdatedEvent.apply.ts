import { MakeSubject, Subject } from "../../subject"
import { SubjectNameUpdatedEvent } from "./subjectNameUpdatedEvent"

export type ApplySubjectNameUpdatedEvent = ReturnType<typeof buildApplySubjectNameUpdatedEvent>

export const buildApplySubjectNameUpdatedEvent = ({ makeSubject }: { makeSubject: MakeSubject }) => {
  return function applySubjectNameUpdatedEvent(event: SubjectNameUpdatedEvent, subject: Subject) {
    if (subject.name === event.data.name) throw new Error("The Subject name must be different to update it")
    return makeSubject({ name: event.data.name })
  }
}
