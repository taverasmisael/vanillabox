// typings.d.ts
import '@babel/polyfill'
import A11yDialog from 'a11y-dialog'
import {
  getIndex,
  getLightboxImage,
  removeAnimationClass,
  toggleBodyOverflow,
  updateImage
} from './helpers'
import('./scss/main.scss')

export interface ILightboxConfig {
  GalleryImages: HTMLImageElement[]
  Lightbox: Element
  animationClass: string
}

export default ({ GalleryImages, Lightbox, animationClass }: ILightboxConfig) => {
  if (!GalleryImages) {
    return
  }
  let currentIndex = 0
  const LightboxDialog = new A11yDialog(Lightbox)
  const ImagesLength = GalleryImages.length
  const LightboxImage = getLightboxImage(Lightbox)
  const PrevButton = Lightbox.querySelector('[data-action="prev"]')
  const NextButton = Lightbox.querySelector('[data-action="next"]')
  const changeImage = updateImage(GalleryImages, LightboxImage, animationClass)

  // AddEventListener
  LightboxDialog.on('show', toggleBodyOverflow)
  LightboxDialog.on('hide', toggleBodyOverflow)
  LightboxImage.addEventListener('animationend', ({ target }) =>
    removeAnimationClass(animationClass, target as Element)
  )
  if (PrevButton && NextButton) {
    PrevButton.addEventListener('click', () =>
      changeImage((currentIndex = getIndex(ImagesLength, currentIndex, 'PREV')))
    )
    NextButton.addEventListener('click', () =>
      changeImage((currentIndex = getIndex(ImagesLength, currentIndex, 'NEXT')))
    )
  }
  GalleryImages.forEach((image, index) =>
    image.addEventListener('click', () => {
      LightboxDialog.show()
      changeImage(index)
    })
  )
}
