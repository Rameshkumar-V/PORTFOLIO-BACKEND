const express=require('express');
const dbs=require('./app');
const routes=express.Router();
routes.use(express.json());

const { authenticateUser } = require('./Auth');



// Skills Adding Route

routes.post('/add',authenticateUser, async (req, res) => {

  try{
  const { topic, data, link } = req.body; 
  
  
  // Construct the update object dynamically
  let updateObject={};
  updateObject[topic]= { name: data, link: link }
  

  const database = await dbs.getdb();
  const col = database.collection('skill_datas');

  try {
      const result = await col.updateOne(
        { "name": "myskill" },
        { $push: updateObject }
      );

      if (result) 
      {
        console.log('Data added successfully');
        res.json({
          "status": "success"
        });
      } 
      else 
      {
        // console.log('Failed to add data');
        res.status(500).json({
          "status": "error",
          "message": "Failed to add data"
        });
      }
    } 
    catch (error) 
    {
      // console.error('Error updating data:', error);
      res.status(500).json({
        "status": "error",
        "message": "Internal server error"
      });
  }

}catch(Error){
  res.status(500).json({
    "status": "error",
    "message": "Internal server error"
  });

}
});



// DELETE ROUTE for myskill

routes.post('/delete',authenticateUser, async (req, res) => {

  try{
    const { topic, name } = req.body;
  
    // console.log(topic, name);
  
    const delobj = {};
    delobj[topic] = { "name": name };
  
    // console.log(delobj);
  
    const database = await dbs.getdb();
    const col = database.collection('skill_datas');
  
    const result = await col.updateOne(
      { "name": "myskill" },
      { $pull: delobj }
    );
  
    if (result.modifiedCount > 0) {
      console.log('PULLED data success');
    } else {
      console.log('pull failed');
    }
  
    res.json({
      "status": "success"
    })

  }
  catch(err)
  {
    res.json({
      "status": "success"
    })

  }
  
  });
// DELETE ROUTE FOR CONTACT

routes.post('/deletecon',authenticateUser, async (req, res) => {
  try{
    const {  name } = req.body;
  
    // console.log( name);
    const database = await dbs.getdb();
    const col = database.collection('skill_datas');
  
    const result = await col.updateOne(
      { "name": "mycontact" },
      { $pull: { "contact": { "name": name } } }
    );
    
  
    if (result.modifiedCount > 0) {
      // console.log('PULLED data success');
      res.json({
        "status": "success"
      })
    } else {
      // console.log('pull failed');
      res.json({
        "status": "failed"
      })
    }

  }
  catch(err)
  {
    res.json({
      "status": "failed"
    })

  }
  });


  // Getting contact details

  routes.get('/getcontact',async(req, res) => {
    try{
      const database = await dbs.getdb();
      const col = database.collection('skill_datas');

      const ContactData = await col.findOne({name:"mycontact"});
      res.json(ContactData);

    }catch(err)
    {
      res.json({
        "status": "failed"
      })
  
    }
  });

  // Add contact details

  routes.post('/addcon',authenticateUser,async (req, res) => {

    try{
    const { name, link, img } = req.body;

    
    let updateObject= { name: name, link: link ,img:img}
  
    const database = await dbs.getdb();
    col = database.collection('skill_datas');

  try {
    const result = await col.updateOne(
      { "name": "mycontact" },
      { $push: { "contact": updateObject } }
    );

    if (result) {
      console.log('Data added successfully');
      res.json({
        "status": "success"
      });
    } else {
      console.log('Failed to add data');
      res.status(500).json({
        "status": "error",
        "message": "Failed to add data"
      });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({
      "status": "error",
      "message": "Internal server error"
    });
  }
}catch(err)
{
  res.json({
    "status": "failed"
  })

}
  });


// GETTING KEY S ROUTE

routes.get('/getkeys',async (req,res)=>{
  try{

    const database = await dbs.getdb();
    const col = database.collection('skill_datas');

    const data = await col.findOne({name:"myskill"});

    const keys = Object.keys(data);
    keys.pop('name');
    keys.pop('_id');
    console.log(keys);


    if(keys.length>1){
      res.json(keys);
    }
    else{  res.json({
      result:"failed"
    });}
  }catch(err)
  {
    res.json({
      "status": "failed"
    })

  }



});


// Project Getting
routes.get('/myproject', async (req, res) => {
  try{
    const database = await dbs.getdb();
    const col = database.collection('skill_datas');

    const ProjectData= await col.findOne({name:"myproject"});
    res.json(ProjectData);
  }catch(err)
  {
    res.json({
      "status": "failed"
    })

  }
});


// Project Deleting
routes.post('/deleteproject',authenticateUser,async (req,res)=>{
  try{

  const {id}=req.body;
  // console.log(id);


  
  const database = await dbs.getdb();
  const col = database.collection('skill_datas');

  const result = await col.updateOne(
    { "name": "myproject" },
    { $pull: { "project": { "id": id } } }
  );
  
  

  if (result.modifiedCount > 0) 
   {
    // console.log('PULLED data success');
    res.json({
      "status": "success"
    })
   } 
  else
   {
    // console.log('pull failed');
    res.json({
      "status": "failed"
    })
  }
}catch(err)
  {
    res.json({
      "status": "failed"
    })

  }

  

});

// Adding Project
routes.post('/addproject',authenticateUser, async (req, res) => {

  try{
  const { name, desc, github, img } = req.body;

  // Get the count of project list items
  const database = await dbs.getdb();
  const col = database.collection('skill_datas');
  const projectData = await col.findOne({ "name": "myproject" });
  const count = projectData ? projectData.project.length : 0;
  
  const id = count + 1;

  const updateObject = { id, name, desc, github, img };

  try {
    const result = await col.updateOne(
      { "name": "myproject" },
      { $push: { "project": updateObject } }
    );

    if (result) {
      console.log('Data added successfully');
      res.json({
        "status": "success"
      });
    } else {
      console.log('Failed to add data');
      res.status(500).json({
        "status": "error",
        "message": "Failed to add data"
      });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({
      "status": "error",
      "message": "Internal server error"
    });
  }

}catch(err)
{
  res.json({
    "status": "failed"
  })

}

});

  

module.exports={
    routes
}