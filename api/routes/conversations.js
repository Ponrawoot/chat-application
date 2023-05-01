const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new direct chat

router.post("/direct", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    conversationType: "direct"
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create group chat
router.post("/group", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId, ],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all groupchat
router.get("/all", async (req,res) => {
  try {
    const conversation = await Conversation.find({conversationType: "group"});
    res.status(200).json(conversation);

  } catch (err) {
    res.status(500).json(err);
  }
  
});

//get all direct of user
router.get("/direct/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
      conversationType: "direct"
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
