import { createSelector } from '@reduxjs/toolkit';

const getFilter = state => state.phonebook.filter;
const getContacts = state => state.phonebook.contacts;
const getLoading = state => state.phonebook.loading;

const getFilterContacts = createSelector(
    [getFilter, getContacts], 
    (filter, contacts) =>{
        return contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    })

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    getFilter,
    getContacts,
    getLoading,
    getFilterContacts
}

