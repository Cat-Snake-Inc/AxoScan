import express from 'express';
const router = express.Router();
import cors from 'cors';
import multer from 'multer';
//multer variables
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// eslint-disable-next-line no-unused-vars
import receiptController from '../controllers/receiptControllers.js';
import userController from '../controllers/userController.js';
import searchArray from '../controllers/searchArray.js';

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// post request
router.post(
  '/upload',
  upload.single('file'),
  userController.authenticateToken,
  receiptController.memoize,
  receiptController.uploadReceipt,
  searchArray.searched,
  receiptController.saveReceipt,
  (req, res) => res.status(200).json(res.locals.array)
);
router.post('/login', userController.findUser, userController.verifyUser, (req, res) =>
  res.status(200).json({ message: 'Login Successful' })
);
router.post('/signup', userController.createUser, (req, res) =>
  res.status(200).json({ message: 'Signup Successful' })
);

// eslint-disable-next-line no-undef
export default router;
