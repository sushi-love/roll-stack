import { resolve } from 'node:path'
import { GarXmlZip } from 'ru-nalog-fias-gar'

export default defineEventHandler(async () => {
  try {
    const absolutePath = resolve('../../../../gar_xml.zip')
    const garXmlZip = new GarXmlZip(absolutePath)

    // Выяснение даты архива
    const date = await garXmlZip.getDate() // 'YYYY-MM-DD'

    // const houseTypes = await garXmlZip.getDataDictionary({
    //   name: 'HOUSE_TYPES',
    //   filter: (r) => r.get ('ISACTIVE') === 'true',
    //   // map: r => r.get('SHORTNAME'),
    // }) // Map {"2" => "д.", ...}

    // Извлечение таблицы данных региона
    // const houses = await garXmlZip.createReadStream({
    //   name: 'HOUSES_PARAMS',
    //   region: 39,
    //   // filter: r => r.get('ISACTUAL') === '1' && r.get('ISACTIVE') === '1',
    //   // map: r => { r.set('ADDRESS'); return r },
    //   // join: ['OBJECTGUID', 'ADDRESS'],
    //   progress: [
    //     (p) => console.log (`${p.percentage}%`),
    //     { time: 2000 },
    //   ],
    // })

    // const counter = 0

    // for await (const house of houses) {
    //   counter++
    //   if (counter > 1) {
    //     continue
    //   }

    //   // house is Map
    //   console.log(house)
    // }

    return date
  } catch (error) {
    throw errorResolver(error)
  }
})
