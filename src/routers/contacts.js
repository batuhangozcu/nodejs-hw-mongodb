import Router from 'express';
import {
  handleGetContacts,
  handleGetContactById,
  handleAddContact,
  handleDeleteContact,
  handleUpdateContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';

const router = Router();

router.get('/contacts', ctrlWrapper(handleGetContacts));
router.get('/contacts/:contactId', ctrlWrapper(handleGetContactById));
router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(handleAddContact),
);
router.delete('/contacts/:contactId', ctrlWrapper(handleDeleteContact));
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(handleUpdateContact),
);

export default router;
