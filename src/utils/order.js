import { ProductInstance } from './AxiosProductInstance';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Order = (item_slug, address_id, setRefresh, refresh) => {
  ProductInstance.post(
    `order/${item_slug}/${address_id}/`,
    {},
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
      if (res.status === 200) {
        setRefresh(!refresh);
        return MySwal.fire(
          'Order created successfully',
          'go touch some grass',
          'success'
        );
      }
    })
    .catch(err => {
      return MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    });
};

export { Order };
