import { buildTestEventDb } from "../../packages/eventSourcing/testEventDb"
import { buildSubjectRepo } from "./subjectRepo"
import { subjectCreatedEventMock } from "../domain/events/subjectCreated/subjectCreatedEvent.mock"
import { subjectNameUpdatedEventMock } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent.mock"
import { SubjectEvents } from "../domain/events/subjectCreated/subjectEvent.types"

describe("subjectRepo", () => {
  it("saves subject events to the db", async () => {
    const dbData = {}
    const db = buildTestEventDb<SubjectEvents>(dbData)
    const repo = buildSubjectRepo({ db })
    const events = [subjectCreatedEventMock({ version: 1 }), subjectNameUpdatedEventMock({ version: 2 })]

    await repo.saveEvents(events)

    expect(dbData).toEqual({ [events[0].aggregateId]: events })
  })
  it("saves subject events to the db", async () => {
    const mockEvents = [subjectCreatedEventMock({ version: 1 }), subjectNameUpdatedEventMock({ version: 2 })]
    const dbData = { [mockEvents[0].aggregateId]: mockEvents }
    const db = buildTestEventDb<SubjectEvents>(dbData)
    const repo = buildSubjectRepo({ db })

    const events = await repo.getEvents(mockEvents[0].aggregateId)

    expect(events).toEqual(mockEvents)
  })
})
