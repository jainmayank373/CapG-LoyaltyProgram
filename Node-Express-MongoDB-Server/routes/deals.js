const mongoose =  require('mongoose');
const  express = require('express');
const bodyParser = require('body-parser');
const dealRouter = express.Router();
const authenticate =  require('../authenticate');
const products =  require('../models/products');
const user = require('../models/users');
const transHistory = require('../models/transactionHistory');

const upload = require('../uploadFile');

dealRouter.use(bodyParser.json());



dealRouter.route('/')
.all((req,res,next)=>{

    next();
})
        //GET operation on /deals. Geting all deals
        .get(authenticate.verifyUSer,(req,res,next)=>{
                products.find()
                    .then((products)=>{
                        res.statusCode=200;
                        res.setHeader('content-type','application/json');
                        res.json(products);
                    })
                    .catch(err => next(err));
        

        })
        
        //PUT operation on /deals. Add new Product in deals
        .post(authenticate.verifyUSer,(req,res,next)=>{
            products.create(req.body)
                .then((product)=>{
                    res.statusCode = 200;
                    res.setHeader('content-type','application/json');
                    res.json({success:true});
                })
                .catch(err => next(err));
        })
        
        //PUT operation on deals. It is not supported operation, cann't perform update operation.
        .put(authenticate.verifyUSer,(req,res,next)=>{

            res.statusCode = 404;
            res.end("Operation not supported");
        })

        //Delete operation on /deals. Deleting all deals.
        .delete(authenticate.verifyUSer,(req,res,next)=>{
                products.remove()
                    .then(()=>{
                        res.statusCode = 200;
                        res.end("All products deleted");
                    })
                    .catch(err => next(err));

        })


dealRouter.route('/addcart')
    .get(authenticate.verifyUSer,(req,res,next)=>{
            user.findById(req.user._id)
            .populate('shoppingcart')
            .then((products)=>{
                console.log(products);
                res.json(products.shoppingcart);
            })
    })
    .post(authenticate.verifyUSer,(req,res,next)=>{
    //    console.log(req.user);
        user.findById(req.user._id)
        .then((user)=>{
            //console.log("Id",req.body);
            if(user.shoppingcart.indexOf(req.body._id) === -1)
                {    user.shoppingcart.push(req.body._id);
                    user.save()
                    res.json({success:true,message:"Added to art"});
                }
            else
                {
                res.json({success:false,message:"Already added to Cart"});
                }
        })
    
    });

dealRouter.route('/optin')
        .post(authenticate.verifyUSer,(req,res,next)=>{

            console.log(req.body);
            products.findById(req.body._id)
            .then(product=>{
                console.log("Users",typeof(req.user.bonusPoint),typeof(product.pointBalance));
                req.user.bonusPoint=req.user.bonusPoint + product.pointBalance;
            //    transHistory.create({pointBalance:product.pointBalance,product:product._id,cost:product.price})
                req.user.transactionHistory.push(product._id);
                req.user.bonusPoint.push(product.pointBalance);
                req.user.save();          
            
                console.log(req.user);    
               // console.log(data);
                
            res.json(req.user);
            })


        });


dealRouter.route('/redeem')
        .get(authenticate.verifyUSer,(req,res,next)=>{
                user.findById(req.user._id)
                .then(data=>{
                    res.json({bonus:data.bonusPoint})
                })
        })
        .post(authenticate.verifyUSer,(req,res,next)=>{
                    user.findById(req.user._id)
                    .then(user =>{
                        index =user.bonusPoint.indexOf(req.body.data);
                        console.log(index);
                        if(index > -1){
                      //      user.pointBalance = user.pointBalance + user.bonusPoint[index];
                                          console.log("Before Delteing ",user.bonusPoint);
                                     
                                         user.bonusPoint.splice(index,1);
                                       user.save();
                                       
                                       console.log("After Deleting",user.bonusPoint);
                                    res.json({bonus:user.bonusPoint});
                        }
                          else{
                                        next(new Error("Cann't Redeem"));
                                    }
                    })  
        })
    //CRUD operation on Specifice product-ID

dealRouter.route('/:dealId')
    .all((req,res,next)=>{
        next();
    })

            //GET  a Specific deal
    .get(authenticate.verifyUSer,(req,res,next)=>{

        products.findById(req.params.dealId)
            .then((product)=>{
                res.statusCode = 200;
                res.setHeader('content-type','application/json');
                res.json(product);
            })
            .catch(err=> next(err));
    })
        //POST operation not supported. Cann't create existing deal.
    .post(authenticate.verifyUSer,(req,res,next)=>{
        res.statusCode = 404;
        res.end("Operation Not supported");
    })

    //PUT operation. Updating deal.
    
    .put(authenticate.verifyUSer,(req,res,next)=>{
        products.findByIdAndUpdate(req.params.dealId,{
            $set:req.body
        },{new:true})
                .then((products)=>{
                    res.statusCode=200;
                    res.end("Updated Successful");
                    
                })
                .catch(err => next(err));
    })

    //Deleting a deal.
    .delete(authenticate.verifyUSer,(req,res,next)=>{
            products.findByIdAndRemove(req.params.dealId)
                .then((products)=>{
                    res.statusCode=200;
                    res.end("User Deleted");
                })
               .catch(err => next(err));
    })


dealRouter.post('/:dealId/comment',authenticate.verifyUSer,upload.single('imageFile'),(req,res,next)=>{
        console.log(req.body);
        products.findById(req.params.dealId)
            .then((product)=>{
                        console.log(req.user);
                        req.body.author =  req.user._id;
                        req.body.image = req.file.path;
                        product.reviews.push(req.body);  
                        product.save()
                        .then(data=>{
                            console.log(data);
                        });
                res.json(req.file);
            })
            .catch(err => next(err));


});

dealRouter.get('/:dealId/comments',authenticate.verifyUSer,(req,res,next)=>{
          
            products.findById(req.params.dealId)
            .populate('reviews.author',"-password -shoppingcart -bonusPoint")
                .then((deal)=>{
                    
                                    console.log(deal);
                                    res.json(deal);

                })
                 .catch(err => next(err));
            
})





module.exports = dealRouter;