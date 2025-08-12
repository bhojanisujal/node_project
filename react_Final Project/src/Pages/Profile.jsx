import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Form, Modal } from "react-bootstrap";
import { Next } from "react-bootstrap/esm/PageItem";
import {
  AddProfileAPI,
  dataeleteProfileAPI,
  eidtProfileAPI,
  getProfileAPI,
} from "../Redux/Action/AldumAPI";
import HOC from "../Component/HOC";
import { useForm } from "react-hook-form";
// import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "enter valid email"),
  // birthdate: yup
  //   .string()
  //   .required()
  // ,
  address: yup.string().required(),
  // contractEndDate: yup
  //   .string()
  //   .required()
  // ,
  // contractStartDate: yup
  //   .string()
  //   .required()
  // ,
  alternativeName: yup.string().required(),
  contractTotalMonths: yup.string().required(),
  artistName: yup.string().required(),
  chineseName: yup.string().required(),
  displayName: yup.string().required(),
  advanceAmount: yup.number().required(),

  idNumber: yup.number().required(),
});

const Profile = () => {
  let dispatch = useDispatch();
  let [obj, setobj] = useState({});
  let [blankobj, setblankobj] = useState({});
  let state = useSelector((state) => state.profileApireducer);
  // console.log(state);.

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let set = {
    bankDetails: [
      {
        profileBankAssociateId: 0,
        profileId: 0,
        bankAddress: "string",
        bankInfo: "string",
        cardHolder: "string",
        cardType: "string",
        cardNo: "string",
        tel: "string",
      },
    ],
    role: [
      {
        profileRoleAssociateId: 0,
        profileId: 0,
        roleType: 1,
      },
    ],
    advanceType: 1,
    userId: 0,
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const oninput = async (e) => {
    if (e.target.type == "file") {
      obj[e.target.name] = await toBase64(e.target.files[0]);
      // console.log(e.target.files[0]);
      blankobj[e.target.name] = "";
    } else {
      obj[e.target.name] = e.target.value;
      blankobj[e.target.name] = "";
    }
    setobj({ ...set, ...obj });
    setblankobj({ ...blankobj });
  };
  // console.log(blankobj)

  // console.log(schema)
  const onsubmit = (data) => {
    console.log(data);
    if (obj.id == undefined) {
      dispatch(AddProfileAPI(obj, setShow));
      // console.log(obj);
    } else {
      dispatch(eidtProfileAPI(obj));
    }

    setobj({ ...blankobj });
    handleClose();
    // setShow(false);
    console.log(obj, blankobj);
  };

  useEffect(() => {
    dispatch(getProfileAPI());

    // console.log("first");/
  }, []);

  const Deleteprofile = (id) => {
    dispatch(dataeleteProfileAPI(id));
  };
  const EDitprofile = (id) => {
    let editprofile = state.find((x) => id == x.id);
    // console.log(editprofile);
    setobj({ ...set, ...editprofile });
    setShow(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(state);

  console.log(obj, blankobj);
  return (
    <>
      <Button variant="primary" className="btn album-btn" onClick={handleShow}>
        Add Album Form
      </Button>

      <Modal className="modal1" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Album Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-4">
            {console.log(obj)}
            <Form className="form-control" onSubmit={handleSubmit(onsubmit)}>
              <input
                {...register("displayName")}
                type="text"
                name="displayName"
                className="form-control"
                onChange={oninput}
                placeholder="Diplay Name"
                value={obj?.displayName}
              />

              <p className="text-danger">{errors.displayName?.message}</p>

              <input
                {...register("idNumber")}
                type="text"
                name="idNumber"
                className="form-control"
                onChange={oninput}
                placeholder="idNumber"
                value={obj?.idNumber}
              />

              <p className="text-danger">{errors.idNumber?.message}</p>

              <input
                {...register("email")}
                value={obj?.email}
                type="email"
                name="email"
                className="form-control"
                onChange={oninput}
                placeholder="Email"
              />

              <p className="text-danger">{errors.email?.message}</p>

              <input
                type="datetime-local"
                name="birthdate"
                className="form-control"
                onChange={oninput}
                placeholder="Birth Date"
                value={obj?.birthdate}
              />

              {/* <p className="text-danger">{errors.birthdate?.message}</p> */}

              <input
                {...register("advanceAmount")}
                type="number"
                name="advanceAmount"
                className="form-control"
                onChange={oninput}
                placeholder="Advance Amount"
                value={obj?.advanceAmount}
              />

              <p className="text-danger">{errors.advanceAmount?.message}</p>

              <input
                {...register("address")}
                type="text"
                name="address"
                className="form-control"
                onChange={oninput}
                placeholder="Address"
                value={obj?.address}
              />

              <p className="text-danger">{errors.address?.message}</p>

              <input
                type="datetime-local"
                name="contractEndDate"
                className="form-control"
                onChange={oninput}
                placeholder="Contract End Date"
                value={obj?.contractEndDate}
              />

              {/* <p className="text-danger">{errors.contractEndDate?.message}</p> */}

              <input
                type="datetime-local"
                name="contractStartDate"
                className="form-control"
                onChange={oninput}
                placeholder="Contract Start Date"
                value={obj?.contractStartDate}
              />

              {/* <p className="text-danger">{errors.contractStartDate?.message}</p> */}

              <input
                {...register("alternativeName")}
                type="string"
                name="alternativeName"
                className="form-control"
                onChange={oninput}
                placeholder="Alternative Name"
                value={obj?.alternativeName}
              />

              <p className="text-danger">{errors.alternativeName?.message}</p>

              <input
                {...register("contractTotalMonths")}
                type="number"
                name="contractTotalMonths"
                className="form-control"
                onChange={oninput}
                placeholder="Contract Total Months"
                value={obj?.contractTotalMonths}
              />

              <p className="text-danger">
                {errors.contractTotalMonths?.message}
              </p>

              <input
                {...register("artistName")}
                type="string"
                name="artistName"
                className="form-control"
                onChange={oninput}
                placeholder="Artist Name"
                value={obj?.artistName}
              />

              <p className="text-danger">{errors.artistName?.message}</p>

              <input
                {...register("chineseName")}
                type="string"
                name="chineseName"
                className="form-control"
                onChange={oninput}
                placeholder="Chinese Name"
                value={obj?.chineseName}
              />

              <p className="text-danger">{errors.chineseName?.message}</p>

              <label htmlFor="Profile">Profile</label>
              <input
                {...register("profileImageBase64")}
                type="file"
                name="profileImageBase64"
                onChange={oninput}
                value={obj?.profileImageUrl}
              />

              <p className="text-danger">
                {errors.profileImageBase64?.message}
              </p>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row g-3">
        {state?.map((x, i) => {
          return (
            <div key={i} className="col-4">
              <Card className="Album-Card profile">
                <Card.Body>
                  <Card.Text> ID: {x.id}</Card.Text>
                  <Card.Text> DisplayName: {x.displayName}</Card.Text>
                  <Card.Text> Address: {x.address}</Card.Text>
                  <Card.Text> Email: {x.email}</Card.Text>
                  <Card.Text> Birthdate: {x.birthdate}</Card.Text>
                  <Card.Text> ArtistName: {x.artistName}</Card.Text>
                  <Card.Text> IdNumber: {x.idNumber}</Card.Text>
                  <Card.Text> AdvanceType: {x.advanceType}</Card.Text>
                  <Card.Text> ChineseName: {x.chineseName}</Card.Text>
                  <Card.Text>
                    ContractStartDate: {x.contractStartDate}
                  </Card.Text>
                  <Card.Text> ContractEndDate: {x.contractEndDate}</Card.Text>
                  <div className="w-50 d-flex  justify-content-between mx-auto">
                    <button
                      className="btn btn-warning"
                      onClick={() => EDitprofile(x.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => Deleteprofile(x.id)}
                    >
                      Delete
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HOC(Profile);
