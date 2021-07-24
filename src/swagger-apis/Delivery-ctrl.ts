

/** start function this.verifyEntrega */
/**
 * @swagger
 * /api/delivery/{email}:
 *  post:
 *    summary: revisa entregas
 *    tags: [Deliveries]
 *    parameters:
 *      - $ref: '#/components/parameters/email'
 *    responses:
 *      200:
 *        description:  successfully
 *        content:
 *          application/json:
 *            schema:
 *      400:
 *        description: error trying to get data
 *        content:
 *          application/json:
 *            schema:
 */
/** end function this.verifyEntrega */
/** start function this.dataDemo */
/**
 * @swagger
 * /api/delivery/new_data:
 *  get:
 *    summary: crear data demo
 *    tags: [Deliveries]
 *    responses:
 *      200:
 *        description:  successfully
 *        content:
 *          application/json:
 *            schema:
 */
/** end function this.dataDemo */

//schemas by default
/**
 * @swagger
 * components:
 *  parameters:
 *    email:
 *      in: path
 *      name: email
 *      required: true
 *      schema:
 *        type: string
 *      description: email is required 
 */