import multer from 'multer'




const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads');
    },
    filename : function(req,file,cb){
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.random(Math.random()*1e9);
        cb(null,uniqueSuffix + file.originalname);
    }
})

const upload = multer({storage : storage})

export default upload