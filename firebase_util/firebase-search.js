import metaCollection from './db';

export async function getMetaByOverviewName(overviewName){
    console.log("overview name: ", overviewName);
    
    return await metaCollection.where('name', '==' , overviewName).get();
}