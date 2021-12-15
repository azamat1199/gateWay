import React from "react";
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
import MyAccInvoys from "../containers/StudentCabinet/pages/myAccInvoys";
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
import InvoiceReceive from "../containers/consultantBackoffice/univerBackoffice/pages/invoiceReceive";
import Info from "../containers/consultantBackoffice/univerBackoffice/pages/info";
import Documents from "../containers/consultantBackoffice/pages/Documents";
import UserDocument from "../containers/consultantBackoffice/pages/userDocument";
import Konsultatsya from "../containers/web/pages/Konsultatsya";
import NotaryBoss from "../containers/consultantBackoffice/pages/NotaryBoss";
import N_glavny from "../containers/Notarius/pages/N_glavny";
import N_info from "../containers/Notarius/pages/N_info";
import N_info_id from "../containers/Notarius/pages/N_info_id";
import N_otchot from "../containers/Notarius/pages/N_otchot";
import N_perevod from "../containers/Notarius/pages/N_perevod_doc";
import N_document from "../containers/Notarius/pages/N_docments";
import N_doc_single from "../containers/Notarius/pages/N_doc_single";
import NapravFakultet from "../containers/consultantBackoffice/univerBackoffice/pages/napravFakultet";
import NapravMajor from "../containers/consultantBackoffice/univerBackoffice/pages/napravMajor";

import AccountantTicket from "../containers/Accountant/Pages/AccountantTicket";
import AccountantAnalytics from "../containers/Accountant/Pages/AccountantAnalytics";
import M_glavny from "../containers/Maneger/pages/M_glavny";
import M_glavny_id from "../containers/Maneger/pages/M_glavny_id";
import M_status from "../containers/Maneger/pages/M_status";
import M_analitika from "../containers/Maneger/pages/M_analitika";
import M_news from "../containers/Maneger/pages/M_news";
import M_prayslist from "../containers/Maneger/pages/M_prayslist";
import M_doc_all from "../containers/Maneger/pages/M_doc_all";
import M_doc_all_send from "../containers/Maneger/pages/M_doc_all_send";
import M_doc_rec from "../containers/Maneger/pages/M_doc_rec";
import M_doc_rec_send from "../containers/Maneger/pages/M_doc_rec_send";
import M_doc_send from "../containers/Maneger/pages/M_doc_send";
import UserPage from "../containers/consultantBackoffice/univerBackoffice/pages/singlepage";
import Settings from "../containers/consultantBackoffice/pages/Settings";
import SuperManager from "../containers/Maneger/pages/SuperManager";
import SM_doc_all from "../containers/Maneger/pages/SM_doc_all";
import ChangeManger from "../containers/Maneger/pages/ChangeUniver";
import StatusAbiturent from "../containers/Maneger/pages/StatusAbiturent";
import InvoisSend from "../containers/consultantBackoffice/univerBackoffice/pages/invoisSend";
import SidebarManager from "../containers/consultantBackoffice/pages/SidebarManager";
import DocumentReceivedSend from "../containers/consultantBackoffice/pages/DocumentsReceivedSend";
const routes = {
  accountant: [
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
  ],
  public: [
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
      path: "/myAccInvoys",
      component: MyAccInvoys,
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
      path: "/student/settings",
      component: () => <h1>settings page</h1>,
      exact: true,
    },
  ],
  consult: [
    {
      key: "settings",
      path: "/settings",
      component: Settings,
      exact: true,
    },
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
      path: "/home/send",
      component: Documents,
      exact: true,
    },
    {
      key: "file",
      path: "/home/received",
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
      path: "/home/natarius",
      component: NotaryBoss,
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
      path: "/home/manager",
      component: SidebarManager,
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
      path: "/napravFakultet",
      component: NapravFakultet,
      exact: true,
    },
    {
      key: "file",
      path: "/napravMajor",
      component: NapravMajor,
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
      path: "/invoice-send",
      component: InvoisSend,
      exact: true,
    },
    {
      key: "file",
      path: "/invoice-receive",
      component: InvoiceReceive,
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

    {
      key: "file",
      path: "/userPage/:id",
      component: UserPage,
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

  maneger: [
    {
      key: "superSidebar",
      path: "/super-manager",
      component: SuperManager,
      exact: true,
    },

    {
      key: "managerTable",
      path: "/superManager-glavny/:id",
      component: M_glavny_id,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-status",
      component: M_status,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-news",
      component: M_news,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/StatusAbiturent",
      component: StatusAbiturent,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-StatusAbiturent",
      component: StatusAbiturent,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-analitika",
      component: M_analitika,
      exact: true,
    },
    {
      key: "managerTable",
      component: M_prayslist,
      path: "/superManager-prayslist",
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-docs_all",
      component: SM_doc_all,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-docs_all/:id",
      component: M_doc_all_send,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-docs_send",
      component: M_doc_send,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-docs_rec",
      component: M_doc_rec,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/superManager-docs_rec/:id",
      component: M_doc_rec_send,
      exact: true,
    },
    {
      key: "file",
      path: "/m-glavny",
      component: M_glavny,
      exact: true,
    },
    {
      key: "file",
      path: "/m-glavny/:id",
      component: M_glavny_id,
      exact: true,
    },
    {
      key: "file",
      path: "/m-status",
      component: M_status,
      exact: true,
    },
    {
      key: "file",
      path: "/m-news",
      component: M_news,
      exact: true,
    },
    {
      key: "file",
      path: "/m-analitika",
      component: M_analitika,
      exact: true,
    },
    {
      key: "file",
      path: "/m-prayslist",
      component: M_prayslist,
      exact: true,
    },
    {
      key: "managerTable",
      path: "/changeUniver",
      component: ChangeManger,
      exact: true,
    },

    {
      key: "file",
      path: "/m-docs_all",
      component: M_doc_all,
      exact: true,
    },
    {
      key: "file",
      path: "/m-docs_all/:id",
      component: M_doc_all_send,
      exact: true,
    },
    {
      key: "file",
      path: "/m-docs_send",
      component: M_doc_send,
      exact: true,
    },
    {
      key: "file",
      path: "/m-docs_rec",
      component: M_doc_rec,
      exact: true,
    },
    {
      key: "file",
      path: "/m-docs_rec/:id",
      component: M_doc_rec_send,
      exact: true,
    },
  ],
};
export default routes;
