import metaCollection from './db';
export async function getMetaByOverviewName(overviewName){
    return await metaCollection.where('name', '==' , overviewName).get();
}