import express from 'express'
import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactControllers.js'
import validateToken from '../middlewares/validateTokenHandler.js'

const router = express.Router()

router.use(validateToken)
router.route('/').get(getContacts).post(createContact)
router.get('/:id', getContact).put('/:id', updateContact).delete('/:id', deleteContact)

export default router
