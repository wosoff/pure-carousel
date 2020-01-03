/**
 * @typedef {object} carouselOpts
 * @property {string} cssUnit
 * @property {string} direction
 * @property {number} frame
 * @property {number} sequence
 */

import {DomModule, OptionModule, StateModule} from './module'
import {createReloading, createStarting} from '../constructrot-carousel/style-props'

function render(getDom, props) {
  const {style} = getDom()
  if (typeof props === 'undefined') {
    // console.trace('props is undefined.', props)
    return;
  }
  Object.entries(props).forEach(function renderStyle(entry) {
    const [key, value] = entry
    style[key] = value
  })
}

function pause(getDom, getOpts, StateModule) {
  const {style} = getDom()
  const {direction, frame, sequence} = getOpts()
  const accumulatedSequence = StateModule.getAccumulatedSequence()
  const abs = Math.abs(parseFloat(style[direction], 10))
  // It is common to prev and next
  if (accumulatedSequence !== 0 && abs % frame === 0) {
    StateModule.setAccumulatedSequence(0)
    return true
  }
  // When is prev and last carousel frame
  if (sequence > 0 && abs === 0) {
    return true
  }
  return false
}

function reload() {
  const styleProps = createReloading(DomModule.get, OptionModule.get)
  render(DomModule.get, styleProps)
}

function start() {
  const styleProps = createStarting(DomModule.get, OptionModule.get, StateModule)
  render(DomModule.get, styleProps)
}

function runMain() {
  let timer
  return function run() {
    clearTimeout(timer)
    
    reload()

    start()

    const isPause =  pause(DomModule.get, OptionModule.get, StateModule)
    if (isPause === true) {
      return
    }

    timer = setTimeout(run, 10)

  }
}

export default function PureCarousel() {
  const run = runMain()
  return {
    selectDom(dom) {
      DomModule.set(dom)
    },
    /**
     * @param {carouselOpts} opts 
     */
    setOpts(opts) {
      OptionModule.set(opts)
    },
    run
  }
}