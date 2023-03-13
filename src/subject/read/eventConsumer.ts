import { SubjectEvents } from "../domain/events/subjectCreated/subjectEvent.types"
import { Subject } from "../domain/subject"
import { isSubjectCreatedEvent } from "../domain/events/subjectCreated/subjectCreatedEvent"
import { isSubjectNameUpdatedEvent } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent"
import { TestDB } from "../../packages/db/testDB"

// TODO decouple from write side

export const subjectReadRepo = () => {
  return new TestDB<Subject>([], "id")
}

export type EventApplier = ReturnType<typeof buildEventApplier>

export const buildEventApplier = ({ subjectReadRepo }: { subjectReadRepo: TestDB<Subject> }) => {
  return async function eventApplier(events: SubjectEvents[]) {
    for await (const event of events) {
      if (isSubjectCreatedEvent(event)) await subjectReadRepo.create({ ...event.data })
      if (isSubjectNameUpdatedEvent(event))
        await subjectReadRepo.update({ id: event.aggregateId, name: event.data.name })
    }
  }
}

export const buildEventConsumer = ({ eventApplier }: { eventApplier: EventApplier }) => {
  return async function eventConsumer(events: SubjectEvents[]) {
    await eventApplier(events)
  }
}
