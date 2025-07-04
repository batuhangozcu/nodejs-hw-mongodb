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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(handleGetContacts));
router.get('/:contactId', ctrlWrapper(handleGetContactById));
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(handleAddContact),
);
router.delete('/:contactId', ctrlWrapper(handleDeleteContact));
router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(handleUpdateContact),
);

export default router;
