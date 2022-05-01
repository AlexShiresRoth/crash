import express, { Response, Request } from "express";
import { validationResult, check } from "express-validator";
const mailchimp = require("@mailchimp/mailchimp_marketing");

const router = express.Router();

mailchimp.setConfig({
  apiKey: process.env.MAIL_CHIMP,
  server: "us10",
});

//@route GET Route
//@desc make sure everything is chimpy
//@access private
router.get("/mc", async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("hello");
    const response = await mailchimp.ping.get();
    console.log(response);
    return res.status(200).json({ msg: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//@route GET route
//@desc get lists
//@access private
router.get("/lists", async (req: Request, res: Response): Promise<any> => {
  try {
    const response: unknown = await mailchimp.lists.getAllLists();

    return res.status(200).json({ msg: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//@route GET Route
//@desc get audience members
//@access private
router.get("/audience", async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(
      process.env.LIST_ID
    );

    if (!response) {
      return res.status(400).json({ msg: "Could not find that list" });
    }

    console.log(response);
    return res.status(200).json({ msg: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//@route POST Route
//@desc send signup email
//@access private
router.put(
  "/signup",
  [check("email", "Please enter a valid email").isEmail()],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new Error("Please enter a valid email");
      }

      const { email } = req.body;

      const response = await mailchimp.lists.addListMember(
        process.env.LIST_ID,
        {
          email_address: email,
          status: "subscribed",
        }
      );
      console.log(response);

      return res.status(200).json({ msg: response });
    } catch (error) {
      return res.status(50).json({ msg: error });
    }
  }
);

module.exports = router;
