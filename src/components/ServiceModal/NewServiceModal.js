import React, { useContext, useState, useMemo } from "react";
import Link from 'next/link'
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import {Blockie} from 'web3uikit'
import { useMoralis } from 'react-moralis';
import { useNewMoralisObject } from "react-moralis";
import  Select  from "../Core/Select";

import { defaultSkills, defaultScope, defaultCategories } from "../../api/sampleData";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const NewServiceModal = (props) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [scope, setScope] = useState('');
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  const {user } = useMoralis();
  const { save } = useNewMoralisObject("Services");
  const gContext = useContext(GlobalContext);

  const serviceState = useMemo(() => {
    return {title, description, scope, skills, category, price}
  }, [title, description, scope, skills, category, price])


  const handleClose = () => {
    gContext.toggleNewServiceModal();
  };

  const addSkill = (e) => {
    const updatedSkills = [...skills, e.label]
    setSkills(updatedSkills)
}

const resetValues = () => {
  setPrice('')
  setTitle('')
  setScope('')
  setSkills([])
  setDescription('')
}

const saveNewService = async () => {

    save(serviceState, {
      onSuccess: (service) => {
        // Execute any logic that should take place after the object is saved.
        alert("New service created with objectId: " + service.id);
      },
      onError: (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
      },
    });

    resetValues

}

  
  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.newServiceModalVisible}
      onHide={gContext.toggleNewServiceModal}
    >
      <Modal.Body className="p-0">
      <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
      <div className="jobDetails-section bg-default-1 ">
          <div className="container">
            <div className="row justify-content-center">
              {/* <!-- back Button --> */}
              <div className="col-xl-10 col-lg-11 mt-4 ml-xxl-32 ml-xl-15 dark-mode-texts">
                <div className="mb-9">
                  <h3 className="text-black ml-14 mt-4"> Create New Service </h3>
                </div>
              </div>
              {/* <!-- back Button End --> */}
              <div className="mb-10 w-100 px-xxl-15 px-xl-0">
                <div className="bg-white rounded-4 border border-mercury shadow-9">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row">
                      <div className="col-md-9">
                        {/* <!-- media start --> */}
                        <div className="media align-items-center">
                          {/* <!-- media logo start --> */}
                          <div className="square-72 d-block mr-8">
                              {/* TODO: Add image Uploader */}
                              <Blockie seed={user?.get('ethAddress')} size={20}/>
                          </div>
                          <div>
                          <input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={'I will BUIDL a world class dapp'} 
                            className='mt-4 form-control' 
                            style={{width: '200%'}}>
                          </input>
                          </div>
                          {/* <!-- media texts end --> */}
                        </div>
                        {/* <!-- media end --> */}
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-0 mt-md-n1">
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col-12 pt-4">
                        {/* <!-- card-btn-group start --> */}
                        
                        <Select 
                            options={defaultCategories} 
                            defaultValue={null} 
                            onChange={(e) => setCategory(e.value)} 
                            placeholder="Select Category" 
                            className=" h-100 arrow-3 border border-2 font-size-4 d-flex align-items-center w-50" 
                            border={false} 
                        />
                          
                        
                        {/* <!-- card-btn-group end --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row mb-7">
                      <div className="col-md-4 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                        <div classname="input-group mb-3">
                        <span className="input-group-text p-3 h-50">$</span>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" aria-label="Amount"/>
                        </div>

                        </div>
                      </div>
                      <div className="col-md-7 pr-lg-0 pl-lg-10 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                          
                          <Select 
                            options={defaultScope} 
                            defaultValue={null} 
                            onChange={(e) => setScope(e.value)} 
                            placeholder="Select Scope" 
                            className=" h-100 arrow-3 border border-2 font-size-4 d-flex align-items-center w-150" 
                            border={false} 
                        />
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                  <div className=" pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <div className="d-flex justify-content-between">
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                            Skills Used
                        </h4>
                        <Select
                            className="mt-5 w-40"
                            placeholder="Select Skills"
                            options={defaultSkills}
                            onChange={addSkill}
                            
                        />
                    </div>
                  <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      {skills?.map(skill => {
                          return (
                            <li>
                                <Link href="/#">
                                    <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                    {skill}
                                    </a>
                                </Link>
                            </li>
                          )
                        })
                      }
                    
                  </ul>
                </div>
                  <div className="job-details-content border-top pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
                    <div className="row">
                      <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                        <div className="">
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                                    Description
                                </h4>
                          <textarea
                                  name="message"
                                  id="Jon "
                                  placeholder="Describe this service in detail..."
                                  className="form-control h-px-144"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                >

                            </textarea>  
                            <button 
                                className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                                onClick={async () => {saveNewService(title, description, scope, skills, category, price); gContext.toggleNewServiceModal()}}
                            >
                                    Create Service
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </Modal.Body>
    </ModalStyled>
  );
}

export default NewServiceModal;

