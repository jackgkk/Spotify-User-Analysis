import express from 'express'
import getTopItemsController from '../Controllers/topItemsController'

const router = express.Router()

router.get('/', getTopItemsController.getTopItems)

export default router