import firebase from "firebase";
import firebaseConfig from "../config";

class FirebaseUtil {
  constructor () {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    this.metaCollection = db.collection("meta-project");
  }

  async getMeta(uuid) {
    const metaDoc = "meta_" + `${uuid}`;
    return await this.metaCollection.doc(metaDoc).get();
  }

  async postMeta(meta) {
    const metaDoc = "meta_" + `${meta.uuid}`;
    let newMetaData = await this.metaCollection.doc(metaDoc).set(meta);
    return newMetaData;
  }
  
  async putMeta(meta) {
    const metaDoc = "meta_" + `${meta.uuid}`;
    let updatedMeta = await this.metaCollection.doc(metaDoc).update(meta);
    return updatedMeta;
  }

  async getMetaByOverviewName(overviewName, limitValue) {
    return await this.metaCollection
      .where("name", ">=", overviewName)
      .where("name", "<=", overviewName + "\uf8ff")
      .orderBy("name")
      .limit(limitValue)
      .get();
  }
}

export default new FirebaseUtil()