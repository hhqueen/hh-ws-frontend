import React from 'react'
import { Modal, Button } from 'flowbite-react'

export default function MessageModal({
  modalOpen = false, onClose, header = null, body = null,
  button1text = "Button1Text", handleButton1Click = null,
  button2text = "Button2Text", handleButton2Click = null
}) {
  
  let buttonDivStyle = null
  if (handleButton1Click !== null &&  handleButton2Click !== null) {
    buttonDivStyle = "flex justify-between"
  } else {
    buttonDivStyle = "flex justify-center"
  }
  
  return (
    <Modal
      show={modalOpen}
      onClose={onClose}
    >
      

          <Modal.Header
            className="flex justify-between"
          >
          {header !== null &&
            <p>{header}</p>
          }
          </Modal.Header>


      {body !== null &&
        <Modal.Body>
          {body}
        </Modal.Body>
      }

      {(handleButton1Click != null || handleButton2Click != null) &&
        <Modal.Footer
          className={`${buttonDivStyle}`}
        >
          {
            handleButton1Click != null &&
            <div>
              <Button
                type='button'
                onClick={handleButton1Click}
              >{button1text}</Button>
            </div>
          }

          {
            handleButton2Click != null &&
            <div>
              <Button
                type='button'
                onClick={handleButton2Click}
              >{button2text}</Button>
            </div>
          }
        </Modal.Footer>
      }
    </Modal>
  )
}
