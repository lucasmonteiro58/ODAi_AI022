import { useSound } from '@vueuse/sound'

import success from '../assets/audios/success.wav'
import error from '../assets/audios/error.wav'
import click from '../assets/audios/click.wav'
import apagar from '../assets/audios/apagar.wav'
import encaixar from '../assets/audios/encaixe.wav'

const audios = {
  setup() {
    const audioSuccess = useSound(success)
    const audioError = useSound(error)
    const audioClick = useSound(click)
    const audioApagar = useSound(apagar)
    const audioEncaixar = useSound(encaixar)

    return {
      audioSuccess,
      audioError,
      audioClick,
      audioApagar,
      audioEncaixar
    }
  }
}

export default audios
