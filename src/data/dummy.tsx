import { FiAlertCircle } from '@react-icons/all-files/fi/FiAlertCircle';
import { IoMdApps, IoMdContacts } from 'react-icons/io';
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaArrowCircleDown } from '@react-icons/all-files/fa/FaArrowCircleDown';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { FaUserShield, FaClock, FaCheckCircle, FaShieldAlt, FaBicycle, FaRoad, FaTree, FaBan, FaWineBottle } from 'react-icons/fa';

export const links = [
  {
    title: '사업 소개',
    icon: <IoMdContacts />,
    links: [
      {
        name: '따릉이 소개',
        linkTo: '/',
      },
      {
        name: '이용방법',
        linkTo: '/rent',
      },
      {
        name: '안전수칙',
        linkTo: '/return',
      },
      {
        name: '대여소 조회',
        linkTo: '/search/station',
      },
    ],
  },
  {
    title: '통계',
    icon: <TbDeviceAnalytics />,
    links: [
      {
        name: '이용정보 (월별)',
        linkTo: '/monthly/usage',
      },
      {
        name: '고장 및 대여 이력 (일별)',
        linkTo: '/day/report',
      },
    ],
  },
];


export const home = [
  {
    icon: <IoMdApps />,
    title: "건강한 자전거 도시",
    subText: "자전거 이용의 생활화를 통한 시민건강 증진 실현",
    bgColor: 'bg-primary-500',
    color: 'text-primary-500',
  },
  {
    icon: <FiAlertCircle />,
    title: "깨끗한 자전거 도시",
    subText: "자전거 교통수단 보급률을 향상시켜 CO2 발생 감소 실현",
    bgColor: 'bg-primary-dark-green',
    color: 'text-primary-dark-green',
  },
  {
    icon: <FaArrowCircleDown />,
    title: "녹색 성장 선도 도시",
    subText: "국가 비전인 “저탄소 녹색성장” 실현",
    bgColor: 'bg-primary-orange',
    color: 'text-primary-orange',
  },
]

export const rentStepsData = [
  {
    title: '시작하기',
    icon: <FaArrowCircleDown />,
    description: '구글 플레이스토어 또는 앱 스토어에서 “따릉이”를 검색하여 설치한 뒤, 이용권을 구매합니다.',
  },
  {
    title: '대여하기',
    icon: <IoLockOpenOutline />,
    description: '따릉이 앱 실행 후 자전거 QR코드를 스캔하거나, 자전거번호를 입력합니다.',
  },
  {
    title: '반납하기',
    icon: <IoLockClosedOutline />,
    description: '대여소 거치대에 자전거를 잠근 후 반납 메시지를 확인합니다.',
  },
];



export const security = [
  {
    icon: <FaUserShield />,
    title: '만 13세 이상 누구나 이용 가능합니다.',
    subText: '',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
  {
    icon: <FaClock />,
    title: '따릉이 대여시간 준수하기',
    subText: '공공자전거는 모두가 이용하는 자전거로 사회적 재산입니다.',
    bgColor: 'bg-gray-800',
    color: 'text-white',
  },
  {
    icon: <FaCheckCircle />,
    title: '주행 전 ABC체크로 사고 예방',
    subText: '탑승 전에 "Air, Brake, Chain"을 체크하여 자전거 결함에 의한 사고 사전에 예방하기',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
  {
    icon: <FaShieldAlt />,
    title: '안전모와 보호대 등 보호장구 착용하기',
    subText: '미끄러지지 않는 신발과 편안한 복장 착용',
    bgColor: 'bg-gray-800',
    color: 'text-white',
  },
  {
    icon: <FaBicycle />,
    title: '자전거도 우측통행!',
    subText: '자전거도로를 이용하고, 그외의 도로에서는 도로 우측 가장자리에 붙어서 통행',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
  {
    icon: <FaRoad />,
    title: '자전거 간 안전거리를 확보하고 일렬로 주행하기',
    subText: '급격한 진로변경을 삼가고 주변에 차 또는 사람이 오는지 주의하기',
    bgColor: 'bg-gray-800',
    color: 'text-white',
  },
  {
    icon: <FaTree />,
    title: '횡단보도에서는 자전거를 끌고 보행하기',
    subText: '자전거횡단도가 없는 경우는 이곳을 통해 자전거를 끌고 보행',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
  {
    icon: <FaBan />,
    title: '자전거 금지구역 주행 금지',
    subText: '자동차전용도로나 자전거 탑승금지구역에서는 자전거 주행을 금지합니다.',
    bgColor: 'bg-gray-800',
    color: 'text-white',
  },
  {
    icon: <FaWineBottle />,
    title: '음주 후 자전거 운전 시 "음주운전"',
    subText: '음주 후 자전거 운행 시 법률 위반',
    bgColor: 'bg-green-500',
    color: 'text-white',
  },
];