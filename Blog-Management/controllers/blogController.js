const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");


///////////////////////// -CREATING BLOG- ///////////////////////////////
const createBlog = async function (req, res) {
  try {
      const data = req.body;
      
      const  authorId=data.authorId;
      if(!authorId){
        return res.status(400).send({status:false,msg:"authorId is required"})
        }

      const  availableAuthorId = await authorModel.findById(authorId);
      if (!availableAuthorId) {
          return res.status(404).send({ status: false, msg: 'Author is not available' });
        }

      const title = data.title
      if(!title){
        return res.status(400).send({status:false,msg:"title is required"})
        }
      
      const body = data.body
      if(!body){
        return res.status(400).send({status:false,msg:"body is required"})
      }

      const category = data.category
      if(!category){
        return res.status(400).send({status:false,msg:"category is required"})
      }
      
      if (data.isPublished === true) {
        data.publishedAt= Date.now();
         const createdBlog = await blogModel.create(data);
           return res.status(201).send({ msg:"Blog created successfully",status: true, data: createdBlog });
       }

    if (data) {
       const createdBlog = await blogModel.create(data);
          return res.status(201).send({ status: true, data: createdBlog });
      }

    
}
  catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
  }}


/////////////////////////// -GETTING BLOGS- //////////////////////////////

const getBlogs = async function (req, res) {
  try {

    const query = req.query;

    if(Object.keys(query).length == 0){
      const allBlogs = await blogModel.find({isPublished: true,isDeleted: false});

      if (allBlogs.length !=0){
          return res.status(200).send({ status: true, data: allBlogs})
     }

     if (allBlogs.length == 0){
      return res.status(404).send({ status: false, msg: "Blogs Not Found" });
      } 

    }
  
    if(Object.keys(query).length != 0){
      query.isDeleted = false; query.isPublished = true;
      const getByQuery = await blogModel.find(query)

           if(getByQuery.length !=0){
            return res.status(200).send({status:true , data:getByQuery})
          }

          if (getByQuery.length ==0){
            return  res.status(404).send({ status: false, msg: "No blogs found by filter"});
          }
  }
}catch (error) {res.status(500).send({ status: false, error: error.message })}};


/////////////////////////// -UPDATING BLOGS- //////////////////////////


const updateBlogs = async function (req, res) {
  try {

    const blogId = req.params.blogId;

    if (Object.keys(blogId).length == 0) {
      return res.status(400).send({ status: false, msg: "BlogsId Required" });
    }

    const availableBlog = await blogModel.findById( blogId );

    if (!availableBlog) {
      return res.status(404).send({ status: false, msg: "Blog Not Found" });
    }

    if (availableBlog.isDeleted === true) {
      return res.status(404).send({ status: false, msg: "Blog already deleted" });
    } 
    
    
    if(availableBlog.isDeleted === false) {
      const data = req.body;
      const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId },{ $set: data },{ new: true });
      
      updatedBlog.isPublished = true;
      updatedBlog.publishedAt = Date.now();
      updatedBlog.save();

      return res.status(200).send({ status: true, data: updatedBlog});
    }

  } catch (err) {res.status(500).send({ status: false, msg: err.message })}};


////////////////////// -DELETING BLOGS- ///////////////////////////////////


const deleteBlogs = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blog = await blogModel.findById(blogId)

    if (blog.isDeleted== true){
      return res.status(404).send({status:false , msg: "Blog already deleted"})
    }
    
    const blogDeleted = await blogModel.findByIdAndUpdate({_id: blogId}, {isDeleted:true,deletedAt:Date.now()}) 
    return res.status(200).send({ status:true, msg:" Blog is deleted succesfully"})
   

  } catch (err) {res.status(500).send({ status: false, msg: err.message })}};


//////////////////////// -DELETING BLOGS BY QUEARY- ///////////////////////////

const deleteByQuery = async function (req, res) {
  try {
    const query = req.query;

    if (query) {
      const deletedBlogByQuery = await blogModel.updateMany({ $or: [ {authorId:query.authorId }, {category:query.category },
      {tags:query.tags}, {subcategory:query.subcategory},{isPublished:query.isPublished}]},
      {$set:{isDeleted:true , deletedAt:Date.now()}})

      if(deletedBlogByQuery.modifiedCount===0){
        return res.status(404).send({status:false, msg: "Blogs not found"})
      }
      
      return res.status(200).send({status:true, msg:"Blogs are successfully deleted"})

    }
  } catch (err) { res.status(500).send({ msg: err.message })}};

///////////////// -EXPORT THE MODULES- ///////////////////////

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlogs = deleteBlogs;
module.exports.deleteByQuery = deleteByQuery;
