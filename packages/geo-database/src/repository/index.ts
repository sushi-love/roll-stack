import { useDatabase } from '../database'
import { House } from './house'
import { Object } from './object'

class Repository {
  readonly house = House
  readonly object = Object

  async checkHealth(): Promise<boolean> {
    await useDatabase().query.houses.findFirst()
    return true
  }
}

export const repository = new Repository()
