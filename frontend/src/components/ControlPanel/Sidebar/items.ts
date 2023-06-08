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
         {
            name: 'İmzanı Değiştir',
            link: '/profil/imza/',
         },
      ],
   },
   {
      name: 'Sosyal Ağ',
      submenu: true,
      sublinks: [
         {
            name: 'Arkadaşlar',
            link: '/sosyal/arkadaslar/',
         },
         {
            name: 'Engellenen Kullanıcılar',
            link: '/sosyal/engellenenler/',
         },
      ],
   },
   {
      name: 'Ayarlar & Özellikler',
      submenu: true,
      sublinks: [
         {
            name: 'Şifreni Değiştir',
            link: '/ayarlar/sifre/',
         },
         {
            name: 'Email Değiştir',
            link: '/ayarlar/email/',
         },
         {
            name: 'Giriş Kayıtları',
            link: '/ayarlar/giris-kayitlari/',
         },
      ],
   },
];
