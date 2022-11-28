import React, {useState} from 'react'
import { Modal, Button } from 'flowbite-react'
import FileUploader from '../FileUploader'
import axios from 'axios'

export default function ImageUploadModal({title = "", handleAfterSubmit, modalState = false, setModalState, imgType}) {
    const [imgFile, setImgFile] = useState(null)
    
    const handleUploadImage = async ()=>{
        try {
            imgFile.set("cloud_folder_name","Menu Images")
            imgFile.set("imgType", imgType)
            // console.log("imgFile",imgFile)
            const uploadImgResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/images/upload`, imgFile)
            return uploadImgResponse.data
        } catch (error) {
            return error
        }

    }

    return (
    <Modal
        show={modalState}
        onClose={()=>setModalState(false)}
    >
        <form
            encType='multipart/form'
            className=""
            action="#"
            onSubmit={ async (e)=>{
                e.preventDefault()
                const imgData = await handleUploadImage()
                console.log("imgData",imgData)
                handleAfterSubmit(imgData)
                imgFile.delete("cloud_folder_name")
                imgFile.delete("imgType")
                imgFile.delete("image")
                setImgFile(null)
            }}
        >
        <Modal.Header>
            {title}
        </Modal.Header>
        <Modal.Body>
                <FileUploader
                    imgFile={imgFile}
                    setImgFile={setImgFile}
                />
            
        </Modal.Body>
        <Modal.Footer>
            <Button
                type='submit'
            >
                Submit
            </Button>
        </Modal.Footer>
        </form>
    </Modal>
  )
}
