// src/eventBus.js
import mitt from 'mitt'

const emitter = mitt()
export default emitter

/**
 * penggunaan di komponen
 *
 * Komponen A
  emitter.emit('closeMenu')

 * Komponen B
  onMounted(() => {
    emitter.on('closeMenu', () => {
      console.log('close menu')
    })
  })

  onUnmounted(() => {
    emitter.off('closeMenu', () => {
      console.log('close menu off')
    })
  })
 */
