import Router from 'express';
import {
  handleGetContacts,
  handleGetContactById,
  handleAddContact,
  handleDeleteContact,
  handleUpdateContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(handleGetContacts));
router.get('/contacts/:contactId', ctrlWrapper(handleGetContactById));
router.post('/contacts', ctrlWrapper(handleAddContact));
router.delete('/contacts/:contactId', ctrlWrapper(handleDeleteContact));
router.patch('/contacts/:contactId', ctrlWrapper(handleUpdateContact));

export default router;
