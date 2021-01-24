import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { phonebookSelectors, changeFilter } from './../../redux/phonebook';

import './Filter.css';


const Filter = ({filter, onFilter}) => {

    const handleSubmit = evt => {
        evt.preventDefault();
    }

    return(
        <form className="phoneList"
            onSubmit={handleSubmit}>
            <label htmlFor="filter_1">Поиск покнтакта по имени</label><br/>
            <input type="text" name="filter" id="filter_1" value={filter}  onChange={onFilter} />
        </form>
    );
}

Filter.defaultProps = {
    filter:'',
    onFilter:()=>{}
}
Filter.propTypes = {
    filter:PropTypes.string.isRequired,
    onFilter:PropTypes.func
}

const mapStateToProps = state => ({
    filter:phonebookSelectors.getFilter(state)
});

const  mapDispatchToprops = dispatch =>({
    onFilter: e => dispatch(changeFilter(e.target.value))
})

export default connect(mapStateToProps, mapDispatchToprops)(Filter)