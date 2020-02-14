import metaCollection from './db';

export async function getMeta (uuid) {
    const metaDoc = metaCollection.doc('meta_'+`${uuid}`);

    try{
       return await metaDoc.get();
    }
    catch(e){
        console.log(e);
    }
}

