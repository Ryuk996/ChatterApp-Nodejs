const Conversation = require("./Model/Convsersations")
const router = require("express").Router();

// const converModule = {
//     newConvo : async(req,res) => {
//         try {
//             const newConversation = new Conversation({
//                 members: [req.body.senderId, req.body.receiverId],
//               });
            
//               try {
//                 const savedConversation = await newConversation.save();
//                 res.status(200).json(savedConversation);
//               } catch (err) {
//                 res.status(500).json(err);
//               }
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     },

// }

router.post("/:senderId/:receiverId", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.params.senderId, req.params.receiverId] ,
      // members: { $all: [req.params.senderId, req.params.receiverId] },
      // members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
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
  
  // get conv includes two userId
   
  router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
      console.log(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   router.get("/", async (req, res) => {
//     const userId = req.query.id;
//     const username = req.query.username;
//     try {
//       const user = await User.findById(userId)
         
//         // : await User.findOne({ username: username });
//     //   const { password, updatedAt, ...other } = user._doc;
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  module.exports = router;