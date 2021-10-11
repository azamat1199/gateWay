import Analitika from "../containers/consultantBackoffice/pages/Analitika";
import Dagavori from "../containers/consultantBackoffice/pages/dagovori";
import Fakultet from "../containers/consultantBackoffice/pages/Fakultet";
import Login from "../containers/consultantBackoffice/pages/Login";
import LoginStaff from "../containers/consultantBackoffice/pages/LoginStaff";
import Plateji from "../containers/consultantBackoffice/pages/Plateji";
import SidebarAgentlar from "../containers/consultantBackoffice/pages/SidebarAgentlar";
import SidebarUniverstitet from "../containers/consultantBackoffice/pages/SidebarUniverstitet";
import SidebarFilial from "../containers/consultantBackoffice/pages/SidebarFilial";
import SideGlavny from "../containers/consultantBackoffice/pages/SideGlavny";
import SideOtdel from "../containers/consultantBackoffice/pages/SideOtdel";
import SideStrana from "../containers/consultantBackoffice/pages/SideStrana";
import Talabalar from "../containers/consultantBackoffice/pages/Talabalar";
import Dogovor from "../containers/StudentCabinet/pages/dogovor";
import Kabinet from "../containers/StudentCabinet/pages/kabinet";
import Personal from "../containers/StudentCabinet/pages/personal";
import Status from "../containers/StudentCabinet/pages/status";
import Universitet from "../containers/StudentCabinet/pages/universitet";
import StudentCabinet from "../containers/StudentCabinet/studentCabinet";
import Partnyors from "../containers/web/pages/Partnyors";
import SinglePage from "../containers/web/pages/SinglePage";
import Fayli from "../containers/web/pages/singup/Fayli";
import Oplata from "../containers/web/pages/singup/Oplata";
import Oplata2 from "../containers/web/pages/singup/Oplata2";
import Oplata3 from "../containers/web/pages/singup/Oplata3";
import Profayl from "../containers/web/pages/singup/Profayl";
import Profayl2 from "../containers/web/pages/singup/Profayl2";
import Profayl3 from "../containers/web/pages/singup/Profayl3";
import SingUp from "../containers/web/pages/singup/SingUp";
import TextDogovor from "../containers/web/pages/singup/TextDogovor";
import Zayavka from "../containers/web/pages/singup/Zayavka";
import Web from "../containers/web/web";
import MainEduGate from "../containers/web/pages/MainEduGate";
import Home from "../containers/consultantBackoffice/univerBackoffice/pages/home";
import Abiturient from "../containers/consultantBackoffice/univerBackoffice/pages/abiturients";
import Invoys from "../containers/consultantBackoffice/univerBackoffice/pages/invoys";
import Info from "../containers/consultantBackoffice/univerBackoffice/pages/info";
import Documents from "../containers/consultantBackoffice/pages/Documents";
import UserDocument from "../containers/consultantBackoffice/pages/userDocument";
import Konsultatsya from "../containers/web/pages/Konsultatsya";

import N_glavny from "../containers/Notarius/pages/N_glavny";
import N_info from "../containers/Notarius/pages/N_info";
import N_info_id from "../containers/Notarius/pages/N_info_id";
import N_otchot from "../containers/Notarius/pages/N_otchot";
import N_perevod from "../containers/Notarius/pages/N_perevod_doc";
import N_document from "../containers/Notarius/pages/N_docments";
import N_doc_single from "../containers/Notarius/pages/N_doc_single";

import AccountantTicket from "../containers/Accountant/pages/Accountant-ticket";
import AccountantAnalytics from "../containers/Accountant/pages/AccountantAnalytics";

const routes = {
  public: [
    // Accountant
    {
      key: "accountant",
      path: "/accountant-ticket",
      component: AccountantTicket,
      exact: true,
    },
    {
      key: "analytics",
      path: "/accountant-analytics",
      component: AccountantAnalytics,
      exact: true,
    },

    // Accountant
    {
      key: "university",
      path: "/",
      component: MainEduGate,
      exact: true,
    },
    {
      key: "university",
      path: "/partners",
      component: Partnyors,
      exact: true,
    },
    {
      key: "university",
      path: "/konsultatsya",
      component: Konsultatsya,
      exact: true,
    },
    {
      key: "university",
      path: "/university/:id",
      component: SinglePage,
      exact: true,
    },
    {
      key: "clientAdd",
      path: "/registration",
      component: SingUp,
      exact: true,
    },
    {
      key: "balance",
      path: "/login",
      component: Login,
      exact: true,
    },
    {
      key: "balance",
      path: "/loginStaff",
      component: LoginStaff,
      exact: true,
    },
    {
      key: "balance",
      path: "/requisition",
      component: Zayavka,
      exact: true,
    },
    {
      key: "balance",
      path: "/home/documents/user",
      component: UserDocument,
      exact: false,
    },
    {
      key: "balance",
      path: "/profile",
      component: Profayl,
      exact: true,
    },
    {
      key: "balance",
      path: "/profile2",
      component: Profayl2,
      exact: true,
    },
    {
      key: "balance",
      path: "/profile3",
      component: Profayl3,
      exact: true,
    },
    {
      key: "file",
      path: "/files",
      component: Fayli,
      exact: true,
    },
    {
      key: "file",
      path: "/payment-click",
      component: Oplata,
      exact: true,
    },
    {
      key: "file",
      path: "/payment-payme",
      component: Oplata2,
      exact: true,
    },
    {
      key: "file",
      path: "/payment-transaction",
      component: Oplata3,
      exact: true,
    },
    {
      key: "file",
      path: "/text-agreement",
      component: TextDogovor,
      exact: true,
    },
  ],
  student: [
    {
      key: "file",
      path: "/my-account",
      component: Kabinet,
      exact: true,
    },
    {
      key: "file",
      path: "/universities",
      component: Universitet,
      exact: true,
    },
    {
      key: "file",
      path: "/personal",
      component: Personal,
      exact: true,
    },
    {
      key: "file",
      path: "/agreement",
      component: Dogovor,
      exact: true,
    },
    {
      key: "file",
      path: "/status",
      component: Status,
      exact: true,
    },
    {
      key: "file",
      path: "/bonus",
      component: () => <h1>Bonus page</h1>,
      exact: true,
    },
    {
      key: "file",
      path: "/settings",
      component: () => <h1>settings page</h1>,
      exact: true,
    },
  ],
  consult: [
    {
      key: "file",
      path: "/home/main",
      component: SideGlavny,
      exact: true,
    },
    {
      key: "file",
      path: "/home/countries",
      component: SideStrana,
      exact: true,
    },
    {
      key: "file",
      path: "/home/universitet",
      component: SidebarUniverstitet,
      exact: true,
    },
    {
      key: "file",
      path: "/home/faculties",
      component: Fakultet,
      exact: true,
    },
    {
      key: "file",
      path: "/home/branch",
      component: SidebarFilial,
      exact: true,
    },
    {
      key: "file",
      path: "/home/students",
      component: Talabalar,
      exact: true,
    },
    {
      key: "file",
      path: "/home/ducuments",
      component: Documents,
      exact: true,
    },
    {
      key: "file",
      path: "/home/accountant",
      component: Analitika,
      exact: true,
    },
    {
      key: "file",
      path: "/home/payments",
      component: Plateji,
      exact: true,
    },
    {
      key: "file",
      path: "/home/contracts",
      component: Dagavori,
      exact: true,
    },
    {
      key: "file",
      path: "/home/contracts",
      component: Dogovor,
      exact: true,
    },
    {
      key: "file",
      path: "/home/agents",
      component: SidebarAgentlar,
      exact: true,
    },
    {
      key: "file",
      path: "/home/analytics-department",
      component: SideOtdel,
      exact: true,
    },
  ],
  univerOffice: [
    {
      key: "file",
      path: "/univer-backoffice-page",
      component: Home,
      exact: true,
    },
    {
      key: "file",
      path: "/studentsss",
      component: Abiturient,
      exact: true,
    },
    {
      key: "file",
      path: "/invoice",
      component: Invoys,
      exact: true,
    },
    {
      key: "file",
      path: "/info",
      component: Info,
      exact: true,
    },
  ],

  authonticated: [],

  notarius: [
    {
      key: "file",
      path: "/n-glavny",
      component: N_glavny,
      exact: true,
    },
    {
      key: "file",
      path: "/n-document",
      component: N_document,
      exact: true,
    },
    {
      key: "file",
      path: "/n-document/:id",
      component: N_doc_single,
      exact: true,
    },
    {
      key: "file",
      path: "/n-perevod",
      component: N_perevod,
      exact: true,
    },
    {
      key: "file",
      path: "/n-info",
      component: N_info,
      exact: true,
    },
    {
      key: "file",
      path: "/n-info/:id",
      component: N_info_id,
      exact: true,
    },
    {
      key: "file",
      path: "/n-otchot",
      component: N_otchot,
      exact: true,
    },
  ],
};
export default routes;
