import { describe, expect, it } from 'vitest'
import { getPossibleSkinColors } from '../../avatar'

describe('getPossibleSkinColors', () => {
  it('should return correct skin colors', () => {
    const res = getPossibleSkinColors()

    expect(res).toMatchInlineSnapshot(['fce5d3'])
  })
})
