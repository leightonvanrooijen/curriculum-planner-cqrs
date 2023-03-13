import { buildEventApplier, buildEventConsumer } from "./eventConsumer"
import { TestDB } from "../../packages/db/testDB"
import { Subject } from "../domain/subject"
import { subjectCreatedEventMock } from "../domain/events/subjectCreated/subjectCreatedEvent.mock"
import { subjectNameUpdatedEventMock } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent.mock"

const findById = (store, subject, id) => store.find((subject) => subject.id === id)

describe("eventConsumer", () => {
  it("should update db based on events", async () => {
    const store = []
    const eventApplier = buildEventApplier({ subjectReadRepo: new TestDB<Subject>(store, "id") })
    const consumer = buildEventConsumer({ eventApplier })

    const createdEvent = subjectCreatedEventMock()
    await consumer([createdEvent])

    expect(findById(store, store, createdEvent.data.id)).toEqual({ ...createdEvent.data })

    const updatedEvent = subjectNameUpdatedEventMock({ aggregateId: createdEvent.aggregateId })
    await consumer([updatedEvent])

    expect(findById(store, store, createdEvent.data.id)).toEqual({ ...createdEvent.data, name: updatedEvent.data.name })
  })
})
