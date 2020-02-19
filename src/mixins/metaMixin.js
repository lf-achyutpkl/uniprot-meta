import { postMeta } from '../../firebase_util/firebase-post'
import { putMeta } from '../../firebase_util/firebase-put'
import { getMetaByOverviewName} from '../../firebase_util/firebase-search'

const MetaMixin = function (superClass) {
  return class extends superClass {

    saveMetaData (requestData) {
      if (this.isNewRecord) {
        return postMeta(requestData)
      } else {
        return putMeta(requestData)      
      }
    }

    getMetaName (overviewName){
      return getMetaByOverviewName(overviewName);
    }
  }
}

export default MetaMixin;
