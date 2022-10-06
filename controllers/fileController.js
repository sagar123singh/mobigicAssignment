//creating 6 digit code into pdf format

const HummusRecipe = require('hummus-recipe');
const pdfDoc = new HummusRecipe('inputFile/sscv.pdf', 'outputFile/1.pdf');

pdfDoc
    .encrypt({
        userPassword: '123456',
        ownerPassword: '123456',
        userProtectionFlag: 4
    })
    .endPDF();

  
///Create encrypted file url
const mongoose = require('mongoose');
const fileSchema=require('../models/fileSchema')
const userSchema = require('../models/userSchema');
const aws=require('../AWS/aws')

const CreateFileUrl=async(req,res)=>{
  try{
    const file=req.files
    
    if (file && file.length > 0) {
      if (file[0].mimetype.indexOf('image') == -1) {
          return res.status(400).send({ status: false, message: 'Only img files are allowed !' })
      }
      const imageUrl = await aws.uploadFile(file[0]);
    
  }
  else {
      return res.status(400).send({ status: false, message: ' Imagefile is required !' })
  }
    
  const fileData = await userSchema.create(imageUrl);
        return res.status(201).send({ status: true, message: "file created successfully", data: fileData });


  }catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}



const getFile = async (req, res) => {
  try {
    let fileCollection = await fileSchema.find({isDeleted:false});
    if(!fileCollection) {
      return res.status(404).send({ status: false, msg: "file not found"})
  }

  res.status(200).send({status:true, data:fileCollection})
  } catch (err) {
      return res.status(500).send({status: false,error: err.message });
  }
}



const RemoveFile = async (req, res) => {
  try {
    const fileId=req.params.fileId
    let deletion = await fileSchema.findByIdAndUpdate(fileId, { isDeleted: true, deletedAt: new Dat() }, { new: true });
  res.status(200).send({status:true, data:deletion})
  } catch (err) {
      return res.status(500).send({status: false,error: err.message });
  }
}


 module.exports.CreateFileUrl=CreateFileUrl
 module.exports.getFile=getFile
 module.exports.RemoveFile=RemoveFile