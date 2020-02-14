import metaCollection from './db';

export async function getMeta (uuid) {
    const metaDoc = 'meta_'+`${uuid}`;

    try{
       return await metaCollection.doc(metaDoc).get();
    }
    catch(e){
        console.log(e);
    }
}

