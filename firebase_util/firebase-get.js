import metaCollection from './db';

export async function getMeta (uuid) {
    const metaDoc = 'meta_'+`${uuid}`;

    return await metaCollection.doc(metaDoc).get();

}

