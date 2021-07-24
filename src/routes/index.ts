import {Router} from 'express'

import {
  deliveryCrtl,
} from "../controllers";

const router:Router = Router()

/**
 * @swagger
 * tags:
 *  name: Deliveries
 *  description: deliveries endpoints
 */

//develibery routes 
router.use('/delivery', deliveryCrtl.router())


export default router