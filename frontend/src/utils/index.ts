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
