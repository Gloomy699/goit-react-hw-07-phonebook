

import React from 'react';
import  PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {phonebookOperations, phonebookSelectors} from './../../redux/phonebook';
import './ContactList.css';

const ContactList = ({ loading, contacts, fetchContacts, removeContactId }) => {
    
     // 
    // useEffect(()=>{
    //     console.log(fetchContacts())
    // }, [fetchContacts])


    return (
        <>  
            {loading && <h3>Loading</h3>}
            <ul>
                {
                    contacts.map(({id, name, phone}) => (
                        <li key={id}><span> {name}: {phone} </span><button className="contactDelBtn" onClick={()=>{removeContactId(id)}}>Удалить</button> </li>
                    ))
                }
            </ul>
                    </>
    )
}

ContactList.defaultProps = {
    contacts:[],
    removeContactId:() =>{}
}
ContactList.propTypes = {
    contacts:PropTypes.array.isRequired,
    removeContactId:PropTypes.func
}


const mapStateToProps = state =>({
    loading:phonebookSelectors.getLoading(state),
    contacts:phonebookSelectors.getFilterContacts(state)
})


const mapDispatchToProps = dispatch =>({
    fetchContacts: () => dispatch(phonebookOperations.fetchContact()),
    removeContactId: id => dispatch(phonebookOperations.deleteContact(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)