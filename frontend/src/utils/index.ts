export const secretMail = (email: string) => {
   const [username, domain] = email.split('@');
   const [dom, dot] = domain.split('.');
   const secretText = username.slice(0, 3) + '***' + '@' + '*'.repeat(dom.length) + '.' + dot;
   return secretText;
};
