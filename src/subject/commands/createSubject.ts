import { MakeSubject } from "../domain/subject"
import { SubjectRepo } from "../repo/subjectRepo"
import { MakeSubjectCreatedEvent } from "../domain/events/subjectCreated/subjectCreatedEvent"

type BuildCreateSubjectProps = {
  makeSubject: MakeSubject
  makeSubjectCreatedEvent: MakeSubjectCreatedEvent
  subjectRepo: SubjectRepo
}

export const buildCreateSubject = ({ makeSubject, makeSubjectCreatedEvent, subjectRepo }: BuildCreateSubjectProps) => {
  return function createSubject({ name }: { name: string }) {
    const subject = makeSubject({ name })
    const event = makeSubjectCreatedEvent({ aggregateId: subject.id, name: subject.name })
    return subjectRepo.saveEvents([event])
  }
}
