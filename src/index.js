import Phaser from 'phaser'
import BootScene from './scenes/Boot'
import MenuScene from './scenes/Menu'
import CreditsScene from './scenes/Credits'

import ShipScene from './scenes/GameScenes/Ship'
import ForestScene from './scenes/GameScenes/Forest'
import VillageScene from './scenes/GameScenes/Village'
import CaveScene from './scenes/GameScenes/Cave'
import HillScene from './scenes/GameScenes/Hill'

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const game = new Phaser.Game({
  transparent: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#000',
  width,
  height,
  scene: [
    BootScene,
    MenuScene,
    ShipScene,
    ForestScene,
    VillageScene,
    CaveScene,
    HillScene,
    CreditsScene,
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
})

export default game
