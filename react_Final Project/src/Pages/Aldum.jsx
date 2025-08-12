import React, { useEffect, useState } from "react";
import HOC from "../Component/HOC";
import { useDispatch, useSelector } from "react-redux";
import { ALBUMApireducer } from "../Redux/Reducer/Album";
import axios from "axios";
import {
  AddAlbumAPI,
  AlbumAPI,
  auth,
  deleteAlbumAPI,
  EditAlbumAPI,
} from "../Redux/Action/AldumAPI";
import { PiClubLight } from "react-icons/pi";
import { Button, Card, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form'
// import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
 
  albumName: yup.string().required(),
  alternativeAlbumName: yup.string().required(),
  isrc: yup.string().required(),
  upsCode: yup.string().required(),
  releaseDate: yup.string().required(),
  creationDate: yup.string().required(),
  umpgCode: yup.string().required(),
  filler1: yup.string().required(),
  filler2: yup.string().required(),

});

const Aldum = () => {
  let dispatch = useDispatch();
  let [obj, setobj] = useState({});
  let [blankobj, setblankobj] = useState({});
  let [data, setdata] = useState([]);
  let state = useSelector((state) => state.ALBUMApireducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(AlbumAPI());
  }, []);

  const oninput = (e) => {
    obj[e.target.name] = e.target.value;
    blankobj[e.target.name] = "";
    setblankobj({ ...blankobj });
    setobj({ ...obj });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onsubmit = () => {
    if (obj.id == undefined) {
      dispatch(AddAlbumAPI(obj));
    } else {
      dispatch(EditAlbumAPI(obj));
    }

    setobj({ ...blankobj });
    setShow(false);
  };
  const Deletealbum = (id) => {
    dispatch(deleteAlbumAPI(id));
  };
  const editalbum = (id) => {
    let index = state.find((x) => id == x.id);
    setobj({ ...index });
    setShow(true);
  };

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
          <form className="form-control" onSubmit={handleSubmit(onsubmit)}>
            <label className="form-label" htmlFor="">
              AlbumName
            </label>
            <input type="text" {...register('albumName')} className="form-control" name="albumName" value={obj?.albumName} onChange={oninput} />
            <p className="text-danger">{errors.albumName?.message}</p>

            <label className="form-label" htmlFor="">
              AlternativeAlbumName
            </label>
            <input  {...register('alternativeAlbumName')} type="text" className="form-control" name="alternativeAlbumName" value={obj?.alternativeAlbumName} onChange={oninput} />
            <p className="text-danger">{errors.alternativeAlbumName?.message}</p>
            <label className="form-label" htmlFor="">
              Isrc
            </label>
            <input  {...register('isrc')} type="text" className="form-control" name="isrc" value={obj?.isrc} onChange={oninput} />
            <p className="text-danger">{errors.isrc?.message}</p>
            <label className="form-label" htmlFor="">
              Filler1
            </label>
            <input  {...register('upsCode')} type="text" className="form-control" name="upsCode" value={obj?.upsCode} onChange={oninput} />
            <p className="text-danger">{errors.upsCode?.message}</p>
            <label className="form-label" htmlFor="">
              Filler2
            </label>
            <input  {...register('releaseDate')} type="datetime-local" className="form-control" name="releaseDate" value={obj?.releaseDate} onChange={oninput} />
            <p className="text-danger">{errors.releaseDate?.message}</p>
            <label className="form-label" htmlFor="">
              ReleaseDate
            </label>
            <input  {...register('creationDate')} type="datetime-local" className="form-control" name="creationDate" value={obj?.creationDate} onChange={oninput} />
            <p className="text-danger">{errors.creationDate?.message}</p>
            <label className="form-label" htmlFor="">
              CreationDate
            </label>
            <input  {...register('umpgCode')} type="text" className="form-control" name="umpgCode" value={obj?.umpgCode} onChange={oninput} />
            <p className="text-danger">{errors.umpgCode?.message}</p>
            <label className="form-label" htmlFor="">
              UpsCode
            </label>
            <input  {...register('filler1')} type="text" className="form-control" name="filler1" value={obj?.filler1} onChange={oninput} />
            <p className="text-danger">{errors.filler1?.message}</p>
            <label className="form-label" htmlFor="">
              UmpgCode
            </label>
            <input  {...register('filler2')} type="text" className="form-control" name="filler2" value={obj?.filler2} onChange={oninput} />
            <p className="text-danger">{errors.filler2?.message}</p>
            <button type="submit" className="btn btn-success"> Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      <div className="row g-3">
        {state?.map((x) => {
          return (
            <div key={x.id} className="col-4 ">
              <Card className="Album-Card">
                <Card.Body>
                  <Card.Text> ID: {x.id} </Card.Text>
                  <Card.Text> AlbumName: {x.albumName} </Card.Text>
                  <Card.Text>
                    
                    AlternativeAlbumName: {x.alternativeAlbumName}
                  </Card.Text>
                  <Card.Text> Isrc: {x.isrc} </Card.Text>
                  <Card.Text> Filler1: {x.filler1} </Card.Text>
                  <Card.Text> Filler2: {x.filler2} </Card.Text>
                  <Card.Text> ReleaseDate: {x.releaseDate} </Card.Text>
                  <Card.Text> CreationDate: {x.creationDate} </Card.Text>
                  <Card.Text> UpsCode: {x.upsCode} </Card.Text>
                  <Card.Text> umpgCode: {x.umpgCode} </Card.Text>
                  <div className="w-50 d-flex  justify-content-between mx-auto ">
                    <Card.Text>
                      
                      <button    className="btn btn-warning "    onClick={() => editalbum(x.id)}  >    Edit  </button>
                    </Card.Text>
                    <Card.Text>
                  
                      <button  className="btn btn-danger "  onClick={() => Deletealbum(x.id)}>    Delete</button>
                    </Card.Text>
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

export default HOC(Aldum);

// "albumName": "string",
//     "alternativeAlbumName": "string",
//     "isrc": "string",
//     "upsCode": "string",
//     "releaseDate": "2025-05-15T06:30:28.598Z",
//     "creationDate": "2025-05-15T06:30:28.598Z",
//     "umpgCode": "string",
//     "filler1": "string",
//     "filler2": "string",
