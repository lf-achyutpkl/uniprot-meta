import firebaseUtil from "../../utils/firebase";

const MetaMixin = function(superClass) {
  return class extends superClass {
    saveMetaData(requestData) {
      if (this.isNewRecord) {
        return firebaseUtil.postMeta(requestData);
      } else {
        return firebaseUtil.putMeta(requestData);
      }
    }

    getMetaName(overviewName) {
      return firebaseUtil.getMetaByOverviewName(overviewName, 10);
    }
  };
};

export default MetaMixin;
