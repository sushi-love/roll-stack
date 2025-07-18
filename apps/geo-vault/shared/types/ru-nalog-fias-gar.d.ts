declare module 'ru-nalog-fias-gar' {
  export class GarXmlZip {
    constructor(path: string)

    getDate(): Promise<string>

    getDataDictionary(options: {
      name: string
      filter?: (record: Map<string, string>) => boolean
      map?: (record: Map<string, string>) => any
    }): Promise<Map<string, any>>

    createReadStream(options: {
      name: string
      region: string | number
      filter?: (record: Map<string, string>) => boolean
      map?: (record: Map<string, string>) => Map<string, string>
      join?: string[]
      progress?: [
        (progress: { percentage: number }) => void,
        { time: number },
      ]
    }): Promise<Map>
  }
}
