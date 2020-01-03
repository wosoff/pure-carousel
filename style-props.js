export function createReloading(getDom, getOpts) {
  const {style, childElementCount} = getDom()
  const {cssUnit, direction , frame, sequence} = getOpts()

  const indexToLastCarousel = childElementCount - 1
  const carouselLeft = parseFloat(style[direction], 10)
  const abs = Math.abs(carouselLeft)

  // When is next
  if (sequence < 0) {
    const reloading = indexToLastCarousel * frame
    if (abs >= reloading) {
      return {
        [direction]: 0
      }
    }
  }

  // When is prev
  if (sequence > 0) {
    const reloading = 0
    if (abs === reloading) {
      return {
        [direction]: -(indexToLastCarousel) * frame + cssUnit
      }
    }
  }
}

export function createStarting(getDom, getOpts, StateModule) {
  const {style} = getDom()
  const {cssUnit, direction, sequence} = getOpts()
  

  const carouselLeft = parseFloat(style[direction], 10)

  StateModule.setAccumulatedSequence( carouselLeft + sequence )
  const accumulatedSequence = StateModule.getAccumulatedSequence()

  return {
    [direction]: accumulatedSequence + cssUnit
  }
} 