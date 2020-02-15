const MetaMixin = function (superClass) {
  return class extends superClass {

    saveMetaData (event) {
      //TODO check if request is post or put
      
      // this.create(metaInformation);   
    }
    
    create(requestBody){
      const URL = 'https://my-awesome-project-a149c.firebaseio.com/overview.json';
      fetch(URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(requestBody)
      })
      .then(response => {
        if(!response.ok) throw response;
        return response.json();
      })
    }
  }
}

export default MetaMixin;
