import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { delContactsThunk } from '../../redux/ContactsThunk';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filtered = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return filteredContacts.map(cont => (
    <p key={cont.id} className={css.contactItem}>
      <span className={css.contactText}>
        {cont.name}: {cont.phone}
      </span>
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => {
          dispatch(delContactsThunk(cont.id));
        }}
      >
        Delete
      </button>
    </p>
  ));
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filtered: PropTypes.string.isRequired,
};
