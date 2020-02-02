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
  GIVE: 'GIVE YOU ?',
  HAVE: 'ME HAVE ?',
  GO: 'YOU GO ?',
  'ME GO': 'YOU GO ?',
  'YOU GO': 'ME NO GO !',
  'YOU LOVE ME': 'ME NO LOVE YOU',
  'ME LOVE YOU': '! ! !',
  'YOU BIG': '! ! !',
  'YOU BIG PERSON': '! ! !',
  'ME WANT FOOD': ['ME NO HAVE FOOD !', 3],
  'ME WANT WEALTH': ['ME NO HAVE WEALTH !', 3],
  'ME WANT HOME': ['ME NO HAVE HOME !', 3],
}

export const IS_ENGLISH = false
