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


router.get("/edit/:articleId", async (req, res) => { // 수정하기 정보를 반환합니다.
    const { articleId } = req.params;
    const [edit_detail] = await Articles.find({ articleId: Number(articleId) })
  
    res.json({
        edit_detail,
    });
});


router.put("/edit/:articleId", async (req, res) => { //게시글을 수정합니다.
    const { articleId } = req.params;
    const { writer, title, password, content } = req.body;   
    
    const existArticle = await Articles.find({ articleId: Number(articleId), password: Number(password) });  

    if (existArticle.length) {
        await Articles.updateOne({ articleId: Number(articleId) }, { $set: { writer, title, content } });
    } else {
        return res.status(400).json({ 
            success: false, msg: "비밀번호가 일치하지 않습니다!" 
        });
    }

    res.json({ 
        success: true, msg: "수정 완료!" 
    });
});


router.delete("/edit/:articleId", async (req, res) => {
    const { articleId } = req.params;
    const { password } = req.body;
  
    const existArticle = await Articles.find({ articleId: Number(articleId), password: Number(password) });

    if (existArticle.length > 0) {
      await Articles.deleteOne({ articleId });
    } else {
        return res.status(400).json({ 
            success: false, msg: "비밀번호가 일치하지 않습니다!" 
        });
    }

    res.json({ 
        success: true, msg: "삭제 완료!" 
    });
});


module.exports = router;