import gql from 'graphql-tag';


    const CREATE_CUSTOMER = gql`
    mutation MyMutation($id: UUID!, $name: String!, $mobile: String!, $email: String!, $shoot_details: String, $event_address: String, $source: EnumCustomersSource!, $profile_id: UUID!, $created_at: Datetime!, $updated_at: Datetime!, $whatsapp_number: String, $facebook_id: String, $insta_id: String, $sales_person: String!) {
      __typename
      createCustomer(input: {customer: {id: $id, createdAt: $created_at, updatedAt: $updated_at, createdBy: $profile_id, email: $email, mobile: $mobile, name: $name, eventAddress: $event_address, shootDetails: $shoot_details, isActive: true, source: $source, updatedBy: $profile_id, facebookId: $facebook_id, instaId: $insta_id, salesPerson: $sales_person, whatsappNumber: $whatsapp_number}}) {
        customer {
          id
        }
      }
    }
        
    `;
  const CREATE_PROJECT =  gql`
  mutation MyMutationj(
    $id: UUID!
    $customer_id: UUID!
    $created_at: Datetime!
    $updated_at: Datetime!
    $profile_id: UUID!
    $final_quote_id: UUID
  ) {
    __typename
    createProject(
      input: {
        project: {
          id: $id
          customerId: $customer_id
          pgVgTl: $profile_id
          psTl: $profile_id
          qc: $profile_id
          createdAt: $created_at
          updatedAt: $updated_at
          createdBy: $profile_id
          updatedBy: $profile_id
          finalQuoteId: $final_quote_id
          isActive: true
          status: CAPTURED
        }
      }
    ) {
      project {
        id
      }
    }
  }
  
  `;
  const STATUS_UPDATE_IN_PROJECT = gql`
  mutation MyMutation($id:UUID!,$status:EnumProjectsStatus) {
    __typename
    updateProjectById(input: {projectPatch: {status: $status}, id: $id}) {
      project {
        id
      }
    }
  }
  `;
  const STATUS_UPDATE_IN_PROJECT_AXIOS = `mutation MyMutation($id:UUID!,$status:EnumProjectsStatus) {
    __typename
    updateProjectById(input: {projectPatch: {status: $status}, id: $id}) {
      project {
        id
      }
    }
  }`;
  const UPDATE_CUSTOMER = gql`  
  mutation MyMutation($id: UUID!, $name: String!, $source: EnumCustomersSource!, $email: String!, $mobile: String!, $event_address: String!, $shoot_details: String!, $whatsapp_number: String, $facebook_id: String, $insta_id: String, $sales_person: String!) {
    __typename
    updateCustomerById(input: {customerPatch: {name: $name, source: $source, email: $email, mobile: $mobile, eventAddress: $event_address, shootDetails: $shoot_details, facebookId: $facebook_id, instaId: $insta_id, salesPerson: $sales_person, whatsappNumber: $whatsapp_number}, id: $id}) {
      customer {
        projectsByCustomerId {
          nodes {
            id
          }
        }
      }
    }
  }
  
  `;
  // const UPDATE_PROJECT = gql`
  // mutation MyMutation(
  //   $id:UUID!
  //   $event_address:String
  //   $event_date:Datetime
  //   $shootDetails:String
  // ) {
  //   __typename
  //   updateProjectById(
  //     input: {
  //       projectPatch: {
  //         eventAddress: $event_address
  //         eventDate: $event_date
  //         shootDetails: $shootDetails
  //       }
  //       id: $id
  //     }
  //   ) {
  //     project {
  //       id
  //     }
  //   }
  // }
  // `;
  const UPDATE_PROJECT_FINALQUOTE = `
  mutation MyMutation($id: UUID!, $final_quote_id: UUID, $status: EnumProjectsStatus!) {
    __typename
    updateProjectById(input: {projectPatch: {finalQuoteId: $final_quote_id, status: $status}, id: $id}) {
      project {
        finalQuoteId
      }
      customerByCustomerId {
        serialNo
      }
    }
  }  
  `;
  const CREATE_COMMUNICATION = `
  mutation MyMutation(
    $id: UUID!
    $sender_id: UUID!
    $created_at: Datetime!
    $updated_at: Datetime!
    $message: String!
    $is_internal: Boolean!
    $project_id: UUID!
    $mode: String
  ) {
    __typename
    createCommunication(
      input: {
        communication: {
          id: $id
          senderId: $sender_id
          createdBy: $sender_id
          updatedBy: $sender_id
          createdAt: $created_at
          updatedAt: $updated_at
          message: $message
          isInternal: $is_internal
          isActive: true
          projectId: $project_id
          mode: $mode
        }
      }
    ) {
      communication {
        id
      }
    }
  }
  `;
  // const USERPROFILEFOLLOWUPSTATUS = `
  // query MyQuery($id: UUID!) {
  //   userProfileById(id: $id) {
  //     customersByCreatedBy(filter: {projectsByCustomerId: {some: {status: {equalTo: FOLLOWUP}}}}) {
  //       nodes {
  //         id
  //         name
  //         mobile
  //         serialNo
  //       }
  //     }
  //   }
  // }  
  // `;
  const USERPROFILEFOLLOWUPSTATUS = `
  query MyQuery {
    allProjects(filter: {status: {equalTo: FOLLOWUP}}) {
      nodes {
        customerByCustomerId {
          id
          name
          mobile
          serialNo
        }
      }
    }
  }
  `;
  // const USERPROFILEFINALQUOTESTATUS = `
  // query MyQuery($id: UUID!) {
  //   userProfileById(id: $id) {
  //     customersByCreatedBy(filter: {projectsByCustomerId: {some: {status: {equalTo: QUOTEFINAL}}}}) {
  //       nodes {
  //         id
  //         name
  //         mobile
  //         serialNo
  //       }
  //     }
  //   }
  // }
  
  
  // `;
  const USERPROFILEFINALQUOTESTATUS = `
  query MyQuery {
    allProjects(filter: {status: {equalTo: QUOTEFINAL}}) {
      nodes {
        customerByCustomerId {
          id
          name
          mobile
          serialNo
        }
      }
    }
  }
  `;
  // const USERPROFILEONHOLDSTATUS = `
  // query MyQuery($id: UUID!) {
  //   userProfileById(id: $id) {
  //     customersByCreatedBy(filter: {projectsByCustomerId: {some: {status: {equalTo: ONHOLD}}}}) {
  //       nodes {
  //         id
  //         name
  //         mobile
  //         serialNo
  //       }
  //     }
  //   }
  // }
  
  // `;
  const USERPROFILEONHOLDSTATUS = `
  query MyQuery {
    allProjects(filter: {status: {equalTo: ONHOLD}}) {
      nodes {
        customerByCustomerId {
          id
          name
          mobile
          serialNo
        }
      }
    }
  }
  `;
  // const USERPROFILEDELAYEDSTATUS = `
  // query MyQuery($id: UUID!) {
  //   userProfileById(id: $id) {
  //     customersByCreatedBy(filter: {projectsByCustomerId: {some: {status: {equalTo: DELAYED}}}}) {
  //       nodes {
  //         id
  //         name
  //         mobile
  //         serialNo
  //       }
  //     }
  //   }
  // }  
  // `;
  const USERPROFILEDELAYEDSTATUS = `
  query MyQuery {
    allProjects(filter: {status: {equalTo: DELAYED}}) {
      nodes {
        customerByCustomerId {
          id
          name
          mobile
          serialNo
        }
      }
    }
  }
  `;
  const PROJECTQUOTEUPDATE = `
  mutation MyMutation(
    $id: UUID!
    $advance: String
    $description: String
    $advanceReceiveDate: Datetime
  ) {
    __typename
    updateProjectQuoteById(
      input: {
        projectQuotePatch: {
          advanceReceived: $advance
          description: $description
          advanceReceiveDate: $advanceReceiveDate
        }
        id: $id
      }
    ) {
      projectQuote {
        advanceReceived
      }
    }
  }
  
  `;
  const PDFGENERATER = `
  query MyQuery($projectQuoteId: UUID!) {
    projectQuoteById(id: $projectQuoteId) {
      projectByProjectId {
        customerByCustomerId {
          projectEventsByCustomerId(orderBy: CREATED_AT_ASC) {
            nodes {
              brideName
              eventStartDate
              groomName
              masterEventByEventId {
                eventName
              }
              eventServicesByProjectEventId(filter: {projectQuoteId: {equalTo: $projectQuoteId}}, orderBy: ORDER_DATA_ASC) {
                nodes {
                  masterServiceByServiceId {
                    serviceName
                    description
                    duration
                  }
                  quantity
                  isDeliverable
                  servicePrice
                }
              }
              location
            }
          }
          name
        }
      }
      totalAmt
    }
  }
  
  `;
  const PROJECTEVENTSERVICE =   `
  query MyQuery($Id: UUID!,$FinalQuoteId:UUID!) {
    projectById(id: $Id) {
      customerByCustomerId {
        projectEventsByCustomerId {
          nodes {
            masterEventByEventId {
              id
              eventName
            }
            eventServicesByProjectEventId(filter: {projectQuoteId: {equalTo: $FinalQuoteId}}) {
              nodes {
                quantity
                masterServiceByServiceId {
                  id
                  serviceName
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const FOLLOWUPDATE = `
  mutation MyMutation ($follow_up_date:Datetime!,$id:UUID!) {
    __typename
    updateCustomerById(input: {customerPatch: {followUpDate: $follow_up_date}, id: $id}) {
      customer {
        followUpDate
      }
    }
  }
  `;
  export {
      CREATE_CUSTOMER,
      CREATE_PROJECT,
      CREATE_COMMUNICATION,
      STATUS_UPDATE_IN_PROJECT,
      STATUS_UPDATE_IN_PROJECT_AXIOS,
      UPDATE_CUSTOMER,
      UPDATE_PROJECT_FINALQUOTE,
      USERPROFILEFOLLOWUPSTATUS,
      USERPROFILEFINALQUOTESTATUS,
      USERPROFILEONHOLDSTATUS,
      USERPROFILEDELAYEDSTATUS,
      PROJECTQUOTEUPDATE,
      PDFGENERATER,
      PROJECTEVENTSERVICE,
      FOLLOWUPDATE
  }