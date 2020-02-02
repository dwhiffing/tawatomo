import Phaser from 'phaser'
import * as scenes from './scenes'

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const game = new Phaser.Game({
  transparent: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#000',
  width: 1920,
  height: 1080,
  scene: Object.values(scenes),
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
})

export default game

export const WORDS = [
  'YOU',
  'ME',
  'YES',
  'NO',
  'GIVE',
  'HAVE',
  'GO',
  'LOVE',
  'PERSON',
  'HOT',
  'COLD',
  'EAT',
  'FOOD',
  'HOME',
  'WEALTH',
  'WANT',
  'BIG',
  'SMALL',
  'HILL',
  '!',
  '?',
]

export const GENERIC_RESPONSES = {
  YOU: 'YES ME ?',
  ME: 'YES YOU ?',
  YES: 'YES ?',
  NO: 'NO ?',
  GIVE: 'YOU GIVE ?',
  HAVE: 'YOU HAVE ?',
  GO: 'GO ?',
  THAT: 'THAT ?',
  MANY: 'MANY ?',
  ONE: 'ONE ?',
  HOT: 'HOT ?',
  COLD: 'COLD ?',
  EAT: 'EAT ?',
  FOOD: 'FOOD ?',
  WEALTH: 'WEALTH ?',
  WANT: 'WANT ?',
  BIG: 'BIG ?',
  SMALL: 'SMALL ?',
  PERSON: 'PERSON ?',
  HOME: 'HOME ?',
  '?': '?',
  'ME WANT WEALTH': 'ME WANT WEALTH MANY',
  'ME BIG PERSON': 'YOU BIG PERSON YES',
  'ME SMALL PERSON': 'YOU SMALL PERSON YES',
  'ME GO HOME': 'YOU WANT GO HOME ?',
}

export const IS_ENGLISH = false
