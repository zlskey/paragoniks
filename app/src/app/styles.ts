import Color from 'color'

export const colors = {
  text: '#fff',
  background: '#0F0F0F',
  primary: '#388e3c',
  red: '#bf360c',
  paper: '#191919',
  secondPaper: '#2c2c2c',
  placeholder: Color('#fff').lighten(-0.3).hex(),
}

export const getPx = (n?: number) => (n ? n * 8 : undefined)

export default {}
