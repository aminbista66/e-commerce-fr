import { ProductInstance } from './AxiosProductInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useGlobalAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);


export const AddToCart = (slug, quantity) => {

  ProductInstance.post(
    `add-to-cart/${slug}/`,
    { quantity: quantity },
    {
      headers: {
        Authorization:
          'Bearer' +
          ' ' +
          JSON.parse(localStorage.getItem('authtokens')).access,
      },
    }
  )
    .then(res => {
       return MySwal.fire(
            'Item Added To Cart!',
            `quantity-${quantity}`,
            'success'
          )
    })
    .catch(err => {
      if(err.response.data.code === "token_not_valid"){
        MySwal.fire({
          title: 'Invalid User',
          text: 'Seems Like Your are not logged in. Do you want to Login ?',
          icon: 'warning',
       }).then(function(){
          window.location.href = "login"
       });
        return 
      }
      return MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    });
};
