export const OptionModule = (() => {
  let options

  return {
    get() {
      return options
    },
    set(opts) {
      options = {
        ...options,
        ...opts
      }
    }
  }
})()

export const DomModule = (() => {
  let carouselDom
  return {
    get() {
      return carouselDom
    },
    set(dom) {
      if (dom === null) {
        throw new Error('Dom is null.')
      }
      carouselDom = dom
    }
  }
})()

export const StateModule = (() => {
  let accumulatedSequence = 0

  return {
    setAccumulatedSequence(acc) {
      accumulatedSequence = acc
    },
    getAccumulatedSequence() {
      return accumulatedSequence
    }
  }
})()
