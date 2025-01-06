import multer, {StorageEngine, Multer} from "multer"
import path from 'path'
import { v4 as uuidv4 } from 'uuid';


const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const originalName = path.parse(file.originalname).name
      const uuid = uuidv4()
      const suffix = path.parse(file.originalname).ext

      cb(null, `${originalName}_${uuid}${suffix}`)
    }
})

const upload: Multer = multer({ storage: storage })

export default upload
