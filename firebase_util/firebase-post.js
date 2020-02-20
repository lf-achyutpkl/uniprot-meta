import metaCollection from "./db";

export async function postMeta(meta) {
  const metaDoc = "meta_" + `${meta.uuid}`;

  let newMetaData = await metaCollection.doc(metaDoc).set(meta);
  return newMetaData;
}
