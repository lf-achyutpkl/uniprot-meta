import metaCollection from './db';

export async function postMeta(meta){

    const newMetaDoc = metaCollection.doc('meta_' + `${meta.uuid}`)

    let newMetaData = await newMetaDoc.set(meta);
    return newMetaData;
}
