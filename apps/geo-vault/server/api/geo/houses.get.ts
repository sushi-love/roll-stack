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
    const housesStream = await garXmlZip.createReadStream({
      name: objects.house,
      region: 39,
      // progress: [
      //   (p) => console.log(`${p.percentage}%`),
      //   { time: 2000 },
      // ],
    })

    for await (const house of housesStream) {
      if (house.get('ISACTUAL') !== '1') {
        continue
      }

      if (!house.get('OBJECTID') || !house.get('HOUSETYPE') || !house.get('HOUSENUM')) {
        continue
      }

      const houseInDB = await repository.house.find(house.get('OBJECTID'))
      if (houseInDB) {
        await repository.house.update(house.get('OBJECTID'), {
          type: house.get('HOUSETYPE'),
          number: house.get('HOUSENUM'),
          isActive: house.get('ISACTIVE') === '1',
          fiasId: house.get('OBJECTGUID'),
        })

        continue
      }

      await repository.house.create({
        id: house.get('OBJECTID'),
        type: house.get('HOUSETYPE'),
        number: house.get('HOUSENUM'),
        isActive: house.get('ISACTIVE') === '1',
        fiasId: house.get('OBJECTGUID'),
      })
    }

    // HOUSES: OBJECTID <HOUSE ID="51627865" OBJECTID="37464266" OBJECTGUID="037f1ba9-c74d-477b-85f8-1b16e2033d65" CHANGEID="56841873" HOUSENUM="8" HOUSETYPE="2" OPERTYPEID="20" PREVID="22353356" NEXTID="128538206" UPDATEDATE="2025-06-11" STARTDATE="2016-04-07" ENDDATE="2025-06-11" ISACTUAL="0" ISACTIVE="0" />

    return {
      ok: true,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
