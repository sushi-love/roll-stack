import type { TicketDraft, TicketMessageDraft } from '../types'
import { eq } from 'drizzle-orm'
import { useDatabase } from '../database'
import { ticketMessages, tickets } from '../tables'

export class Ticket {
  static async find(id: string) {
    return useDatabase().query.tickets.findFirst({
      where: (tickets, { eq }) => eq(tickets.id, id),
    })
  }

  static async list() {
    return useDatabase().query.tickets.findMany()
  }

  static async listOpenedByUser(userId: string) {
    return useDatabase().query.tickets.findMany({
      where: (tickets, { eq, and }) => and(
        eq(tickets.userId, userId),
        eq(tickets.status, 'opened'),
      ),
    })
  }

  static async listMessages(ticketId: string) {
    return useDatabase().query.ticketMessages.findMany({
      where: (ticketMessages, { eq }) => eq(ticketMessages.ticketId, ticketId),
      orderBy: (ticketMessages, { asc }) => asc(ticketMessages.createdAt),
    })
  }

  static async create(data: TicketDraft) {
    const [ticket] = await useDatabase().insert(tickets).values(data).returning()
    return ticket
  }

  static async createMessage(data: TicketMessageDraft) {
    const [message] = await useDatabase().insert(ticketMessages).values(data).returning()
    return message
  }

  static async update(id: string, data: Partial<TicketDraft>) {
    const [ticket] = await useDatabase()
      .update(tickets)
      .set(data)
      .where(eq(tickets.id, id))
      .returning()
    return ticket
  }

  static async delete(id: string) {
    return useDatabase().delete(tickets).where(eq(tickets.id, id))
  }
}
