import Phaser from 'phaser'
import * as scenes from './scenes'

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const game = new Phaser.Game({
  transparent: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#000',
  width,
  height,
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
  'THAT',
  'MANY',
  'ONE',
  'HOT',
  'COLD',
  'EAT',
  'FOOD',
  'WEALTH',
  'WANT',
  'BIG',
  'SMALL',
  'PERSON',
  'HOME',
]

export const GENERIC_RESPONSES = {}

export const IS_ENGLISH = false
