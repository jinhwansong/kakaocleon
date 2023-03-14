import { Router } from "express";
import User from "../schemas/user";
import Room from "../schemas/room";
const router = Router();
/*채팅방목록 */
router.get('/', async(req,res)=>{
    try{
        const rooms = await Room.findAll({
            include:User
        })
        res.json(rooms)
    } catch(e){}
})


/*채팅방 상세 */
router.get('/:rootId',async (req,res) => {
    try{
        const room = await Room.findOne({
            where:{
                id:Number(req.params.rootId)
            },
            include:User
        })
        res.json(room)
    }catch(e){}
})
/* 채팅방 생성 */
router.post('/',async (req,res) => {
    try{
        const room =await Room.create({
            opponentId:req.body.opponentId
        })
        res.json(room)
    }catch(e){}
})
export default router