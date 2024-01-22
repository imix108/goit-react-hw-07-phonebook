import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../redux/sliceContact';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return filteredContacts.map(cont => (
    <p key={cont.id} className={css.contactItem}>
      <span className={css.contactText}>
        {cont.name}: {cont.number}
      </span>
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => {
          dispatch(remove(cont.id));
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
