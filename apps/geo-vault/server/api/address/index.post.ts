import { createId } from '@paralleldrive/cuid2'
import { repository } from '@sushi-atrium/geo-database'

type Address = {
  id: string
  streetName: string
  streetType: string
  streetId: string
  houseNumber: string
  houseId: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body.search) {
      throw createError({
        statusCode: 400,
        message: 'Missing search',
      })
    }

    // parse by space
    const preparedSearch = body.search ? body.search.trim().split(' ') as string[] : ''

    const street = preparedSearch[0] ?? ''
    const house = getHouseNumber(preparedSearch)

    const addresses: Address[] = []

    const objects = await repository.object.search(street, body.parentId)

    for (const o of objects) {
      const houses = await repository.house.listByParentId(o.id)

      for (const h of houses) {
        // partial value
        if (house?.length && !h.number.includes(house)) {
          continue
        }

        addresses.push({
          id: createId(),
          streetName: o.name,
          streetType: o.type ?? '',
          streetId: o.id,
          houseNumber: h.number,
          houseId: h.id,
        })
      }
    }

    // for (const object of objects) {
    //   // object.houses = await repository.house.listByParentId(object.id)
    // }

    // const houseId = '102726301'

    // const house = await repository.house.find(houseId)
    // if (!house) {
    //   throw createError({
    //     statusCode: 404,
    //     message: 'Not found',
    //   })
    // }

    // console.log(house)

    // if (house.parentId) {
    //   const parent = await repository.object.find(house.parentId ?? '')
    //   if (parent) {
    //     console.log(parent)

    //     const parentParent = await repository.object.find(parent.parentId ?? '')
    //     if (parentParent) {
    //       console.log(parentParent)

    //       const parentParentParent = await repository.object.find(parentParent.parentId ?? '')
    //       if (parentParentParent) {
    //         console.log(parentParentParent)
    //       }
    //     }
    //   }
    // }

    return addresses
  } catch (error) {
    throw errorResolver(error)
  }
})

function getHouseNumber(values: string | string[]): string {
  if (values.length === 0 || values.length < 2) {
    return ''
  }

  const lastElement = values[values.length - 1] ?? ''
  const firstChar = lastElement[0]

  return isValidNumber(firstChar) ? lastElement : ''
}

function isValidNumber(value: unknown) {
  return Number.isFinite(Number(value))
}
