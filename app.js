
const { json } = require('body-parser');
const mondodb=require('mongodb');
const mc=mondodb.MongoClient;

const security=require('./Auth');




var database;


async function getdb(){

  const client=await mc.connect('mongodb+srv://vrameshkumar260:OqLCL381TxszqRAb@cluster0.wg1tqz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  database= await client.db('db_portfolio')

  

  if(database){
    console.log('Db success');
  }else{
    console.log('DB fail');
  }


  return database;


}


// getdb();

async function get_skill_datas(){

  database=await getdb();

  const col=database.collection('skill_datas');
  const data=await col.find({}).toArray();
  
  // console.log(data);

   return data;

}

// get_skill_datas();


module.exports={
  get_skill_datas,
  getdb
}



