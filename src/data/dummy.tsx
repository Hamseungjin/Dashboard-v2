import { IoMdContacts } from 'react-icons/io';
import { TbDeviceAnalytics } from "react-icons/tb";

export const links = [
  {
    title: '사업 소개',
    icon: <IoMdContacts />,
    links: [
      {
        name: '따릉이 소개',
        linkTo: 'home',
      },
      {
        name: '대여 방법',
        linkTo: 'rent',
      },
      {
        name: '반납 / 임시장금 방법',
        linkTo: 'return',
      },
      {
        name: '대여소 조회',
        linkTo: 'search/station',
      },
    ],
  },
  {
    title: '통계',
    icon: <TbDeviceAnalytics />,
    links: [
      {
        name: '고장 및 대여 이력 (일별)',
        linkTo: 'day/report',
      },
      {
        name: '이용정보 (월별)',
        linkTo: 'monthly/usage',
      },
    ],
  },
];
