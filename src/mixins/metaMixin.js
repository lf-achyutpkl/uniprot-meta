import { postMeta } from '../../firebase_util/firebasePost'
import { putMeta } from '../../firebase_util/firebasePut'

const MetaMixin = function (superClass) {
  return class extends superClass {

    saveMetaData (requestData) {
      if (this.isNewRecord) {
        return postMeta(requestData)
      } else {
        alert("put");
        return putMeta(requestData)      
      }
    }
  }
}

export default MetaMixin;
