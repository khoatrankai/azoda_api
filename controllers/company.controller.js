import companyModel from '../models/company.model.js'


export const deleteSocial = async(req,res,next) => {
    try {
        await companyModel.findOne({}).then(
            data => {
                const newSocial = data.socialMedia.filter((ele,index)=>{ 
                    return index != req.params.id
                })
                companyModel.findOneAndUpdate({},{socialMedia: newSocial},{new : true}).then(data =>{
                    res.status(200).json({success: true,message: "xóa social thành công"})
                }).catch(err =>{
                    res.status(200).json({success: false,message: "xóa social không thành công"})

                })
            }
        ).catch()

    } catch (error) {

    }
}

export const createSocial = async(req,res,next) => {
    try {
        await companyModel.findOne({}).then(
            data => {
                const newSocial = {name: req.body.name,link: req.body.link,icon: req.body.icon}
                data.socialMedia.push(newSocial)
                companyModel.findOneAndUpdate({},{socialMedia: data.socialMedia},{new : true}).then(data =>{
                    res.status(200).json({success: true,message: "tạo thêm social thành công"})
                }).catch(err =>{
                    res.status(200).json({success: false,message: "tạo thêm social không thành công"})

                })
            }
        ).catch()

    } catch (error) {

    }
}

export const getInfoCompany = async(req,res,next) => {
    try {
       const data = await companyModel.findOne({})
       res.status(200).json({success: true,data: data})

    } catch (error) {
       res.status(200).json({success: false,message: "Lỗi hệ thống"})

    }
}

export const updateSocial = async(req,res,next) => {
    try {
        await companyModel.findOne({}).then(
            data => {
                const newSocial = {name: req.body.name,link: req.body.link,icon: req.body.icon}
                const newData = data;
                newData.socialMedia[req.params.id] = newSocial
                companyModel.findOneAndUpdate({},{...newData},{new : true}).then(data =>{
                    res.status(200).json({success: true,message: "cập nhật social thành công"})
                }).catch(err =>{
                    res.status(200).json({success: false,message: "cập nhật social không thành công"})

                })
            }
        ).catch()

    } catch (error) {

    }
}
export const updateAll = async(req,res,next) => {
    try{
        const checkLinkImg = (value) => {
            try{
              return value.includes("/uploads")
            }catch(err){
              return false
            }
          }
        let countImg = 0
        if(req.files.logo){
            req.body.logo = req.files.logo[0].destination.replace('./public','') +'/'+req.files.logo[0].filename
        }

        if(req.body.socialMedia === ''){
            req.body.socialMedia = []
        }else{
            req.body.socialMedia = JSON.parse(req.body.socialMedia)
            if(req.files.sourceImg){
                req.body.socialMedia = req.body.socialMedia.map((dt,index) => {
                    if(checkLinkImg(dt.icon)){
                        return dt
                    }
                    const data = {...dt,icon: req.files.sourceImg[countImg].destination.replace('./public','') +'/'+req.files.sourceImg[countImg].filename}
                    countImg = countImg + 1
                    return data
                })
            }      
        }
        await companyModel.findOne({}).then((result) => {
            if(result){
                companyModel.findOneAndUpdate(
                    {},
                    { ...req.body },
                    { new: true }
                ).then(data => {
                    res.status(200).json({success: true, message: "cập nhật thành công",data: data});
                }).catch(err => {
                    res.status(200).json({success: false, message: "cập nhật ko thành công",data: data});
                    
                })
            }else{
                const newCompany = new companyModel({...req.body})
                newCompany.save().then(data => {
                    res.status(200).json({success: true, message: "tạo thành công",data: data})
                }).catch(err =>{
                    console.log(err)
                    res.status(200).json({success: false, message: "tạo không thành công"})
                })
               

            }
        }).catch((err) => {
            
        });
    }catch{err => {

    }}
}
