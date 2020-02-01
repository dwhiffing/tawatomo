import Phaser from 'phaser'
import BootScene from './scenes/Boot'
import MenuScene from './scenes/Menu'
import ShipScene from './scenes/Ship'
import ForestScene from './scenes/Forest'
import VillageScene from './scenes/Village'
import CaveScene from './scenes/Cave'
import HillScene from './scenes/Hill'
import CreditsScene from './scenes/Credits'

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
