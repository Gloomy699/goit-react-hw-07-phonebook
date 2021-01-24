import React, { useState } from 'react';
import './ContactForm.css';

import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { phonebookOperations, phonebookSelectors } from './../../redux/phonebook';


const INITIAL_STATE = {
    name:"",
    phone:""
}

const ContactForm = ({ onFindName, onAddContact }) => {

    const [state, setState] = useState({...INITIAL_STATE})
    const {name, phone} = state;


    const handleChange = ({target}) => {
        const { name, value } = target;
        
        setState(prevState => ({...prevState, [name]:value}))
    }

    const handleSubmit = evt =>{
        evt.preventDefault();


        if(!name || !phone){
            toast.error("Name or phone filed is empty.", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return false; 
        }


        if(onFindName(name).length !== 0){
            toast.warn(name + ' is already in contacts.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return false;
        }

        onAddContact(name, phone);

        reset();
    }


    const reset = () => {
        setState({ ...INITIAL_STATE });
    };


    return (
        <>
        <form className="phonebook" onSubmit={handleSubmit}>
            <label htmlFor="name_1">Имя</label><br/>
            <input type="text" name="name" id="name_1" value={name} onChange={handleChange}/>
            <br/>
            <label htmlFor="phone_1">Номер</label><br/>
            <input type="tel" name="phone" id="phone_1" value={phone} onChange={handleChange}/>
            <br/>
            <br/>
            <button type="submit">Добавить контакт</button>
        </form>
        <ToastContainer />
        </>

    );
    
}

ContactForm.defaultProps = {
    onAddContact:() => {},
    onFindName:() => {}
}

ContactForm.propTypes = {
    onAddContact:PropTypes.func,
    onFindName:PropTypes.func
}
 

const mapDispatchToProps = dispatch => ({
    onAddContact: (name, phone) => dispatch(phonebookOperations.addContact(name, phone)),
    onFindName: (name) => dispatch(phonebookOperations.onFindName(name))
})
export default connect(null, mapDispatchToProps)(ContactForm)