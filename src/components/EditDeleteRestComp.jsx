import React from 'react'
import { useNavigate } from "react-router-dom"
import { Dropdown } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import axios from "axios"

import MessageModal from "./modals/MessageModal"
import { useImmer } from 'use-immer'
import LoadingComp from './Shared/LoadingComp'

export default function EditDeleteRestComp({ id }) {

    const navigate = useNavigate()
    const [deleteModalProps, setDeleteModalProps] = useImmer({
        modalOpen: false,
        header: "",
        body: "are you sure you wish to delete this restaurant?",
        button1text: "Cancel",
        button2text: "Delete"
    })

    const [afterDeleteModalProps, setAfterDeleteModalProps] = useImmer({
        modalOpen: false,
        header: "",
        body: <LoadingComp />,
        button1text: "Okay"
    })

    function onClose(modalOp) {
        if(modalOp === "delete") {
            setDeleteModalProps(draft => { draft.modalOpen = false })
        } else if(modalOp === "afterDelete") {
            setAfterDeleteModalProps(draft => { draft.modalOpen = false })
        }

    }

    async function handleDeleteRestaurant() {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/restaurants/page/${id}`)
            // ARE YOU SURE MODAL -> API call to server to set rest as inActive

            console.log(response)
            if (response.status === 200) {
                setAfterDeleteModalProps(draft => {
                    draft.modalOpen = true
                    draft.body = response.data.msg
                })
                // navigate('/restaurants/')

            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {
                localStorage.getItem('jwt')
                && (jwt_decode(localStorage.getItem('jwt')).auth === "Admin" || jwt_decode(localStorage.getItem('jwt')).auth === "Mod")
                &&
                <div
                    className="absolute top-0 right-0"
                >
                    {/* confirm intent to delete modal */}
                    <MessageModal
                        onClose={()=>onClose("delete")}
                        modalOpen={deleteModalProps.modalOpen}
                        body={deleteModalProps.body}
                        button1text={deleteModalProps.button1text}
                        handleButton1Click={()=>onClose("delete")}
                        button2text={deleteModalProps.button2text}
                        handleButton2Click={() => {
                            handleDeleteRestaurant()
                            onClose("delete")
                        }}
                    />

                    {/* after delete operation modal */}
                    <MessageModal
                        onClose={()=>onClose("afterDelete")}
                        modalOpen={afterDeleteModalProps.modalOpen}
                        body={afterDeleteModalProps.body}
                        button1text={afterDeleteModalProps.button1text}
                        handleButton1Click={()=>{
                            onClose("afterDelete")
                            document.location.reload()
                        }}
                    />

                    {/* drop down */}
                    <Dropdown
                        label="..."
                        size="sm"
                        arrowIcon={false}
                        color=""
                    >
                        <Dropdown.Item onClick={() => navigate(`/editrestaurant/${id}`)}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => { setDeleteModalProps((draft) => { draft.modalOpen = true }) }}>
                            Delete
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            }
        </>
    )
}
