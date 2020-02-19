import metaCollection from './db';

//returns all documents that has name field starting with overviewName
export async function getMetaByOverviewName(overviewName, limitValue){

    return await metaCollection.where('name', '>=' , overviewName).where('name', '<=' , overviewName +'\uf8ff').orderBy('name').limit(limitValue).get();
}