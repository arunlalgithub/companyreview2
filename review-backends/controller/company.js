const User = require("../model/user_schema");
const Companies = require("../model/company_schema")
const Comments = require("../model/comments_schema")
const auth = require("../middleware/authorize")
const dotenv = require('dotenv');

const createCompany = async (req, resp) => {  
    console.log('*** Create company-1') 
    console.log(req.file)
    let company = new Companies({...req.body, userId:req.body.userId});
    const filePath = `/uploads/${req.file.filename}`;
    company.cmplogo = filePath
    console.log('company :', company)
    let result = await company.save()
    resp.send(result)
}

const getCompany = async (req, resp) => {
    console.log('*** get company call')
    let company = await Companies.find().lean()
    if (company.length > 0) {
        let res_val=[];
        for (item of company.values()) {
            const id = item._id.toString();
            var query = await Comments.find({'company_id':id}).lean()
            let commentlength =query.length
            item ={...item,commentlength}
            res_val.push(item)
          }
        company = res_val
        resp.send(company)
    } else {
        resp.send({ result: "No Company found" })
    }
}

const searchCompany = async (req, resp) => {
    let result = await Companies.find({
        "$or": [
            { city: { $regex: req.params.key } },
            // { caddress: { $regex: req.params.key } },
        ]
    })
    resp.send(result)
}

const addReview = async (req, resp) => {
    console.log('***** Add Reviewsss ')
    console.log(req.body.user_id)
    console.log(req.body.company_id)
    let comment = new Comments({ ...req.body, user:req.body.user_id,
                                 company_id:req.body.company_id  })
    console.log('company :', comment)
    let result = await comment.save()
    resp.send(result)
};

const companyDetail = async (req, resp) => {
    let id = req.params.key
    console.log('api company id: ', id)
    let company = await Companies.findById(id).lean()
    const comments = await Comments.find({ 'company_id': `${id}` })
    .populate({
         path: 'user', select: 'name profilepic',
        })
    .populate({
        path: 'company_id', select: '_id'
    })    
    console.log('**** Comments :', comments)    
    var data = {
        'company': company,
        'comments': comments
    }
    resp.json(data)
}

module.exports = {
    createCompany,
    getCompany,
    searchCompany,
    addReview,
    companyDetail
}