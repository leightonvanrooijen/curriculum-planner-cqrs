import { SubjectRepo } from "../repo/subjectRepo"
import { EventApplier } from "../domain/events/eventApplier"
import { MakeSubjectNameUpdatedEvent } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent"

type BuildUpdateSubjectProps = {
  makeSubjectNameUpdatedEvent: MakeSubjectNameUpdatedEvent
  subjectRepo: SubjectRepo
  eventApplier: EventApplier
}

export const buildUpdateSubjectName = ({
  makeSubjectNameUpdatedEvent,
  subjectRepo,
  eventApplier,
}: BuildUpdateSubjectProps) => {
  return async function updateSubject(id: string, update: { name: string; version: number }) {
    const events = await subjectRepo.getEvents(id)
    const subjectProjection = eventApplier(events)

    const updateEvent = makeSubjectNameUpdatedEvent({ name: update.name, version: update.version, aggregateId: id })
    eventApplier([updateEvent], subjectProjection)

    await subjectRepo.saveEvents([updateEvent])
    return
  }
}
