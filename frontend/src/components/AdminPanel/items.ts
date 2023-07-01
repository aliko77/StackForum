type SubItemProps = {
   name: string;
   link: string;
};

export type ItemProps = {
   name: string;
   submenu: boolean;
   sublinks?: SubItemProps[];
};

export const items: ItemProps[] = [
   {
      name: 'Forum',
      submenu: true,
      sublinks: [
         {
            name: 'Ana Konu Başlıkları',
            link: '/admin/ana-konu-basliklari',
         },
      ],
   },
];
