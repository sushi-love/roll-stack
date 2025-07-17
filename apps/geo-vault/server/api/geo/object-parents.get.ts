import { resolve } from 'node:path'
import { repository } from '@roll-stack/geo-database'
import { GarXmlZip } from 'ru-nalog-fias-gar'

const objects = {
  house: 'HOUSES',
  address: 'ADDR_OBJ',
  adm_hierarchy: 'ADM_HIERARCHY',
  mun_hierarchy: 'MUN_HIERARCHY',
}

const absolutePath = resolve('../../../../gar_xml.zip')
const garXmlZip = new GarXmlZip(absolutePath)

export default defineEventHandler(async () => {
  try {
    const hierarchyStream = await garXmlZip.createReadStream({
      name: objects.adm_hierarchy,
      region: 39,
      // progress: [
      //   (p) => console.log (`${p.percentage}%`),
      //   { time: 2000 },
      // ],
    })

    const hierarchy = new Map()
    for await (const h of hierarchyStream) {
      if (!h.get('OBJECTID') || !h.get('PARENTOBJID')) {
        continue
      }

      hierarchy.set(h.get('OBJECTID'), h.get('PARENTOBJID'))
    }

    const objectList = await repository.object.list()

    for (const obj of objectList) {
      const parentId = hierarchy.get(obj.id)
      if (parentId) {
        await repository.object.update(obj.id, { parentId })
      }
    }

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
