type GetIndexAction = 'PREV' | 'NEXT'
export const toggleBodyOverflow = () => {
  document.body.style.overflowY = document.body.style.overflowY === 'hidden' ? 'initial' : 'hidden'
}

export const getIndex = (top: number, current: number, action: GetIndexAction) => {
  let expected
  if (action === 'PREV') {
    expected = current - 1
    return expected < 0 ? top : expected
  } else {
    expected = current + 1
    return expected >= top ? 0 : expected
  }
}

export const changeSource = (imageElement: HTMLImageElement, newSource: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = newSource
    img.addEventListener('load', resolve)
    img.addEventListener('error', reject)
    img.addEventListener('abort', reject)
  })

export const updateImage = (
  GalleryImages: HTMLImageElement[],
  LightboxImage: HTMLImageElement,
  animationClass: string
) => (index: number) => {
  const nextImage = GalleryImages[index]
  return changeSource(LightboxImage, nextImage.src)
    .then(() => {
      LightboxImage.src = nextImage.src
      LightboxImage.alt = nextImage.alt
      LightboxImage.classList.add(animationClass)
      LightboxImage.focus()
    })
    .catch(console.error.bind(console))
}

export const getLightboxImage = (Lightbox: Element) => {
  const expected: HTMLImageElement | null = Lightbox.querySelector('.lightbox__image')
  if (!expected) {
    const lbi = new Image()
    lbi.classList.add('lightbox__image')
    Lightbox.appendChild(lbi)
    return lbi
  } else {
    return expected
  }
}

export const removeAnimationClass = (animationClass: string, element: Element) =>
  element.classList.remove(animationClass)
