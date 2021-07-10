export const API_CONSTANTS = {

    //Banks
    GetAllBanks: '/Banks/GetAllBanks',

    //Customers
    GetAllCustomers: '/Customers/GetAllCustomers',
    Register: '/Customers/Register',
    EditCustomer: '/Customers/EditCustomer',
    EditProfilePicture: '/Customers/EditProfilePicture',
    EditNationalIdFront: '/Customers/EditNationalIdFront',
    EditNationalIdBack: '/Customers/EditNationalIdBack',

    //Services
    GetAllServices: '/Services/GetAllServices',
  GetCreditCardsService: '/Services/GetCreditCardsService',
  GetPersonalLoansService: '/Services/GetPersonalLoansService',
  GetLoansService: '/Services/GetLoansService',
  GetAccountsService: '/Services/GetAccountsService',
  GetInvestmentsService :'/Services/GetInvestmentsService',

    //Service Types
    GetAllServiceTypesByServiceID: '/ServiceTypes/GetAllServiceTypesByServiceID/',

    //Service requests
    GetCustomerServiceRequests: '/ServiceRequests/GetCustomerServiceRequests/',
    DeleteServiceRequest: '/ServiceRequests/DeleteServiceRequest',
    SubmitServiceRequest: '/ServiceRequests/CreateServiceRequest',

    //Contact
    AddContactRequest: '/Contact/CreateContactRequest',

    //Newsletter
    SubscribeNewsletter: '/Contact/AddNewsletterSubscriber',

    //Users
    Login: '/Users/Login',
    ChangeAccountPassword: "/Users/ChangePasswordAccount",
  GetUserAccountByToken: '/Users/GetUserAccountByToken?token=',


  //
  CreateIslamicServiceRequest:"/ServiceRequests/CreateIslamicServiceRequest",
  CreateCorporateServiceRequest:"/ServiceRequests/CreateCorporateServiceRequest",

  Search: "/Services/Search/",
}
