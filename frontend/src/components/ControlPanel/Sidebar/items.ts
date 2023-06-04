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
      name: 'Profil',
      submenu: true,
      sublinks: [
         {
            name: 'Profiliniz',
            link: '/profil/',
         },
         {
            name: 'Profili Düzenle',
            link: '/profil/duzenle/',
         },
         {
            name: 'Gizlilik & Özelleştirme',
            link: '/profil/ozellestir/',
         },
         {
            name: 'Avatarı değiştir',
            link: '/profil/avatar/',
         },
      ],
   },
   {
      name: 'Ayarlar & Özellikler',
      submenu: true,
      sublinks: [
         {
            name: 'Email & Şifre',
            link: '/profil/sifre/',
         },
      ],
   },
];
