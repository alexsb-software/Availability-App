import {Injectable, EventEmitter} from '@angular/core';
import {Session} from '../logic/session';

@Injectable()
export class SessionHolderService {

  private sessions: Session[] = [];
  sessionsChanged: EventEmitter<Session> = new EventEmitter<Session>();

  constructor() {
  }

  addSession(session: Session): void {
    this.sessions.push(session);

    console.debug("sessions:", this.sessions, session);
  }

  removeSession(session: Session): void {
    let index: number = this.sessions.findIndex(s => s.isEqualTo(session));

    if (index === -1) {
      console.debug("Failed to find session", session);
      throw new Error("Session not found ");
    }

    this.sessions.splice(index, 1);
  }

  getDaySessions(dayIndex: number): Session[] {
    if (this.sessions.length === 0) return [];

    return this.sessions.filter(s => s.dayIndex === dayIndex);
  }

  getShiftSessions(dayIndex: number, shiftIndex: number): Session[] {
    if (this.sessions.length === 0) return [];
    console.debug("All Sessions", this.sessions);
    return this.sessions.filter(s => s.dayIndex === dayIndex && s.shiftIndex === shiftIndex);
  }
}
