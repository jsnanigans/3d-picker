let cachedCanvas: HTMLCanvasElement | null = null

const createCanvasElement = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  const size = 256
  canvas.width = size
  canvas.height = size
  cachedCanvas = canvas;
  return canvas
}

const getCanvasElement = (): HTMLCanvasElement => {
  if (cachedCanvas) {
    return cachedCanvas
  }
  return createCanvasElement()
}

export const createTextTexture = (options: {
  text: string, color?: string, size?: number, background?: string
}): string => {
  const {text, color = '#000', size = 40, background = '#fff'} = options;
  const canvas = getCanvasElement();

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // set background
  if (background) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // add text to canvas
  ctx.font = `${size}px sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  return canvas.toDataURL()
}
