interface SubItemProp {
   name: string;
   link: string;
}

export interface ItemProp {
   name: string;
   submenu: boolean;
   sublinks?: SubItemProp[];
}

export const items: ItemProp[] = [
   {
      name: 'Profil',
      submenu: true,
      sublinks: [
         {
            name: 'Profiliniz',
            link: '/profil',
         },
         {
            name: 'Profili Düzenle',
            link: '/profil/duzenle',
         },
         {
            name: 'Gizlilik & Özelleştirme',
            link: '/profil/ozellestir',
         },
         {
            name: 'Avatarı değiştir',
            link: '/profil/avatar',
         },
      ],
   },
];
