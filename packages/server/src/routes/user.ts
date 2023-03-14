import { Router } from "express";
import User from "../schemas/user";
import { Op } from "sequelize";
import {v4 as uuid} from "uuid"
const router = Router();

/* 유저목록 */
router.get("/", async (req, res) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          // @ts-ignore
          [Op.ne]: req.session.userId,
        },
      },
    });
    res.json(result);
  } catch (e) {}
});
/* 세션조회 */
router.get("/me", async (req, res) => {
  try {
    res.json({
      // @ts-ignore
      username: req.session.username,
      // @ts-ignore
      userId: req.session.userId,
      // @ts-ignore
      isLogged: req.session.isLogged,
    });
  } catch (e) {}
});
 

/* 로그인 */
router.post('/login',async (req,res) => {
    try{
      const userId = uuid();
      const username = req.body.username;
      const user = await User.create({
        id: userId,
        username: username,
      });
      // @ts-ignore
      req.session.username = username;
      // @ts-ignore
      req.session.userId = userId;
      // @ts-ignore
      req.session.isLogged = true;
      req.session.save(() => {
        res.json({
          statusText: "OK",
          data: user,
        });
      });
    }catch(e){}
})





/* 로그아웃 */
router.post("/logout", async (req, res) => {
  try {
    // @ts-ignore
    delete req.session.user;
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (e) {}
});

export default router