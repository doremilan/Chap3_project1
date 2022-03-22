const express = require("express");
const Articles = require("../schemas/article");
const router = express.Router();


router.get("/articles", async (req, res) => {  //전체 목록을 반환합니다.
  const articles = await Articles.find();
  
  res.json({
    articles,
  });
});


router.get("/detail/:articleId", async (req, res) => { // 상세 정보를 반환합니다.
  const { articleId } = req.params;
  const [detail] = await Articles.find({ articleId: Number(articleId) })

  res.json({
    detail,
  });
});


router.get("/edit/:articleId", async (req, res) => { // 수정하기 정보를 반환합니다.
    const { articleId } = req.params;
    const [edit_detail] = await Articles.find({ articleId: Number(articleId) })
  
    res.json({
        edit_detail,
    });
  });


router.post("/articles", async (req, res) => { //작성한 게시글을 저장합니다.
  let today = new Date();
  let date = today.toLocaleDateString();

  const { writer, title, password, content } = req.body;
  console.log({ writer, title, password, content });

  const article_list = await Articles.find();
  let articleId = article_list.length +1;

  const createdAtricle = await Articles.create({ articleId, writer, title, password, content, date });

  res.json({ 
    msg : "등록 완료!" 
  });
});


module.exports = router;