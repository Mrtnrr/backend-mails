import {Request, Response, NextFunction} from 'express'
import multer, {diskStorage, StorageEngine} from 'multer'
import {v4} from 'uuid'
import path from 'path'
import fs from 'fs'

const filenameFunction = (file:Express.Multer.File, cb:Function) => {
    let ext = path.extname(file.originalname)  
    return cb(null, `${v4()}${ext}`)
}

const privateStorage:StorageEngine = diskStorage({
    destination: path.resolve('uploads/private'),
    filename: function(req, file:Express.Multer.File, cb:Function){        
        filenameFunction(file, cb)
    }
})

const publicStorage:StorageEngine = diskStorage({
    destination: path.resolve('uploads/public'),
    filename: function(req, file, cb:Function){
        filenameFunction(file, cb)
    }
})

const tempStorage:StorageEngine = diskStorage({
    destination: path.resolve('uploads/temp'),
    filename: function(req:Request, file:Express.Multer.File, cb:Function){
        filenameFunction(file, cb)
    }
})



const filesTypes = /peg|jpg|png|gif|pdf|docx|.docx|xlsx/;

const fileFilterFunction = (file:Express.Multer.File, cb:Function) => {
    let ext = filesTypes.test(path.extname(file.originalname))
    let mime = filesTypes.test(file.mimetype)

    if(ext && mime) return cb(null, `${v4()}${path.extname(file.originalname)}`)
    if(ext && mime) 
    return cb(null, true);
    

    cb(`only  jpeg|jpg|png|gif|pdf|docx|.docx|xlsx files accepted`, false);
}

/*
* save one picture into temp folder. work with 
*/
export const singleTemp = (filedName:string) => {
    return (req:Request, res:Response, next:NextFunction)=> {
        return multer({
            storage: tempStorage,
            fileFilter: (req:Request, file:Express.Multer.File, cb:Function) => {
                fileFilterFunction(file, cb)
            }
        }).single(filedName)(req, res, next)
    }
}

export const single = (filedName:string, saveLikePublic:boolean)=>{
    let storageEngine:StorageEngine = saveLikePublic ? publicStorage : privateStorage
    return (req:Request, res:Response, next:NextFunction) => {
        return multer({
            storage: storageEngine,
            fileFilter: (req, file, cb:Function) =>{

                fileFilterFunction(file, cb)

            },
        }).single(filedName)(req, res, next)
    }
}


export const array = (filedName:string, saveLikePublic:boolean)=>{
    let storageEngine:StorageEngine = saveLikePublic ? publicStorage : privateStorage

    return (req:Request, res:Response, next:NextFunction) => {
        return multer({
            storage: storageEngine,
            fileFilter: (req, file, cb:Function) =>{

                fileFilterFunction(file, cb)

            },
        }).array(filedName, 5)(req, res, next)
    }
}

export const unlinkOne = (fileName:string, isPublic:boolean|undefined):boolean => {
    let file = ''
    if(isPublic === undefined){
        file = path.resolve(`uploads/temp/${fileName}`)
    }else{
        file = path.resolve(`uploads/${isPublic ? 'public' : 'private'}/${fileName}`)
    }

    try {
        let exist:boolean = fs.existsSync(file)

        if(!exist) return true

        fs.unlinkSync(file)

        return true
        
    } catch (error) {
        return false
    }
} 