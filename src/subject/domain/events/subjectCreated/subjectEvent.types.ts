import { SubjectNameUpdatedEvent } from "../subjectUpdated/subjectNameUpdatedEvent"
import { SubjectCreatedEvent } from "./subjectCreatedEvent"

export type SubjectEvents = SubjectCreatedEvent | SubjectNameUpdatedEvent
