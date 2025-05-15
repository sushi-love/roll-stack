import type { openPeeps } from '@dicebear/collection'
import type { StyleOptions } from '@dicebear/core'

type BackgroundType = 'solid' | 'gradientLinear'

interface Options {
  seed?: string
  flip?: boolean
  rotate?: number
  scale?: number
  radius?: number
  size?: number
  backgroundColor?: string[]
  backgroundType?: BackgroundType[]
  backgroundRotation?: number[]
  translateX?: number
  translateY?: number
  clip?: boolean
  randomizeIds?: boolean
  head?: (
    | 'afro'
    | 'bangs'
    | 'bangs2'
    | 'bantuKnots'
    | 'bear'
    | 'bun'
    | 'bun2'
    | 'buns'
    | 'cornrows'
    | 'cornrows2'
    | 'dreads1'
    | 'dreads2'
    | 'flatTop'
    | 'flatTopLong'
    | 'grayBun'
    | 'grayMedium'
    | 'grayShort'
    | 'hatBeanie'
    | 'hatHip'
    | 'hijab'
    | 'long'
    | 'longAfro'
    | 'longBangs'
    | 'longCurly'
    | 'medium1'
    | 'medium2'
    | 'medium3'
    | 'mediumBangs'
    | 'mediumBangs2'
    | 'mediumBangs3'
    | 'mediumStraight'
    | 'mohawk'
    | 'mohawk2'
    | 'noHair1'
    | 'noHair2'
    | 'noHair3'
    | 'pomp'
    | 'shaved1'
    | 'shaved2'
    | 'shaved3'
    | 'short1'
    | 'short2'
    | 'short3'
    | 'short4'
    | 'short5'
    | 'turban'
    | 'twists'
    | 'twists2'
  )[]
  face?: (
    | 'angryWithFang'
    | 'awe'
    | 'blank'
    | 'calm'
    | 'cheeky'
    | 'concerned'
    | 'concernedFear'
    | 'contempt'
    | 'cute'
    | 'cyclops'
    | 'driven'
    | 'eatingHappy'
    | 'explaining'
    | 'eyesClosed'
    | 'fear'
    | 'hectic'
    | 'lovingGrin1'
    | 'lovingGrin2'
    | 'monster'
    | 'old'
    | 'rage'
    | 'serious'
    | 'smile'
    | 'smileBig'
    | 'smileLOL'
    | 'smileTeethGap'
    | 'solemn'
    | 'suspicious'
    | 'tired'
    | 'veryAngry'
  )[]
  facialHair?: (
    | 'chin'
    | 'full'
    | 'full2'
    | 'full3'
    | 'full4'
    | 'goatee1'
    | 'goatee2'
    | 'moustache1'
    | 'moustache2'
    | 'moustache3'
    | 'moustache4'
    | 'moustache5'
    | 'moustache6'
    | 'moustache7'
    | 'moustache8'
    | 'moustache9'
  )[]
  facialHairProbability?: number
  mask?: ('medicalMask' | 'respirator')[]
  maskProbability?: number
  accessories?: (
    | 'eyepatch'
    | 'glasses'
    | 'glasses2'
    | 'glasses3'
    | 'glasses4'
    | 'glasses5'
    | 'sunglasses'
    | 'sunglasses2'
  )[]
  accessoriesProbability?: number
  skinColor?: string[]
  clothingColor?: string[]
  headContrastColor?: string[]
}

type PossibleEmotion =
  | 'rage'
  | 'veryAngry'
  | 'solemn'
  | 'tired'
  | 'serious'
  | 'eyesClosed'
  | 'smile'
  | 'calm'
  | 'eatingHappy'
  | 'lovingGrin1'

type PossibleAccessories =
  | 'glasses'
  | 'glasses2'
  | 'glasses3'
  | 'glasses4'
  | 'glasses5'
  | 'sunglasses'
  | 'sunglasses2'

export interface AvatarParams {
  gender?: Gender
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
}

type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

// 1 to 10
export const emotions: PossibleEmotion[] = [
  'rage',
  'veryAngry',
  'solemn',
  'tired',
  'serious',
  'eyesClosed',
  'smile',
  'calm',
  'eatingHappy',
  'lovingGrin1',
]

const possibleAccessories: PossibleAccessories[] = [
  'glasses',
  'glasses2',
  'glasses3',
  'glasses4',
  'glasses5',
  'sunglasses',
  'sunglasses2',
]

const allFaces: openPeeps.Options['face'] = [
  ...emotions,
  'suspicious',
  'contempt',
  'hectic',
  'driven',
  'smileTeethGap',
  'smileLOL',
  'smileBig',
  'lovingGrin2',
  'fear',
  'explaining',
  'cute',
  'concernedFear',
  'concerned',
  'cheeky',
  'blank',
  'awe',
]

const availableClothingColors = [
  { name: 'amber', color: 'fcd34d' },
  { name: 'green', color: '86efac' },
  { name: 'blue', color: '93c5fd' },
  { name: 'teal', color: '5eead4' },
  { name: 'pink', color: 'f9a8d4' },
  { name: 'violet', color: 'c4b5fd' },
]

const male: Partial<StyleOptions<Options>> = {
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'flatTop',
    'flatTopLong',
    'grayShort',
    'hatBeanie',
    'mohawk',
    'mohawk2',
    'noHair1',
    'noHair2',
    'noHair3',
    'pomp',
    'shaved2',
    'shaved3',
    'short1',
    'short2',
    'short3',
    'short4',
    'short5',
    'twists',
    'twists2',
  ],
  facialHairProbability: 10,
  facialHair: [
    'chin',
    'full',
    'full2',
    'full3',
    'full4', // with color
    'goatee1',
    'goatee2',
    'moustache1',
    'moustache2',
    'moustache3',
    'moustache4',
    'moustache5',
    'moustache6',
    'moustache7',
    'moustache9', // with color
  ],
}

const female: Partial<StyleOptions<Options>> = {
  facialHairProbability: 0,
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'bangs',
    'bangs2',
    'bantuKnots',
    'bun',
    'bun2',
    'buns',
    'cornrows',
    'cornrows2',
    'grayBun',
    'grayMedium',
    'long',
    'longBangs',
    'longCurly',
    'medium1',
    'medium2',
    'medium3',
    'mediumBangs',
    'mediumBangs2',
    'mediumBangs3',
    'mediumStraight',
    'shaved1',
  ],
}

export function choosePartsByGender(gender: string | undefined) {
  if (!gender) {
    const sexVariants = ['male', 'female']
    const randomSex = sexVariants[getRandInteger(0, 1)]

    return randomSex === 'male' ? male : female
  }

  return gender.toLowerCase() === 'male' ? male : female
}

function chooseEmotionByNumber(emotion: number | null) {
  let emotionChosen: PossibleEmotion | null = null

  if (emotion && emotion >= 1 && emotion <= 10) {
    emotionChosen = emotions[emotion - 1] ?? null
  }

  return emotionChosen
}

export function chooseClothingColor(clothing: string | null | undefined) {
  const findClothingColor = availableClothingColors.find(
    (color) => color.name === clothing,
  )
  return findClothingColor ? [findClothingColor.color] : ['f4f4f5']
}

export function getPossibleFaces(emotion: number | null) {
  const emotionChosen = chooseEmotionByNumber(emotion)
  return emotionChosen ? [emotionChosen] : allFaces
}

export function getPossibleAccessories() {
  return possibleAccessories
}

export function getPossibleSkinColors() {
  return ['fce5d3']
}

export function clearSvg(svg: string) {
  return svg.replaceAll(/<metadata.*?<\/metadata>/gis, '')
}

export function generateHSL() {
  const background1 = [
    getRandInteger(0, 360),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ]
  const bg0 = background1[0] ?? 0
  const background2 = [
    bg0 - getRandInteger(25, 70),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ]

  const backgroundColor1 = `hsl(${background1[0]}deg ${background1[1]}% ${background1[2]}%)`
  const backgroundColor2 = `hsl(${background2[0]}deg ${background2[1]}% ${background2[2]}%)`

  return [backgroundColor1, backgroundColor2]
}

export function addBackground(svg: string) {
  // Dynamic Background
  const [backgroundColor1, backgroundColor2] = generateHSL()

  const gradient = `
    <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="${backgroundColor1}" />
      <stop offset="1" stop-color="${backgroundColor2}"/>
    </linearGradient>
    <rect xmlns="http://www.w3.org/2000/svg" fill="url(#linear-gradient)" width="704" height="704" x="0" y="0"/>`

  const svgWithBackground = svg.replace(/<g transform/, `${gradient} $&`)

  return clearSvg(svgWithBackground)
}
