import React from 'react'
import { Button, Label, Modal } from 'flowbite-react'
import YelpCard from './YelpCard'

export default function ModalForArray({yelpList, onClose, onModalClick,modalOpen,handlePickOneYelpRestaurant}) {
  console.log(yelpList)
  const mapYelpBusinesses = yelpList.businesses.map((business,idx)=>{
    return(
      <>
      <div
      className=''
        onClick={()=>{
          handlePickOneYelpRestaurant(business)
          onClose()
        }}
      >
        <YelpCard
          business={business}
        />
      </div>
      </>
    )
  })
  
  return (
    <>
      <Modal
        show={modalOpen}
        onClose={onClose}
      >
        <Modal.Header>
        Header
        </Modal.Header>
        <Modal.Body>
          <div
          className='h-[70vh] overflow-y-auto'
          >
            {mapYelpBusinesses}
          </div>
          {/* <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={onModalClick}>
            I accept
          </Button> */}
          {/* <Button
            color="gray"
            onClick={onModalClick}
          >
              Decline
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}
