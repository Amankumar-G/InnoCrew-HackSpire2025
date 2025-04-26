import { Queue } from "bullmq";

const queue = new Queue("file-upload-queue",{
    connection:{
        host:'localhost',
        port: '6379'
    }
}
);
 
export const singlepdf = async (req, res) => {
    console.log(req.file)
   await queue.add("file-ready",JSON.stringify({
        filename : req.file.originalname,
        destination: req.file.destination,
        path: req.file.path
    }))
   return res.json({message:"uploaded"});
}
