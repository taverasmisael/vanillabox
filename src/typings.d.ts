declare module 'a11y-dialog' {
  export default class A11yDialog {
    public show: () => void
    public hide: () => void
    public on: (event: string, cb: () => void) => void
    shown: boolean
    constructor(el: Element)
  }
}

declare module '*.scss' {
  const content: any
  export default content
}
