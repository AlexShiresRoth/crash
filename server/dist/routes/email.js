"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const router = express_1.default.Router();
mailchimp.setConfig({
    apiKey: process.env.MAIL_CHIMP,
    server: "us10",
});
router.get("/mc", async (req, res) => {
    try {
        console.log("hello");
        const response = await mailchimp.ping.get();
        console.log(response);
        return res.status(200).json({ msg: response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
router.get("/lists", async (req, res) => {
    try {
        const response = await mailchimp.lists.getAllLists();
        return res.status(200).json({ msg: response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
router.get("/audience", async (req, res) => {
    try {
        const response = await mailchimp.lists.getListMembersInfo(process.env.LIST_ID);
        if (!response) {
            return res.status(400).json({ msg: "Could not find that list" });
        }
        console.log(response);
        return res.status(200).json({ msg: response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
router.put("/signup", [(0, express_validator_1.check)("email", "Please enter a valid email").isEmail()], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new Error("Please enter a valid email");
        }
        const { email } = req.body;
        const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
            email_address: email,
            status: "subscribed",
        });
        console.log(response);
        return res.status(200).json({ msg: response });
    }
    catch (error) {
        return res.status(50).json({ msg: error });
    }
});
module.exports = router;
//# sourceMappingURL=email.js.map