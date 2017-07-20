require('./ttips.css')

const SELECTOR_CLASS = 'ttip'
const HOST_SELECTOR_CLASS = 'ttip-host'
const ACTIVE_CLASS = 'ttip-active'
const DISTANCE_TO_ELEMENT = 10
const DATA_ATTRIBUTE = 'data-tooltip'

/**
 * @param  {Element} ttipEl
 */
function cloneToHost (ttipEl) {
  removeHostChilds()
  getHostEl().appendChild(ttipEl.cloneNode(true))
}

/**
 *
 */
function removeHostChilds () {
  const hostEl = getHostEl()
  while (hostEl.firstChild) {
    hostEl.removeChild(hostEl.firstChild)
  }
}

/**
 * update the tooltip position
 * @param {Element} targetEl
 */
function updatePosition (targetEl) {
  const ttipHostEl = getHostEl()
  const ttipEl = targetEl.nextElementSibling

  const targetRect = targetEl.getBoundingClientRect()
  const ttipRect = ttipHostEl.getBoundingClientRect()
  const position = ttipEl.getAttribute('data-ttip-position')
  const ttipStyle = ttipHostEl.style

  let left
  let marginLeft

  if (position === 'left') {
    ttipStyle.left = targetRect.left - ttipRect.width - DISTANCE_TO_ELEMENT + 'px'
    ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px'
    ttipStyle.marginLeft = 0
  } else if (position === 'right') {
    ttipStyle.left = targetRect.right + DISTANCE_TO_ELEMENT + 'px'
    ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px'
    ttipStyle.marginLeft = 0
  } else if (position === 'top') {
    left = targetRect.left + (targetRect.width / 2)
    marginLeft = -1 * (ttipHostEl.offsetWidth / 2)

    ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px'
    ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px'
    ttipStyle.top = targetRect.top - ttipRect.height - DISTANCE_TO_ELEMENT + 'px'
  } else {
        // default - bottom
    left = targetRect.left + (targetRect.width / 2)
    marginLeft = -1 * (ttipHostEl.offsetWidth / 2)

    ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px'
    ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px'
    ttipStyle.top = targetRect.top + targetRect.height + DISTANCE_TO_ELEMENT + 'px'
  }
}

/**
 * @param  {Event} ev
 * @return {Element}
 */
function getTtipElFromEvent (ev) {
  let ttipEl = false
  if (ev.target.nextElementSibling && ev.target.nextElementSibling.classList.contains('ttip')) {
    ttipEl = ev.target.nextElementSibling
  } else if (ev.currentTarget.nextElementSibling && ev.currentTarget.nextElementSibling.classList.contains('ttip')) {
    ttipEl = ev.currentTarget.nextElementSibling
  }
  return ttipEl
}

/**
 * @param  {Element} ttipEl
 */
function show (ttipEl) {
  const targetEl = ttipEl.previousElementSibling

  cloneToHost(ttipEl)
  updatePosition(targetEl)
  getHostEl().classList.add(ACTIVE_CLASS)

  window.addEventListener('scroll', onMouseLeave)
  window.addEventListener('touchmove', onMouseLeave)
}

/**
 * Hide any visible tooltip
 */
function hide () {
  const hostEl = getHostEl()
  if (hostEl.classList.contains(ACTIVE_CLASS)) {
    hostEl.classList.remove(ACTIVE_CLASS)
    window.removeEventListener('scroll', onMouseLeave)
    window.removeEventListener('touchmove', onMouseLeave)
    while (hostEl.firstChild) {
      hostEl.removeChild(hostEl.firstChild)
    }
  }
}

/**
 * @param {Event} ev
 */
function onMouseEnter (ev) {
  const ttipEl = getTtipElFromEvent(ev)
  if (ttipEl) {
    show(ttipEl)
  }
}

/**
 * @param {Event} [ev]
 */
function onMouseLeave (ev) {
  hide()
}

/**
 * Initialize the tooltip
 * @param {Element} ttipEl - The toggle element.
 */
function init (ttipEl) {
  let targetEl
  if (!ttipEl._ttip && !ttipEl.parentNode.classList.contains('ttip-host')) {
    ttipEl._ttip = true
    targetEl = ttipEl.hasAttribute(DATA_ATTRIBUTE) ? ttipEl : ttipEl.previousElementSibling
    console.log(targetEl)

    targetEl.addEventListener('mouseenter', onMouseEnter)
    targetEl.addEventListener('mouseleave', onMouseLeave)
    targetEl.addEventListener('blur', onMouseLeave)
  }
}

/**
 * @param {Element} ttipEl
 */
function destroySingle (ttipEl) {
  let targetEl
  if (ttipEl._ttip === true) {
    targetEl = ttipEl.previousElementSibling
    if (ttipEl.classList.contains(ACTIVE_CLASS)) {
      getHostEl.classList.remove(ACTIVE_CLASS)
    }
    targetEl.removeEventListener('mouseenter', onMouseEnter)
    targetEl.removeEventListener('mouseleave', onMouseLeave)
    targetEl.removeEventListener('blur', onMouseLeave)

    ttipEl._ttip = null
  }
}

/**
 * returns the tooltip elements
 * @return {NodeList}
 */
function getTtipElements () {
  return document.querySelectorAll('.' + SELECTOR_CLASS + ', *[' + DATA_ATTRIBUTE + ']')
}
/**
 * @return {Element | null}
 */
function getHostEl () {
  return document.querySelector('.' + HOST_SELECTOR_CLASS)
}

/**
 * @param  {Element} hostParentEl
 */
function createHost (hostParentEl) {
  hostParentEl = hostParentEl || document.body

  if (getHostEl()) {
    return
  }
  const hostEl = document.createElement('div')
  hostEl.classList.add(HOST_SELECTOR_CLASS)
  hostParentEl.appendChild(hostEl)
}

/**
 *
 */
function update () {
  const elements = getTtipElements()
  for (let i = elements.length - 1; i >= 0; i--) {
    init(elements[i])
  }
}

/**
 * initialize tooltips
 * @param  {Element} hostParentEl
 */
function initialize (hostParentEl) {
  createHost(hostParentEl)
  update()
}

/**
 * destroy all tooltips
 */
function destroy () {
  const elements = getTtipElements()
  let hostEl = getHostEl()

    // destroy the tooltips
  for (let i = elements.length - 1; i >= 0; i--) {
    destroySingle(elements[i])
  }
    // remove the host
  hostEl.parentNode.removeChild(hostEl)
  hostEl = null
}

/**
 * module API
 * @type {Object}
 */
module.exports = {
  initialize: initialize,
  update: update,
  hide: hide,
  destroy: destroy
}
