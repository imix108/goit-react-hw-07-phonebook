import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from '../../redux/sliceFilter';

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

 
  return (
    <>
      <label className={css.filterLabel} htmlFor="">
        <span>Find contacts by name</span>
      </label>
      <input
        className={css.filterInput}
        value={filter}
        onChange={e => dispatch(filterContact(e.currentTarget.value))}
        type="text"
        name="filter"
        placeholder="Taras Kalina"
      />
    </>
  );
};
