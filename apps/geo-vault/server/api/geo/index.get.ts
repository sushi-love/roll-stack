import { resolve } from 'node:path'
import { GarXmlZip } from 'ru-nalog-fias-gar'

const dictionary = {
  add_house_types: 'ADDHOUSE_TYPES',
  address_obj_types: 'ADDR_OBJ_TYPES',
  house_types: 'HOUSE_TYPES',
  obj_levels: 'OBJECT_LEVELS',
  params: 'PARAM_TYPES',
}

// const objects = {
//   house: 'HOUSES',
//   address: 'ADDR_OBJ',
//   adm_hierarchy: 'ADM_HIERARCHY',
//   mun_hierarchy: 'MUN_HIERARCHY',
// }

const absolutePath = resolve('../../../../gar_xml.zip')
const garXmlZip = new GarXmlZip(absolutePath)

export default defineEventHandler(async () => {
  try {
    // Выяснение даты архива
    // const date = await garXmlZip.getDate() // 'YYYY-MM-DD'

    const res = await garXmlZip.getDataDictionary({
      name: dictionary.obj_levels,
      // filter: (r) => r.get ('ISACTIVE') === 'true',
      // map: r => r.get('SHORTNAME'),
    }) // Map {"2" => "д.", ...}

    // Извлечение таблицы данных региона
    // const housesStream = await garXmlZip.createReadStream({
    //   name: objects.address,
    //   region: 39,
    //   // filter: r => r.get('ISACTUAL') === '1' && r.get('ISACTIVE') === '1',
    //   // map: r => { r.set('ADDRESS'); return r },
    //   // join: ['OBJECTGUID', 'ADDRESS'],
    //   progress: [
    //     (p) => console.log (`${p.percentage}%`),
    //     { time: 2000 },
    //   ],
    // })

    // const hierarchyStream = await garXmlZip.createReadStream({
    //   name: objects.adm_hierarchy,
    //   region: 39,
    //   // filter: r => r.get('ISACTUAL') === '1' && r.get('ISACTIVE') === '1',
    //   // map: r => { r.set('ADDRESS'); return r },
    //   // join: ['OBJECTGUID', 'ADDRESS'],
    //   progress: [
    //     (p) => console.log (`${p.percentage}%`),
    //     { time: 2000 },
    //   ],
    // })

    // let size = 0

    // for await (const item of hierarchyStream) {
    //   const house = item as any
    //   if (house.get('ISACTIVE') !== '1') {
    //     continue
    //   }

    //   size += JSON.stringify(Object.fromEntries(house)).length
    // }

    // let counter = 0

    // for await (const item of housesStream) {
    //   counter++
    //   if (counter > 1) {
    //     break
    //   }

    //   const house = item as any
    //   const houseId = house.get('OBJECTID')

    //   console.log(houseId)

    //   const streetId = await findParentObjectId(hierarchyStream, houseId)
    //   if (streetId) {
    //     // Street
    //     const street = await findObject(streetId)
    //     if (street) {
    //       console.log(Object.fromEntries(street))

    //       // // City
    //       // const cityId = await findParentObjectId(hierarchyStream, streetId)
    //       // if (cityId) {
    //       //   const city = await findObject(cityId)
    //       //   if (city) {
    //       //     console.log(Object.fromEntries(city))
    //       //   }
    //       // }
    //     }
    //   }
    // }

    // HIERARCHY: OBJECTID PARENTOBJID <ITEM ID="31074736" OBJECTID="92271345" PARENTOBJID="641398" CHANGEID="135075893" REGIONCODE="39" PREVID="0" NEXTID="0" UPDATEDATE="2025-06-10" STARTDATE="2019-10-17" ENDDATE="2079-06-06" ISACTIVE="0" PATH="634779.639773.641742.641398.92271345" />
    // ADDR_OBJ: OBJECTID <OBJECT ID="52174894" OBJECTID="172779875" OBJECTGUID="5c2e0e26-0ada-43d4-a9cd-6bf869c0ed1c" CHANGEID="647418763" NAME="Первая" TYPENAME="ул." LEVEL="8" OPERTYPEID="10" PREVID="0" NEXTID="0" UPDATEDATE="2025-06-09" STARTDATE="2025-06-09" ENDDATE="2079-06-06" ISACTUAL="1" ISACTIVE="1" />
    // HOUSES: OBJECTID <HOUSE ID="51627865" OBJECTID="37464266" OBJECTGUID="037f1ba9-c74d-477b-85f8-1b16e2033d65" CHANGEID="56841873" HOUSENUM="8" HOUSETYPE="2" OPERTYPEID="20" PREVID="22353356" NEXTID="128538206" UPDATEDATE="2025-06-11" STARTDATE="2016-04-07" ENDDATE="2025-06-11" ISACTUAL="0" ISACTIVE="0" />

    // Калининградская область, Район Гурьевский, Поселок Малое Лесное, Улица Буковая, Дом 16
    // -, -, -, -, 24103502

    // Map to Object
    return Object.fromEntries(res)
  } catch (error) {
    throw errorResolver(error)
  }
})
