import metaCollection from "./db";

export async function putMeta(meta) {
  const metaDoc = "meta_" + `${meta.uuid}`;

  let updatedMeta = await metaCollection.doc(metaDoc).update(meta);
  return updatedMeta;
}
