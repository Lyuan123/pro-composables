import { watch } from 'vue'
import { isNil } from 'lodash-es'
import type { Plugin } from '../types'

export const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, refreshDeps = [], refreshDepsAction },
) => {
  if (isNil(refreshDeps)) {
    return {}
  }

  watch(refreshDeps, () => {
    if (!manual) {
      refreshDepsAction
        ? refreshDepsAction()
        : fetchInstance.refresh()
    }
  })

  return {}
}
