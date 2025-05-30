
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  Camera,
  Check,
  Clipboard,
  FileUser,
  Flag,
  FolderArchive,
  Home,
  IdCard,
  Landmark,
  Map,
  MapPin,
  PrinterCheck,
  RefreshCcw,
  RotateCcw,
  ScanBarcode,
  Settings,
  UserIcon,
  Image,
  Images,
  CircleDollarSign,
  ChartCandlestick,
  ChartNoAxesCombined,
} from "lucide-react";

export interface NavLink {
  title: string;
  subject?: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface IResources extends NavLink {
  sub?: NavLink[];
}

export const resources: IResources[] = [

  {
    title: "ໜ້າຫຼັກ",
    subject: "dashboard",
    href: "/dashboard",
    icon: <Home size={18} />,
  },
  {
    title: "ແຟ້ມເອກກະສານ",
    subject: "folder",
    href: "/folder",
    icon: <FolderArchive size={18} />,
  },
  {
    title: "ຄຸ້ມຄອງບຸກຄົນ",
    subject: "profile",
    href: "/profile",
    icon: <FileUser size={18} />,
  },
  {
    title: "ຫົວໜ່ວຍທຸລະກິດ",
    subject: "company",
    href: "/company",
    icon: <Building2 size={18} />,
  },
  {
    title: "ຄຸ້ມຄອງບັດ",
    href: "setting",
    subject: "/setting",
    icon: <IdCard size={18} />,
    sub: [
      {
        title: "ອອກບັດໃຫມ່",
        subject: "application",
        href: "/application",
        icon: <Clipboard size={18} />,
      },
      {
        title: "ອອກບັດຄືນ",
        subject: "renew",
        href: "/renew",
        icon: <RefreshCcw size={18} />,
      },
      {
        title: "ພິມບັດ",
        subject: "printing",
        href: "/printing",
        icon: <PrinterCheck size={18} />,
      },
      {
        title: "ພິມຫລັງບັດ",
        subject: "back-printing",
        href: "/back-printing",
        icon: <PrinterCheck size={18} />,
      },
      {
        title: "ລາຍການຜູ້ທີ່ພິມບັດແລ້ວ",
        subject: "printed",
        href: "/printed",
        icon: <Check size={18} />,
      },
      {
        title: "ກວດຂໍ້ມູນບັດ",
        subject: "scanner",
        href: "/scanner",
        icon: <ScanBarcode size={18} />,
      },
    ],
  },
  {
    title: "ຮູບພາບ",
    href: "image",
    subject: "/image",
    icon: <Images size={18} />,
    sub: [
      {
        title: "ຖາຍຮູບພາບ",
        subject: "take-photo",
        href: "/take-photo",
        icon: <Camera size={18} />,
      },
      {

        title: "ຄັງຮູບພາບ",
        subject: "gallery",
        href: "/gallery",
        icon: <Image size={18} />,
      },
    ],
  },
  {
    title: "ການເງິນ",
    href: "finance",
    subject: "/image",
    icon: <Images size={18} />,
    sub: [
      {
        title: "ຄືນເງິນ",
        subject: "refund",
        href: "/refund",
        icon: <RotateCcw size={18} />,
      },
      {
        title: "ສະກຸນເງິນ",
        subject: "currency",
        href: "/currency",
        icon: <CircleDollarSign size={18} />,
      },
      {
        title: "ອັດ​ຕາ​ແລກ​ປ່ຽນ",
        subject: "exchange",
        href: "/exchange",
        icon: <ChartCandlestick size={18} />,
      },
      {
        title: "ຄຸ້ມຄອງລາຄາ",
        subject: "price",
        href: "/price",
        icon: <BadgeDollarSign size={18} />,
      },
      {
        title: "report",
        subject: "report",
        href: "/report",
        icon: <ChartNoAxesCombined size={18} />,
      },
    ],
  },
  {
    title: "ຕັ້ງຄ່າ",
    href: "setting",
    subject: "/setting",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "ຕຳແໜ່ງງານ",
        subject: "position",
        href: "/position",
        icon: <Briefcase size={18} />,
      },
      {
        title: "ຜູ້ໃຊ້ງານລະບົບ",
        subject: "user",
        href: "/user",
        icon: <UserIcon size={18} />,
      },
      {
        title: "ສັນຊາດ",
        subject: "nationality",
        href: "/nationality",
        icon: <Flag size={18} />,
      },
      {
        title: "ແຂວງ",
        subject: "province",
        href: "/province",
        icon: <MapPin size={18} />,
      },
      {
        title: "ເມືອງ",
        subject: "district",
        href: "/district",
        icon: <Map size={18} />,
      },
      {
        title: "ບ້ານ",
        subject: "village",
        href: "/village",
        icon: <Home size={18} />,
      },
      {
        title: "ຫ້ອງການ",
        subject: "office",
        href: "/office",
        icon: <Landmark size={18} />,
      },
    ],
  },
];

