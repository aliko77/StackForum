import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const secretMail = (email: string) => {
   const [username, domain] = email.split('@');
   const [dom, dot] = domain.split('.');
   return username.slice(0, 3) + '***' + '@' + '*'.repeat(dom.length) + '.' + dot;
};

export function parseDateTimeToString(dateTimeString: string): string {
   const dateTime = new Date(dateTimeString);
   const year = dateTime.getFullYear();
   const month = String(dateTime.getMonth() + 1).padStart(2, '0');
   const day = String(dateTime.getDate()).padStart(2, '0');
   const hour = String(dateTime.getHours()).padStart(2, '0');
   const minute = String(dateTime.getMinutes()).padStart(2, '0');

   return `${day}/${month}/${year} ${hour}:${minute}`;
}

export const Toast = withReactContent(Swal).mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 1500,
   timerProgressBar: true,
   customClass: {
      popup: '!bg-night-900 text-gray-100',
      timerProgressBar: 'bg-gray-600',
   },
});

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function hasMatchingElements<T>(search: T[], find: T[]): boolean {
   return search.some((element) => find.includes(element));
}
