import { useEffect, useState } from 'react';
import css from './ContactForm.module.css';
import { addContactsThunk, getContactsThunk } from '../../redux/ContactsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const contacts = useSelector(state => state.contacts);

  const handleFormSubmit = e => {
    e.preventDefault();
    const contact = {
      name: name,
      phone: number,
    };

    if (Array.isArray(contacts) && contacts.some(value => value.name.toLowerCase() === name.toLowerCase())) {
      toast(`${name} is already in contacts`);
    } else {
      dispatch(addContactsThunk(contact));
      reset();
    }
  };

  return (
     <form
      className={css.form}
      onSubmit={handleFormSubmit}
    >
      <div>
        <label className={css.label}>
          <span>Name</span>
        </label>
        <input
          className={css.input}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Taras Kalina"
        />

        <label className={css.label}>
          <span>Number</span>
        </label>
        <input
          className={css.input}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="987-65-43"
        />
          <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          pauseOnHover
          theme="dark"
        />
        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};
