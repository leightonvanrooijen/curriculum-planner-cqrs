import { EventDb } from "../../packages/eventSourcing/testEventDb"
import { ChangeEvent } from "../../packages/eventSourcing/changeEvent.types"
import { SubjectEvents } from "../domain/events/subjectCreated/subjectEvent.types"

export type SubjectRepo = {
  saveEvents(events: ChangeEvent<any>[]): Promise<void>
  getEvents(aggregateId: string): Promise<ChangeEvent<any>[]>
}

export const buildSubjectRepo = ({ db }: { db: EventDb<SubjectEvents> }): SubjectRepo => {
  return {
    saveEvents: async (events) => {
      return db.saveEvents(events)
    },
    getEvents: async (aggregateId) => {
      return db.getEvents(aggregateId)
    },
  }
}
