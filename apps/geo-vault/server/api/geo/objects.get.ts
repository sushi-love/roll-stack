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
    const stream = await garXmlZip.createReadStream({
      name: objects.address,
      region: 39,
      // progress: [
      //   (p) => console.log(`${p.percentage}%`),
      //   { time: 2000 },
      // ],
    })

    for await (const obj of stream) {
      if (obj.get('ISACTUAL') !== '1') {
        continue
      }

      if (!obj.get('OBJECTID') || !obj.get('NAME') || !obj.get('LEVEL')) {
        continue
      }

      const objInDB = await repository.object.find(obj.get('OBJECTID'))
      if (objInDB) {
        await repository.object.update(obj.get('OBJECTID'), {
          type: obj.get('TYPENAME'),
          name: obj.get('NAME'),
          level: obj.get('LEVEL'),
          isActive: obj.get('ISACTIVE') === '1',
          fiasId: obj.get('OBJECTGUID'),
        })

        continue
      }

      await repository.object.create({
        id: obj.get('OBJECTID'),
        type: obj.get('TYPENAME'),
        name: obj.get('NAME'),
        level: obj.get('LEVEL'),
        isActive: obj.get('ISACTIVE') === '1',
        fiasId: obj.get('OBJECTGUID'),
      })
    }

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
