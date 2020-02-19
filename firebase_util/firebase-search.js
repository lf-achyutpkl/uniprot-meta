import metaCollection from './db';
<<<<<<< HEAD


//returns all documents that has name field starting with overviewName
export async function getMetaByOverviewName(overviewName){

    return await metaCollection.where('name', '>=' , overviewName).where('name', '<=' , overviewName +'\uf8ff').get();
=======
export async function getMetaByOverviewName(overviewName){
    return await metaCollection.where('name', '==' , overviewName).get();
>>>>>>> 6ecbaeb368b70b69581df35c6a212b9c143fe163
}