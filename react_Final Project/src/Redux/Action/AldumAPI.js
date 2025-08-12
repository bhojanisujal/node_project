import axios from "axios"
import { ALBUM_ADDAPI, ALBUM_GETAPI, Pass, PROFILEGETAPI, RoylitiesGETAPI } from "../Type/Type"
import Login from "../../Pages/Login";
import Swal from "sweetalert2";
import { CiLineHeight } from "react-icons/ci";
let token = JSON.parse(localStorage.getItem("login"))?.token;

export let auth = {
   headers: {
      "Authorization": `Bearer ${token}`
   }
}
export const AlbumAPI = () => {
   return (dispatch) => {
      axios.get('https://iris-api.mycodelibraries.com/api/Album/GetAllAlbums', auth).then((res) => {

         dispatch({ type: ALBUM_GETAPI, data: res.data.responseData });
         return res.data.responseData;

      })
   }

}
export const AddAlbumAPI = (obj) => {
   return (dispatch) => {
      axios.post('https://iris-api.mycodelibraries.com/api/Album/CreateAlbum', obj, auth).then((res) => {

         dispatch(AlbumAPI());
         return res.data.responseData;

      })
   }

}
export const EditAlbumAPI = (obj) => {
   return (dispatch) => {
      axios.post('https://iris-api.mycodelibraries.com/api/Album/UpdateAlbum', obj, auth).then((res) => {

         dispatch(AlbumAPI());
         return res.data.responseData;

      })
   }

}
export const deleteAlbumAPI = (id) => {
   return (dispatch) => {
      axios.delete('https://iris-api.mycodelibraries.com/api/Album/DeleteAlbum/' + id, auth).then((res) => {

         dispatch(AlbumAPI());
         return res.data.responseData;

      })
   }

}

export const getProfileAPI = () => {
   return (dispatch) => {
      axios.get('https://iris-api.mycodelibraries.com/api/Profile/GetAllProfile', auth).then((res) => {
              if(res.data.isSuccess){  
         console.log(res.data)
         dispatch({ type: PROFILEGETAPI, data: res.data.responseData });
         return res.data.responseData;
             }     
      })
   }
   
}
export const AddProfileAPI = (obj) => {
   return (dispatch) => {
      axios.post('https://iris-api.mycodelibraries.com/api/Profile/CreateProfile',obj, auth).then((res) => {
        if(res.data.isSuccess){
          dispatch(getProfileAPI());
   Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Profile Successfully Add",
  showConfirmButton: false,
  timer: 1500
});
         return res.data.responseData;
        }
      })
   }

}
export const eidtProfileAPI = (obj) => {
   console.log(obj)
   return (dispatch) => {
      axios.post('https://iris-api.mycodelibraries.com/api/Profile/UpdateProfile', obj, auth).then((res) => {
         console.log(res.data.responseData)
     
Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
        dispatch(getProfileAPI());
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});



         return res.data.responseData;
      })
   }

}
export const dataeleteProfileAPI = (id) => {
   return (dispatch) => {
      axios.delete('https://iris-api.mycodelibraries.com/api/Profile/DeleteProfile/' + id, auth).then((res) => {

        
         const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
   });
   dispatch(getProfileAPI());
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
  }
});


      })
   }

}

export const AddRoylitiesAPI = () => {
   return (dispatch) => {
      axios.get('https://iris-api.mycodelibraries.com/api/Roylities/GetAllInvoice', auth).then((res) => {

         dispatch({ type: RoylitiesGETAPI, data: res.data.responseData });
         return res.data.responseData;
      })
   }
}
export const changetPassword = (obj,nevigate,user,setuser) => {
   return () => {
      axios.post('https://iris-api.mycodelibraries.com/api/User/ChangePassword',obj,auth).then((res) => {
         localStorage.removeItem("login");
    
console.log(res.data.responseData)


         setuser(!user)
    nevigate('/');
       Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Change Password Success",
  showConfirmButton: false,
  timer: 1500
});
         console.log(res)
      })
   }

}
