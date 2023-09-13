import multer from 'multer'
const upload = (name) => {
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,`./public/uploads/${name}`)
        },
        filename: (req,file,cb) => {
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            {   
                cb(null,`${Date.now()}_${file.originalname}`);
            }
        }
    })
    
    return multer({storage})
}
export default upload