import express from "express";
const router = express.Router();
import cors from "cors";
import multer from "multer";
//multer variables
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// eslint-disable-next-line no-unused-vars
import receiptController from "../controllers/receiptControllers.js";
import userController from "../controllers/userController.js";
import searchArray from "../controllers/searchArray.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get(
  "/get-receipts",
  upload.single("file"),
  userController.authenticateToken,
  receiptController.getReceipts,
  (req, res) => {
    return res.status(200).json(res.locals.receipts);
  }
);

// post request
router.post(
  "/upload",
  upload.single("file"),
  userController.authenticateToken,
  receiptController.memoize,
  receiptController.uploadReceipt,
  searchArray.searched,
  receiptController.saveReceipt,
  (req, res) => {
    console.log("mdadet it to end ");
    return res.status(200).json(res.locals.array);
  }
);
router.post("/login", userController.findUser, userController.verifyUser);
router.post("/signup", userController.createUser);

// eslint-disable-next-line no-undef
export default router;
