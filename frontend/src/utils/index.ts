import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const secretMail = (email: string) => {
   const [username, domain] = email.split('@');
   const [dom, dot] = domain.split('.');
   const secretText = username.slice(0, 3) + '***' + '@' + '*'.repeat(dom.length) + '.' + dot;
   return secretText;
};

export function parseDateTimeToString(dateTimeString: string): string {
   const dateTime = new Date(dateTimeString);
   const year = dateTime.getFullYear();
   const month = String(dateTime.getMonth() + 1).padStart(2, '0');
   const day = String(dateTime.getDate()).padStart(2, '0');
   const hour = String(dateTime.getHours()).padStart(2, '0');
   const minute = String(dateTime.getMinutes()).padStart(2, '0');

   const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
   return formattedDate;
}

export const Toast = withReactContent(Swal).mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 1500,
   timerProgressBar: true,
   customClass: {
      popup: '!bg-night-300 text-gray-100',
      timerProgressBar: 'bg-gray-600',
   },
});
