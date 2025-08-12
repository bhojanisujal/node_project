import React, { useEffect, useState } from "react";
import HOC from "../Component/HOC";
import { useDispatch, useSelector } from "react-redux";
import { AddRoylitiesAPI } from "../Redux/Action/AldumAPI";
import { Button, Card, Modal } from "react-bootstrap";



const Roylities = () => {



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let dispatch = useDispatch()

  let state = useSelector((state) => state.RoylitiesApireducer);
  console.log(state)
  state?.map((x) => {
    console.log(x)
  })
  useEffect(() => {
    dispatch(AddRoylitiesAPI())

    console.log('first')
  }, [])

  return <>

    <div className="row g-3">
      {state?.map((x, i) => {

        return <div key={i} className="col-4">
          <Card className="Roylities-Card"  >

            <Card.Body>

              <Card.Text>
                <p><strong>InvoiceId</strong> : {x.invoiceId}</p>
                <p><strong>Name</strong> : {x.name}</p>
                <p><strong>Status</strong> : {x.status}</p>
                <p><strong>PaymentDate</strong> : {x.paymentDate}</p>
                <p><strong>InvoiceNo</strong> : {x.invoiceNo}</p>
                <p><strong>type</strong> : {x.type}</p>
              </Card.Text>

              <div> 
<div className="text-center"> 
                <Button className="view-btn" onClick={handleShow}>View</Button>

</div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center">Roylities Data</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><strong>InvoiceId</strong> : {x.invoiceId}</p>
                    <p><strong>Name</strong> : {x.name}</p>
                    <p><strong>Status</strong> : {x.status}</p>
                    <p><strong>PaymentDate</strong> : {x.paymentDate}</p>
                    <p><strong>InvoiceNo</strong> : {x.invoiceNo}</p>
                    <p><strong>type</strong> : {x.type}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>

                  </Modal.Footer>
                </Modal> </div>


            </Card.Body>
          </Card>
        </div>
      })}
    </div>






  </>
    ;
}
export default HOC(Roylities);
