import gql from 'graphql-tag';

const ALLCUSTOMERS = gql`
query MyQuery($profile_id: UUID, $first: Int!, $offset: Int!) {
  allCustomers(filter: {updatedBy: {equalTo: $profile_id}}, offset: $offset, first: $first, orderBy: CREATED_AT_DESC) {
    nodes {
      email
      id
      mobile
      name
      createdAt
      serialNo
      projectsByCustomerId {
        nodes {
          status
          projectQuoteByFinalQuoteId {
            totalAmt
          }
          id
          customerByCustomerId {
            projectEventsByCustomerId {
              nodes {
                masterEventByEventId {
                  eventName
                }
              }
            }
          }
        }
      }
    }
    totalCount
  }
}
`;
const GET_CUSTOMER_ID_DATA = `
query MyQuery($id: UUID!) {
  customerById(id: $id) {
    email
    mobile
    id
    name
    eventAddress
    shootDetails
    createdAt
    source
    serialNo
    projectsByCustomerId {
      nodes {
        id
        status
        customerByCustomerId {
          projectEventsByCustomerId(filter: {isActive: {equalTo: true}}, orderBy: CREATED_AT_ASC) {
            nodes {
              id
              isActive
              eventId
              eventStartDate
              eventStartTime
              eventEndDate
              eventEndTime
              masterEventByEventId {
                id
                eventName
              }
              brideName
              groomName
              location
              venue
              noOfPeople
              otherFunctionDetails
              typeOfWedding
            }
          }
        }
      }
    }
    facebookId
    instaId
    salesPerson
    whatsappNumber
    followUpDate
  }
}

`;
const MASTER_SERVICES = `
query MyQuery {
  allMasterServices {
    nodes {
      id
      isActive
      price
      tax
      serviceName
      description
      duration
    }
  }
}
`;
const CUSTOMER_PROJECT_QUOTES =`
query MyQuery($id: UUID!) {
  customerById(id: $id) {
    projectsByCustomerId {
      nodes {
        id
        finalQuoteId
        projectQuotesByProjectId(orderBy: CREATED_AT_DESC) {
          nodes {
            id
            isActive
            netAmt
            projectId
            tax
            totalAmt
            baseAmt
            discount
            balance
            advanceReceived
            advanceReceiveDate
            adjustmentAmt
            createdAt
            eventServicesByProjectQuoteId(orderBy: ORDER_DATA_ASC) {
              nodes {
                projectEventId
                quantity
                isDeliverable
                servicePrice
                masterServiceByServiceId {
                  id
                  serviceName
                  price
                  tax
                  description
                  duration
                }
              }
            }
            projectByProjectId {
              customerByCustomerId {
                projectEventsByCustomerId(orderBy: CREATED_AT_ASC) {
                  nodes {
                    id
                    masterEventByEventId {
                      id
                      eventName
                    }
                  }
                }
              }
            }
          }
          totalCount
        }
      }
    }
  }
}

`;
const CUSTOMER_BY_PROJECT_ID = `
query MyQuery($id: UUID!) {
  customerById(id: $id) {
    projectsByCustomerId {
      nodes {
        id
      }
    }
  }
}
`;
const COMMUNICATION_BY_PROJECT = `
query MyQuery($id: UUID!) {
  projectById(id: $id) {
    communicationsByProjectId(orderBy: CREATED_AT_DESC) {
      nodes {
        id
        message
        senderId
        createdAt
        userProfileByCreatedBy {
          name
        }
        isInternal
      }
    }
  }
}
`;
const ALLMASTEREVENT = `
query MyQuery {
  allMasterEvents {
    nodes {
      id
      eventName
    }
  }
}
`;
const GETEPROJECTEVENT = `
query MyQuery($id: UUID!) {
  customerById(id: $id) {
    projectEventsByCustomerId(filter: {isActive: {equalTo: true}}, orderBy: CREATED_AT_ASC) {
      nodes {
        id
        masterEventByEventId {
          id
          eventName
        }
      }
    }
  }
}


`;
const FINANCE_CUSTOMER_DATA = gql`
query MyQuery($first: Int!, $offset: Int!,$search:String,$orderBy:[ProjectsOrderBy!]) {
  allProjects(first: $first, offset: $offset, orderBy: $orderBy, filter: {status: {in: [QUOTECONFIRMED, ADVANCEDPAID]}, customerByCustomerId: {or: [{name: {includes: $search}}, {mobile: {includes: $search}}, {serialNo: {includes: $search}}]}}) {
    nodes {
      createdAt
      customerByCustomerId {
        mobile
        name
        id
        serialNo
        projectEventsByCustomerId(filter: {isActive: {equalTo: true}}) {
          nodes {
            masterEventByEventId {
              eventName
            }
          }
        }
        followUpDate
      }
      status
      projectQuoteByFinalQuoteId {
        totalAmt
        advanceReceived
        description
        isPaymentCompleted
        id
      }
      id
    }
    totalCount
  }
}
`;
const ADMINACCESSCUSTOMERDATA =gql`
query MyQuery($first: Int!, $offset: Int!,$search:String,$orderBy:[ProjectsOrderBy!]) {
  allProjects(first: $first, offset: $offset, orderBy: $orderBy,filter: {customerByCustomerId: {or: [{name: {includes: $search}}, {mobile: {includes: $search}}, {serialNo: {includes: $search}}]}}) {
    nodes {
      createdAt
      customerByCustomerId {
        mobile
        name
        id
        serialNo
        projectEventsByCustomerId(filter: {isActive: {equalTo: true}}) {
          nodes {
            masterEventByEventId {
              eventName
            }
          }
        }
        followUpDate
      }
      status
      projectQuoteByFinalQuoteId {
        totalAmt
        advanceReceived
        description
        isPaymentCompleted
        id
      }
      id
    }
    totalCount
  }
}
`;
const CUSTOMERDETAILONLY =  `
query MyQuery($id: UUID!) {
  customerById(id: $id) {
    email
    mobile
    name
    serialNo
    projectsByCustomerId {
      nodes {
        status
      }
    }
  }
}
`;
const ALLCUSTOMERCOUNT = `
query MyQuery {
  allCustomers {
    totalCount
  }
}
`;
const ADVANCEPAIDPROJECTCOUNT = `
query MyQuery {
  allProjects(filter: {status: {equalTo: ADVANCEDPAID}}) {
    totalCount
  }
}
`;
const SALESPERSON = `
query MyQuery {
  allMasterRoles(filter: {id: {in: [2, 6]}}) {
    nodes {
      userProfilesByRoleId {
        nodes {
          name
        }
      }
    }
  }
}`;
const CONVERTPROJECT = gql`
query MyQuery($first: Int!, $offset: Int!) {
  allProjects(filter: {status: {equalTo: ADVANCEDPAID}}, first: $first, offset: $offset, orderBy: UPDATED_BY_DESC) {
    nodes {
      id
      customerByCustomerId {
        name
        mobile
        projectEventsByCustomerId {
          nodes {
            eventStartDate
            masterEventByEventId {
              eventName
            }
          }
        }
      }
      finalQuoteId
    }
    totalCount
  }
}
`;
const MASTER_COUNTRY_CODE = `
query MyQuery {
  allMasterCountryCodes {
    nodes {
      id
      code
      countryShortName
    }
  }
}
`;
const duplicate = `
query MyQuery($first: Int!, $offset: Int!,$search:String) {
  allCustomers(first: $first, offset: $offset, filter: {or: [{mobile: {includes: $search}}, {serialNo: {includes: $search}}]}) {
    nodes {
      projectsByCustomerId(orderBy: STATUS_DESC) {
        nodes {
          id
          status
          createdAt
          projectQuoteByFinalQuoteId {
            id
            isPaymentCompleted
            description
            advanceReceived
            totalAmt
          }
        }
      }
      projectEventsByCustomerId(filter: {isActive: {equalTo: true}}) {
        nodes {
          masterEventByEventId {
            eventName
          }
        }
      }
      id
      name
      mobile
      serialNo
      followUpDate
    }
    totalCount
  }
}
`;
export  {
    ALLCUSTOMERS,
    GET_CUSTOMER_ID_DATA,
    MASTER_SERVICES,
    CUSTOMER_PROJECT_QUOTES,
    CUSTOMER_BY_PROJECT_ID,
    COMMUNICATION_BY_PROJECT,
    ALLMASTEREVENT,
    GETEPROJECTEVENT,
    FINANCE_CUSTOMER_DATA,
    CUSTOMERDETAILONLY,
    ALLCUSTOMERCOUNT,
    ADVANCEPAIDPROJECTCOUNT,
    ADMINACCESSCUSTOMERDATA,
    SALESPERSON,
    CONVERTPROJECT,
    MASTER_COUNTRY_CODE,
    duplicate
}