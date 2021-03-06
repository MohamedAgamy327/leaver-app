const router = require("express").Router();
const mailer = require("../services/mail");

const {isValidUser} = require('../services/user-validate');


////////////////////////////////////////////
router.route("/sendMail")
    .post(isValidUser, mailer.sendMail);

router.route("/getMailList")
    .get(mailer.getMailList)

router.route("/sendCode")
    .post(mailer.sendCode)

////////////////////////////////////////////
module.exports = router;