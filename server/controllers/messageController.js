const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res
        .status(400)
        .json({ msg: "Both 'from' and 'to' fields are required." });
    }

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(projectedMessages);
  } catch (ex) {
    console.error("Error fetching messages:", ex);
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
      return res
        .status(400)
        .json({ msg: "All fields (from, to, message) are required." });
    }

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res
        .status(500)
        .json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    console.error("Error adding message:", ex);
    next(ex);
  }
};
