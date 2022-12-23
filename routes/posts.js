const express = require("express")
const router = express.Router()
const Post = require("../schemas/post.js")

router.get("/posts", async (req,res) => {
  const posts = await Post.find().sort("-postDate").exec()

  res.send(posts)
})

router.post("/posts", async(req,res) => {
  const {postTitle, UserId, password, postComment, postDate} = req.body

  const createdPost = await Post.create({ postTitle, UserId, password, postComment, postDate})

  res.json(({posts:createdPost}))
})

router.get("/posts/:postId", async (req,res) => {
  const {postId} = req.params
  const  posts =  await Post.findById(postId)
  res.status(200).json(posts)
})

router.put("/posts/:postId", async(req,res) =>{
  const {postId} = req.params
  console.log(postId)
  const {postComment} = req.body
  const {Password} = req.body

  const modifyboard = await Post.findById(postId)
  const boardPassword = modifyboard.password
  if (boardPassword === Password) {
    await Post.updateOne(
      {_id:postId}, //왼쪽:오른쪽 왼쪽은 찾는다/오른쪽은 수정할애
      {$set:{postComment:postComment}} // 바꿀거다 왼쪽에 있는 애를 오른쪽 애로
      )
      return res.status(200).json({success:"수정완료"})
  }
  else {
    return res.status(400).json({errorMessage:"비밀번호를 잘못 입력했습니다."})
  }
})

router.delete("/posts/:postId", async(req,res) =>{
  const {postId} = req.params
  const {Password} = req.body
  console.log(Password)

  const modifyboard = await Post.findById(postId)
  const boardPassword = modifyboard.password
  console.log(boardPassword)
  if (boardPassword === Password) {
    await Post.deleteOne({_id : postId})
    return res.status(200).json({success:"삭제 완료"})
  }
  else {
    return res.status(400).json({errorMessage:"비밀번호를 잘못 입력했습니다."})
  }
})



module.exports = router