import { repository } from '@roll-stack/database'
import xlsx from 'node-xlsx'

export default defineEventHandler(async (event) => {
  try {
    const logger = useLogger('kitchen-revenue-iiko-daily')

    const files = await readMultipartFormData(event)
    const file = files?.[0]
    if (!files?.length || !file) {
      throw createError({
        statusCode: 400,
        message: 'Missing file',
      })
    }

    const maxFileSize = 20 * 1024 * 1024 // 20MB
    if (file.data.length > maxFileSize) {
      throw createError({
        statusCode: 413,
        message: 'File too large',
      })
    }

    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ]
    if (file.type && !allowedMimeTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file type',
      })
    }

    const workSheetsFromFile = xlsx.parse(file.data.buffer)
    if (!workSheetsFromFile[0]) {
      throw createError({
        statusCode: 404,
        message: 'File not found',
      })
    }

    const data = workSheetsFromFile[0].data
    const dateRow = data[2] // 3rd row
    if (!dateRow || typeof dateRow[0] !== 'string' || !dateRow[0].startsWith('Дата')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid date',
      })
    }

    const dateMatch = dateRow[0].match(/Дата:\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/)
    if (!dateMatch) {
      throw createError({
        statusCode: 400,
        message: 'Invalid date format. Expected "Дата: DD.MM.YYYY"',
      })
    }

    const [, day, month, year] = dateMatch
    const dateOnly = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`
    const date = new Date(`${dateOnly}T12:00:00.000Z`)

    if (Number.isNaN(date.getTime())) {
      throw createError({
        statusCode: 400,
        message: 'Invalid date values',
      })
    }

    // Remove first 4 rows and last row
    const dataRows = data.slice(4, data.length - 1)
    if (!dataRows) {
      throw createError({
        statusCode: 400,
        message: 'Invalid data',
      })
    }

    const parsedKitchens: { name: string, total: number }[] = []

    for (const row of dataRows) {
      const name = row[2] // 3rd column
      const total = row[4] // 5th column

      if (typeof name !== 'string' || typeof total !== 'number') {
        continue
      }

      parsedKitchens.push({
        name,
        total,
      })
    }

    // Every kitchen: find in DB and add amount for this day
    const kitchens = await repository.kitchen.list()
    let rowsUpdated = 0
    const errors: string[] = []

    for (const kitchen of parsedKitchens) {
      const found = kitchens.find((k) => k.iikoAlias === kitchen.name)
      if (found) {
        // Create or update
        const revenue = await repository.kitchen.findRevenueByKitchenAndDate(found.id, date)
        if (!revenue) {
          await repository.kitchen.createRevenue({
            kitchenId: found.id,
            date: dateOnly,
            total: kitchen.total,
          })
        } else {
          await repository.kitchen.updateRevenue(revenue.id, {
            total: kitchen.total,
          })
        }

        rowsUpdated++
        continue
      }

      logger.warn(`Kitchen "${kitchen.name}" from file not found`)
      errors.push(`"${kitchen.name}" не найдена.`)
    }

    logger.log(rowsUpdated, date, parsedKitchens)

    return {
      ok: true,
      result: {
        rowsUpdated,
        errors,
      },
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
