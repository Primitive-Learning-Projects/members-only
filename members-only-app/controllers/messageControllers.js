const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.messageCreateGet = (req, res, next) => {
    res.render("messageForm")
};

exports.messageCreatePost = [
    body("title")
        .isLength({ min: 1 })
        .withMessage("Please enter a title")
        .escape(),
    body("messageBody")
        .isLength({ min: 1 })
        .withMessage("Please enter a message body")
        .escape(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            return res.render("messageForm", {
                persistedRequestBody: req.body,
                errorArray: errorResultObject.array(),
            });
        }
        const newMessage = new Message({
            title: req.body.title,
            messageBody: req.body.messageBody,
            author: res.locals.currentUser.id,
        });
        newMessage.save()
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
    }
];

exports.messageDeletePost = (req, res, next) => {
    res.send("TODO: implement messageDeletePost");
};
