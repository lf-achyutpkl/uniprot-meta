import metaCollection from './db';

export async function putMeta(meta){

    const metaDoc = metaCollection.doc('meta_' + `${meta.uuid}`);

    let updatedMeta = await metaDoc.update(meta);
    return updatedMeta;
}