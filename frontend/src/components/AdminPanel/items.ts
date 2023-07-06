import PERMISSIONS from 'permissions/Permissions';

type SubItemProps = {
   name: string;
   link: string;
   permissions: string[];
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
            name: 'Konu Etiketleri',
            link: '/admin/konu-etiketleri',
            permissions: [PERMISSIONS.MOD],
         },
      ],
   },
];
